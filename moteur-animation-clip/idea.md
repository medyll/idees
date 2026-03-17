# idea-MOTEUR-ANIMATION-CLIP

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** CSS, clip-path, animation, moteur 2D, canvas

## Description
Un moteur d'animation 2D basé sur `clip-path`. Chaque forme, masque, transition est définie par des `clip-path` animés plutôt que par canvas ou SVG.

## Potentiel
Animations 100% CSS, GPU-accélérées, sans dépendance. Idéal pour interfaces riches, transitions de pages, reveals créatifs.

## Liens
- Inspiration : https://www.youtube.com/watch?v=oWXm5n-Zi38
- Connexion avec **idea-CSS-3D-LANGUAGE** : base commune sur clip-path

## Réflexion approfondie

La limitation "clip-path ne crée pas de layout" est en fait une **liberté** : le moteur peut superposer des éléments absolus sans perturber le flux, comme un canvas CSS. Les interactions (clics, hover) se gèrent avec `pointer-events` sur des overlays invisibles qui correspondent aux zones clip-path.

Format de timeline naturel : les CSS `@keyframes` enrichis avec des propriétés custom (`--clip-state: polygon(...)`) — cela permet d'utiliser le moteur d'animation CSS natif (GPU) sans recoder un scheduler.

Connexion inattendue avec **CSS-3D-LANGUAGE** : ce moteur 2D clip-path pourrait être le **compilateur de sortie** de CSS-3D — la scène 3D est calculée côté CPU et rendue comme une série de clip-paths projetés.

## Questions ouvertes
- API déclarative (data-attributes ?) ou JavaScript pur ?
- Quel format de timeline : JSON déclaratif ou CSS `@keyframes` enrichis ?
- Limitation : clip-path ne crée pas de layout — gérer les interactions via overlays `pointer-events` ?
- Ce moteur est-il la cible de rendu de CSS-3D-LANGUAGE ?

## Connexions
- [CSS-3D-LANGUAGE](../css-3d-language/idea.md) : pourrait être le backend de rendu 2D de CSS-3D

## Historique
- 2026-03-03 : Idée initiale capturée
