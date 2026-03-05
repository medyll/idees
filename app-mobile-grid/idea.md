# idea-APP-MOBILE-GRID

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-03
**Statut :** germination
**Tags :** mobile, UX, navigation, grille

## Description

L'utilisateur navigue dans un espace en deux dimensions :

- **Axe horizontal (droite)** — Clone de l'écran courant avec un changement léger. Idée de "variante", de fork de contexte. Cela peut servir à comparer des configurations, des résultats, des versions d'un même objet.
- **Axe vertical (bas)** — Progression dans un flux linéaire. Étape suivante, prochaine action, suite logique.

La navigation gauche/haut serait donc le retour en arrière dans ces deux dimensions.

## Potentiel

Interface très naturelle pour des flows complexes avec des bifurcations. Adapté aux apps de configuration, de comparaison, de wizard multi-étapes avec variantes.

## Implémentation envisagée

- Geste de swipe natif (React Native / Flutter)
- État global de la grille : position `[x, y]` + snapshots des écrans visités
- Transition animée type carte qui glisse
- Le clone (axe X) hérite de l'état de l'écran parent avec un delta paramétrable
- La profondeur de grille peut être limitée (ex: 3x5) ou infinie avec lazy-loading

## Questions ouvertes

- Qu'est-ce qui "change légèrement" dans le clone ? Paramètre utilisateur ? Variation IA ?
- Est-ce une navigation générale ou spécifique à un domaine (ex: éditeur, comparateur) ?
- Le retour arrière (gauche/haut) détruit ou conserve l'état ?
- Y a-t-il une vue "carte" pour voir où on est dans la grille ?

## Connexions

Lien avec **MATURATION** : l'UI mobile de Phase 5 pourrait utiliser cette navigation grille.

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
