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
user-invokable: true
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

**Date created:** YYYY-MM-DD
**Last updated:** YYYY-MM-DD
**Status:** germination | growing | mature | merged-into [CODE2] | archived
**Tags:** tag1, tag2, tag3

## Description
[Current idea text — always the most up-to-date version]

## Potential
[What it could become, why it matters]

## Open Questions
[What remains unresolved, what deserves reflection]

## Connections
[Links to other ideas: idea-OTHERCODE]

## History
- YYYY-MM-DD : [brief evolution summary]
- YYYY-MM-DD : Idea captured
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

Minimal index structure:

```markdown
# Idea Index

> Last updated: YYYY-MM-DD — [N] active ideas

## 🌱 Germination
| Code | Title | Tags | Connections | Last Updated |
|------|-------|------|-------------|--------------|
| [CODE](code-lowercase/idea.md) | ... | ... | ... | YYYY-MM-DD |

## 🌿 Growing
[same structure]

## 🌳 Mature
[same structure]

## 🔗 Merged / Archived
[same structure, with parent idea noted]
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

- **Date everything systematically.** All history entries require full timestamps.

- **Speak French to you, but keep files in English.** All file content (descriptions, questions, connections) should be in English,
  but your prompts, responses, and explanations are in French.

---

## Status Lifecycle

| Status | Meaning | Transitions To |
|--------|---------|----------------|
| `germination` | Fresh idea, little development | `growing` after ≥2 significant evolutions |
| `growing` | Active development, ideas evolving | `mature` when open questions close |
| `mature` | Well-defined, ready to implement or share | `archived` if abandoned |
| `merged-into [CODE]` | Absorbed by another idea | — |
| `archived` | On hold, not deleted | `germination` if revived |

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

Agent: Auto-detects directly, reads app-mobile-grid/idea.md, improves it, responds in French with changes and a question.

---

**Example 2: Natural Language Auto-Detection (French response)**

User: "la navigation en grille mobile, c'est intéressant—on la développe"

Agent: Reads `idea-index.md`, matches "grille mobile" to app-mobile-grid/, proceeds as in Example 1, responds in French.

---

**Example 3: Ambiguous Auto-Detection with Clarification (French response)**

User: "améliore le truc LLM"

Agent: Reads `idea-index.md`, finds multiple LLM-tagged ideas (interface-bridge, skill-memoire, etc.).
Responds in French: "J'ai trouvé plusieurs idées liées à LLM. Tu visais :
1. INTERFACE-BRIDGE (programme de compatibilité LLM)
2. SKILL-MEMOIRE (skill de mémoire dégradante)

Laquelle ?"

---

**Example 4: List Command (French response)**

User: "liste"

Agent: Reads `idea-index.md`, responds in French:

```
📋 Ta collection — 18 idées

🌱 En germination (15)
  • APP-MOBILE-GRID — Navigation en grille mobile — dernière évolution : 2026-03-03
  • SKILL-STACKOVERFLOW — Skill StackOverflow + User-Bots — 2026-03-03
  • ... (more ideas)

🌿 En croissance (2)
  • MATURATION — Logiciel de maturation d'idées — 2026-03-03
  • MATURATION-SLIDER — Interface slider timeline — 2026-03-03

🌳 Matures (1)
  • [none yet]
```

---

**Example 5: Capturing a New Idea (French response)**

User: "j'ai une idée : créer un moteur audio qui adapte sa sortie selon le ton émotionnel du texte"

Agent: Checks `idea-index.md` → no match → generates code `AUDIO-EMOTION-ENGINE` → creates `audio-emotion-engine/` directory
with `idea.md` and `history.md` → updates index → responds in French:

"Capturé sous `AUDIO-EMOTION-ENGINE`. L'idée de fond, c'est l'analyse de sentiment qui pilote la synthèse audio—texte triste → fréquences basses, texte énergique → tempo rapide. Question : tu vises la synthèse TTS en temps réel, ou du texte statique avec génération audio après coup ?"

---

**Example 6: Viewing History with Auto-Detection (French response)**

User: "montre-moi l'historique du truc sur la mémoire dégradante"

Agent: Auto-detects skill-memoire/ from keywords → reads `skill-memoire/history.md` → presents evolution chronologically in French.

---

**Example 7: Improve with Context (French response)**

User: "grandir celui-ci avec des détails sur les styles narratifs"

Agent: Uses conversation context to detect the most recently mentioned idea (e.g., SKILL-COMMITS-ROMANESQUE)
→ reads skill-commits-romanesque/idea.md → enriches with narrative styles → responds in French with changes.

