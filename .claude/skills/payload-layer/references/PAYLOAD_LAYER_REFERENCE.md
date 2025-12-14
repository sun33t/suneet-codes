# Payload Layer Reference

## Overview

The payload layer manages all Payload CMS configuration including globals, collections, seed data, queries, and migrations. Uses Postgres via Neon with Lexical rich text editor.

## File Organization

```
lib/payload/
├── payload.config.ts           # Main Payload configuration
├── payload-types.ts            # Auto-generated types (DO NOT EDIT)
├── get-payload.ts              # Payload client singleton
├── deploy-hook.ts              # Deployment trigger hook
├── globals/
│   ├── index.ts                # Global exports
│   ├── fields/
│   │   ├── metadata-fields.ts  # Reusable metadata field group
│   │   └── page-intro-fields.ts # Reusable pageIntro field group
│   ├── AboutPage.ts
│   ├── ArticlesPage.ts
│   ├── ContactPage.ts
│   ├── FollowingPage.ts
│   ├── HomePage.ts
│   ├── ProjectsPage.ts
│   ├── SiteConfig.ts           # Site-wide config (title, social links, contact)
│   ├── ThankYouPage.ts
│   └── UsesPage.ts
├── collections/
│   ├── index.ts                # Collection exports
│   ├── Articles.ts
│   ├── Authors.ts
│   ├── Categories.ts
│   └── ... (other collections)
├── data/
│   ├── index.ts                # Seed data exports
│   ├── types.ts                # Seed type definitions
│   ├── lexical-helpers.ts      # Rich text builder utilities
│   ├── page-metadata.seed.ts   # Page global seed data
│   ├── site-config.seed.ts     # SiteConfig seed data
│   └── ... (collection seed files)
├── queries/
│   ├── index.ts                # Query exports
│   ├── page-metadata.ts        # Page global queries
│   ├── site-config.ts          # SiteConfig queries
│   └── ... (collection queries)
├── scripts/
│   └── seed-payload.ts         # Seed execution script
├── migrations/
│   ├── index.ts                # Migration registry
│   └── *.ts                    # Migration files
└── lexical/
    └── content-rich-text.tsx   # Rich text renderer component
```

## Patterns

### Pattern 1: Page Global with pageIntro

**When to use**: Any page that needs title, intro text, and metadata.

**Global definition** (`lib/payload/globals/{PageName}.ts`):
```typescript
import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";
import { createPageIntroFields } from "./fields/page-intro-fields";

export const {PageName}: GlobalConfig = {
  slug: "{page-name}",
  hooks: {
    afterChange: [() => triggerDeployHook()],
  },
  admin: {
    group: "Pages",
    description: "{Page} page content and metadata",
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [createPageIntroFields(), createMetadataFields()],
};
```

**Export** (`lib/payload/globals/index.ts`):
```typescript
export { {PageName} } from "./{PageName}";
```

**Register** (`lib/payload/payload.config.ts`):
```typescript
import { {PageName} } from "./globals";

// In buildConfig:
globals: [
  // ... existing globals
  {PageName},
],
```

**Seed type** (`lib/payload/data/types.ts`):
```typescript
import type { {PageName} } from "../payload-types";

export type {PageName}Seed = RequiredDataFromCollection<{PageName}>;
```

**Seed data** (`lib/payload/data/page-metadata.seed.ts`):
```typescript
import type { {PageName}Seed } from "./types";

export const {PAGE_NAME}_PAGE_SEED: Partial<{PageName}Seed> = {
  pageIntro: {
    title: "Page Title",
    intro: richText([
      paragraph([text("Intro paragraph text.")]),
    ]) as any,
  },
  metadata: {
    title: "page-title",
    description: "Page description for SEO",
    openGraph: {
      title: "page-title | suneet.codes",
      description: "Page description for social sharing",
    },
  },
};
```

**Export seed** (`lib/payload/data/index.ts`):
```typescript
export { {PAGE_NAME}_PAGE_SEED } from "./page-metadata.seed";
export type { {PageName}Seed } from "./types";
```

**Seed script** (`lib/payload/scripts/seed-payload.ts`):
```typescript
import { {PAGE_NAME}_PAGE_SEED } from "../data";

// In seedPageMetadata():
const pages = [
  // ... existing pages
  { slug: "{page-name}", data: {PAGE_NAME}_PAGE_SEED, name: "{Page}" },
] as const;
```

**Query function** (`lib/payload/queries/page-metadata.ts`):
```typescript
import type { {PageName} } from "../payload-types";

export type { {PageName} as Payload{PageName} } from "../payload-types";

export async function get{PageName}(): Promise<{PageName}> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "{page-name}" });
}
```

**Export query** (`lib/payload/queries/index.ts`):
```typescript
export {
  get{PageName},
  type Payload{PageName},
} from "./page-metadata";
```

### Pattern 2: SiteConfig Fields

**When to use**: Site-wide config not specific to a single page (site title, social links, contact info, etc.)

**Add field** (`lib/payload/globals/SiteConfig.ts`):
```typescript
{
  name: "groupName",
  type: "group",
  label: "Group Label",
  admin: {
    description: "Description of this config group",
  },
  fields: [
    {
      name: "fieldName",
      type: "text",
      label: "Field Label",
      required: true,
      admin: {
        description: "Field description",
      },
    },
  ],
},
```

**Seed data** (`lib/payload/data/site-config.seed.ts`):
```typescript
export const SITE_CONFIG_SEED: Partial<SiteConfigSeed> = {
  groupName: {
    fieldName: "Value",
  },
};
```

**Current SiteConfig structure**:
- `siteOwner` - Name for footer copyright
- `siteTitle` - Site title for metadata
- `siteDescription` - Default meta description
- `socialLinks` group - github, linkedin, bluesky, notion URLs
- `contact` group - email, calendarUrl

### Pattern 3: Rich Text Content

**When to use**: Any field with formatted text content.

**Import helpers**:
```typescript
import {
  BOLD,
  BOLD_UNDERLINE,
  externalLink,
  heading,
  internalLink,
  paragraph,
  richText,
  text,
} from "./lexical-helpers";
```

**Simple paragraph**:
```typescript
richText([
  paragraph([text("Plain text content.")]),
])
```

**Formatted text**:
```typescript
richText([
  paragraph([
    text("Regular text, "),
    text("bold text", BOLD),
    text(", and "),
    text("bold underlined", BOLD_UNDERLINE),
    text("."),
  ]),
])
```

**With links**:
```typescript
richText([
  paragraph([
    text("Check out "),
    externalLink("this site", "https://example.com"),
    text(" or visit "),
    internalLink("the about page", "/about"),
    text("."),
  ]),
])
```

**With headings**:
```typescript
richText([
  heading("h2", [text("Section Title")]),
  paragraph([text("Section content.")]),
])
```

### Pattern 4: Frontend Consumption

**Page component**:
```tsx
import {
  get{PageName},
  toNextMetadata,
} from "@/lib/payload/queries";
import { ContentRichText } from "@/lib/payload/lexical/content-rich-text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await get{PageName}();
  return toNextMetadata(page.metadata);
}

export default async function Page() {
  const page = await get{PageName}();

  return (
    <PageContainer>
      <PageIntro title={page.pageIntro.title}>
        <ContentRichText data={page.pageIntro.intro} />
      </PageIntro>
      {/* Page content */}
    </PageContainer>
  );
}
```

## Commands

```bash
pnpm payload:types    # Generate TypeScript types from schema
pnpm payload:generate # Create new migration from schema changes
pnpm payload:migrate  # Apply pending migrations
pnpm payload:seed     # Run seed script to populate data
pnpm payload:reset    # Reset database (destructive)
```

## Reusable Field Groups

### pageIntro Fields

Defined in `lib/payload/globals/fields/page-intro-fields.ts`:
- `title` (text, required) - Page H1 heading
- `intro` (richText, required) - Intro content below title

Type: `PageIntro` from same file.

### metadata Fields

Defined in `lib/payload/globals/fields/metadata-fields.ts`:
- `title` (text, required) - SEO title
- `description` (text, required) - SEO description
- `openGraph` (group) - OG title, description

Type: `PageMetadata` from same file.

## Anti-Patterns

### Don't: Forget to export from index files

```typescript
// Bad - created seed but not exported
// lib/payload/data/page-metadata.seed.ts
export const NEW_PAGE_SEED = { ... };
// lib/payload/data/index.ts - missing export!
```

**Why it's wrong**: Seed script imports from `../data`, won't find unexported constants.

### Do: Export from all index files

```typescript
// lib/payload/data/index.ts
export { NEW_PAGE_SEED } from "./page-metadata.seed";
```

### Don't: Skip the seed script update

```typescript
// Bad - seed data exists but not in seedPageMetadata pages array
```

**Why it's wrong**: Data won't be seeded to database.

### Do: Add to pages array

```typescript
// lib/payload/scripts/seed-payload.ts
const pages = [
  { slug: "new-page", data: NEW_PAGE_SEED, name: "New" },
];
```

### Don't: Edit payload-types.ts manually

**Why it's wrong**: File is auto-generated, changes will be overwritten.

### Do: Run pnpm payload:types

Generate types after schema changes.

### Don't: Hardcode rich text JSON

```typescript
// Bad - manual Lexical JSON
const content = {
  root: {
    children: [
      { type: "paragraph", children: [...] }
    ]
  }
};
```

**Why it's wrong**: Error-prone, hard to maintain.

### Do: Use lexical-helpers

```typescript
import { richText, paragraph, text } from "./lexical-helpers";
const content = richText([paragraph([text("Content")])]);
```

## Checklist

Before completing Payload layer work:

- [ ] Global/collection exported from index file
- [ ] Registered in payload.config.ts
- [ ] Seed type defined in data/types.ts
- [ ] Seed data created and exported
- [ ] Seed script updated with new entry
- [ ] Query function created and exported
- [ ] `pnpm payload:types` run
- [ ] `pnpm payload:generate` run (if schema changed)
- [ ] `pnpm payload:migrate` run
- [ ] `pnpm payload:seed` run
- [ ] `pnpm typecheck` passes
- [ ] Frontend updated to use new/modified data
