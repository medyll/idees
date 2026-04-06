# idea-BMAD-TEST-ENFORCEMENT

**Date initiale :** 2026-04-06  
**Dernière évolution :** 2026-04-06  
**Statut :** germination  
**Tags :** bmad, tests, enforcement, quality, chain protocol, bug critique

## Description

**Problème critique :** Dans BMAD, les agents (même bons modèles comme qwen) peuvent marquer une story comme "complete" sans avoir réellement exécuté les tests.

**Symptôme observé :**
- Agent développe une story (sprint détaillé, code bien fait)
- Claim : "l'application marche, vous pouvez la tester sans problème"
- **Réalité :** L'application NE MARCHE PAS — tests jamais exécutés
- Conflits de code non détectés
- Tester role bypassé ou ignoré

**Cause racine :**
- Pas d'enforcement que les tests doivent être VRAIMENT run
- L'agent assume "code écrit = tests pass"
- Pas de validation du output réel des tests
- Chain Protocol ne bloque pas sur "tests assumed" vs "tests executed"

## Solution Requise

**Règle absolue :**
> **Une story NE PEUT PAS être marquée "complete" sans preuve d'exécution des tests.**

**Implémentation (FAIT - 2026-04-06) :**
1. ✅ Avant de close une story → `bmad test` OBLIGATOIRE
2. ✅ Output réel requis — pas de "assumed", "should work", "you can test"
3. ✅ Tester role enforcement — le Tester doit run les tests avant que Developer puisse close
4. ✅ Validation dans status.yaml — champs ajoutés :
   ```yaml
   stories:
     - tests_executed: true|false  # REQUIRED
       test_output: <path>         # REQUIRED if complete
       test_result: pass|fail      # REQUIRED if tests_executed
   ```
5. ✅ Hard blocker — si tests pas run → chain ne peut pas continuer
6. ✅ Execution Honesty Rule renforcée — forbidden phrases listées

**Dans bmad-master SKILL.md :**
- ✅ Section "🔴 TEST ENFORCEMENT RULE" ajoutée
- ✅ Section "Execution Honesty Rule" étendue
- ✅ Section "status.yaml — Story Test Fields" ajoutée
- ✅ Validation Checklist mise à jour

## Potentiel

- Élimine les "false positives" — stories marquées done mais cassées
- Force la discipline de test à chaque story
- Réduit les régressions en production
- Rend BMAD fiable pour le déploiement continu

## Questions ouvertes

- Faut-il un artifact `test-report.md` par story ?
- Comment gérer les tests environnementaux (flakys) ?
- Faut-il un seuil de couverture minimum par story ?
- Comment enforce ça sans ralentir le flow ?

## Connexions

[BMAD-MASTER](bmad-master/idea.md) — Skill à corriger  
[AGENT-BMAD-ORCHESTRATION](agent-bmad-orchestration/idea.md) — Orchestration des agents BMAD  
[MATURATION-BMAD-AUTO](maturation-bmad-auto/idea.md) — Génération auto BMAD
