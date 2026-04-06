# Email Connectors

Connecteurs email pour Gmail, Outlook, Proton.

## Structure

```
email-connectors/
├── src/
│   ├── gmail.js      # Gmail connector (IMAP/OAuth2)
│   ├── outlook.js    # Outlook connector (IMAP/Graph API)
│   ├── proton.js     # Proton connector (Bridge IMAP)
│   └── index.js      # Export unifié
├── config.json       # Config des comptes
└── README.md         # Setup instructions
```

## Setup

### Gmail
1. Activer IMAP dans Gmail Settings
2. Créer credentials OAuth2 (Google Cloud Console)
3. Ajouter à config.json

### Outlook
1. Activer IMAP dans Outlook Settings
2. Ou créer app registration (Azure AD)
3. Ajouter à config.json

### Proton
1. Installer Proton Bridge
2. Lancer Proton Bridge
3. Utiliser les credentials IMAP locaux

## Usage

```javascript
const { GmailConnector, OutlookConnector, ProtonConnector } = require('./email-connectors');

const gmail = new GmailConnector(config.gmail);
await gmail.connect();
const emails = await gmail.fetchUnread();
```
