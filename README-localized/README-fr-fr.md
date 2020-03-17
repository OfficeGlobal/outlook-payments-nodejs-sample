---
page_type: sample
products:
- office
- office-365
- office-outlook
languages:
- javascript
description: "Il s’agit d’un exemple d’implémentation de la demande de paiement et de webhooks de paiement complet pour Paiements dans le service Outlook."
urlFragment: outlook-payments-sample
extensions:
  contentType: samples
  createdDate: "4/24/2018 7:43:42 AM"
---

# Exemple de Paiements Node.js du webhook dans Outlook

Il s’agit d’un exemple d’implémentation de la demande de paiement et de webhooks de paiement complet pour un service de [Paiements dans Outlook](https://docs.microsoft.com/outlook/payments/).

## Conditions préalables

Avant d’exécuter cet exemple, vous devez [inscrire dans le tableau de bord des Paiements dans Outlook](https://docs.microsoft.com/outlook/payments/partner-dashboard). vous devez disposer d’un compte de plateforme de connexion [Stripe](https://stripe.com/connect).

Vous devez également disposer de [Node.js](https://nodejs.org) et [NPM](https://www.npmjs.com/) installés.

## Exécution de l’exemple

1. Exécutez la commande suivante pour installer les dépendances :

    ```bash
    npm install
    ```

1. Exécutez l'exemple à l'aide de la commande suivante :

    ```bash
    npm start
    ```

## Utilisation de ngrok pour exécuter localement

Lorsque vous exécutez l’exemple localement, celui-ci est accessible via `http://localhost:3333`. Le service des Paiements doit être en mesure de contacter votre webhook à partir d’Internet, de sorte que l’exécution sur localhost ne fonctionnera pas. Toutefois, l’utilisation de [ngrok](https://ngrok.com/)vous permet de créer une adresse accessible publiquement qui peut contacter le localhost de manière temporaire.

Ouvrez une fenêtre d'invite de commandes ou un shell, puis exécutez la commande suivante :

```bash
ngrok http 3333 -host-header=localhost:3333
```

Les résultats doivent être similaires à ceci :

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

Copiez l’URL HTTPS de la deuxième entrée de `Transfert`. Dans la sortie ci-dessus, l’URL à copier est `https://68cd84ed.ngrok.io`. À l’aide de cette URL comme base, créez deux URL : l’une pour le webhook de demande de paiement (ngrok URL + `/API/update`), et l’autre pour le webhook de paiement complet (ngrok URL + `/API/complet`). Par exemple, si vous utilisez l’URL de l’exemple de sortie ci-dessus :

```
https://68cd84ed.ngrok.io/api/update
https://68cd84ed.ngrok.io/api/complete
```

> **Remarque** : Conservez ngrok en cours d’exécution afin que ces URL restent actives.

Mettez à jour vos URL de webhook dans le tableau de bord du partenaire avec ces URL à des fins de test.

![Capture d’écran des URL webhook dans le tableau de bord Paiements dans Outlook](readme-images/dashboard-webhooks.PNG)

## Génération d’un test de message de demande de paiement

Voir [Prise en main des Paiements dans Outlook](https://docs.microsoft.com/outlook/payments/get-started#send-the-test-payment-request) pour connaître la procédure d’envoi d’un message de test à vous-même.

## Contribution

Ce projet autorise les contributions et les suggestions.
Pour la plupart des contributions, vous devez accepter le Contrat de licence de contributeur (CLA, Contributor License Agreement) stipulant que vous êtes en mesure, et que vous vous y engagez, de nous accorder les droits d’utiliser votre contribution.
Pour plus d’informations, visitez[ https://cla.microsoft.com](https://cla.microsoft.com).

Lorsque vous soumettez une demande de tirage, un robot CLA détermine automatiquement si vous devez fournir un CLA et si vous devez remplir la demande de tirage appropriée (par exemple, étiquette, commentaire).
Suivez simplement les instructions données par le robot.
Vous ne devrez le faire qu’une seule fois au sein de tous les référentiels à l’aide du CLA.

Ce projet a adopté le [Code de conduite Open Source de Microsoft](https://opensource.microsoft.com/codeofconduct/).
Pour en savoir plus, reportez-vous à la [FAQ relative au Code de conduite](https://opensource.microsoft.com/codeofconduct/faq/)
ou contactez [opencode@microsoft.com](mailto:opencode@microsoft.com) pour toute question ou tout commentaire.
