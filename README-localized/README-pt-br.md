---
page_type: sample
products:
- office
- office-365
- office-outlook
languages:
- javascript
description: "Este é um exemplo de implementação da solicitação de pagamento e de um pagamento concluído da webhook para um serviço de Pagamento do Outlook."
urlFragment: outlook-payments-sample
extensions:
  contentType: samples
  createdDate: "4/24/2018 7:43:42 AM"
---

# Exemplo de pagamentos do Node.js na webhook do Outlook

Este é um exemplo de implementação da solicitação de pagamento e webhooks completos de pagamento para um serviço [Pagamentos no Outlook](https://docs.microsoft.com/outlook/payments/).

## Pré-requisitos

Antes de executar este exemplo, você deve [se registrar no painel Pagamentos no Outlook](https://docs.microsoft.com/outlook/payments/partner-dashboard) e ter uma conta da plataforma de conexão [Stripe](https://stripe.com/connect).

Você também deve ter o [Node.js](https://nodejs.org) e [NPM](https://www.npmjs.com/) instalados.

## Executar o exemplo

1. Instalar dependências com o seguinte comando:

    ```bash
    npm install
    ```

1. Executar o exemplo com o seguinte comando:

    ```bash
    npm start
    ```

## Usar ngrok para executar localmente

Ao executar o exemplo localmente, ele é acessível por meio de `http://localhost:3333`. O serviço de pagamento deverá entrar em contato com seu webhook pela Internet, assim, a execução no host local não funcionará. Entretanto, ao usar [ngrok](https://ngrok.com/), pode-se criar um endereço publicamente acessível que é temporariamente capaz de entrar em contato com o host local.

Abrir um prompt de comando ou shell e executar o seguinte comando:

```bash
ngrok http 3333 -host-header=localhost:3333
```

O arquivo deve ser semelhante ao seguinte:

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

Copiar a URL HTTPS da segunda `Entrada de encaminhamento`. Na saída acima, a URL a ser copiada é `https://68cd84ed.ngrok.io`. Ao usar essa URL como base, serão construídas duas URLs: um para a webhook de solicitação de pagamento (ngrok URL + `/api/update`), e outra para a webhook de pagamento completo (ngrok URL + `/api/complete`). Por exemplo, ao usar a URL do exemplo de saída acima:

```
https://68cd84ed.ngrok.io/api/update
https://68cd84ed.ngrok.io/api/complete
```

> **Observação:**: Deixar o ngrok em execução para que essas URLs permaneçam ativas.

Atualize suas URLs da webhook no painel do parceiro com essas URLs para teste.

![Uma captura de tela das URLs da webhook no painel Pagamentos no Outlook](readme-images/dashboard-webhooks.PNG)

## Gerando uma mensagem de solicitação de pagamento de teste

Consulte [Introdução aos Pagamentos no Outlook](https://docs.microsoft.com/outlook/payments/get-started#send-the-test-payment-request) para obter as etapas para enviar uma mensagem de teste para si mesmo.

## Colaboração

Este projeto recebe e agradece as contribuições e sugestões.
A maioria das contribuições exige que você concorde com um Contrato de Licença de Colaborador (CLA) declarando que você tem o direito de, e realmente concede, o direito de usar sua contribuição.
Para saber mais, acesse [https://cla.microsoft.com](https://cla.microsoft.com).

Ao enviar uma solicitação de recebimento, um CLA-bot determina automaticamente se você precisa fornecer um CLA e decora o PR adequadamente (por exemplo: etiqueta, comentário).
Basta seguir as instruções fornecidas pelo bot.
Você só precisa fazer isso uma vez em todos os repositórios que usam nosso CLA.

Este projeto adotou o [Código de Conduta de Código Aberto da Microsoft](https://opensource.microsoft.com/codeofconduct/).
Para saber mais, consulte as [Perguntas mais Frequentes sobre o Código de Conduta](https://opensource.microsoft.com/codeofconduct/faq/)
ou entre em contato pelo [opencode@microsoft.com](mailto:opencode@microsoft.com) se tiver outras dúvidas ou comentários.
