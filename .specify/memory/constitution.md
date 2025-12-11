# suneet.codes Constitution

## Core Principles

### I. Layer-Based Architecture

All implementation follows strict layer separation with dedicated skills.

| Layer | Skill | Scope |
|-------|-------|-------|
| Content | `content-layer` | MDX articles, content-collections schema, static data |
| Component | `component-layer` | React components, shadcn/ui, Radix primitives |
| Page | `page-layer` | Next.js App Router pages, layouts, metadata |

**Implementation order**: Content → Component → Page

### II. Fixed Technology Stack (NON-NEGOTIABLE)

Do not research or substitute core technologies. The stack is fixed:

| Concern | Technology | Version |
|---------|------------|---------|
| Framework | Next.js (App Router) | 15.x |
| UI Library | React | 19.x |
| Content | content-collections + MDX | 0.8.x |
| Components | shadcn/ui + Radix | Latest |
| Styling | Tailwind CSS + CVA | 3.x |
| Validation | Zod | 3.x |
| Images | next-cloudinary | 6.x |

### III. Server Components by Default

- Pages and components are Server Components unless hooks/interactivity required
- Only add `"use client"` when useState, useEffect, event handlers, or browser APIs needed
- Keep client boundaries as small as possible

### IV. Next.js 15 Patterns (CRITICAL)

- `params` in dynamic routes are Promises - MUST `await params`
- All dynamic routes require `generateStaticParams`
- All pages export `metadata` or `generateMetadata`

### V. Validation Before Completion

All layer changes MUST pass validation scripts before marking complete:

```bash
.claude/skills/{layer}-layer/scripts/validate-{layer}-patterns.sh <file>
```

### VI. Simplicity and Minimal Abstraction

- Start with the simplest solution
- No speculative features (YAGNI)
- No unnecessary abstractions
- Prefer composition over configuration

### VII. Implementation Integrity

When blocked or facing issues, MUST ask user before:
- Removing specified functionality
- Significantly changing planned behavior
- Deferring features to future work
- Simplifying in ways that reduce capabilities

## Technology Stack

### Fixed Stack (Do Not Deviate)

| Concern | Technology |
|---------|------------|
| Meta-framework | Next.js 15 (App Router) |
| UI | React 19 + Server Components |
| Content | content-collections + MDX |
| Components | shadcn/ui (Radix primitives) |
| Styling | Tailwind CSS |
| Variants | class-variance-authority (CVA) |
| Validation | Zod |
| Images | next-cloudinary (Cloudinary) |
| Email | Resend + react-email |
| Analytics | PostHog |
| Bot Protection | Turnstile |

## Quality Gates

### Before Any PR

- [ ] TypeScript compiles (`pnpm typecheck`)
- [ ] Biome passes (`pnpm check`)
- [ ] Unit tests pass (`pnpm test:run`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Layer validation scripts pass

### Before Implementation Complete

- [ ] All tasks marked [X] in tasks.md
- [ ] All layer validation scripts pass
- [ ] No TypeScript errors
- [ ] No Biome errors

## Governance

This constitution supersedes ad-hoc decisions during planning and implementation.

Amendments require:
1. Documentation of change rationale
2. Update to relevant skill references
3. Update to validation scripts if patterns change

**Version**: 1.0.0 | **Ratified**: 2025-12-11 | **Last Amended**: 2025-12-11
