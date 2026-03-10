# idea-AGENTS-REGISTRY

**Date initiale :** 2026-03-05
**Dernière évolution :** 2026-03-10
**Statut :** mature
**Tags :** agent, registry, execution-status, database, distributed

## Description

Système permettant aux agents logiciels de se déclarer eux-mêmes dans un registre centralisé et de rapporter en temps réel leur statut d'exécution. Chaque agent peut :
- **S'enregistrer** avec un identifiant unique et des métadonnées (nom, version, capacités)
- **Signaler son statut** : idle, running, paused, failed, completed
- **Enregistrer des logs** et des résultats d'exécution
- **Notifier de changements d'état** aux autres agents ou observateurs

Le registre peut être stocké soit dans :
- **Un fichier JSON/YAML partagé** (mode simple, pour prototypage ou petit nombre d'agents)
- **Une base de données** (mode scalable, pour production multi-agents)

## Potentiel

- **Intégration MATURATION** : Les agents de maturation pourraient se déclarer et signaler leur progression
- **Orchestration multi-agents** : Permettre aux agents de se découvrir et communiquer
- **Monitoring** : Visualiser l'état de tous les agents en temps réel
- **Résilience** : Reprendre où un agent s'est arrêté après un crash
- **Cas d'usage futur** : Phase 4-5 de MATURATION (CLI/React/Electron/Mobile) nécessiteront plusieurs agents coordonnés
- **Audit et traçabilité** : Historique complet de ce que chaque agent a fait

## Questions ouvertes

- Doit-on privilégier le **fichier partagé** ou la **base de données** dès le départ ? (tradeoff : simplicité vs scalabilité)
- Quel format de métadonnées d'agent ? (nom, version, type, capacités, endpoint de communication)
- Comment gérer les **conflits d'accès concurrent** au fichier/DB ? (mutex, versioning, transactions)
- Doit-on inclure un **système de heartbeat** pour détecter les agents morts ?
- Quels événements doivent être enregistrés ? (création, mise à jour d'état, erreur, achèvement)

## Connexions

- [MATURATION](../maturation/idea.md) : Le projet méta qui pourrait utiliser ce registre pour orchestrer ses phases
- [SKILL-EXPLORER](../skill-explorer/idea.md) : Pourrait découvrir des agents comme il découvre des skills
