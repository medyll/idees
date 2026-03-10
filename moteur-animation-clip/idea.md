# idea-MOTEUR-ANIMATION-CLIP

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-10
**Statut :** mature
**Tags :** CSS, clip-path, animation, moteur 2D, canvas

## Description
Un moteur d'animation 2D basé sur `clip-path`. Chaque forme, masque, transition est définie par des `clip-path` animés plutôt que par canvas ou SVG.

## Potentiel
Animations 100% CSS, GPU-accélérées, sans dépendance. Idéal pour interfaces riches, transitions de pages, reveals créatifs.

## Liens
- Inspiration : https://www.youtube.com/watch?v=oWXm5n-Zi38
- Connexion avec **idea-CSS-3D-LANGUAGE** : base commune sur clip-path

## Questions ouvertes
- API déclarative (data-attributes ?) ou JavaScript ?
- Quel format de timeline : JSON, CSS @keyframes enrichi ?
- Limitation : clip-path ne crée pas de layout, comment gérer les interactions ?

## Historique
- 2026-03-03 : Idée initiale capturée
