# idea-SKILL-EXPLORER

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** skill, navigation, liens, explorateur, graph

## Description
Un explorateur de skills avec navigation dans les liens entre skills. Interface pour visualiser et naviguer les connexions entre skills, comme un graphe de dépendances interactif.

## Potentiel
Découverte naturelle des skills disponibles, visualisation des relations, onboarding pour nouveaux utilisateurs.

## Réflexion approfondie

La vraie valeur de SKILL-EXPLORER est la **navigabilité du graphe de dépendances de skills**. Pas juste "voir les skills disponibles" — mais comprendre "si j'utilise SKILL-MEMOIRE, quels autres skills s'activent ou sont recommandés ?"

Format de graphe adapté : force-directed (D3.js ou Cytoscape), où les nœuds sont les skills et les arêtes sont typées (dépend-de, complète, conflicte-avec). Le degré de connexion d'un skill = sa criticité dans l'écosystème.

Connexion inattendue avec **AGENTS-REGISTRY** : les agents pourraient être déclarés comme des skills composites dans SKILL-EXPLORER — un agent = un nœud qui agrège plusieurs skills. L'explorateur devient alors un explorateur d'agents+skills unifié.

## Questions ouvertes
- Vue graph force-directed ou vue hiérarchique (DAG) ?
- Les liens sont déclarés dans le SKILL.md ou inférés par LLM en analysant le contenu ?
- Intégré à l'IDE (extension VS Code) ou standalone (app web locale) ?
- Les skills conflictuels (mutuellement exclusifs) sont-ils représentés ?

## Connexions
- [AGENTS-REGISTRY](../agents-registry/idea.md) : les agents comme nœuds composites dans le graphe de skills
- [MATURATION](../maturation/idea.md) : les idées de MATURATION pourraient aussi être des nœuds navigables

## Historique
- 2026-03-03 : Idée initiale capturée
