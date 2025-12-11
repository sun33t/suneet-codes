# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website for suneet.codes, built with Next.js 15 and React 19. Uses the App Router, MDX for blog articles, and content-collections for content management.

## Commands

```bash
pnpm dev             # Start development server
pnpm build           # Build for production (also generates sitemap)
pnpm check           # Run Biome linter and formatter checks
pnpm check:fix       # Run Biome with auto-fix
pnpm format          # Format code with Biome
pnpm typecheck       # Run TypeScript type checking
pnpm dev:email       # Preview email templates locally
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

### Biome

Uses Biome for linting and formatting. Configuration in `biome.json`.

### Git Hooks (Lefthook)

- **pre-commit**: Runs typecheck and Biome checks
- **commit-msg**: Runs commitlint for conventional commit messages

## Key Files

- `app/env.ts` - Environment variable definitions and validation
- `content-collections.ts` - Article schema and transformations
- `next.config.ts` - MDX and CodeHike configuration
- `lib/articles.ts` - Article fetching utilities

## Skills

When writing unit tests, invoke the `unit-testing` skill first before writing any test code.
