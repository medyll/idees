# GitHub Copilot Instructions

This file provides guidance for GitHub Copilot when working on the **Incubateur d'Idées** project.

## Context

This is a markdown-based idea maturation system, NOT a code repository. All work involves managing idea files (`.md`) with specific structure and conventions.

## Key Guidelines

### File Operations
- **Always use the Read/Edit/Write tools**, not bash commands like `cat`, `sed`, or `echo`
- When editing ideas, use exact string matching with `oldString`/`newString`
- Never create files without reading the current state first

### Idea Management
- File names are lowercase with hyphens: `app-mobile-grid/idea.md`
- Idea codes are uppercase: `APP-MOBILE-GRID`
- All content must be in French (headers, descriptions, status values)
- Every idea requires: date, status, tags, description, potentiel, questions ouvertes, connexions

### Status Values (French)
Use only these exact values:
- `germination` (fresh ideas)
- `en croissance` (actively developing)
- `mature` (ready to implement)
- `fusionnée dans [CODE]` (absorbed into another idea)
- `archivée` (on hold)

### Git Workflow
- Use `git status` to check the current state
- Commit messages should be clear and concise in French or English
- Always `git add .` before committing
- Push to `origin main`

### When in Doubt
Refer to `AGENTS.md` for complete operational guidelines. This file complements it with Copilot-specific instructions.
