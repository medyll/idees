# idea-PLACE-DE-GREVE

**Date initiale :** 2026-04-06
**Dernière évolution :** 2026-04-06 17:30
**Statut :** germination
**Tags :** agent, file-attente, mission, kanban, workflow, openclaw, skill, acp, multi-agent, priorisation, backlog

## Description
File d'attente des missions (kanban textuel) que les agents OpenClaw viennent piocher, exécuter et supprimer. Format : fichier markdown avec tableau de missions identifiées (ID unique, description, date d'ajout).

Fonctionnement actuel (manuel) : fichier `workspace/place-de-greve.md` avec tableau markdown. L'agent lit le fichier, prend une mission, la supprime du tableau, exécute, archive le résultat.

**Premier jet de mission** (11 missions actuelles) :
- PWA-001 à PWA-005 : refonte PWA (manifest, agent pages, install prompt, cleanup, README)
- WOL-001 : relancer wollama (65% fait, bloqué)
- CSS-001 : refonte démos css-base (15% fait) → liée à CSS-BASE-DEMO-REFONT
- DASH-001 : architecture multi-scopes (90% fait) → liée à IDAE-DASHBOARD-MULTI-SCOPES
- LL-001 : documenter comparatif Latent Line vs CapCut (30% fait) → liée à LATENT-LINE-VS-CAPCUT
- RENAME-001 : renommer BMAD-MASTER → BMAD-METHOD
- AUDIT-001 : auditer status.yaml BMAD

## Potentiel
Devenir une **skill OpenClaw officielle** que l'agent invoque automatiquement :
- L'agent lit la file, pioche la mission la plus pertinente
- Exécute, archive le résultat
- Met à jour le fichier (supprime la mission traitée)
- **L'agent seul alimente la file** — l'utilisateur ne touche pas au fichier
- Peut ajouter des missions automatiquement (ex: quand il détecte du travail en attente)

Alternative : intégration avec `agent-inbox-maturation` — la file de grève devient un type de mission dans l'inbox.

## Décisions prises (2026-04-06)
- **Alimentation** : seul l'agent alimente la file, pas l'utilisateur
- **Priorisation** : l'agent lance un ACP pour évaluer la priorité à l'arrivée. Mission en attente de priorisation = tag `waiting-priority`. Personne ne peut assigner de priorité avant que l'agent n'ait fait son évaluation. Les règles de priorité seront définies ensemble plus tard, possiblement externalisées à un agent dédié qui donne une première indication.
- **Archivage** : un fichier par jour dans `archives/place-de-greve-YYYY-MM-DD.md`
- **Multi-agents** : oui, plusieurs ACP agents en parallèle, sans conflit (mécanisme de verrouillage à définir)
- **Lien BMAD** : Place de Grève = backlog informel. Séparé de BMAD qui gère les projets structurés (sprints/stories). Les missions sont des "mini-tâches" qui ne méritent pas un projet BMAD complet.
- **Format** : markdown simple (à confirmer après discussion sur les sessions OpenClaw)

## Questions ouvertes
- ~~**Qui alimente la file ?**~~ → Résolu : seul l'agent
- ~~**Priorisation**~~ → Résolu : agent évalue via ACP, tag `waiting-priority` en attente, règles à définir ensemble
- **Format de la skill :** markdown simple (option A) vs sessions OpenClaw (option B) — utilisateur veut comprendre les sessions avant de décider
- ~~**Archivage :**~~ → Résolu : un fichier par jour
- ~~**Multi-agents :**~~ → Résolu : oui, avec mécanisme de verrouillage
- ~~**Lien BMAD :**~~ → Résolu : backlog informel, séparé de BMAD projets structurés

## Connexions
- [AGENT-INBOX-MATURATION](../agent-inbox-maturation/idea.md) : la file pourrait devenir un type de mission inbox
- [AGENT-BMAD-ORCHESTRATION](../agent-bmad-orchestration/idea.md) : les agents BMAD pourraient piocher dans la file
- [BMAD-TEST-ENFORCEMENT](../bmad-test-enforcement/idea.md) : AUDIT-001 concerne directement cette idée
- [CSS-BASE-DEMO-REFONT](../css-base-demo-refont/idea.md) : CSS-001 est l'exécution de cette idée
- [IDAE-DASHBOARD-MULTI-SCOPES](../idae-dashboard-multi-scopes/idea.md) : DASH-001 est l'exécution
- [LATENT-LINE-VS-CAPCUT](../latent-line-vs-capcut/idea.md) : LL-001 est l'exécution
