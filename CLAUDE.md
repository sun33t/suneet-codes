# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website for suneet.codes, built with Next.js 15 and React 19. Uses the App Router, MDX for blog articles, and content-collections for content management.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production (also generates sitemap)
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run dev:email    # Preview email templates locally
```

## Architecture

### Content System

- **Content Collections** (`content-collections.ts`): Defines schema for articles with frontmatter validation using Zod
- **Articles**: MDX files in `content/articles/` with numeric prefix naming (e.g., `0001-article-name.mdx`)
- **Static content**: TypeScript files in `content/` for projects, roles, testimonials, categories, etc.

### Key Integrations

- **CodeHike**: Syntax highlighting for code blocks in MDX, configured in `next.config.ts`
- **Cloudinary**: Image hosting via next-cloudinary
- **Resend**: Email sending with React Email templates in `emails/`
- **Turnstile**: Cloudflare bot protection on contact form
- **PostHog**: Analytics integration

### Environment Variables

Uses t3-env (`app/env.ts`) for runtime validation. Server will error on missing required variables. See README.md for full list.

### Path Aliases

- `@/*` maps to project root
- `content-collections` maps to generated types

### UI Components

- Radix UI primitives wrapped with shadcn/ui patterns in `components/ui/`
- Custom MDX components in `components/mdx/`

## Code Style

### Import Order (enforced by Prettier)

1. Relative imports (`./`, `../`)
2. Third-party modules
3. Aliased imports (`@/...`)

### Git Hooks (Husky)

- **pre-commit**: Runs `tsc --noEmit` then lint-staged (ESLint + Prettier)
- **prepare-commit-msg**: Runs gitmoji for emoji-prefixed commits

### ESLint Rules

- Warns on direct `process.env` access (use `env` from `@/app/env` instead)
- Next.js core-web-vitals and TypeScript strict mode

## Key Files

- `app/env.ts` - Environment variable definitions and validation
- `content-collections.ts` - Article schema and transformations
- `next.config.ts` - MDX and CodeHike configuration
- `lib/articles.ts` - Article fetching utilities
