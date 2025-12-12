# CLAUDE.md

Next.js 15 + React 19 portfolio/blog site using App Router, MDX articles, and content-collections.

## Critical Rules

- Invoke `unit-testing` skill BEFORE writing any test code
- Use conventional commits (enforced by commitlint)
- Pre-commit hook runs: typecheck, Biome checks, unit tests
- **Invoke layer skills** when working on layer-specific code (see table below)

## When to Use Skills

This project has layer-specific skills. When working on code in these areas,
**invoke the corresponding skill** to ensure patterns are followed.

| When Working On | Invoke This Skill | Files Affected |
|-----------------|-------------------|----------------|
| MDX articles, content schema | `skill: content-layer` | `content/articles/`, `content/data/`, `content-collections.ts` |
| React components, UI | `skill: component-layer` | `components/**/*.tsx` |
| Pages, routes, layouts | `skill: page-layer` | `app/**/*.tsx` |

**Why use skills:**
- Skills contain project-specific patterns that must be followed
- Skills include decision trees for common scenarios
- Skills have validation scripts to check compliance
- PostToolUse hooks automatically validate after file changes

**Skill locations:**
- `.claude/skills/content-layer/` - Content patterns and validation
- `.claude/skills/component-layer/` - Component patterns and validation
- `.claude/skills/page-layer/` - Page patterns and validation

## Commands

```bash
pnpm dev          # Dev server
pnpm build        # Production build + sitemap
pnpm check        # Biome lint/format check
pnpm check:fix    # Biome with auto-fix
pnpm format       # Format with Biome
pnpm typecheck    # TypeScript check
pnpm test         # Vitest watch mode
pnpm test:run     # Vitest single run
pnpm dev:email    # Email template preview
```

## File Locations

- `lib/config/env.ts` - Environment variables (t3-env, errors on missing required vars)
- `lib/config/routes.ts` - Route definitions
- `lib/config/baseUrl.ts` - URL configuration
- `lib/content/articles.ts` - Article fetching utilities
- `lib/services/email/` - Email sending (resend.ts + templates/)
- `lib/services/posthog.ts` - Server-side analytics
- `lib/services/turnstile.ts` - Bot protection validation
- `lib/scripts/sitemap-index.ts` - Sitemap generation
- `lib/utils/` - Utility functions with tests
- `content/articles/*.mdx` - Blog articles (numeric prefix: `0001-article-name.mdx`)
- `content/data/*.ts` - Static content (projects, roles, testimonials, categories)
- `content-collections.ts` - Article schema with Zod validation
- `components/ui/` - shadcn/ui components (Radix primitives)
- `components/mdx/` - Custom MDX components
- `components/layout/` - Layout components (header, footer, container, page-*)
- `components/features/` - Feature components (contact-form, articles-list, resume)
- `components/shared/` - Reusable components (avatar, link-card, social-icons)
- `components/providers/` - Context providers (theme, posthog)

## Path Aliases

- `@/*` → project root
- `content-collections` → generated types

## Testing

Vitest for unit tests. Co-locate test files with source: `*.test.ts`.

## Integrations

- CodeHike: MDX syntax highlighting
- Cloudinary: Images (next-cloudinary)
- Resend: Email sending
- Turnstile: Contact form bot protection
- PostHog: Analytics

## Active Technologies
- TypeScript 5.9.x / Node.js 24.11.1+ (001-content-cms)
- PostgreSQL via Neon (dev branch locally, production branch in production)

## Recent Changes
- 001-content-cms: Added TypeScript 5.9.x / Node.js 24.11.1+
