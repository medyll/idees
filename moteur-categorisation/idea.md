# idea-MOTEUR-CATEGORISATION

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** ontologie, catégorisation, arborescence, graph, datagramme, slider

## Description
Un moteur de catégorisation du monde : tout ce qui a un nom appartient à une catégorie dans une hiérarchie globale.

### Structure
- Chaque nœud a : un nom, une catégorie parente, des champs de définition (universels)
- On peut générer une arborescence mondiale à partir de **n'importe quel nœud**
- Vues disponibles :
  - **Arborescence** (tree view)
  - **Datagramme** (relations entre entités)
  - **Slider horizontal + vertical** (navigation spatiale dans la hiérarchie)

## Potentiel
Ontologie universelle navigable. Wikipedia structuré. Base pour un moteur de recherche sémantique, un jeu, un outil éducatif.

## Réflexion approfondie

La tension "plate vs arborescente" se résout par une approche hybride : **graphe avec racines multiples**. Un "chat" peut être à la fois dans la hiérarchie "animal → mammifère → félidé" et dans "domestique → animal de compagnie". Ce n'est pas une arborescence stricte — c'est un DAG d'ontologies.

Question résolue (partielle) : **héritage des champs**. Oui, un animal hérite des champs "être vivant" (respire, métabolisme, reproduction), et peut ajouter les siens (espèce, habitat). C'est exactement le modèle prototypal JavaScript — pas besoin de réinventer.

Connexion inattendue avec **SKILL-MEMOIRE** : la catégorisation d'un souvenir suit exactement ce schéma — un souvenir appartient à plusieurs hiérarchies (lieu, personne, émotion, date). MOTEUR-CATEGORISATION pourrait être le backend d'indexation de SKILL-MEMOIRE.

Connexion avec **APP-PERSONNALITE** : les traits de personnalité (Big Five : extraversion, ouverture...) sont une ontologie navigable — MOTEUR-CATEGORISATION en serait la couche de structure.

## Questions ouvertes
- La hiérarchie est-elle plate (tags) ou DAG (graphe avec racines multiples) ?
- Héritage des champs : modèle prototypal (chaque nœud hérite et peut surcharger) ?
- Données source : Wikidata pour bootstrap, puis édition manuelle ?
- Interface : arborescence collapsible + datagramme force-directed + slider = 3 vues du même graphe ?

## Connexions
- [MATURATION](../maturation/idea.md) : organiser les idées en graphe ontologique
- [SKILL-MEMOIRE](../skill-memoire/idea.md) : backend d'indexation pour les souvenirs multi-catégories
- [APP-PERSONNALITE](../app-personnalite/idea.md) : taxonomie des traits de personnalité

## Historique
- 2026-03-03 : Idée initiale capturée
