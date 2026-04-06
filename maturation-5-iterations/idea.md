# idea-MATURATION-5-ITERATIONS

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04  
**Statut :** germination  
**Tags :** maturation, itérations, cron, workflow, notification

## Description

**Workflow de maturation en 5 itérations minimum** avant génération du BMAD final.

**Principe :**
Pour un projet simple/tranquille, la maturation lance au moins 5 itérations d'idéation espacées dans le temps (cron programmé). Après les 5 itérations → génère le BMAD final.

**Séquentiel, pas parallèle.**

## Workflow

```
Idée capturée
    ↓
Itération 1 (cron J+0)
    ↓
Itération 2 (cron J+1)
    ↓
Itération 3 (cron J+2)
    ↓
Itération 4 (cron J+3)
    ↓
Itération 5 (cron J+4)
    ↓
Génération BMAD final
    ↓
Notification WhatsApp + App Android
    ↓
BMAD disponible dans IDAE-DASHBOARD
```

## Notification BMAD prêt

**Quand BMAD est finalisé :**
1. Notification WhatsApp (pour commencer)
2. Plus tard : notification dans l'app Android (style Facebook/Messenger)
3. Annonce : "1 BMAD prêt à consulter pour implémentation"

## À implémenter

- [ ] Cron pour les 5 itérations (espacées de 24h ?)
- [ ] Notification WhatsApp à la fin
- [ ] Future notification app Android (comme Messenger)
- [ ] Annonce dans dashboard

## Questions ouvertes

- Quel intervalle entre les itérations ? (24h, 48h, configurable ?)
- Comment détecter qu'un projet est "simple/tranquille" vs complexe ?
- Faut-il un minimum d'itérations ou un maximum ?
- Comment gérer les idées qui nécessitent moins de 5 itérations ?

## Connexions

[MATURATION-BMAD-AUTO](maturation-bmad-auto/idea.md) — génère le BMAD après les 5 itérations  
[AGENT-INBOX-MATURATION](agent-inbox-maturation/idea.md) — système de capture  
[IDAE-ANDROID-CAPTURE](idae-android-capture/idea.md) — app pour notifications
