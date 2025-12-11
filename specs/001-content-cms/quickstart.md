# Quickstart: Content Management System

**Feature**: 001-content-cms
**Date**: 2025-12-11

## Prerequisites

- Node.js 24.11.1+
- pnpm 10.25.0+
- PostgreSQL database (Neon account for production)

---

## Local Development Setup

### 1. Install Dependencies

```bash
# Core Payload packages
pnpm i payload @payloadcms/next @payloadcms/richtext-lexical graphql

# Database adapters
pnpm i @payloadcms/db-postgres @payloadcms/db-sqlite
```

### 2. Environment Variables

Create or update `.env.local`:

```bash
# Payload Configuration
PAYLOAD_SECRET=your-secret-key-minimum-32-characters-here

# Database (SQLite for local development)
DATABASE_URI=file:./payload.db
```

### 3. Start Development Server

```bash
pnpm dev
```

### 4. Create Admin User

1. Navigate to `http://localhost:3000/admin`
2. Create your admin account (first user becomes admin)
3. You're ready to manage content!

---

## Key Files

| File | Purpose |
|------|---------|
| `payload.config.ts` | Main Payload configuration |
| `collections/*.ts` | Collection definitions |
| `globals/SiteContent.ts` | Site content global |
| `app/(payload)/` | Admin UI routes (do not modify) |
| `app/(frontend)/` | Public-facing routes |
| `lib/payload/queries/` | Query functions for content |

---

## Common Operations

### Fetch Content in Pages

```typescript
// app/(frontend)/page.tsx
import { getAllTestimonials, getSiteContent } from '@/lib/payload/queries'

export const dynamic = 'force-static'

export default async function HomePage() {
  const testimonials = await getAllTestimonials()
  const siteContent = await getSiteContent()

  return (
    <div>
      <h1>{siteContent.homepage?.shortBio}</h1>
      {testimonials.map((t) => (
        <div key={t.id}>{t.author.name}</div>
      ))}
    </div>
  )
}
```

### Add a New Collection Field

1. Edit the collection file (e.g., `collections/Testimonials.ts`)
2. Add the new field to the `fields` array
3. Run `pnpm dev` - Payload regenerates types automatically
4. Access the new field in your queries

### Render Rich Text

```typescript
import { RichText } from '@payloadcms/richtext-lexical/react'

export function AboutSection({ content }) {
  return <RichText data={content} />
}
```

---

## Database Commands

### Generate Types

Types are auto-generated when the dev server runs. To manually regenerate:

```bash
pnpm payload generate:types
```

### Run Migrations

```bash
# Create a migration after schema changes
pnpm payload migrate:create

# Run pending migrations
pnpm payload migrate
```

### Seed Data

```bash
pnpm tsx scripts/seed-payload.ts
```

---

## Production Deployment

### 1. Set Up Neon Database

1. Create a Neon project at [neon.tech](https://neon.tech)
2. Copy the connection string

### 2. Configure Vercel Environment Variables

```bash
PAYLOAD_SECRET=<generated-secure-secret>
DATABASE_URI=postgresql://user:pass@host.neon.tech:5432/db?sslmode=require
VERCEL_DEPLOY_HOOK_URL=<optional-for-auto-rebuild>
```

### 3. Deploy

```bash
vercel deploy --prod
```

### 4. Create Deploy Hook (Optional)

1. Go to Vercel Project Settings > Git > Deploy Hooks
2. Create a hook for the production branch
3. Add the URL to `VERCEL_DEPLOY_HOOK_URL`
4. Content changes will now trigger automatic rebuilds

---

## Troubleshooting

### "Cannot find module '@payload-config'"

Ensure `tsconfig.json` has the path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

### Database Connection Errors (Local)

Check that SQLite file path is correct:

```bash
DATABASE_URI=file:./payload.db
```

### Types Not Updating

Restart the dev server. Payload regenerates types on startup.

### Admin Panel 404

Ensure `app/(payload)/` directory exists with all required files from the Payload blank template.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐ │
│  │   Static    │    │   Admin     │    │      Neon       │ │
│  │   Pages     │    │   Panel     │    │    PostgreSQL   │ │
│  │  (CDN Edge) │    │ (Serverless)│    │   (Database)    │ │
│  └─────────────┘    └──────┬──────┘    └────────┬────────┘ │
│         │                  │                     │          │
│         │                  └─────────────────────┘          │
│         │                         ▲                         │
│         ▼                         │                         │
│   Public Visitors           Admin Editing                   │
│   (No DB queries)          (Real-time DB)                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Next Steps

After setup:

1. [ ] Run migration script to import existing content
2. [ ] Update page components to use Payload queries
3. [ ] Test static generation with `pnpm build`
4. [ ] Configure deploy hooks for automatic rebuilds
5. [ ] Remove old `content/data/` files (after migration verified)
