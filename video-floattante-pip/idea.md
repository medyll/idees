# idea-VIDEO-FLOTTANTE-PIP

**Date initiale :** 2026-04-05  
**Dernière évolution :** 2026-04-05  
**Statut :** germination  
**Tags :** vidéo, PIP, picture-in-picture, flottant, UX, navigateur, application

## Description

Système de lecture vidéo persistante qui suit l'utilisateur à travers l'interface — la vidéo ne disparaît jamais quand on navigue ailleurs.

**Problème actuel :**
- Quand on démarre une vidéo et qu'on navigue ailleurs dans l'interface, la vidéo disparaît
- Perte de contexte — on regarde UNE vidéo à la fois, elle devrait rester visible
- Solution de contournement actuelle : ouvrir YouTube dans une web app séparée, la positionner manuellement au-dessus de la barre des tâches

**Concept :**
- **Pavé vidéo flottant** qui se trimballe automatiquement
- Positionné au-dessus du bouton de l'application concernée dans la barre des tâches
- Persistant à travers toute navigation dans l'interface
- Picture-in-picture (PIP) intelligent et contextuel

**UI/UX — Overlay vidéo :**

```
┌─────────────────────────┐
│   [VIDÉO]               │  ← Partie haute : vidéo seule
│   (devient transparente  │
│    au survol)           │
├─────────────────────────┤
│  ⏮ ⏯ ⏭ 🔊 ─────── ⏱  │  ← Partie basse : contrôles
└─────────────────────────┘
```

**Comportement clé :**
- **Conteneur unique** mais fond transparent
- **Partie haute** : la vidéo
- **Partie basse** : les contrôles (intégrés ou déportés)
- **Au survol de la souris sur la vidéo** : la vidéo devient très très transparente, mais **les contrôles restent visibles**
- **Astuce** : séparer vidéo et contrôles → comme ça, si on veut contrôler la vidéo, ça ne fait pas disparaître les contrôles
- **Usage** : quand on travaille, on peut voir derrière la vidéo tout en gardant l'accès aux contrôles

## Potentiel

- Satisfaction utilisateur enfin atteinte après "des années" de recherche
- Navigation fluide sans perdre le fil de la vidéo
- Multi-tâche naturel : travailler + regarder une vidéo simultanément
- Pourrait devenir un standard UX pour toute app avec contenu vidéo

## Questions ouvertes

- Architecture : système OS natif ou application-specific ?
- Le pavé suit-il l'application active ou est-il global ?
- Gestion de plusieurs vidéos simultanées (rare mais possible) ?
- Positionnement : automatique vs manuel vs hybride ?
- Intégration avec YouTube, Vimeo, lecteurs personnalisés ?
- Faut-il une web app dédiée ou intégrer dans chaque app concernée ?

## Connexions

[LATENT-LINE-VS-CAPCUT](latent-line-vs-capcut/idea.md) — édition vidéo, pourrait bénéficier de cette UX  
[MOTEUR-DASHBOARD](moteur-dashboard/idea.md) — dashboard pourrait intégrer ce lecteur  
[APP-MOBILE-GRID](app-mobile-grid/idea.md) — navigation mobile, concept similaire de persistance
