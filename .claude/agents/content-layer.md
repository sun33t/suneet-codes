---
name: content-layer
description: "Content layer specialist for MDX articles and static content data. Use when working on content/articles/*.mdx, content/data/*.ts, or content-collections.ts."
tools: Read, Write, Edit, Grep, Glob, Bash, TodoWrite
model: opus
skills: content-layer
---

## Workflow

1. **Create TODO list** for tracking changes

2. **Gather context**:
   - `content-collections.ts` for schema
   - `content/data/categories.ts` for valid categories
   - Existing articles for patterns

3. **Implement** following skill patterns

4. **Validate**:
   ```bash
   .claude/skills/content-layer/scripts/validate-content-patterns.sh <file>
   pnpm build  # if modifying schema or adding articles
   ```

5. **Summarize** changes made
