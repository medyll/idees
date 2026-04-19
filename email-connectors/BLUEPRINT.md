# BLUEPRINT — EMAIL-CONNECTORS

**Statut :** 🌱 En cours | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Connecteurs email unifiés (Gmail, Outlook, Proton) pour lire, trier, résumer, draft des réponses et organiser automatiquement.

---

## 📦 MVP
- [ ] Connecteur Gmail (OAuth2)
- [ ] Connecteur Outlook (Graph API)
- [ ] Connecteur Proton (Proton Bridge IMAP)
- [ ] Lecture/tri emails entrants
- [ ] Résumé des threads importants
- [ ] Draft réponses (validation requise)
- [ ] Alertes emails urgents

**Stack :** Node.js | imap | oauth2-client | @proton/mail

---

## 🔧 Core

### Architecture
```typescript
interface EmailProvider {
  connect(): Promise<void>;
  listInbox(options: ListOptions): Promise<Email[]>;
  getThread(id: string): Promise<Thread>;
  draftReply(threadId: string, content: string): Promise<void>;
  markAsRead(ids: string[]): Promise<void>;
  move(ids: string[], folder: string): Promise<void>;
}

// Providers: GmailProvider, OutlookProvider, ProtonProvider
```

### Proton Bridge
```
Proton Mail → Proton Bridge (localhost:1143) → IMAP client
```

---

## 📅 Roadmap
1. **Semaine 1** : Gmail IMAP + OAuth2
2. **Semaine 2** : Outlook Graph API
3. **Semaine 3** : Proton Bridge + résumé LLM

---

## 🚀 Setup
```bash
mkdir email-connectors && cd email-connectors
npm install imap oauth2-client nodemailer
```

**Prochaine action :** Configurer OAuth2 Gmail et tester connexion IMAP.
