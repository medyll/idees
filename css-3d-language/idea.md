# idea-CSS-3D-LANGUAGE

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** CSS, 3D, moteur, langage, HTML, héritage

## Description
Inventer un langage CSS 3D réel pour un moteur 3D, en héritant des règles CSS (cascade, héritage, sélecteurs) et en y ajoutant :
- Des propriétés 3D natives (depth, z-axis, material, light-source…)
- Un mécanisme de **parentalité** basé sur la hiérarchie HTML (sans équivalent CSS actuel)
- Un moteur 3D qui se nourrit directement de la structure DOM

## Potentiel
Démocratiser la 3D sur le web sans Three.js ni WebGL brut. Un CSS-3D déclaratif serait aussi révolutionnaire que CSS lui-même l'a été pour le HTML.

## Sous-problèmes identifiés

- **Le problème de la lumière** : CSS 2D n'a pas de notion de source lumineuse. Un CSS-3D doit définir `light-source: point(x,y,z)` ou `light-source: directional(...)` — et ce concept doit cascader dans le DOM.
- **Collision et physique** : CSS ne gère pas les collisions. Doit-on les inclure (opt-in via `physics: rigid`) ou rester purement déclaratif/visuel ?
- **Sélecteurs 3D** : comment sélectionner "tous les éléments dont la face avant fait face à la caméra" ? Un nouveau pseudo-sélecteur `:facing-camera` serait révolutionnaire.
- **Relation avec WebGPU** : le moteur sous-jacent doit utiliser WebGPU (pas WebGL) pour rester aligné sur les standards modernes.

## Connexion inattendue

CSS-3D-LANGUAGE + MOTEUR-ANIMATION-CLIP forment deux couches d'un même système : CLIP gère les formes 2D animées, CSS-3D ajoute la profondeur. On pourrait imaginer que CSS-3D **compile** les scènes 3D en clip-path 2D projetés pour les navigateurs sans WebGPU (fallback gracieux).

## Questions ouvertes
- Rendu via WebGL / WebGPU en arrière-plan ?
- Quel format de fichier : `.c3d` ? Extension `.css` avec at-rules spéciales (`@3d-scene`, `@light`) ?
- La parentalité : comment exprimer "cet objet 3D est enfant physique de son parent HTML" ?
- Faut-il un fallback 2D automatique (projection orthographique) pour l'accessibilité ?

## Liens
- Inspiration : `clip-path` CSS → https://www.youtube.com/watch?v=oWXm5n-Zi38

## Historique
- 2026-03-03 : Idée initiale capturée
