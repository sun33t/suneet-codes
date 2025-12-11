# CLAUDE.md

Next.js 15 + React 19 portfolio/blog site using App Router, MDX articles, and content-collections.

## Critical Rules

- Invoke `unit-testing` skill BEFORE writing any test code
- Use conventional commits (enforced by commitlint)
- Pre-commit hook runs: typecheck, Biome checks, unit tests

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

- `content/articles/*.mdx` - Blog articles (numeric prefix: `0001-article-name.mdx`)
- `content/*.ts` - Static content (projects, roles, testimonials, categories)
- `content-collections.ts` - Article schema with Zod validation
- `app/env.ts` - Environment variables (t3-env, errors on missing required vars)
- `components/ui/` - shadcn/ui components (Radix primitives)
- `components/mdx/` - Custom MDX components
- `emails/` - React Email templates
- `lib/articles.ts` - Article fetching utilities
- `next.config.ts` - MDX + CodeHike config
- `biome.json` - Linter/formatter config

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
