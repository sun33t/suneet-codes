# Research: Payload CMS Integration

**Feature**: 001-content-cms
**Date**: 2025-12-11
**Status**: Complete

## Overview

This document captures research findings for integrating Payload CMS 3.x into the existing Next.js 15 portfolio site. The goal is to provide an admin interface for managing content while keeping the public site fully static.

---

## 1. Payload CMS Installation in Existing Next.js App

### Decision: Manual Installation (not `create-payload-app`)

**Rationale**: The project already has an established Next.js 15 structure. Manual installation provides full control over the integration without scaffolding a new project.

**Alternatives Considered**:
- `npx create-payload-app` in project folder - Would overwrite existing configuration
- New separate Payload project - Defeats the purpose of Local API integration

### Required Packages

```bash
# Core Payload packages
pnpm i payload @payloadcms/next @payloadcms/richtext-lexical graphql

# Database adapter (PostgreSQL for production)
pnpm i @payloadcms/db-postgres

# SQLite for local development (optional, for simpler local setup)
pnpm i @payloadcms/db-sqlite
```

**Note**: `sharp` is already installed in the project (required by Payload for image processing).

### Installation Steps

1. **Install packages** (as above)
2. **Copy Payload app files** from [blank template](https://github.com/payloadcms/payload/tree/main/templates/blank/src/app/%28payload%29) to `app/(payload)/`
3. **Move existing routes** to `app/(frontend)/` route group
4. **Add `withPayload`** to `next.config.ts`
5. **Create `payload.config.ts`** at project root
6. **Update `tsconfig.json`** with `@payload-config` path alias
7. **Add environment variables** (`PAYLOAD_SECRET`, `DATABASE_URI`)

---

## 2. Database Configuration

### Decision: PostgreSQL via Neon (Production) + SQLite (Development)

**Rationale**:
- PostgreSQL is production-grade and integrates seamlessly with Vercel via Neon
- SQLite provides zero-configuration local development
- Vercel's ephemeral filesystem prevents SQLite in production

**Alternatives Considered**:
- MongoDB - Viable but PostgreSQL is more common for relational content structures
- SQLite everywhere - Not viable for serverless production
- Vercel Postgres adapter - Locked to Vercel; standard Postgres adapter is more portable

### Configuration Pattern

```typescript
// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

const isDev = process.env.NODE_ENV === 'development'

export default buildConfig({
  db: isDev
    ? sqliteAdapter({ client: { url: 'file:./payload.db' } })
    : postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URI },
      }),
  // ...
})
```

### Environment Variables

```bash
# .env.local (development)
PAYLOAD_SECRET=dev-secret-minimum-32-characters-long
DATABASE_URI=file:./payload.db

# Vercel (production)
PAYLOAD_SECRET=<generated-secret>
DATABASE_URI=postgresql://user:pass@host:5432/db?sslmode=require
```

---

## 3. Route Group Architecture

### Decision: `(payload)` + `(frontend)` Route Groups

**Rationale**: Next.js route groups isolate admin and public routes without affecting URLs. The admin panel at `/admin` is separate from public pages.

**Structure**:
```
app/
├── (payload)/           # Admin UI and API routes
│   ├── admin/[[...segments]]/page.tsx
│   ├── api/[...slug]/route.ts
│   └── layout.tsx
├── (frontend)/          # Public-facing routes
│   ├── page.tsx         # /
│   ├── about/page.tsx   # /about
│   └── ...
├── layout.tsx           # Root layout (shared)
└── not-found.tsx        # Global 404
```

**Key Points**:
- `(payload)` files are copied from Payload's blank template and not modified
- Root `layout.tsx` remains at `app/layout.tsx` (shared by both groups)
- Route-specific metadata and layouts can exist in either group

---

## 4. Local API Usage for Static Generation

### Decision: Use Payload Local API in Server Components

**Rationale**: The Local API queries the database directly without HTTP overhead, perfect for build-time static generation.

**Pattern for Static Pages**:

```typescript
// app/(frontend)/testimonials/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'

// Force static generation
export const dynamic = 'force-static'

export default async function TestimonialsPage() {
  const payload = await getPayload({ config })

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: '-date',
  })

  return (
    <ul>
      {testimonials.map((t) => (
        <li key={t.id}>{t.author.name}</li>
      ))}
    </ul>
  )
}
```

**Pattern for Globals**:

```typescript
const siteContent = await payload.findGlobal({
  slug: 'site-content',
})
```

### Query Function Abstraction

To maintain consistency with existing `lib/content/articles.ts`, create query functions:

```typescript
// lib/payload/queries/testimonials.ts
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getAllTestimonials() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: '-date',
  })
  return docs
}
```

---

## 5. Collection Field Types

### Decision: Use Payload's Built-in Field Types

**Rationale**: Payload provides comprehensive field types that match the existing data structures. No custom field development needed.

**Field Type Mapping**:

| Current TypeScript Field | Payload Field Type |
|--------------------------|-------------------|
| `string` | `text` |
| `string` (multiline) | `textarea` |
| `Date` | `date` |
| `string[]` (paragraphs) | `array` with `textarea` |
| `{ href, label }` | `group` with `text` fields |
| Image reference | `upload` (to Media collection) |
| Enum (categories) | `select` with options |
| Nested object | `group` |

**Example Collection**:

```typescript
// collections/Testimonials.ts
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author.name',
    defaultColumns: ['author.name', 'date'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'author',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'handle', type: 'text' },
        { name: 'profileUrl', type: 'text' },
      ],
    },
    { name: 'date', type: 'date', required: true },
    { name: 'shortBody', type: 'textarea', required: true },
    {
      name: 'fullBody',
      type: 'array',
      fields: [{ name: 'paragraph', type: 'textarea' }],
    },
  ],
}
```

---

## 6. Deploy Hooks for Content Updates

### Decision: Vercel Deploy Hooks via Collection Hooks

**Rationale**: When content changes in the admin panel, a new build should be triggered to regenerate static pages. Vercel deploy hooks provide a simple POST endpoint to trigger rebuilds.

**Implementation**:

```typescript
// collections/Testimonials.ts
export const Testimonials: CollectionConfig = {
  // ...
  hooks: {
    afterChange: [
      async () => {
        if (process.env.VERCEL_DEPLOY_HOOK_URL) {
          await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: 'POST' })
        }
      },
    ],
    afterDelete: [
      async () => {
        if (process.env.VERCEL_DEPLOY_HOOK_URL) {
          await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: 'POST' })
        }
      },
    ],
  },
}
```

**Environment Variable**:
```bash
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/prj_xxx/xxx
```

**Alternative**: Manual rebuild button in admin (simpler, less immediate).

---

## 7. Authentication

### Decision: Payload Built-in Auth (Single Admin User)

**Rationale**: Payload includes a Users collection with email/password authentication out of the box. No external auth provider needed for single admin use case.

**Setup**:
- Users collection auto-created by Payload
- First user created on initial `/admin` visit
- Session-based authentication for admin panel
- No public user registration needed

---

## 8. Media/Image Handling

### Decision: Payload Upload Collection with Cloudinary Storage (Future)

**Rationale**: For initial implementation, use Payload's default file storage. The project already uses Cloudinary for existing images, so Cloudinary integration can be added later.

**Initial Setup** (local storage):
```typescript
// collections/Media.ts
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 768 },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
```

**Note**: For production, consider `@payloadcms/storage-vercel-blob` or Cloudinary plugin.

---

## 9. Migration Strategy

### Decision: Seed Script for Existing Data

**Rationale**: The existing `content/data/*.ts` files contain production data that must be migrated to Payload. A seed script ensures accurate, repeatable migration.

**Script Pattern**:

```typescript
// scripts/seed-payload.ts
import { getPayload } from 'payload'
import config from '../payload.config'
import { TESTIMONIALS } from '../content/data/testimonials'

async function seed() {
  const payload = await getPayload({ config })

  for (const testimonial of TESTIMONIALS) {
    await payload.create({
      collection: 'testimonials',
      data: {
        author: {
          name: testimonial.author.name,
          role: testimonial.author.role,
          handle: testimonial.author.handle,
          profileUrl: testimonial.author.profileUrl,
        },
        date: testimonial.date.toISOString(),
        shortBody: testimonial.shortBody,
        fullBody: testimonial.fullBody.map(p => ({ paragraph: p })),
      },
    })
  }

  console.log('Seeding complete!')
}

seed()
```

**Run**: `pnpm tsx scripts/seed-payload.ts`

---

## 10. Coexistence with Content-Collections

### Decision: Keep Content-Collections for MDX Articles

**Rationale**: MDX articles are out of scope for this feature (per spec). Content-collections continues to work independently for articles while Payload manages other content types.

**No conflicts because**:
- Content-collections reads from `content/articles/*.mdx`
- Payload reads from PostgreSQL database
- Both can be queried in the same Server Component
- Generated types are separate (`content-collections` vs `payload-types.ts`)

---

## Summary of Decisions

| Decision | Choice | Key Rationale |
|----------|--------|---------------|
| Installation method | Manual | Full control over existing project |
| Database (prod) | PostgreSQL via Neon | Production-grade, Vercel integration |
| Database (dev) | SQLite | Zero-config local development |
| Route architecture | `(payload)` + `(frontend)` | Clean separation without URL impact |
| Content fetching | Local API | No HTTP overhead, build-time static |
| Field types | Built-in Payload fields | Covers all existing data structures |
| Deploy triggers | Vercel Deploy Hooks | Automatic rebuild on content change |
| Authentication | Payload built-in | Single admin, no external provider |
| Media storage | Local initially | Cloudinary integration later |
| Migration | Seed script | Accurate, repeatable data transfer |
| MDX articles | Keep content-collections | Out of scope, no conflicts |

---

## References

- [Payload Installation Guide](https://payloadcms.com/docs/getting-started/installation)
- [Payload PostgreSQL Adapter](https://payloadcms.com/docs/database/postgres)
- [Payload Local API](https://payloadcms.com/docs/local-api/overview)
- [Payload Collections](https://payloadcms.com/docs/configuration/collections)
- [Payload Fields](https://payloadcms.com/docs/fields/overview)
- [Vercel Deploy Hooks](https://vercel.com/docs/deploy-hooks)
- [Neon + Payload Guide](https://neon.tech/guides/payload)
