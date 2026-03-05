# AGENTS.md

Guidelines for agentic coding agents operating in this repository.

## Project Overview

**Incubateur d'Idées** is a markdown-based idea maturation system where concepts evolve over time through guided reflection. This is NOT a code repository—it's a living collection of ideas in a structured directory-based format. The system itself (MATURATION) is the meta-project that manages all other ideas.

### File Structure
- **Root**: `AGENTS.md`, `README.md`, `idea-index.md`, `.git/`
- **Idea directories**: `[code-lowercase]/idea.md` + `[code-lowercase]/history.md`
- **Example**: `app-mobile-grid/idea.md` (current state) + `app-mobile-grid/history.md` (timestamped evolution)
- **Config**: `.github/copilot-instructions.md` (empty, can be updated)

## Build/Lint/Test Commands

**No traditional build, lint, or test commands exist.** This is a markdown-only system with no code execution.

**All work is file-based**:
```bash
# Read ideas
cat [code-lowercase]/idea.md
cat [code-lowercase]/history.md

# Git operations
git add .
git commit -m "message"
git push origin main

# No build, test, or linting needed
```

## Code Style Guidelines

### File Naming Conventions
- Ideas: `[code-lowercase]/idea.md` (e.g., `app-mobile-grid/idea.md`)
- History: `[code-lowercase]/history.md` (timestamped evolution log)
- Index: `idea-index.md` (always singular, links to all ideas)
- Idea codes: Uppercase with hyphens (APP-MOBILE-GRID), converted to lowercase for directory names

### Content Structure (Mandatory Sections)
```markdown
# idea-[CODE]

**Date initiale :** YYYY-MM-DD
**Dernière évolution :** YYYY-MM-DD
**Statut :** germination | en croissance | mature | fusionnée dans [CODE2] | archivée
**Tags :** tag1, tag2, tag3

## Description
[Current idea text - always the most up-to-date version]

## Potentiel
[What it could become, why it's interesting]

## Questions ouvertes
[What's not yet resolved, what deserves reflection]

## Connexions
[Links to other ideas: [CODE], [CODE2]]
```

### Markdown Formatting Standards
- **Language**: French headers and content throughout
- **Metadata**: Always include dates, status, tags (required)
- **Sections**: Preserve order: Description → Potentiel → Questions ouvertes → Connexions
- **Code references**: Use backticks (e.g., `[CODE-NAME]` for idea references)
- **Links**: Format `[CODE]` for internal connections (e.g., `[APP-MOBILE-GRID]`)
- **Conciseness**: Keep descriptions focused and actionable

### Status Lifecycle Rules
- `germination` → `en croissance` after ≥2 significant evolutions (tracked in history)
- `en croissance` → `mature` when open questions resolve and concept stabilizes
- `mature` → `archivée` when abandoned or superseded
- `fusionnée dans [CODE]` when absorbed into a parent idea (keep original directory as redirect)

### Tags Format & Conventions
- Format: Comma-separated lowercase, no spaces (e.g., "mobile, UX, CSS, React")
- Common tags: mobile, UX, CSS, React, skill, LLM, hardware, database, ontology, CLI, etc.
- **Mandatory**: Every idea must have ≥1 tag
- Consistency: Reuse existing tags when possible

## Error Handling & Validation

### Duplicate Detection
Before creating new ideas, check `idea-index.md` for similar codes. If found:
- If idea is fully contained: integrate into existing idea
- If strongly related but distinct: create new directory and add bidirectional connections
- If truly new: create normally

### Status Management
- Don't force status transitions
- Propose transitions when they seem natural
- Keep status consistent with content maturity

### File Integrity
- Always verify `idea.md` exists before reading `history.md`
- Ensure timestamps in history are in YYYY-MM-DD format
- Check that Status values match defined lifecycle states
- Validate that Tags are comma-separated without extra spaces

## Development Workflow

### Creating New Ideas
1. Generate CODE from 2-4 word slug (uppercase with hyphens)
2. Convert CODE to lowercase for directory name (e.g., `APP-MOBILE-GRID` → `app-mobile-grid`)
3. Check for duplicates in `idea-index.md`
4. Create directory and both `idea.md` + `history.md` files
5. Update `idea-index.md` with link to new idea
6. Ask 1-2 open questions to stimulate reflection

### Improving Existing Ideas
1. Read current `[code-lowercase]/idea.md` file
2. Read recent `[code-lowercase]/history.md` entries
3. Produce enriched version (new angles, resolved contradictions, connections)
4. Update current file with new content and status
5. Add history entry with timestamp
6. Ask new open question or suggest connection

### Index Management
- Always update `idea-index.md` after operations
- Group by status (germination, en croissance, mature)
- Include connections and tags in index
- Add notes about relationships in "Notes transversales" section

## File Operations

### Reading Files
- Always read the current idea file before improving
- Read recent history to understand evolution
- Read index to check for duplicates

### Writing Files
- Preserve existing structure when updating
- Add new sections at the end (before Connexions section if present)
- Keep history chronological (newest at top)
- Use proper markdown formatting

## Cross-References & Connections

- Use `[CODE]` format for connections (e.g., `[APP-MOBILE-GRID]`)
- Add bidirectional connections when ideas are related
- Note relationships in index's "Notes transversales" section
- Reference related ideas in the Connexions section

## Special Cases

### Idea Absorption
When one idea is fully contained in another:
- Update parent idea with absorbed content
- Mark absorbed idea as `fusionnée dans [PARENTCODE]`
- Don't create separate directory for absorbed idea

### Technical Ideas
For ideas that will become code:
- Focus on concept maturation, not implementation
- Add technical details to Potentiel section
- Note required technologies in Tags

## Quality Standards

- All ideas must have ≥1 open question
- Every idea must have ≥1 tag
- History entries must have timestamps (YYYY-MM-DD format)
- Index must be kept current
- Status must reflect content maturity level

## Roadmap Context

This system is Phase 1 (MVP for idea management). Future phases:
- Phase 2: CLI interface
- Phase 3: React server with timeline view
- Phase 4: Electron/Tauri app
- Phase 5: Mobile application

Always maintain backward compatibility with Phase 1 directory structure.

When making changes:
1. Use TodoWrite tool to plan multistep tasks
2. Mark todos as completed immediately after finishing each task
3. Use Bash for git operations (add, commit, push)
4. Use Read/Edit/Write tools for file operations, NOT Bash cat/sed/echo
5. Update AGENTS.md or README.md if significant patterns change