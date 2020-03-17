---
page_type: sample
products:
- office
- office-365
- office-outlook
languages:
- javascript
description: "Este es un ejemplo de implementación de los webhooks de solicitud de pago y pago completado para servicio de Pagos en Outlook."
urlFragment: outlook-payments-sample
extensions:
  contentType: samples
  createdDate: "4/24/2018 7:43:42 AM"
---

# Ejemplo de webhook de Node.js de pagos en Outlook

Este es un ejemplo de implementación de los webhooks de solicitud de pago y pago completado para un servicio de [Pagos en Outlook](https://docs.microsoft.com/outlook/payments/).

## Requisitos previos

Antes de ejecutar este ejemplo, debe [registrarse en el panel Pagos en Outlook](https://docs.microsoft.com/outlook/payments/partner-dashboard) y debe tener una cuenta de conexión de plataforma [Stripe](https://stripe.com/connect).

También debe tener instalado [Node. js](https://nodejs.org) y [NPM](https://www.npmjs.com/).

## Ejecución del ejemplo

1. Instale las dependencias con el siguiente comando:

    ```bash
    npm install
    ```

1. Ejecute el ejemplo con el siguiente comando:

    ```bash
    npm start
    ```

## Usar ngrok para ejecutar de forma local

Cuando ejecuta el ejemplo de forma local, puede obtener acceso a él a través de `http://localhost:3333`. El servicio de pago debe poder contactarse con el webhook desde Internet, por lo que no funcionará al usar localhost. Sin embargo, al usar [ngrok](https://ngrok.com/), podemos crear una dirección de acceso público que pueda ponerse en contacto con localhost de forma temporal.

Abra un shell o un símbolo del sistema y ejecute el siguiente comando:

```bash
ngrok http 3333 -host-header=localhost:3333
```

El resultado debería tener un aspecto similar al siguiente:

```bash
ngrok by @inconshreveable                                     (Ctrl+C to quit)

Session Status                online
Account                       Jason Johnston (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://68cd84ed.ngrok.io -> localhost:3333
Forwarding                    https://68cd84ed.ngrok.io -> localhost:3333
```

Copie la dirección URL HTTPS de la segunda entrada de `Reenvío`. En el resultado anterior, la dirección URL a copiar es `https://68cd84ed.ngrok.io`. Con esa dirección URL como base, construimos dos URL: una al webhook de la solicitud de pago (ngrok URL + `/api/update`) y otra al webhook de pago completado (ngrok URL + `/api/complete`). Por ejemplo, si usa la dirección URL del resultado de ejemplo anterior:

```
https://68cd84ed.ngrok.io/api/update
https://68cd84ed.ngrok.io/api/complete
```

> **Nota**: Deje ngrok en ejecución para que esas URL permanezcan activas.

Actualice sus direcciones URL de webhook en el panel del asociado con estas direcciones URL para las pruebas.

![Una captura de pantalla de las direcciones URL de webhook en el panel Pagos de Outlook](readme-images/dashboard-webhooks.PNG)

## Generar un mensaje de solicitud de pago de prueba

Consulte [Introducción a los Pagos en Outlook](https://docs.microsoft.com/outlook/payments/get-started#send-the-test-payment-request) para ver los pasos a seguir para enviarse un mensaje de prueba a sí mismo.

## Contribuciones

Este proyecto recibe las contribuciones y las sugerencias.
La mayoría de las contribuciones necesitan un contrato de licencia de colaboración (CLA) que declare que tiene el derecho, y realmente lo tiene, de otorgarnos los derechos para usar su contribución.
Para obtener más información, visite [https://cla.microsoft.com](https://cla.microsoft.com).

Cuando envíe una solicitud de incorporación de cambios, un bot de CLA determinará automáticamente si necesita proporcionar un CLA y decorar el PR correctamente (por ejemplo, una etiqueta, un comentario).
Siga las instrucciones proporcionadas por el bot.
Solo deberá hacerlo una vez en todos los repos que usen nuestro CLA.

Este proyecto adoptó el [Código de conducta de código abierto de Microsoft](https://opensource.microsoft.com/codeofconduct/).
Para obtener más información, vea las [Preguntas frecuentes sobre el código de conducta](https://opensource.microsoft.com/codeofconduct/faq/)
o póngase en contacto con [opencode@microsoft.com](mailto:opencode@microsoft.com) si tiene otras preguntas o comentarios.
