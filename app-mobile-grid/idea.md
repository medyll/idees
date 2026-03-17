# idea-APP-MOBILE-GRID

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-17
**Statut :** mature
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

## Réflexion approfondie

La grille 2D cache une métaphore plus riche : **le temps (axe Y) vs les possibles (axe X)**. Chaque ligne horizontale est un "monde parallèle" d'une même étape. Ce n'est pas juste une navigation — c'est un modèle mental pour explorer des espaces de décision.

Connexion inattendue avec **SKILL-MEMOIRE** : la grille pourrait "oublier" les branches trop éloignées du chemin principal (pruning automatique des états peu visités), simulant une mémoire spatiale dégradante.

La question "qu'est-ce qui change légèrement dans le clone" trouve une réponse partielle : ce qui change c'est **un paramètre configuré au moment du swipe** (ex: choisir une variante A/B, une langue, un profil utilisateur). Le swipe droite = "essaie avec ce paramètre différent".

## Connexions

- **MATURATION** : l'UI mobile de Phase 5 pourrait utiliser cette navigation grille
- **SKILL-MEMOIRE** : pruning des branches peu visitées = mémoire spatiale dégradante
- **APP-PERSONNALITE** : l'axe X pourrait montrer des variantes de profil de personnalité

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
