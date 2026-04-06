# idea-PSEUDO-HTML-AUTO-LEARNING

**Date initiale :** 2026-04-06  
**Dernière évolution :** 2026-04-06  
**Statut :** en croissance  
**Tags :** pseudo-html, skill, auto-learning, LLM, skiller, test

## Description

Système d'auto-apprentissage pour la skill `pseudo-html` — capable d'enrichir sa propre spécification à partir des conversations utilisateur.

**Fonctionnalité :**
Dans n'importe quel projet, dans une zone de chat, si l'utilisateur dit :
- "Ajoute cette connaissance à pseudo-html"
- "Apprends ceci pour pseudo-html"
- "pseudo-html devrait savoir que..."

→ La skill doit être capable de :
1. Lire la conversation contextuelle
2. Comprendre ce qui s'est passé
3. Extraire les nouvelles règles/patterns/concepts
4. S'auto-mettre à jour (SKILL.md)
5. Soit s'améliorer, soit définir de nouvelles règles

**Implémentation ajoutée :**
- Section "🧠 Auto-Learning Mode" dans SKILL.md
- Trigger phrases détectées
- Workflow d'extraction et d'intégration
- Contraintes de validation
- Tests obligatoires avec `skiller`

**Connaissance critique ajoutée (2026-04-06 00:15) :**
- **Custom tags en production** : Les custom tags pseudo-HTML doivent être utilisés dans le code de production (pas seulement en doc)
- **CSS `display` obligatoire** : Chaque custom tag doit avoir une règle CSS avec `display` (block, flex, grid, contents, etc.)
- **Pourquoi** : Crée le pont direct entre spec (UI.html) et implémentation — code auto-documenté

## Potentiel

- Skill qui s'améliore toute seule avec l'usage
- Capture naturelle des conventions de projet
- Réduction de la dette de documentation
- Modèle pour d'autres skills auto-apprenantes

## Questions ouvertes

- Faut-il un `learning-log.md` pour tracer les apprentissages ?
- Comment gérer les conflits de connaissances (contradictions) ?
- Faut-il une approval utilisateur avant d'appliquer les changements ?
- Comment tester exhaustivement avec `skiller` ?

## Connexions

[SKILLER](skiller/idea.md) — CLI de test et déploiement de skills  
[SKILL-MASTER](skill-master/idea.md) — Validation et amélioration de skills  
[MATURATION](maturation/idea.md) — Ce système est lui-même une idée qui mature
