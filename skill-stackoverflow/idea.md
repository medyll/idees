# idea-SKILL-STACKOVERFLOW

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-10
**Statut :** en croissance
**Tags :** skill, LLM, bots, communauté, simulation

## Description

Un skill capable d'interagir avec Stack Overflow de façon vivante, en s'appuyant sur des bots qui jouent le rôle de différents utilisateurs pour simuler une communauté active autour d'une question.

L'idée est de "faire vivre" un skill Stackoverflow en allant au-delà de la simple lecture de réponses. Des user-bots incarnent différents profils (débutant, senior, sceptique, evangéliste d'une techno) et interagissent autour d'une question :

- Posent des sous-questions
- Votent les réponses
- Commentent, contestent, complètent
- Génèrent de la friction productive qui fait émerger la vraie bonne réponse

## Potentiel

Bootstrapper une base de connaissance technique auto-entretenue. Utile pour des wikis internes, des FAQs auto-générées, des systèmes de documentation vivants.

## Implémentation envisagée

- Skill principal : récupère la question et les réponses via l'API SO (ou scraping)
- Pool de bots LLM avec des personas définis (prompts de personnalité)
- Orchestrateur qui distribue les rôles et gère les tours de parole
- Synthèse finale : la "vraie" réponse consolidée après débat
- Optionnel : publication sur SO ou usage interne seulement

## Questions ouvertes

- Les bots postent-ils vraiment sur SO ou c'est simulé en local ?
- Combien de bots / tours de débat avant la synthèse ?
- Comment gérer le fait que SO a des mécanismes anti-bot ?
- Le skill est-il utilisé pour apprendre ou pour contribuer à SO ?
- Les bots ont des personnalités distinctes (expert, débutant, troll bienveillant) ?
- Le contenu est généré à la demande ou en batch planifié ?
- Comment éviter la dégradation qualitative du contenu au fil des générations ?

## Connexions

Lien avec **SKILL-MEMOIRE** : les bots pourraient utiliser le système de mémoire dégradante pour retenir les discussions passées.

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
