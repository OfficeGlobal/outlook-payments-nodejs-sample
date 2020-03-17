---
page_type: sample
products:
- office
- office-365
- office-outlook
languages:
- javascript
description: "これは、Payments in Outlook サービス用の支払い要求 webhook と支払い完了 webhook の実装例です。"
urlFragment: outlook-payments-sample
extensions:
  contentType: samples
  createdDate: "4/24/2018 7:43:42 AM"
---

# サンプル Node.js Payments in Outlook webhook

これは、[Payments in Outlook](https://docs.microsoft.com/outlook/payments/) サービス用の支払い要求 webhook と支払い完了 webhook の実装例です。

## 前提条件

このサンプルを実行する前に、[Payments in Outlook ダッシュボードで登録](https://docs.microsoft.com/outlook/payments/partner-dashboard)する必要があり、[Stripe](https://stripe.com/connect) Connect プラットフォームのアカウントが必要です。

[Node.js](https://nodejs.org) と [NPM](https://www.npmjs.com/) がインストールされている必要もあります。

## サンプルの実行

1. 次のコマンドを実行して、依存関係をインストールします。

    ```bash
    npm install
    ```

1. 次のコマンドを使用してサンプルを実行します。

    ```bash
    npm start
    ```

## ngrok を使用してローカルで実行する

サンプルをローカルで実行する場合、サンプルは `http://localhost:3333` からアクセスできます。Payment サービスは、webhook にインターネットから接続できる必要があるため、localhost 上では実行できません。ただし、[ngrok](https://ngrok.com/) を使用することにより、localhost に一時的に接続することができる、一般にアクセス可能なアドレスを作成できます。

コマンド プロンプトまたはシェルを開き、次のコマンドを実行します。

```bash
ngrok http 3333 -host-header=localhost:3333
```

出力は、次のようになります。

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

2 つ目の `Forwarding` エントリの HTTPS URL をコピーします。上記の出力からコピーする URL は、`https://68cd84ed.ngrok.io` です。この URL をベースとして使用して、2 つの URL を作成してみましょう。1 つは、支払い要求 webhook (ngrok URL + `/api/update`) へのもので、もう 1 つは支払い完了 webhook (ngrok URL + `/api/complete`) へのものです。たとえば、上記の出力例から次の URL を使用します。

```
https://68cd84ed.ngrok.io/api/update
https://68cd84ed.ngrok.io/api/complete
```

> **注:**これらの URL がアクティブな状態に保たれるよう、ngrok を実行中のままにします。

これらのテスト用 URL を使用して、パートナー ダッシュボードの webhook URL を更新します。

![Payments in Outlook ダッシュボードにある webhook URL のスクリーンショット](readme-images/dashboard-webhooks.PNG)

## テスト用支払い要求メッセージの生成

自分宛にテスト メッセージを送信する手順については、「[Get started with Payments in Outlook](https://docs.microsoft.com/outlook/payments/get-started#send-the-test-payment-request)」 (Payments in Outlook の使用を開始する) を参照してください。

## 投稿

このプロジェクトは投稿や提案を歓迎します。
たいていの投稿には、投稿者のライセンス契約 (CLA) に同意することにより、投稿内容を使用する権利を Microsoft に付与する権利が自分にあり、実際に付与する旨を宣言していただく必要があります。
詳細については、[https://cla.microsoft.com](https://cla.microsoft.com) をご覧ください。

プル要求を送信すると、CLA を提供して PR を適切に修飾する (ラベル、コメントなど) 必要があるかどうかを CLA ボットが自動的に判断します。
ボットの指示に従ってください。
これを行う必要があるのは、Microsoft の CLA を使用するすべてのリポジトリに対して 1 回だけです。

このプロジェクトでは、[Microsoft Open Source Code of Conduct (Microsoft オープン ソース倫理規定)](https://opensource.microsoft.com/codeofconduct/)
が採用されています。詳細については、「[Code of Conduct の FAQ (倫理規定の FAQ)](https://opensource.microsoft.com/codeofconduct/faq/)」を参照してください。
また、その他の質問やコメントがあれば、[opencode@microsoft.com](mailto:opencode@microsoft.com) までお問い合わせください。
