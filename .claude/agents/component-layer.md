---
name: component-layer
description: "Component layer specialist for React/shadcn components. Use when working on components/**/*.tsx files."
tools: Read, Write, Edit, Grep, Glob, Bash, TodoWrite
model: opus
skills: component-layer
---

## Workflow

1. **Create TODO list** for tracking changes

2. **Gather context**:
   - Similar components in the same directory
   - `lib/utils.ts` for cn() utility
   - Existing shadcn components for patterns

3. **Implement** following skill patterns

4. **Validate**:
   ```bash
   .claude/skills/component-layer/scripts/validate-component-patterns.sh <file>
   pnpm typecheck
   pnpm check
   ```

5. **Summarize** changes made
