# idea-VOICE-INTERFACE-HISTORIQUE

**Date initiale :** 2026-04-05  
**Dernière évolution :** 2026-04-05  
**Statut :** germination  
**Tags :** voice, TTS, STT, interface, historique, maturation, mobile

## Description

Interface de capture vocale pour la maturation avec affichage type **inbox** — un panneau latéral ou fenêtre qui affiche l'historique complet des entrées vocales, non vidé, consultable en temps réel.

**Concept :**
- **Point d'entrée vocal** : bouton ou interface pour parler (comme dans l'app mobile)
- **Affichage inbox** : panneau qui liste tout ce qui a été dit, sans effacement automatique
- **Consultation simultanée** : pouvoir parler ET voir l'historique en même temps
- **Lien avec maturation** : chaque entrée vocale peut devenir une idée, un commentaire, ou une évolution d'idée existante

**Évolution depuis TTS Bouton Voice :**
Le projet standalone "TTS Bouton Voice" est **annulé** — l'application mobile OpenClaw Android remplit déjà une grande partie des besoins (capture vocale, STT, TTS). Reste à créer l'interface de consultation avec historique persistant.

## Potentiel

- Remplacer la saisie texte pour la maturation d'idées (plus naturel, plus rapide)
- Historique consultable = mémoire externe de toutes les réflexions
- Interface unifiée : parler → voir → organiser → maturer
- Synchronisation avec l'app mobile (même backend de capture)

## Questions ouvertes

- Quelle interface ? (desktop app, web app, extension navigateur, widget flottant ?)
- Comment structurer l'historique ? (timeline, liste filtrable, recherche full-text ?)
- Faut-il une transcription en temps réel ou différée ?
- Comment lier une entrée vocale à une idée existante dans maturation ?
- Quelle stack technique ? (Electron, Tauri, web pur avec PWA ?)

## Connexions

[IDAEO-ANDROID-CAPTURE](idae-android-capture/idea.md) — capture mobile existante  
[MATURATION](maturation/idea.md) — système de destination des idées  
[MOTEUR-DASHBOARD](moteur-dashboard/idea.md) — pourrait intégrer cette interface  
[SKILL-MEMOIRE](skill-memoire/idea.md) — mémoire dégradante, concept similaire
