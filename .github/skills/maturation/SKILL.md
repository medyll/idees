---
name: maturation
description: >
  Idea maturation and evolution system. Manually or auto-invoked to capture new ideas, improve existing ideas,
  merge ideas, view idea evolution history, or list the idea collection. Auto-detects which idea you're discussing
  based on keywords, titles, or context. Use when: (1) Capturing or refining ideas, (2) Managing idea evolution over time,
  (3) Building connections between ideas, (4) Viewing timestamped idea history. This skill cultivates ideas through
  iterative reflection—not code development. Can understand natural language references like "improve the mobile grid thing"
  or "what's the history on that memory skill".
argument-hint: "[natural language describing an idea action, or CODE for explicit reference]"
compatibility:
  - claude-haiku-4.5
  - claude-opus
user-invocable: true
disable-model-invocation: false
license: MIT
metadata: {}
---

# Skill: Idea Maturation System

This skill manages a living collection of ideas. Each idea has a stable identity (`idea-[CODE].md`)
and a timestamped journal (`idea-history-[CODE].md`) that traces its evolution over time.

The goal is not to develop ideas to completion in one session, but to let them mature across multiple interactions—like a persistent intellectual sketchbook.

---

## File Structure and Conventions

### Working Directory

All ideas live in lowercase directories alongside SKILL.md:

```
.
├── SKILL.md                    ← this file
├── README.md                   ← collection dashboard
├── idea-index.md               ← global table of contents
└── app-mobile-grid/            ← each idea in its own lowercase directory
    ├── idea.md                 ← current state of idea
    └── history.md              ← timestamped evolution log
└── skill-memoire/
    ├── idea.md
    └── history.md
└── ... (more ideas)
```

**Naming convention**: 
- Directory name: lowercase version of CODE (e.g., `APP-MOBILE-GRID` → `app-mobile-grid/`)
- Inside each directory: `idea.md` (not `idea-[CODE].md`) and `history.md` (not `idea-history-[CODE].md`)

### Idea File Format: `[CODE-lowercase]/idea.md`

```markdown
# idea-[CODE]

**Date initiale :** YYYY-MM-DD
**Dernière évolution :** YYYY-MM-DD
**Statut :** germination | en croissance | mature | fusionnée dans [CODE] | archivée
**Tags :** tag1, tag2, tag3

## Description
[Current idea text — always the most up-to-date version]

## Potentiel
[What it could become, why it matters]

## Questions ouvertes
[What remains unresolved, what deserves reflection]

## Connexions
[Links to other ideas: [CODE], [CODE2]]
```

### History File Format: `[CODE-lowercase]/history.md`

```markdown
# Full History — idea-[CODE]

---

## [YYYY-MM-DD HH:MM] — [evolution title]

**Trigger:** [what motivated this entry: reflection, prompt, merge, etc.]

[Complete idea content at this moment in time]

---

## [YYYY-MM-DD HH:MM] — Initial capture

[First version of the idea]
```

---

## Auto-Detection: Understanding What Idea You're Discussing

The skill automatically detects which idea you're referring to based on:

1. **Explicit CODE reference**: "improve APP-MOBILE-GRID" → directly maps to app-mobile-grid/
2. **Title keywords**: "improve that mobile grid thing" → matches app-mobile-grid/ (title: "Navigation en grille mobile")
3. **Description keywords**: "the memory thing that degrades" → matches skill-memoire/
4. **Tag matching**: "what about the CSS stuff?" → may match multiple CSS-tagged ideas, will ask for clarification if ambiguous
5. **Context clues**: "improve the previous one" → uses conversation history to infer the most recently mentioned idea

**Auto-detection process:**
1. Read `idea-index.md` to build a searchable map of codes, titles, tags, and descriptions
2. Match user input against this map using semantic understanding
3. If exactly one match → proceed directly
4. If multiple matches → ask for clarification (1-2 options)
5. If no match → suggest capturing as a new idea or ask for clarification

This means you can say things like:
- "improve the mobile grid" (auto-detects app-mobile-grid/)
- "what's the history on skills?" (finds skill-memoire/, skill-stackoverflow/, skill-commits-romanesque/, may ask which one)
- "grow the thing about CSS 3D" (auto-detects css-3d-language/)
- "the memory degradation skill got interesting, let's evolve it" (auto-detects skill-memoire/)

---

## Available Operations

### 1. Capture a New Idea

When you provide a new idea (short or long form):

1. **Generate CODE**: Short slug in uppercase, 2–4 words separated by hyphens.
   Examples: `THEME-LUMINOSITY`, `SKILL-MEMORY`, `APP-MOBILE-GRID`.
   Check `idea-index.md` first—if a similar code exists, see "Detect Merge Opportunity" below.

2. **Create directory** with the lowercase version of CODE (e.g., `app-mobile-grid/`)

3. **Create `app-mobile-grid/idea.md`** with status `germination` and today's date.

4. **Create `app-mobile-grid/history.md`** with the first timestamped entry.

5. **Update `idea-index.md`** (see Index Management section).

6. **Respond in French** with capture confirmation and 1–2 open questions to stimulate reflection—no lengthy lists.

---

### 2. Improve an Existing Idea

When you say "improve [idea]", "grow this", or provide new elements for an existing idea:

1. **Auto-detect the idea** using the detection process above.

2. **Read the current `[code-lowercase]/idea.md`** for full context.

3. **Read recent entries in `[code-lowercase]/history.md`** to understand the evolution path.

4. **Produce an enriched version** of description, potential, and/or open questions.
   The improvement should grow the idea, not just rephrase it. Look for:
   - New angles or perspectives
   - Contradictions to resolve
   - Connections to other ideas in the collection
   - Reduction of open questions when answers emerge

5. **Update `[code-lowercase]/idea.md`**: Refresh `Last updated` field, update content, adjust status if needed,
   and add a line to the `## History` section (brief summary).

6. **Add an entry to `[code-lowercase]/history.md`** with full timestamp and before/after content if significant.

7. **Respond in French** by highlighting what changed and proposing a new open question or connection to explore.

---

### 3. List Ideas

When you say "list", "show me my ideas", "what do I have?", etc.:

1. **Read `idea-index.md`** to get the full collection.

2. **Respond in French** with a formatted summary. Suggested format:

```
📋 Ta collection — [N] idées

🌱 En germination (X)
  • IDEA-CODE — Titre court — dernière évolution : YYYY-MM-DD

🌿 En croissance (X)
  • ...

🌳 Matures (X)
  • ...
```

3. If you want more detail on a specific idea after listing, just mention it naturally and it will be auto-detected and presented.

---

### 4. Detect Merge Opportunity

Before creating a new idea—or when you explicitly request merging:

1. **Read `idea-index.md`** to see all codes and summaries.

2. **Evaluate if the new idea**:
   - **Is contained in an existing idea** → Integrate it directly into the parent idea without creating a new directory.
     Tell you clearly about the absorption.
   - **Is closely related but distinct** → Create the directory and add bidirectional connections.
   - **Is truly new** → Create normally.

3. If merging: Update the parent idea with absorbed content, add timestamp, and mark the absorbed idea
   as `merged-into [PARENT-CODE]` if it already existed.

**Merge criterion**: Idea A is contained in B if implementing B necessarily requires implementing A,
or if A is a natural sub-case of B with no independent existence.

---

### 5. Show Idea Evolution

When you ask to see the history of an idea (e.g., "show me how the mobile grid evolved" or "what's the timeline on that memory skill?"):

1. **Auto-detect the idea**.
2. Read `[code-lowercase]/history.md` and present entries in chronological order, highlighting what changed between steps.
3. **Respond in French**, keeping presentation clean and simple—one section per step with the date and delta.

---

### 6. Manage the Index

`idea-index.md` is the dashboard. Update it after every operation that creates, modifies, merges, or archives an idea.

The index groups ideas by status (germination, en croissance, mature, fusionnée/archivée) with a table or list format.
Essential columns/information:
- **Code**: Uppercase idea code (e.g., `APP-MOBILE-GRID`)
- **Titre** (Title): Brief description
- **Tags**: Comma-separated tags
- **Connexions**: Links to related ideas (if any)
- **Dernière évolution** (Last Updated): YYYY-MM-DD

Example structure:

```markdown
# Index des Idées

> Dernière mise à jour : YYYY-MM-DD — [N] idées actives

## 🌱 Germination
| Code | Titre | Tags | Connexions | Dernière évolution |
|------|-------|------|------------|-------------------|
| [APP-MOBILE-GRID](app-mobile-grid/idea.md) | Navigation en grille mobile | mobile, UX | — | YYYY-MM-DD |

## 🌿 En croissance
[same structure]

## 🌳 Matures
[same structure]

## 🔗 Fusionnées / Archivées
[same structure, with parent code noted]
```

---

## Tone and Style Guidelines

- **Do not develop code** unless you explicitly request it for a technical idea.
  This skill matures ideas through reflection, not implementation.

- **Ask open questions in French** after each operation—one carefully chosen question to stimulate thought.
  Avoid yes/no questions.

- **Keep confirmations concise in French.** The essential content lives in the files.

- **Respect your style**: If descriptions are short and informal, don't inflate them with jargon.
  If they're technical, go deeper.

- **Date everything systematically.** All history entries require full timestamps (YYYY-MM-DD format).

- **Files are in French.** All file content (descriptions, questions, connections, headers, status values)
  must be in French to align with AGENTS.md guidelines. Your responses to the user are also in French.
  Only use English in this SKILL.md meta-documentation.

---

## Status Lifecycle

| Status | Meaning | Transitions To |
|--------|---------|----------------|
| `germination` | Fresh idea, little development | `en croissance` after ≥2 significant evolutions |
| `en croissance` | Active development, ideas evolving | `mature` when open questions close |
| `mature` | Well-defined, ready to implement or share | `archivée` if abandoned |
| `fusionnée dans [CODE]` | Absorbed by another idea | — |
| `archivée` | On hold, not deleted | `germination` if revived |

Never force status transitions—suggest them when they feel natural.

---

## Skill Roadmap

This SKILL.md is **Phase 1 (MVP with manual + auto-detection)**. Future phases are tracked in `idea-MATURATION.md`.
The skill must remain backward-compatible:

- **Phase 2** : CLI interface with auto-detection (`maturation capture`, `maturation improve CSS`, etc.)
- **Phase 3** : Local React server with timeline view and search (see `idea-MATURATION-SLIDER.md`)
- **Phase 4** : Electron/Tauri desktop app with full semantic search
- **Phase 5** : Mobile application with voice-to-idea capture
- **Cross-phase** : MCP integration (expose operations as MCP tools)

---

## Example Interactions

**Example 1: Explicit Code Reference (French response)**

User: "améliore APP-MOBILE-GRID"

Agent: Auto-détecte directement, lit app-mobile-grid/idea.md, l'améliore, répond en français :

> ✨ APP-MOBILE-GRID enrichie. J'ai développé la section Potentiel avec des détails sur l'accessibilité au clavier et ajouté une connexion vers INTERFACE-BRIDGE. Le statut reste « germination » — on attend une ou deux évolutions supplémentaires avant de passer en « croissance ». 
>
> Nouvelle question : comment gères-tu les appareils avec écrans très étroits (mobiles anciens) où la grille doit se compresser ?

---

**Example 2: Natural Language Auto-Detection (French response)**

User: "la navigation en grille mobile, c'est intéressant—on la développe"

Agent: Lit `idea-index.md`, détecte « grille mobile » → app-mobile-grid/, procède comme dans Example 1, répond en français.

---

**Example 3: Ambiguous Auto-Detection with Clarification (French response)**

User: "améliore le truc LLM"

Agent: Lit `idea-index.md`, trouve plusieurs idées liées à LLM (INTERFACE-BRIDGE, SKILL-MEMOIRE, etc.).
Répond en français :

> J'ai trouvé plusieurs idées liées à LLM. Tu visais :
> 1. **INTERFACE-BRIDGE** — Programme de compatibilité inter-LLM
> 2. **SKILL-MEMOIRE** — Skill avec mémoire dégradante
>
> Laquelle ?

---

**Example 4: List Command (French response)**

User: "liste"

Agent: Lit `idea-index.md`, répond en français :

> 📋 Ta collection — 18 idées
>
> 🌱 En germination (15)
>   • APP-MOBILE-GRID — Navigation en grille mobile — dernière évolution : 2026-03-03
>   • SKILL-STACKOVERFLOW — Skill StackOverflow + User-Bots — 2026-03-03
>   • ... (plus d'idées)
>
> 🌿 En croissance (2)
>   • MATURATION — Système de maturation d'idées — 2026-03-03
>   • MATURATION-SLIDER — Interface slider timeline — 2026-03-03
>
> 🌳 Matures (1)
>   • [aucune pour l'instant]

---

**Example 5: Capturing a New Idea (French response)**

User: "j'ai une idée : créer un moteur audio qui adapte sa sortie selon le ton émotionnel du texte"

Agent: Vérifie `idea-index.md` → pas de match → génère le code `AUDIO-EMOTION-ENGINE` → crée le répertoire `audio-emotion-engine/` avec `idea.md` et `history.md` → met à jour l'index → répond en français :

> 🌱 Capturé sous **AUDIO-EMOTION-ENGINE**. L'idée de fond, c'est l'analyse de sentiment qui pilote la synthèse audio—texte triste → fréquences basses, texte énergique → tempo rapide. Super concept.
>
> Question : tu vises la synthèse TTS en temps réel avec feedback émotionnel instantané, ou du texte statique avec génération audio post-traitement ?

---

**Example 6: Viewing History with Auto-Detection (French response)**

User: "montre-moi l'historique du truc sur la mémoire dégradante"

Agent: Auto-détecte skill-memoire/ par les mots-clés → lit `skill-memoire/history.md` → présente l'évolution chronologiquement en français :

> 📜 Évolution de **SKILL-MEMOIRE**
>
> ---
>
> **2026-03-01 14:30** — Amélioration : Clarification du modèle de dégradation
> 
> Passage de « la mémoire diminue progressivement » à un modèle détaillé : accès répété renforce, accès infrequent affaiblit avec courbe d'oubli exponentielle. Connexion ajoutée vers MATURATION.
>
> ---
>
> **2026-02-15 09:00** — Capture initiale
>
> Idée brute : skill qui maintient une mémoire utilisateur dégradante pour simuler l'oubli naturel.

---

**Example 7: Improve with Context (French response)**

User: "grandir celui-ci avec des détails sur les styles narratifs"

Agent: Utilise l'historique de conversation pour déterminer l'idée mentionnée récemment (ex: SKILL-COMMITS-ROMANESQUE)
→ lit skill-commits-romanesque/idea.md → l'enrichit avec les styles narratifs → répond en français :

> 🌿 **SKILL-COMMITS-ROMANESQUE** : Enrichie avec détails sur les styles narratifs.
>
> J'ai ajouté une section sur les 4 archétypes narratifs (épique, tragique, comique, ironique) et comment les messages de commit peuvent emprunter à chacun. Le statut passe en « en croissance » puisqu'on vient de résoudre deux questions ouvertes.
>
> Nouvelle question : comment adapter la tonalité à la sévérité du changement (fix mineur vs refactoring majeur) ?

