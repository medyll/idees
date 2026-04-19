# idea-SKILL-COMMITS-ROMANESQUE

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** git, skill, narration, storytelling, LLM, humour

## Description

Un skill qui lit l'historique git d'un projet et en génère une histoire romanesque : les commits deviennent des événements narratifs, les branches des arcs scénaristiques, les merges des réconciliations dramatiques.

L'historique git d'un projet raconte déjà une histoire — celle d'une lutte, d'une progression, de bugs terribles et de hotfixes héroïques. Ce skill la rend littérale :

- Les commits deviennent des scènes
- Les auteurs deviennent des personnages
- Les branches sont des lignes narratives parallèles
- Un merge est une réconciliation ou une victoire
- Un revert est une trahison ou un retour en arrière dramatique
- Les fichiers les plus modifiés sont les lieux récurrents du récit
- Les messages de commit alimentent le dialogue ou les pensées des personnages

### Styles narratifs possibles

- Roman policier (debug comme enquête)
- Épopée (feature massive = quête héroïque)
- Drame romantique (conflits de merge = tensions entre personnages)
- Chronique historique (ton sobre, digne, journalistique)

## Potentiel

Fun, pédagogique pour comprendre un projet en un coup d'œil. Peut aussi servir de changelog narratif pour les non-développeurs.

## Implémentation envisagée

- `git log --pretty=format:...` pour extraire commits, auteurs, dates, fichiers
- Prompt LLM avec le style narratif choisi + l'historique formaté
- Génération par chapitres (une branche = un chapitre)
- Output : fichier Markdown ou PDF roman
- Optionnel : couverture générée par IA, dédicace automatique au top contributeur

## Questions ouvertes

- Taille max d'historique traitée ? (grands projets = milliers de commits)
- Anonymisation des noms d'auteurs pour usage public ?
- Le style est-il choisi par l'utilisateur ou détecté automatiquement selon le projet ?
- Intégration comme skill Claude, action GitHub, ou CLI standalone ?
- Style romanesque défini par prompt (épique, policier, romance, science-fiction) ?
- On traite un seul auteur ou toute l'équipe comme des personnages ?
- Longueur : nouvelle courte ou saga selon la taille du repo ?

## Réflexion approfondie

Questions résolues :
- **Taille max** : traiter par fenêtres de 100 commits, résumer chaque fenêtre en une scène, puis générer le récit sur les résumés. Coût LLM maîtrisé.
- **Style automatique vs choisi** : l'analyse des commits peut détecter le ton naturel. Beaucoup de `fix:` et `hotfix:` = thriller. Beaucoup de `feat:` ambitieux = épopée. Proposer le style détecté, laisser l'utilisateur confirmer.

Connexion inattendue avec **SKILL-MEMOIRE** : le roman généré *est* une mémoire dégradée du projet. La version narrative est le Niveau 2 (impression générale) — plus lisible que les commits bruts mais moins précise. On pourrait générer plusieurs niveaux de résumé narratif automatiquement.

## Connexions

- Candidat MVP rapide — implémentable en quelques heures.
- [MATURATION](../maturation/idea.md) : l'histoire d'une idée pourrait aussi se raconter ainsi
- [SKILL-MEMOIRE](../skill-memoire/idea.md) : le roman est une mémoire narrative dégradée du projet

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
