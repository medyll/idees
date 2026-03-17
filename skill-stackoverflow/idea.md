# idea-SKILL-STACKOVERFLOW

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-17
**Statut :** mature
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

## Réflexion approfondie

Question résolue : **simulation locale vs publication réelle**. La valeur principale est la simulation locale — générer une discussion riche autour d'une question technique sans dépendre de SO ni risquer les anti-bots. Le contenu reste en local ou dans un wiki interne.

Architecture clarifiée : l'orchestrateur est un **tournoi délibératif** — chaque bot reçoit la question + les réponses précédentes, répond depuis son persona, puis l'orchestrateur choisit l'ordre des intervenants pour maximiser la tension productive (débutant d'abord, puis expert qui corrige, puis sceptique qui challenge).

Connexion inattendue avec **AGENTS-REGISTRY** : chaque bot SO est un agent enregistré avec un persona (métadonnées : "senior backend", "JS fanboy", "performance-obsessed"). Le registre permet de gérer le pool de bots, leur statut, et leurs tours de parole.

## Connexions

- [SKILL-MEMOIRE](../skill-memoire/idea.md) : les bots retiennent les discussions passées via mémoire dégradante
- [AGENTS-REGISTRY](../agents-registry/idea.md) : les bots SO comme agents enregistrés avec personas

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
