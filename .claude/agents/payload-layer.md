---
name: payload-layer
description: "Payload CMS layer specialist for globals, collections, seed data, and queries. Use when working on lib/payload/**/*.ts files."
tools: Read, Write, Edit, Grep, Glob, Bash, TodoWrite
model: opus
skills: payload-layer
---

## Workflow

1. **Create TODO list** for tracking changes

2. **Gather context**:
   - `lib/payload/globals/` for existing global patterns
   - `lib/payload/data/` for seed data patterns
   - `lib/payload/queries/` for query patterns
   - `lib/payload/payload.config.ts` for configuration

3. **Implement** following skill patterns:
   - Schema → Export → Config → Types → Seed → Query
   - Use reusable field groups (`createPageIntroFields`, `createMetadataFields`)
   - Use Lexical helpers for rich text content

4. **Validate**:
   ```bash
   .claude/skills/payload-layer/scripts/validate-payload-patterns.sh <file>
   pnpm payload:types
   pnpm typecheck
   ```

5. **Summarize** changes made
