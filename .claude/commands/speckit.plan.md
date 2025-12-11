---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
handoffs:
  - label: Create Tasks
    agent: speckit.tasks
    prompt: Break the plan into tasks
    send: true
  - label: Create Checklist
    agent: speckit.checklist
    prompt: Create a checklist for the following domain...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Project Context (MANDATORY)

This project has a **fixed technology stack** and **layer-specific patterns**.
All plan artifacts MUST align with these conventions.

### Fixed Technology Stack (Do NOT research alternatives)

| Layer | Technology | Version | Patterns Location |
|-------|------------|---------|-------------------|
| Content | content-collections + MDX | 0.8.2 / 3.1.1 | `.claude/skills/content-layer/references/` |
| Component | React + Radix + shadcn/ui | 19.2.1 | `.claude/skills/component-layer/references/` |
| Page | Next.js App Router | 15.4.8 | `.claude/skills/page-layer/references/` |
| Styling | Tailwind + CVA | 3.4.18 | Component layer reference |
| Validation | Zod | 3.24.4 | Content/component references |
| Images | next-cloudinary | 6.17.5 | Page layer reference |

### Framework Versions (CRITICAL)

| Framework | Version | Key Pattern |
|-----------|---------|-------------|
| Next.js | 15.x | Async params (Promise), App Router only |
| React | 19.x | Server Components default, RSC |
| content-collections | 0.8.x | Zod schema, frontmatter-only parser |

### Research Scope Limitations

**ONLY research**:
- External service integrations (third-party APIs not in stack)
- Domain-specific patterns not covered by layer skills
- Performance/scaling questions specific to this feature

**Do NOT research** (stack is fixed):
- Content management (content-collections is fixed)
- UI components (shadcn/ui + Radix is fixed)
- Routing/pages (Next.js App Router is fixed)
- Styling approach (Tailwind + CVA is fixed)

## Outline

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**:
   - Read FEATURE_SPEC and `.specify/memory/constitution.md`
   - Load IMPL_PLAN template (already copied)
   - **Read layer skill references for relevant layers** (see Fixed Technology Stack table above)
   - Identify which layers will be involved based on feature spec

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research (Limited Scope)

**IMPORTANT**: Core technology stack is FIXED. Only research external/novel integrations.

1. **Extract unknowns from Technical Context**:
   - For each NEEDS CLARIFICATION → check if answered by layer skill references first
   - For external dependencies only → research task
   - For novel integrations only → patterns task

2. **Skip research for fixed stack** (use skill references instead):

   | If feature involves... | Read reference (not research) |
   |------------------------|-------------------------------|
   | MDX content, articles | `.claude/skills/content-layer/references/CONTENT_LAYER_REFERENCE.md` |
   | React components, UI | `.claude/skills/component-layer/references/COMPONENT_LAYER_REFERENCE.md` |
   | Pages, routes, metadata | `.claude/skills/page-layer/references/PAGE_LAYER_REFERENCE.md` |

3. **Research only if needed** for external integrations:

   ```text
   For each EXTERNAL unknown (not in fixed stack):
     Task: "Research {unknown} for {feature context}"
   ```

4. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md (may be minimal if no external research needed)

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications
