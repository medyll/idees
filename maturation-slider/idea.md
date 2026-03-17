# idea-MATURATION-SLIDER

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** UI, slider, timeline, idées, historique, réédition

## Description
Interface visuelle pour **idea-MATURATION** : un slider horizontal multiligne montrant la progression des idées dans le temps.

### Fonctionnement
- Chaque ligne = une idée
- Chaque position sur le slider = un état de l'idée dans le temps
- On peut **rééditer** un état passé → cela crée une "branche" qui corrige le flux d'idées suivant
- Comparable à un historique de document avec réécriture du futur

## Potentiel
Interface très puissante pour visualiser l'évolution de la pensée et "corriger le passé" d'une idée.

## Connexions
- Fait partie de **idea-MATURATION** (interface avancée, Phase 3+)

## Réflexion approfondie

La réécriture du passé est la fonctionnalité la plus radicale. Une analogie utile : git rebase. On ne détruit pas l'historique — on crée une ligne alternative qui "aurait pu exister". Les deux timelines coexistent, comme des branches git. L'utilisateur choisit quelle branche devient "canonical".

Format de données naturel : chaque état est un nœud dans un DAG (graphe acyclique dirigé), pas une liste linéaire. Le slider est une projection linéaire d'un DAG — la vue simplifiée du "chemin principal".

Connexion inattendue avec **TIMELINE-CATALOG** : le slider des idées et le catalog temporel de vocabulaire sont la même structure de données vue depuis deux angles — l'un track les états d'une idée, l'autre track les tags d'une session. Un composant unifié pourrait servir les deux.

## Questions ouvertes
- La réécriture d'un état passé crée une branche (DAG) ou écrase l'historique ?
- Comment représenter visuellement les fusions d'idées ? (deux branches qui convergent)
- Le slider est navigable au clavier ?
- Format de stockage : JSON avec structure DAG, ou rester en markdown linéaire (history.md) ?

## Connexions
- Fait partie de **idea-MATURATION** (interface avancée, Phase 3+)
- [TIMELINE-CATALOG](../timeline-catalog/idea.md) : même structure DAG temporelle, angles différents

## Historique
- 2026-03-03 : Idée initiale capturée. Intégrée comme sous-feature de idea-MATURATION
