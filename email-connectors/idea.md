# idea-EMAIL-CONNECTORS

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04  
**Statut :** en cours  
**Tags :** email, connecteur, Gmail, Outlook, Proton, IMAP, OAuth

## Description

**Connecteurs email pour Gmail, Microsoft/Outlook, Proton.**

**Capacités requises :**
- Lire/trier les emails entrants
- Résumer les threads importants
- Draft des réponses (pour validation)
- Alertes sur emails urgents
- Organisation automatique (labels, dossiers)

## Implémentation

| Fournisseur | Méthode |
|-------------|---------|
| **Gmail** | IMAP ou API OAuth2 |
| **Microsoft/Outlook** | IMAP ou Graph API |
| **Proton** | Proton Bridge (IMAP local) |

## Statut

**Ready à configurer** (depuis memory/2026-04-04.md)

**Priorité :** 🔴 Urgent

## Connexions

[AGENT-INBOX-MATURATION](agent-inbox-maturation/idea.md) — les emails importants peuvent alimenter maturation  
[VOICE-MOBILE](voice-mobile/idea.md) — notifications vocales pour emails urgents
