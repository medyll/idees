# idea-IDAE-ANDROID-CAPTURE

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04  
**Statut :** germination  
**Tags :** android, app, capture, bouton, notification, mobile, IDAE

## Description

**Application Android avec bouton flottant pour capture maturation directe.**

## Vision IDAE

IDAE = écosystème d'applications finales (comme OpenClaw)
- Propre écosystème interconnecté
- Applications mobiles et desktop
- Interopérabilité entre apps

## Problème actuel

- Capture maturation passe par WhatsApp
- WhatsApp ne supporte pas HTML / riche
- Pas assez accessible / direct
- "Ça me gêne beaucoup que WhatsApp ne soit pas capable de me montrer du HTML"

## Solution : App Android "Bouton"

### Phase 1 — MVP

- Application Android simple
- **Un bouton toujours présent** (overlay / floating button)
- Toujours accessible depuis n'importe quelle app
- Au clic : ouvre interface de capture maturation
- Capture possible par :
  - Texte libre
  - Vocal
  - Photo
  - Partage depuis autre app (share intent)
- Dépose directement dans `capture-maturation.md`

### Phase 2 — Plus tard

- Notifications push (freins de notification)
- Historique local des captures
- Sync avec le dashboard
- Notifications style Facebook/Messenger

## Pourquoi c'est important

- Accès rapide = plus de captures
- Contourne les limites WhatsApp (pas de HTML)
- Premier pas vers l'écosystème IDAE mobile
- Réduit la friction de capture

## Questions ouvertes

- Quelle tech Android ? (Kotlin, Flutter, React Native ?)
- Comment implémenter le bouton flottant (overlay permission) ?
- Comment sync avec `capture-maturation.md` (local file ou cloud) ?
- Faut-il une auth ou c'est ouvert ?

## Connexions

[AGENT-INBOX-MATURATION](agent-inbox-maturation/idea.md) — système de capture actuel  
[IDAE-MACHINE-COEUR](idae-machine-coeur/idea.md) — socle technique  
[MATURATION-5-ITERATIONS](maturation-5-iterations/idea.md) — recevra les notifications  
[MOTEUR-DASHBOARD](moteur-dashboard/idea.md) — dashboard qui sync avec l'app
