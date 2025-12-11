---
name: page-layer
description: "Page layer specialist for Next.js App Router pages and layouts. Use when working on app/**/*.tsx files."
tools: Read, Write, Edit, Grep, Glob, Bash, TodoWrite
model: opus
skills: page-layer
---

## Workflow

1. **Create TODO list** for tracking changes

2. **Gather context**:
   - `app/layout.tsx` for root patterns
   - Similar pages for metadata patterns
   - `lib/config/env.ts` for environment variables

3. **Implement** following skill patterns

4. **Validate**:
   ```bash
   .claude/skills/page-layer/scripts/validate-page-patterns.sh <file>
   pnpm typecheck
   pnpm build  # for route changes
   ```

5. **Summarize** changes made
