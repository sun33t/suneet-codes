# Payload Bootstrap Reference

This document provides templates for setting up Payload CMS from scratch in a Next.js project.

## Prerequisite: Next.js Integration

**Before using this reference**, complete the official Payload + Next.js integration. Use `mcp__Ref__ref_search_documentation` or `WebSearch` with query "Payload CMS Next.js 15 App Router setup" to fetch current docs.

The official integration covers framework-level setup that this reference does not:
- `next.config.js` / `next.config.ts` configuration
- tsconfig path aliases (the `@payload-config` alias used in `get-payload.ts`)
- Admin route handlers (`app/(payload)/admin/[[...segments]]/page.tsx`)
- API route handlers
- Version-specific requirements

This reference focuses on **project-specific patterns** (globals, collections, seed data, queries) that build on top of the framework integration.

## Directory Structure

Create this structure before adding files:

```
lib/payload/
├── payload.config.ts           # Main Payload configuration
├── payload-types.ts            # Auto-generated (DO NOT CREATE)
├── get-payload.ts              # Payload client singleton
├── deploy-hook.ts              # Deployment trigger hook
├── globals/
│   ├── index.ts                # Global exports
│   └── fields/
│       ├── metadata-fields.ts  # Reusable SEO field group
│       └── page-intro-fields.ts # Reusable page intro field group
├── collections/
│   └── index.ts                # Collection exports
├── data/
│   ├── index.ts                # Seed data exports
│   ├── types.ts                # Seed type definitions
│   └── lexical-helpers.ts      # Rich text builder utilities
├── queries/
│   └── index.ts                # Query exports
├── scripts/
│   └── seed-payload.ts         # Seed execution script
├── migrations/
│   └── index.ts                # Migration registry (auto-managed)
└── lexical/
    └── content-rich-text.tsx   # Rich text renderer component
```

## Infrastructure Files

### get-payload.ts

Singleton pattern for accessing the Payload client:

```typescript
import config from "@payload-config";
import { getPayload } from "payload";

export async function getPayloadClient() {
  return getPayload({ config });
}
```

### deploy-hook.ts

Triggers Vercel rebuild after CMS changes:

```typescript
/**
 * Triggers a Vercel deploy hook to rebuild the site after CMS content changes.
 * In development, the hook URL is typically not set, so rebuilds are skipped.
 */
export async function triggerDeployHook(): Promise<void> {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

  if (!hookUrl) {
    console.log("[Deploy Hook] Skipping - VERCEL_DEPLOY_HOOK_URL not configured");
    return;
  }

  try {
    const response = await fetch(hookUrl, { method: "POST" });

    if (response.ok) {
      console.log("[Deploy Hook] Successfully triggered rebuild");
    } else {
      console.error(
        `[Deploy Hook] Failed to trigger rebuild: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("[Deploy Hook] Error triggering rebuild:", error);
  }
}
```

### payload.config.ts

Main configuration file:

```typescript
import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

// Import collections
import { Users } from "./collections";

// Import globals
import { SiteConfig } from "./globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    // Add other collections here
  ],
  globals: [
    SiteConfig,
    // Add other globals here
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
    },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  editor: lexicalEditor(),
});
```

### data/lexical-helpers.ts

Utilities for building Lexical rich text in seed data:

```typescript
/**
 * Lexical rich text helpers for creating seed data.
 * These helpers create valid Lexical JSON structures for Payload CMS.
 */

/**
 * Helper to create a text node for Lexical
 */
export const text = (content: string, format: number = 0) => ({
  type: "text",
  text: content,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

/**
 * Helper to create a paragraph node for Lexical
 */
export const paragraph = (children: unknown[]) => ({
  type: "paragraph",
  version: 1,
  children,
  direction: "ltr",
  format: "",
  indent: 0,
  textFormat: 0,
  textStyle: "",
});

/**
 * Helper to create an internal link node for Lexical
 */
export const internalLink = (linkText: string, url: string) => ({
  type: "link",
  version: 3,
  children: [text(linkText, 1)], // bold text
  direction: "ltr",
  format: "",
  indent: 0,
  fields: {
    linkType: "custom",
    url,
    newTab: false,
  },
});

/**
 * Helper to create an external link node for Lexical
 */
export const externalLink = (linkText: string, url: string) => ({
  type: "link",
  version: 3,
  children: [text(linkText, 1)], // bold text
  direction: "ltr",
  format: "",
  indent: 0,
  fields: {
    linkType: "custom",
    url,
    newTab: true,
  },
});

/**
 * Helper to create a root node wrapper for Lexical
 */
export const richText = (paragraphs: unknown[]) => ({
  root: {
    type: "root",
    children: paragraphs,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  },
});

/**
 * Helper to create a heading node for Lexical
 */
export const heading = (
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  children: unknown[]
) => ({
  type: "heading",
  tag,
  version: 1,
  children,
  direction: "ltr",
  format: "",
  indent: 0,
});

// Format constants: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline
export const BOLD = 1;
export const ITALIC = 2;
export const STRIKETHROUGH = 4;
export const UNDERLINE = 8;
export const BOLD_UNDERLINE = 9; // 1 + 8
```

### data/types.ts

Base seed type definitions:

```typescript
import type {
  RequiredDataFromCollection,
  RequiredDataFromCollectionSlug,
} from "payload";

// Import generated types (after running pnpm payload:types)
import type { SiteConfig } from "../payload-types";

// For globals, use RequiredDataFromCollection<GlobalType>
export type SiteConfigSeed = RequiredDataFromCollection<SiteConfig>;

// For collections, use RequiredDataFromCollectionSlug<"slug">
// Example: export type ArticleSeed = RequiredDataFromCollectionSlug<"articles">;
```

### globals/fields/metadata-fields.ts

Reusable SEO metadata field group:

```typescript
import type { GroupField } from "payload";

/**
 * TypeScript type for the metadata field group.
 */
export type PageMetadata = {
  title: string;
  description: string;
  openGraph?: {
    title?: string | null;
    description?: string | null;
  } | null;
};

/**
 * Creates a reusable metadata field group for page globals.
 */
export const createMetadataFields = (): GroupField => ({
  name: "metadata",
  type: "group",
  label: "SEO Metadata",
  admin: {
    position: "sidebar",
    description: "Page metadata for SEO and social sharing",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Page Title",
      required: true,
      admin: {
        description: "The page title shown in browser tabs and search results",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
      admin: {
        description: "Meta description for search engines",
      },
    },
    {
      name: "openGraph",
      type: "group",
      label: "Open Graph",
      admin: {
        description: "Metadata for social media sharing",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "OG Title",
          admin: {
            description: "Title when shared on social media (defaults to page title if empty)",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "OG Description",
          admin: {
            description: "Description when shared on social media (defaults to page description if empty)",
          },
        },
      ],
    },
  ],
});
```

### globals/fields/page-intro-fields.ts

Reusable page intro field group:

```typescript
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { GroupField } from "payload";

/**
 * TypeScript type for the page intro field group.
 */
export type PageIntro = {
  title: string;
  intro: SerializedEditorState;
};

/**
 * Creates a reusable page intro field group for page globals.
 */
export const createPageIntroFields = (): GroupField => ({
  name: "pageIntro",
  type: "group",
  label: "Page Intro",
  admin: {
    description: "Content displayed at the top of the page",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Page Title",
      required: true,
      admin: {
        description: "The main heading displayed on the page (H1)",
      },
    },
    {
      name: "intro",
      type: "richText",
      label: "Intro Text",
      required: true,
      admin: {
        description: "Introductory content displayed below the title",
      },
    },
  ],
});
```

### lexical/content-rich-text.tsx

Client component for rendering rich text:

```tsx
"use client";

import type { SerializedLinkNode } from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { LinkJSXConverter, RichText } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils"; // Adjust import path as needed

/**
 * Converts links to URLs for rich text content.
 */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  if (linkNode.fields.linkType === "custom") {
    return linkNode.fields.url ?? "/";
  }
  const { relationTo, value } = linkNode.fields.doc ?? {};
  if (typeof value === "object" && value !== null && "slug" in value) {
    return `/${relationTo}/${value.slug}`;
  }
  return "/";
};

/**
 * Client component for rendering rich text content.
 */
export function ContentRichText({
  data,
  className,
}: {
  data: SerializedEditorState;
  className?: string;
}) {
  return (
    <RichText
      className={cn(
        "space-y-4 [&_a]:text-accent-foreground [&_strong]:font-semibold",
        className
      )}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        ...LinkJSXConverter({ internalDocToHref }),
      })}
      data={data}
    />
  );
}
```

## Essential Collections

### Users Collection (Required)

The Users collection is required for Payload authentication:

```typescript
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    group: "Auth",
    useAsTitle: "email",
  },
  auth: true,
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [],
};
```

### collections/index.ts

```typescript
export { Users } from "./Users";
// Add other collection exports here
```

## Essential Globals

### SiteConfig Global

Site-wide configuration:

```typescript
import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const SiteConfig: GlobalConfig = {
  slug: "site-config",
  hooks: {
    afterChange: [() => triggerDeployHook()],
  },
  admin: {
    group: "Settings",
    description: "Site-wide configuration and settings",
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "siteOwner",
      type: "text",
      label: "Site Owner",
      required: true,
      admin: {
        description: "Name of the site owner",
      },
    },
    {
      name: "siteTitle",
      type: "text",
      label: "Site Title",
      required: true,
      admin: {
        description: "The main title of the site",
      },
    },
    {
      name: "siteDescription",
      type: "textarea",
      label: "Site Description",
      required: true,
      admin: {
        description: "Default meta description for SEO",
      },
    },
    {
      name: "socialLinks",
      type: "group",
      label: "Social Links",
      admin: {
        description: "Links to social media profiles",
      },
      fields: [
        {
          name: "github",
          type: "text",
          label: "GitHub URL",
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
        },
        // Add more social links as needed
      ],
    },
    {
      name: "contact",
      type: "group",
      label: "Contact Information",
      fields: [
        {
          name: "email",
          type: "email",
          label: "Contact Email",
          required: true,
        },
      ],
    },
  ],
};
```

### globals/index.ts

```typescript
export { SiteConfig } from "./SiteConfig";
// Add other global exports here
```

## Seed Script Infrastructure

### scripts/seed-payload.ts

Base seed script structure:

```typescript
import { getPayloadClient } from "../get-payload";

// Import seed data
// import { SITE_CONFIG_SEED } from "../data";

/** Collections that get seeded and should be cleared before re-seeding */
const SEEDED_COLLECTIONS = [
  "users",
  // Add other collection slugs here
] as const;

/**
 * Clears all documents from seeded collections.
 */
async function clearCollections() {
  const payload = await getPayloadClient();

  console.log("Clearing existing data from collections...");

  for (const collection of SEEDED_COLLECTIONS) {
    try {
      const result = await payload.delete({
        collection,
        where: { id: { exists: true } },
      });
      const count = Array.isArray(result.docs) ? result.docs.length : 0;
      console.log(`  ✓ Cleared ${count} documents from ${collection}`);
    } catch (error) {
      console.error(`  ✗ Failed to clear ${collection}:`, error);
    }
  }

  console.log("Collections cleared!\n");
}

/**
 * Creates a default admin user from environment variables.
 */
async function seedDefaultUser() {
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;

  if (!email || !password) {
    console.log(
      "Skipping user seeding (DEFAULT_USER_EMAIL or DEFAULT_USER_PASSWORD not set)\n"
    );
    return;
  }

  const payload = await getPayloadClient();

  console.log("Seeding default user...");

  try {
    await payload.create({
      collection: "users",
      data: { email, password },
    });
    console.log(`  ✓ Created default user: ${email}`);
  } catch (error) {
    console.error(`  ✗ Failed to create default user:`, error);
  }

  console.log("User seeding complete!\n");
}

/**
 * Seeds a global with provided data.
 */
async function seedGlobal(slug: string, data: unknown, name: string) {
  const payload = await getPayloadClient();

  try {
    await payload.updateGlobal({
      slug,
      data: data as Record<string, unknown>,
    });
    console.log(`  ✓ ${name} initialized`);
  } catch (error) {
    console.error(`  ✗ Failed to seed ${name}:`, error);
  }
}

/**
 * Seeds a collection with an array of items.
 */
async function seedCollection<T extends { [key: string]: unknown }>(
  collection: string,
  items: T[],
  nameField: keyof T
) {
  const payload = await getPayloadClient();

  console.log(`Seeding ${collection}...`);

  for (const item of items) {
    try {
      await payload.create({
        collection,
        data: item as Record<string, unknown>,
      });
      console.log(`  ✓ Created: ${String(item[nameField])}`);
    } catch (error) {
      console.error(`  ✗ Failed to create ${String(item[nameField])}:`, error);
    }
  }

  console.log(`${collection} seeding complete!\n`);
}

async function main() {
  console.log("Starting Payload CMS seed...\n");

  // Clear existing data
  await clearCollections();

  // Seed default user
  await seedDefaultUser();

  // Seed globals
  // await seedGlobal("site-config", SITE_CONFIG_SEED, "Site Config");

  // Seed collections (order matters for relationships)
  // await seedCollection("authors", AUTHORS_SEED, "name");

  console.log("\nSeed complete!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
```

## Query Infrastructure

### queries/site-config.ts

```typescript
import type { SiteConfig } from "../payload-types";
import { getPayloadClient } from "../get-payload";

export type { SiteConfig } from "../payload-types";

export async function getSiteConfig(): Promise<SiteConfig> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "site-config" });
}
```

### queries/index.ts

```typescript
export { getSiteConfig, type SiteConfig } from "./site-config";
// Add other query exports here
```

## Environment Variables

Required in `.env.local`:

```bash
# Database
DATABASE_URI=postgresql://user:password@host:5432/database

# Payload
PAYLOAD_SECRET=your-secret-key-here

# Optional: Default admin user for seeding
DEFAULT_USER_EMAIL=admin@example.com
DEFAULT_USER_PASSWORD=secure-password

# Optional: Vercel deploy hook
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

## Package.json Scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "payload:types": "dotenv -e .env.local -- payload generate:types",
    "payload:generate": "dotenv -e .env.local -- payload migrate:create",
    "payload:migrate": "dotenv -e .env.local -- payload migrate",
    "payload:seed": "dotenv -e .env.local -- pnpm tsx lib/payload/scripts/seed-payload.ts",
    "payload:reset": "dotenv -e .env.local -- pnpm tsx lib/payload/scripts/reset-database.ts"
  }
}
```

## Bootstrap Checklist

When setting up Payload from scratch:

- [ ] Install dependencies: `payload`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`
- [ ] Install dev dependencies: `dotenv-cli`, `tsx`
- [ ] Create `lib/payload/` directory structure
- [ ] Create `get-payload.ts`
- [ ] Create `deploy-hook.ts`
- [ ] Create `data/lexical-helpers.ts`
- [ ] Create `data/types.ts` (empty initially)
- [ ] Create `globals/fields/metadata-fields.ts`
- [ ] Create `globals/fields/page-intro-fields.ts`
- [ ] Create `lexical/content-rich-text.tsx`
- [ ] Create `collections/Users.ts`
- [ ] Create `collections/index.ts`
- [ ] Create `globals/SiteConfig.ts`
- [ ] Create `globals/index.ts`
- [ ] Create `payload.config.ts`
- [ ] Create `queries/site-config.ts`
- [ ] Create `queries/index.ts`
- [ ] Create `scripts/seed-payload.ts`
- [ ] Create `data/index.ts`
- [ ] Add npm scripts to package.json
- [ ] Set up environment variables
- [ ] Run `pnpm payload:types`
- [ ] Run `pnpm payload:generate`
- [ ] Run `pnpm payload:migrate`
- [ ] Run `pnpm payload:seed`
