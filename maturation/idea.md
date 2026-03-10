# idea-MATURATION

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-10
**Statut :** mature
**Tags :** idées, évolution, timeline, CLI, React, Electron, MCP, skill

## Description

Logiciel de collecte et de maturation d'idées sur la durée. Pas pour développer (coder), mais pour faire **grandir** les idées par réflexion progressive. MATURATION est le **projet méta** : il doit gérer toutes les autres idées de ce système.

### Vision générale

Un espace personnel de réflexion structuré où chaque idée :
- Émerge d'une question ou d'une intuition
- Grandit à travers des cycles de maturation : germination → en croissance → mature
- Reste vivante grâce à des prompts de réflexion guidée
- Se connecte à d'autres idées via un réseau de relations

### Fonctionnalités clés

**Phase 1 (MVP)** — Structure de fichiers + SKILL.md pour IDE
- Stockage : `[code-lowercase]/idea.md` (état courant) + `[code-lowercase]/history.md` (horodatage YYYY-MM-DD)
- Format markdown avec sections fixes : Description, Potentiel, Questions ouvertes, Connexions
- Index centralisé (`idea-index.md`) groupant les idées par statut
- Auto-détection : comprendre les références naturelles aux idées (ex: "the mobile grid thing" → APP-MOBILE-GRID)

**Phase 2+** — Interface progressive
- CLI pour créer/améliorer/lister idées (avec auto-détection de l'idée mentionnée)
- Vue en **timeline** (historique visuel par idée)
- Fusion intelligente : détecter si une nouvelle idée existe déjà via LLM
- Propositions d'amélioration basées sur les questions ouvertes
- Intégration MCP pour exposer les skills comme des outils

### Architecture

```
MATURATION (système)
├── Phase 1: Skill-based (markdown + AGENTS.md guidelines)
├── Phase 2: CLI (Node.js, auto-detection, git-like interface)
├── Phase 3: React UI (timeline, drag-drop connections, visual search)
├── Phase 4: Electron/Tauri (native app, file sync)
└── Phase 5: Mobile (cross-platform idea browsing/editing)
```

## Potentiel

Ce système peut devenir une **seconde cervelle personnel** pour :
- Capturer les intuitions éphémères
- Explorer les connexions entre idées
- Générer des insights par approche émergente (réseau de relations)
- Créer des cycles de feedback : écire → réfléchir → raffiner → reconnecter
- Exporter en format livre blanc, présentation, roadmap technique

Intégration future avec :
- [MOTEUR-CATEGORISATION](MOTEUR-CATEGORISATION) : organiser les idées en ontologies
- [MATURATION-SLIDER](MATURATION-SLIDER) : visualiser l'évolution temporelle
- Skills LLM : génération de questions de réflexion, détection de doublons

## Questions ouvertes

- **Codification des idées** : Code généré automatiquement (slug intelligent) ou saisi manuellement ? Hybride possible ?
- **Fusion de doublons** : Proposée à l'utilisateur ou automatique avec confirmation ?
- **Auto-détection naturelle** : Comment parser "améliore la grille mobile" → APP-MOBILE-GRID ? Distance de Levenshtein + LLM ?
- **Métriques de maturation** : Comment mesurer qu'une idée est prête pour passer de germination → mature ?
- **Collaboration** : Multi-utilisateur ? Idées partagées ou toujours personnelles ?

## Connexions

- [MATURATION-SLIDER](MATURATION-SLIDER) : Vue timeline/historique des idées
- [MOTEUR-CATEGORISATION](MOTEUR-CATEGORISATION) : Organiser les idées en graphe ontologique
- Tous les autres projets de cette liste : utilisateurs du système MATURATION
