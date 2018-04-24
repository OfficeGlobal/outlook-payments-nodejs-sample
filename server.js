// =============================================================================
// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
// See LICENSE.txt in the project root for license information.
// =============================================================================

// call the packages we need
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var request = require("request-json");
var pad = require('pad-right');
var stripeApiKey = "sk_test_YOUR_API_KEY";
var stripe = require("stripe")(stripeApiKey);

var stripeAccountId = "acct_A_SAMPLE_CONNECTED_ACCOUNT_ID";

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3333; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log("Request start.");
    next();
});

function Decode(encoded)
{
    var padded = pad(encoded, encoded.length + (4 - encoded.Length % 4) % 4, '='); // has to be padded to length that is multiple of 4
    var decoded = Buffer.from(padded, 'base64');
    return decoded.toString('utf8'); // todo: need to validate token
}

function ChargeStripeToken(token, amount, res, requestId)
{
    console.log("value:" + amount.value + " currency:" + amount.currency);
    var charge = stripe.charges.create({
      amount: amount.value*100,
      currency: amount.currency,
      source: token, // obtained with Stripe.js
      destination: stripeAccountId
    }).then(
        function(result) {
            console.log("stripe successfully charged: %j", result);
            var complete = `{
                "RequestId" : "` + requestId + `",
                "Result" : "success",
                "Details" : "Successfully paid",
                "Entity" : {
                    "@context": "http://schema.org",
                    "@type": "invoice",
                    "identifier": "test_invoice_id",
                    "url": "https://contoso.com",
                    "broker": {
                        "@type": "LocalBusiness",
                        "name": "Contoso Cleaning Services, Ltd."
                    },
                    "paymentDueDate": "2017-12-15",
                    "totalPaymentDue": {
                        "@type": "PriceSpecification",
                        "price": 10.00,
                        "priceCurrency": "USD"
                    },
                    "paymentStatus": "PaymentComplete"
                }
            }`;

            res.json(JSON.parse(complete));
        },
        function(err) {
            console.log("stripe charge failed: %j,", err);
            var complete = `{
                "RequestId" : "` + requestId + `",
                "Result" : "fail",
                "Details" : "`+ err.message +`",
                "Target" : "stripeToken",
                "Error" : {
                    "code": "` + err.rawType + `",
                    "message": "`+ err.message + `",
                    "innerError": {
                        "code": "` + err.code +`",
                        "message" :"` + err.message +`"
                    }
                }
            }`;

            res.json(JSON.parse(complete));
        }
    );
    return charge;
}

// test route to make sure everything is working (accessed at GET http://localhost:3333/api)
router.get("/", function(req, res) {
    res.json({ message: "Mock merchant API!" });
});

// on routes that end in /update
// ----------------------------------------------------
router.route("/update")

    // create a bear (accessed at POST http://localhost:3333/api/update)
    .post(function(req, res) {

        var methodData = req.body.methodData[0];
        var status = methodData.data.productContext.status;
        var event = methodData.data.event;
        var response = req.body;

        // enable test mode transactions
        methodData.data.mode = "TEST";

        if(event == "loadentity")
        {
            methodData.data.supportedNetworks = ["visa", "mastercard", "amex"];
            methodData.data.supportedTypes = ["credit"];

            if (status == "paid")
            {
                var responseData = `{"@context": "http://schema.org",
                    "@type": "invoice",
                    "identifier": "test_invoice_id",
                    "url": "https://contoso.com",
                    "broker": {
                        "@type": "LocalBusiness",
                        "name": "Contoso Cleaning Services, Ltd."
                    },
                    "paymentDueDate": "2017-12-15",
                    "totalPaymentDue": {
                        "@type": "PriceSpecification",
                        "price": 12.00,
                        "priceCurrency": "USD"
                    },
                    "confirmationNumber": "test_confirmation_number",
                    "paymentStatus": "PaymentComplete"
                }`;

                methodData.data.entity = JSON.parse(responseData);
                response.methodData[0] = methodData;

                res.json(response);
            }
            else
            {
                var responseData = `{
                    "@context": "http://schema.org",
                    "@type": "invoice",
                    "identifier": "test_invoice_id",
                    "url": "https://contoso.com",
                    "broker": {
                        "@type": "LocalBusiness",
                        "name": "Contoso Cleaning Services, Ltd."
                    },
                    "paymentDueDate": "2017-12-15",
                    "totalPaymentDue": {
                        "@type": "PriceSpecification",
                        "price": 10.00,
                        "priceCurrency": "USD"
                    },
                    "paymentStatus": "PaymentDue"
                }`;

                methodData.data.entity = JSON.parse(responseData);
                response.methodData[0] = methodData;

                var optionsData = `{
                    "requestPayerEmail": true,
                    "requestPayerName": true,
                    "requestPayerPhone": false,
                    "requestShipping": false
                }`;
                response.options = JSON.parse(optionsData);

                var detailsData = `
                    {
                        "total":
                        {
                            "label": "Total Due",
                            "amount":
                            {
                                "currency": "USD",
                                "value": "10.00"
                            }
                        },
                        "displayItems":
                        [
                            {
                                "label": "Widget",
                                "amount":
                                {
                                    "currency": "USD",
                                    "value": "10.00"
                                }
                            },
                            {
                                "label": "Shipping",
                                "amount":
                                {
                                    "currency": "USD",
                                    "value": "0.00"
                                },
                                "pending": true
                            }
                        ]
                    }`;
                response.details = JSON.parse(detailsData);
                res.json(response);
            }
        }
        else if (event == "shippingoptionchange")
        {
            if (status == "reject_update")
            {
                response.shippingOption = null;
                response.details.error = "test shipping option update error";
                res.json(response);
            }
            else if (status == "update_error")
            {
                res.status(500).send("this is a test update error response");
            }
            else
            {
                if (response.shippingOption == "NO_RUSH")
                {
                    response.details.displayItems[1].amount.value = "0.00";
                    response.details.total.amount.value = "10.00";
                }
                else
                {
                    response.details.displayItems[1].amount.value = "2.00";
                    response.details.total.amount.value = "12.00";
                }
                res.json(response);
            }
        }
        else if (event == "shippingaddresschange")
        {
            if (status == "reject_update")
            {
                response.shippingAddress = null;
                response.details.error = "test shipping address update error";
                res.json(response);
            }
            else if (status == "update_error")
            {
                res.status(500).send("this is a test update error response");
            }
            else
            {
                var shippingOptionsData = `[
                    {
                        "id": "NO_RUSH",
                        "label": "Free shipping to ` + response.shippingAddress.addressLine[0] + `",
                        "amount":
                        {
                            "currency": "USD",
                            "value": "0.00"
                        }
                    },
                    {
                        "id": "2_DAY",
                        "label": "2 day shipping to ` + response.shippingAddress.addressLine[0] + `",
                        "amount":
                        {
                            "currency": "USD",
                            "value": "2.00"
                        }
                    }]`;

                response.details.shippingOptions = JSON.parse(shippingOptionsData);
                res.json(response);
            }
        }
        else
        {
            res.status(500).send("unknown product context");
        }
    });



// on routes that end in /complete
// ----------------------------------------------------
router.route("/complete")

    // create a bear (accessed at POST http://localhost:3333/api/complete)
    .post(function(req, res) {

            var methodData = req.body.details;
            var status = methodData.productContext.status;
            var response = req.body;

            if (status != "complete_error")
            {
                if (status == "reject")
                {
                    var complete = `{
                        "RequestId" : "` + response.RequestId + `",
                        "Result" : "fail",
                        "Details" : "invalid token"
                    }`;

                    res.json(JSON.parse(complete));
                }
                else
                {


                    try
                    {
                        var token = response.details.paymentToken;
                        var parts = token.split('.');
                        var header = JSON.parse(Decode(parts[0]));
                        var format = header["Format"];
                        var payload = Decode(parts[1]);
                        var amount = header["Amount"];
                        if(format == "Stripe")
                        {
                            ChargeStripeToken(payload, amount, res, response.RequestId);
                        }
                    } catch (err)
                    {
                        console.log("Stripe charge failed:" + err.stack);
                        res.status(500).send("Something went wrong");
                    }
                }
            }
            else
            {
                res.status(500).send("this is a test complete error response");
            }
    });
// REGISTER OUR ROUTES -------------------------------
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Mock merchant on port " + port);
