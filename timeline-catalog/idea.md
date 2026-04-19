# idea-TIMELINE-CATALOG

**Date initiale :** 2026-03-06
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** timeline, index, vocabulary, tags, redondance, temporal-index

## Description

Un index temporel qui capture l'**évolution du vocabulaire (tags, mots-clés) au fil du temps** avec un **score de redondance textuelle**. À intervalles réguliers (tous les 10 minutes, tous les N interactions), on snapshot la liste des tags/vocabulaire utilisés et on mesure à quel point c'est redondant avec le snapshot précédent.

**Cas d'usage** :
- Surveiller comment le vocabulaire **converge ou diverge** au cours d'une session de travail
- Détecter les **patterns de réutilisation** (mêmes tags reviendront-ils ?)
- Voir l'**évolution du focus** : des tags disparaissent, d'autres émergent
- Fournir une **timeline visuelle** du parcours sémantique

**Exemple** :
```
10:00 → [agent, registry, execution-status, database] | redondance: 0%
10:10 → [agent, registry, distributed, monitoring] | redondance: 50% (agent + registry persistent)
10:20 → [agent, monitoring, heartbeat, resilience] | redondance: 40% (agent + monitoring)
10:30 → [resilience, failover, replication, consensus] | redondance: 10% (quasi nouvelle direction)
```

## Potentiel

- **Analyse de mémoire sémantique** : comment le vocabulaire d'un agent évolue suggère où va sa réflexion
- **Intégration SKILL-MEMOIRE** : la redondance des tags = signal de ce qui reste en "mémoire active"
- **Détection de divergence cognitive** : quand la redondance tombe drastiquement, le focus change radicalement
- **Historique du vocabulaire** : permet de revenir à "comment on parlait des choses il y a 30 min ?"
- **Compression sémantique** : plus la redondance monte, plus on compresse l'espace des idées

## Questions ouvertes

- **Granularité temporelle** : Tous les 10 min ? Tous les N interactions ? Adaptive ?
- **Calcul de redondance** : Jaccard index simple ? Cosine similarity sur embeddings ? BM25 ?
- **Persistence** : Faut-il garder toute la timeline ou seulement des snapshots clés ?
- **Tags vs vocabulaire** : On track seulement les tags explicites ou tout mot significatif ?
- **Normalisation** : "agents" vs "agent" = même ? Doit-on lemmatizer ?
- **Signaux d'alertes** : À quel score de redondance on dit "attention, tu tournes en rond" ?
- **Visualisation** : Comment montrer cette timeline ? Graphe temporel ? Heatmap ?

## Réflexion approfondie

Question résolue : **calcul de redondance**. Jaccard index (`|A∩B| / |A∪B|`) est parfait pour les ensembles de tags — simple, interprétable, sans modèle. Si on veut plus de nuance (synonymes, variations morphologiques), on ajoute un second calcul cosine sur embeddings des tags, mais Jaccard est suffisant pour la détection de "tournage en rond".

Question résolue : **granularité**. Adaptive est la bonne réponse : on snapshot quand il y a changement significatif (`delta_Jaccard > 0.3`) plutôt qu'à intervalles fixes. Cela donne une résolution naturelle — beaucoup de snapshots pendant les moments de transition, peu pendant les phases stables.

**Signal d'alerte** résolu : si la redondance reste > 80% pendant 3 snapshots consécutifs, on notifie "tu sembles explorer le même espace depuis un moment — veux-tu un angle différent ?"

## Connexions

- [SKILL-MEMOIRE](../skill-memoire/idea.md) : La redondance des tags = signal de mémoire active
- [MATURATION](../maturation/idea.md) : Tracker l'évolution sémantique des idées dans le système
- [AGENTS-REGISTRY](../agents-registry/idea.md) : Chaque agent enregistré a son propre TIMELINE-CATALOG
- [MATURATION-SLIDER](../maturation-slider/idea.md) : même structure DAG temporelle, vues complémentaires
