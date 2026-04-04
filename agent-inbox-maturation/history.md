# Full History — idea-AGENT-INBOX-MATURATION

---

## [2026-04-04 04:55] — Capture initiale

**Trigger :** Spécification utilisateur via chat WhatsApp/OpenClaw

Système de capture d'idées via un fichier inbox unique (`inbox-maturation.md`) qui centralise tous les fragments d'idées provenant de multiples sources (chat OpenClaw, autres systèmes, saisie manuelle).

**Architecture :**
- **Fichier unique** : `inbox-maturation.md` avec séparateur vertical entre chaque idée
- **Métadonnées** : chaque entrée inclut la date de capture
- **Trigger** : déclenchement automatique à chaque modification du fichier (pas de cron polling)
- **Agent de traitement** : lit l'inbox, vérifie les doublons, détecte les connexions, crée/met à jour les idées dans `D:\boulot\dev\maturation\`
- **Auto-nettoyage** : l'agent maintient l'intégrité du fichier (regroupe les topics proches, corrige orthographe, fusionne les fragments similaires)

**Flux :**
```
Fragment idée → inbox-maturation.md → Trigger → Agent traite → 
Vérifie idea-index.md → Crée/met à jour [code]/idea.md + history.md → 
Nettoie inbox (regroupe, déduplique)
```

**Spécifications détaillées :**
- Séparateur vertical spécifique au fichier MD
- Date incluse pour chaque fragment
- Agent capable de maintenir l'intégrité du fichier
- Correction orthographe automatique
- Regroupement des topics proches
- Fusion des fragments similaires
- Respect de la philosophie maturation (sauvegarde historique, idea.md + history.md)
- Fichier accessible à l'endroit original (D:\boulot\dev\maturation\)

**Connexions identifiées :**
- MATURATION (système source)
- AGENTS-REGISTRY (registre d'agents)
- MOTEUR-DASHBOARD (autre idée du jour)
