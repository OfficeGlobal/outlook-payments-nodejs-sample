# Sample Node.js Payments in Outlook webhook

This is an example implementation of the payment request and payment complete webhooks for a [Payments in Outlook](https://docs.microsoft.com/outlook/payments/) service.

## Prerequisites

Prior to running this sample, you must [register in the Payments in Outlook dashboard](https://docs.microsoft.com/outlook/payments/partner-dashboard) and you must have a [Stripe](https://stripe.com/connect) connect platform account.

You must also have [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com/) installed.

## Configuring the sample

In [server.js](server.js), make the following changes:

- Set `stripeApiKey` to your Stripe API key.
- Set `stripeAccountId` to your Stripe account ID.

## Running the sample

1. Install dependencies with the following command:

    ```Shell
    npm install
    ```

1. Run the sample with the following command:

    ```Shell
    npm start
    ```

## Using ngrok to run locally

When you run the sample locally, it is accessible via `http://localhost:3333`. The Payment service must be able to contact your webhook from the internet, so running on localhost won't work. However, by using [ngrok](https://ngrok.com/), we can create a publicly accessible address that is temporarily able to contact localhost.

Open a command prompt or shell and run the following command:

```Shell
ngrok http 3333 -host-header=localhost:3333
```

The output should look similar to this:

```Shell
ngrok by @inconshreveable                                     (Ctrl+C to quit)

Session Status                online
Account                       Jason Johnston (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://68cd84ed.ngrok.io -> localhost:3333
Forwarding                    https://68cd84ed.ngrok.io -> localhost:3333
```

Copy the HTTPS URL from the second `Forwarding` entry. In the above output, the URL to copy is `https://5f14a16e.ngrok.io`. Using that URL as the base, let's construct two URLs: one to the payment request webhook (ngrok URL + `/api/update`), and one to the payment complete webhook (ngrok URL + `/api/complete`). For example, using the URL from the example output above:

```http
https://68cd84ed.ngrok.io/api/update
https://68cd84ed.ngrok.io/api/complete
```

> [!IMPORTANT]
> Leave ngrok running so those URLs remain active.

Update your webhook URLs in the partner dashboard with these URLs for testing.

![A screenshot of the webhook URLs in the Payments in Outlook dashboard](readme-images/dashboard-webhooks.PNG)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [https://cla.microsoft.com](https://cla.microsoft.com).

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.