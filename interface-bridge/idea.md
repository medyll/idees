# idea-INTERFACE-BRIDGE

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** LLM, interopérabilité, prompt, API, interfaces

## Description

Un programme piloté par prompt qui prend deux interfaces incompatibles en entrée et produit automatiquement une interface de compatibilité avec méthodes, mapping et documentation.

Le problème : deux systèmes ont des interfaces différentes et on veut les faire communiquer sans les modifier. Le programme :

1. Reçoit en entrée les deux interfaces (OpenAPI spec, TypeScript types, JSON schema, etc.) + des détails métier
2. Un LLM analyse les deux côtés, identifie les correspondances, les conflits, les transformations nécessaires
3. Il produit une interface "glue" : méthodes de transformation, adaptateurs, DTOs, documentation
4. L'ensemble du programme est lui-même piloté par un prompt maître modifiable

L'idée clé : **le prompt EST le programme**. On peut changer le comportement du bridge en changeant le prompt, sans toucher au code.

## Potentiel

Colle universelle entre systèmes. Particulièrement utile pour les migrations legacy, les intégrations rapides, ou les ponts entre SDK incompatibles.

## Implémentation envisagée

- Input : fichiers d'interface (JSON, TypeScript, YAML) + prompt de contexte métier
- Prompt maître : décrit le style de sortie (langage cible, conventions, niveau de détail)
- LLM chain : analyse → mapping → génération → documentation
- Output : fichier d'interface généré + doc Markdown + rapport de conflits non résolus
- Possible intégration CI/CD pour regénérer l'adaptateur à chaque changement d'interface

## Questions ouvertes

- Quels formats d'interface en entrée ? (OpenAPI, TypeScript, Protobuf, GraphQL…)
- Quel(s) langage(s) de sortie cible ?
- Comment gérer les ambiguïtés de mapping que le LLM ne peut pas résoudre seul ?
- Le prompt maître est-il versionné ? Partageable entre équipes ?
- Le prompt maître définit quoi exactement ? Les règles de nommage ? La stratégie de mapping ?
- Est-ce qu'on valide la compatibilité générée par des tests automatiques ?

## Réflexion approfondie

La question "comment gérer les ambiguïtés que le LLM ne peut pas résoudre seul" trouve une réponse : le programme doit produire un **rapport de conflits non résolus** avec questions ciblées à l'humain. L'humain répond une fois, le LLM mémorise la règle de décision → le système apprend les conventions métier au fil des usages.

C'est un système à trois modes : **automatique** (mapping clair), **assisté** (LLM propose, humain valide), **manuel** (conflit trop ambigu). Le prompt maître définit quel mode s'applique selon la confiance du LLM.

Connexion inattendue avec **SKILL-MEMOIRE** : les décisions de mapping passées (y compris les arbitrages humains) seraient stockées dans une mémoire dégradante — les conventions récentes sont fraîches, les anciennes se résument à des règles générales.

## Connexions

- Philosophie partagée avec **IDEAX** : "le prompt est le programme"
- [MONGO-GROUPBY](../mongo-groupby/idea.md) : pourrait générer l'adaptateur MongoDB automatiquement
- [SKILL-MEMOIRE](../skill-memoire/idea.md) : stocker les décisions de mapping comme mémoire dégradante

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
