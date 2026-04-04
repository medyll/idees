# idea-AGENT-INBOX-MATURATION

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04 05:26  
**Statut :** germination  
**Tags :** agent, capture, trigger, maturation, rotation, OpenClaw

## Description

Système de capture d'idées via un fichier unique (`capture-maturation.md`) qui centralise tous les fragments d'idées provenant de multiples sources (chat OpenClaw, autres systèmes, saisie manuelle).

**Architecture :**
- **Fichier unique** : `capture-maturation.md` avec séparateur `---IDEE---` entre chaque idée
- **Métadonnées** : chaque entrée inclut la date de capture
- **Capacity** : max 30 idées, rotation par le bas (suppression anciennes)
- **Trigger** : cron toutes les 2 minutes
- **Agent de traitement** : lit la capture, vérifie les doublons, détecte les connexions, crée/met à jour les idées dans `D:\boulot\dev\maturation\`
- **Auto-nettoyage** : rotation automatique quand >30 idées

**Flux :**
```
Fragment idée → capture-maturation.md → Cron (2 min) → Agent traite → 
Vérifie idea-index.md → Crée/met à jour [code]/idea.md + history.md → 
Rotation si >30 idées (supprime bas du fichier)
```

## Potentiel

- Centraliser toutes les idées dispersées (chat, notes, autres systèmes)
- Réduire la friction de capture (un seul endroit, pas de structure à respecter)
- Auto-organisation progressive (l'agent trie et nettoie)
- Historique complet des fragments bruts avant maturation

## Questions ouvertes

- Quel séparateur vertical pour le markdown ? (`---` ou `### ---` ou autre ?)
- Comment détecter les fragments "similaires" pour les regrouper ? (keywords, sémantique ?)
- Faut-il un délai avant traitement (pour regrouper plusieurs fragments d'un coup) ?
- Comment gérer les idées venant d'autres systèmes (format standardisé ?) ?

## Connexions

[MATURATION](maturation/idea.md) — système source dont c'est l'évolution  
[AGENTS-REGISTRY](agents-registry/idea.md) — registre d'agents qui pourrait inclure l'agent inbox  
[MOTEUR-DASHBOARD](moteur-dashboard/idea.md) — autre idée capturée aujourd'hui (dashboard générique)
