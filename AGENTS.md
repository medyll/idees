# AGENTS.md

Guidelines for agentic coding agents operating in this repository.

## Project Overview

**Incubateur d'Idées** is a markdown-based idea maturation system where concepts evolve over time through guided reflection. This is NOT a code repository—it's a living collection of ideas in a structured directory-based format. The system itself (MATURATION) is the meta-project that manages all other ideas.

### File Structure
- **Root**: `AGENTS.md`, `README.md`, `idea-index.md`, `.git/`, `.github/`
- **Idea directories**: `[code-lowercase]/idea.md` + `[code-lowercase]/history.md`
- **Example**: `app-mobile-grid/idea.md` (current state) + `app-mobile-grid/history.md` (timestamped evolution)

## Build/Lint/Test Commands

**No traditional build, lint, or test commands exist.** This is a markdown-only system with no code execution.

**All work is file-based** — use these tools:
```bash
# Use Read/Edit/Write tools for file operations (NOT cat/sed/echo)
# ✅ read idea.md / edit idea.md / write new file
# ❌ cat / sed / echo

# Git operations via Bash tool
git status                    # Check working tree
git add .                     # Stage all changes
git commit -m "message"       # Create commit
git push origin main          # Push to remote

# No build, test, or linting needed
```

**Single idea workflow**:
1. `read [code-lowercase]/idea.md` — Get current state
2. `read [code-lowercase]/history.md` — Understand evolution
3. Edit using Edit tool with oldString/newString
4. `bash` for git operations only

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
**Statut :** germination | en croissance | mature | fusionnée dans [CODE] | archivée
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
- **Mandatory**: Every idea must have ≥1 tag
- Consistency: Reuse existing tags when possible

## Error Handling & Validation

### Duplicate Detection
Before creating new ideas, check `idea-index.md` for similar codes. If found:
- If idea is fully contained: integrate into existing idea
- If strongly related but distinct: create new directory and add bidirectional connections
- If truly new: create normally

### Status Management
- Don't force status transitions; propose transitions when they seem natural
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

### File Operations
- Always read the current idea file before improving
- Read recent history to understand evolution
- Preserve existing structure when updating
- Add new sections at the end (before Connexions section if present)
- Keep history chronological (newest at top)

## Git Workflow & Quality Standards

When making changes:
1. **Use TodoWrite tool** to plan multistep tasks
2. **Mark todos** as completed immediately after finishing each task
3. **Use Bash** for git operations (add, commit, push)
4. **Use Read/Edit/Write tools** for file operations, NOT Bash cat/sed/echo
5. **Update AGENTS.md** if significant patterns change

Quality checklist:
- All ideas must have ≥1 open question
- Every idea must have ≥1 tag
- History entries must have timestamps (YYYY-MM-DD format)
- Index must be kept current
- Status must reflect content maturity level

## Copilot Instructions

Instructions defined in `.github/copilot-instructions.md` (currently empty). Feel free to update this file with project-specific guidance for GitHub Copilot.

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any shell command containing `curl` or `wget` will be intercepted and blocked by the context-mode plugin. Do NOT retry.
Instead use:
- `context-mode_ctx_fetch_and_index(url, source)` to fetch and index web pages
- `context-mode_ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any shell command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` will be intercepted and blocked. Do NOT retry with shell.
Instead use:
- `context-mode_ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### Direct web fetching — BLOCKED
Do NOT use any direct URL fetching tool. Use the sandbox equivalent.
Instead use:
- `context-mode_ctx_fetch_and_index(url, source)` then `context-mode_ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Shell (>20 lines output)
Shell is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `context-mode_ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `context-mode_ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### File reading (for analysis)
If you are reading a file to **edit** it → reading is correct (edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `context-mode_ctx_execute_file(path, language, code)` instead. Only your printed summary enters context.

### grep / search (large results)
Search results can flood context. Use `context-mode_ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `context-mode_ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `context-mode_ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `context-mode_ctx_execute(language, code)` | `context-mode_ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `context-mode_ctx_fetch_and_index(url, source)` then `context-mode_ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `context-mode_ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `upgrade` MCP tool, run the returned shell command, display as checklist |
