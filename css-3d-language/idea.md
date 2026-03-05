# idea-CSS-3D-LANGUAGE

**Date initiale :** 2026-03-03
**Statut :** germination
**Tags :** CSS, 3D, moteur, langage, HTML, héritage

## Description
Inventer un langage CSS 3D réel pour un moteur 3D, en héritant des règles CSS (cascade, héritage, sélecteurs) et en y ajoutant :
- Des propriétés 3D natives (depth, z-axis, material, light-source…)
- Un mécanisme de **parentalité** basé sur la hiérarchie HTML (sans équivalent CSS actuel)
- Un moteur 3D qui se nourrit directement de la structure DOM

## Potentiel
Démocratiser la 3D sur le web sans Three.js ni WebGL brut. Un CSS-3D déclaratif serait aussi révolutionnaire que CSS lui-même l'a été pour le HTML.

## Questions ouvertes
- Rendu via WebGL / WebGPU en arrière-plan ?
- Quel format de fichier : `.c3d` ? Extension `.css` avec at-rules spéciales ?
- La parentalité : comment exprimer "cet objet 3D est enfant physique de son parent HTML" ?

## Liens
- Inspiration : `clip-path` CSS → https://www.youtube.com/watch?v=oWXm5n-Zi38

## Historique
- 2026-03-03 : Idée initiale capturée
