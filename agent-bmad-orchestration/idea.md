# idea-AGENT-BMAD-ORCHESTRATION

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04  
**Statut :** en cours  
**Tags :** agent, bmad, orchestration, autonome, productivité

## Description

**Agent autonome pour l'orchestration BMAD.**

**Problème :**
- Perte de temps en discussions non productives
- Besoin d'un agent qui exécute des tâches BMAD en autonomie
- Skill BMAD Master existe déjà mais pas d'agent dédié

**Solution :**
- Agent isolé (sub-agent ou session persistante)
- Rôle : Orchestrateur BMAD
- Tâches : lancer sprints, créer stories, valider, générer docs

## Capacités requises

- Lancer `bmad continue` sur projets
- Créer stories depuis backlog
- Valider stories terminées
- Générer rapports de sprint
- Synchroniser status.yaml

## Architecture

```
┌─────────────────────────────────────┐
│  Agent BMAD Orchestration           │
│  (session persistante ou cron)      │
│                                     │
│  - Scan projets BMAD                │
│  - Lance tâches d'orchestration     │
│  - Rapports synthétiques            │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  BMAD Master Skill                  │
│  (existing)                         │
└─────────────────────────────────────┘
```

## Priorité

**🔴 URGENT** — Productivité

## Connexions

[BMAD-MASTER](bmad-master/idea.md) — skill source  
[AGENT-INBOX-MATURATION](agent-inbox-maturation/idea.md) — système d'agents  
[EMAIL-CONNECTORS](email-connectors/idea.md) — notifications par email
