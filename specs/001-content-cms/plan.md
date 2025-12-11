# Implementation Plan: Content Management System

**Branch**: `001-content-cms` | **Date**: 2025-12-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification for adding Payload CMS to manage testimonials, work history, projects, uses, and site copy through an admin interface.

## Summary

Integrate Payload CMS directly into the Next.js app folder to provide an admin interface for managing portfolio content (testimonials, roles, projects, uses, site copy). The site remains fully static for visitors via SSG, with content fetched at build time through Payload's Local API. Existing MDX articles continue to use content-collections.

## Technical Context

**Language/Version**: TypeScript 5.9.x / Node.js 24.11.1+
**Primary Dependencies**:
- Next.js 15.4.8 (App Router)
- React 19.2.1 (Server Components)
- Payload CMS 3.x (`payload`, `@payloadcms/next`)
- `@payloadcms/db-postgres` (PostgreSQL via Neon)
- `@payloadcms/richtext-lexical` (Rich text editor)
- `graphql` (Payload peer dependency)

**Storage**: PostgreSQL via Neon (production) / SQLite (local development)
**Testing**: Vitest for unit tests, build validation for content schema
**Target Platform**: Vercel (static pages + serverless admin)
**Project Type**: Web application (single repo with admin + frontend route groups)
**Performance Goals**: Public pages static HTML, admin panel responsive
**Constraints**:
- Public pages MUST remain fully static (SSG with `force-static`)
- Keep existing content-collections for MDX articles (coexist)
- Only `/admin` routes require runtime database access
- Build-time database connection required for static generation

**Scale/Scope**:
- Single admin user
- ~10 testimonials, ~8 roles, ~1 project, ~25 uses items
- 5 content types (collections) + 1 global (site content)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| Layer-Based Architecture | PASS | Payload adds new routes in `(payload)` group, frontend moves to `(frontend)` |
| Fixed Technology Stack | JUSTIFIED DEVIATION | Payload CMS is external to fixed stack; does not replace content-collections |
| Server Components by Default | PASS | All public pages remain server components |
| Next.js 15 Patterns | PASS | Async params, generateStaticParams, metadata exports maintained |
| Validation Before Completion | PASS | Payload uses built-in validation; public pages use build validation |
| Simplicity and Minimal Abstraction | PASS | Payload provides admin UI without custom abstractions |
| Implementation Integrity | PASS | All requirements addressed |

**Deviation Justification**: Payload CMS is an EXTERNAL integration providing admin UI functionality that content-collections cannot provide. Content-collections remains for MDX articles. This is additive, not a replacement.

## Project Structure

### Documentation (this feature)

```text
specs/001-content-cms/
├── plan.md              # This file
├── research.md          # Phase 0: Payload CMS integration patterns
├── data-model.md        # Phase 1: Entity schemas for Payload collections
├── quickstart.md        # Phase 1: Getting started guide
├── contracts/           # Phase 1: API contracts
└── tasks.md             # Phase 2: Implementation tasks (via /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── (payload)/                    # NEW: Payload admin & API routes
│   ├── admin/
│   │   └── [[...segments]]/
│   │       ├── page.tsx
│   │       └── not-found.tsx
│   ├── api/
│   │   └── [...slug]/
│   │       └── route.ts
│   └── layout.tsx
├── (frontend)/                   # MOVED: Existing public routes
│   ├── page.tsx                  # Home
│   ├── about/page.tsx
│   ├── articles/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── sitemap.ts
│   ├── contact/
│   ├── following/
│   ├── projects/
│   ├── thank-you/
│   └── uses/
├── layout.tsx                    # Root layout (shared, unchanged)
├── not-found.tsx
├── manifest.ts
├── robots.ts
└── sitemap.ts

collections/                      # NEW: Payload collection configs
├── Testimonials.ts
├── Roles.ts
├── Projects.ts
├── Uses.ts
├── Media.ts
└── Users.ts

globals/                          # NEW: Payload global configs
└── SiteContent.ts

lib/
├── payload/                      # NEW: Payload helpers
│   ├── get-payload.ts            # Singleton payload client
│   └── queries/                  # Type-safe query functions
│       ├── testimonials.ts
│       ├── roles.ts
│       ├── projects.ts
│       ├── uses.ts
│       └── site-content.ts
└── content/
    └── articles.ts               # KEEP: Existing article utilities

scripts/
└── seed-payload.ts               # NEW: Migration script

payload.config.ts                 # NEW: Payload configuration
payload-types.ts                  # NEW: Auto-generated types (gitignored)
```

**Structure Decision**: Single web application with route groups separating admin (`(payload)`) from public-facing pages (`(frontend)`). Payload collections and globals defined in dedicated directories. Content query functions in `lib/payload/queries/` parallel existing `lib/content/` pattern.

## Complexity Tracking

| Deviation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Payload CMS integration | Admin UI for content editing without code changes | Manual TypeScript file editing requires developer intervention |
| PostgreSQL database | Production-grade persistence for Payload | SQLite not suitable for serverless (ephemeral filesystem) |
| Route groups `(payload)` + `(frontend)` | Isolate admin routes from public pages | Without separation, admin routes affect frontend build output |
