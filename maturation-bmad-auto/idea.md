# idea-MATURATION-BMAD-AUTO

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04  
**Statut :** germination  
**Tags :** bmad, maturation, auto-génération, dashboard

## Description

**Maturation doit créer/mettre à jour un dossier BMAD automatiquement** pour chaque idée maturée.

**Spécifications :**
- Pour chaque idée maturée → génère un dossier BMAD léger
- Mise à jour automatique au fur et à mesure
- Contenu léger (pas trop lourd)

## Pourquoi

- Voir le BMAD dans IDAE-DASHBOARD
- Rendre les idées "visibles" dans le dashboard
- Permettre la navigation dans les idées via dashboard

## Fonctionnement

```
Maturation termine une idée
         ↓
Crée [code]/idea.md + history.md
         ↓
Crée [code]/bmad/ (status.yaml, config.yaml, artifacts/)
         ↓
Affichable dans IDAE-DASHBOARD
         ↓
Pose questions de validation
```

**BMAD = structure minimale :**
- `status.yaml` — état d'avancement
- `config.yaml` — metadata du projet
- `artifacts/` — documents de base (product-brief.md, prd.md...)

## Questions de fin

**Quand maturation est "finie" :**
- L'agent doit s'organiser pour poser des questions
- "Ma maturation est finie" → l'agent demande confirmation
- Questions pour valider que l'idée est complète
- Pas de narration, juste des questions pro

**Exemple de questions :**
- "Quels sont les critères de completion ?"
- "Quelles sont les dépendances non résolues ?"
- "Quel est le prochain pas concret ?"

## Questions ouvertes

- Quelle structure BMAD minimale ?
- Faut-il générer tous les artifacts ou juste status.yaml ?
- Comment lier le BMAD généré au dashboard ?
- Faut-il un template BMAD par type de projet ?

## Connexions

[MATURATION-5-ITERATIONS](maturation-5-iterations/idea.md) — déclenche la génération BMAD après 5 itérations  
[MOTEUR-DASHBOARD](moteur-dashboard/idea.md) — affichera le BMAD généré  
[AGENT-INBOX-MATURATION](agent-inbox-maturation/idea.md) — système source
