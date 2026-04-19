# Setup Email Connectors

## 1. Installer les dépendances

```bash
cd D:\boulot\dev\maturation\email-connectors
npm install
```

## 2. Configurer les comptes

Copier `config.example.json` vers `config.json` :

```bash
copy config.example.json config.json
```

### Gmail (2 comptes)

**Compte 1 :**
1. Aller sur https://myaccount.google.com/apppasswords
2. Créer un mot de passe d'application
3. Dans `config.json` :
```json
{
  "gmail": [
    {
      "enabled": true,
      "email": "ton.email1@gmail.com",
      "password": "mot-de-passe-application-1"
    },
    {
      "enabled": true,
      "email": "ton.email2@gmail.com",
      "password": "mot-de-passe-application-2"
    }
  ]
}
```

**Compte 2 :** Même procédure, 2ème mot de passe app.

### Outlook / Live.fr (2 comptes)

**Compte 1 (ex: mydde@live.fr) :**
1. Aller sur https://account.microsoft.com/security
2. Activer IMAP : Settings → Mail → Sync email → "POP and IMAP"
3. Dans `config.json` :
```json
{
  "outlook": [
    {
      "enabled": true,
      "email": "mydde@live.fr",
      "password": "ton-mot-de-passe-microsoft"
    },
    {
      "enabled": true,
      "email": "ton.email2@live.fr",
      "password": "ton-mot-de-passe-2"
    }
  ]
}
```

**IMAP Settings pour Live.fr/Outlook.com :**
- Host: `outlook.office365.com`
- Port: `993`
- TLS: `true`

### Proton (optionnel, compte payant requis)

Skip si compte gratuit (pas d'IMAP).

## 3. Tester

```bash
npm test
```

## 4. Utiliser dans OpenClaw

```javascript
const {
  MultiGmailConnector,
  MultiOutlookConnector
} = require('./email-connectors');

// Gmail (2 comptes)
const gmail = new MultiGmailConnector(config.gmail);
await gmail.connectAll();
const emails = await gmail.fetchAllUnread(10);

// Outlook (2 comptes)
const outlook = new MultiOutlookConnector(config.outlook);
await outlook.connectAll();
const outlookEmails = await outlook.fetchAllUnread(10);

// Déconnexion
gmail.disconnectAll();
outlook.disconnectAll();
```
