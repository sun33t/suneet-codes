---
name: payload-layer
description: "This skill should be used when the user asks to 'create a page global', 'add payload global', 'migrate content to CMS', 'create seed data', 'add page metadata', 'update payload schema', or 'remove fields from payload'. Provides guidance for Payload CMS globals, collections, seed data, and queries in lib/payload/."
---

# Payload Layer Skill

## Scope

- `lib/payload/globals/*.ts` - Global configurations
- `lib/payload/collections/*.ts` - Collection configurations
- `lib/payload/data/*.ts` - Seed data files
- `lib/payload/queries/*.ts` - Query functions
- `lib/payload/scripts/seed-payload.ts` - Seed execution
- `lib/payload/payload.config.ts` - Payload configuration

## Which Reference to Use

| Task | Reference File |
|------|----------------|
| Setting up Payload in a **new project** | [PAYLOAD_BOOTSTRAP_REFERENCE.md](references/PAYLOAD_BOOTSTRAP_REFERENCE.md#bootstrap-checklist) |
| Adding globals/collections to an **existing project** | [PAYLOAD_LAYER_REFERENCE.md](references/PAYLOAD_LAYER_REFERENCE.md#patterns) |
| Infrastructure file templates (`get-payload.ts`, `lexical-helpers.ts`, etc.) | [PAYLOAD_BOOTSTRAP_REFERENCE.md](references/PAYLOAD_BOOTSTRAP_REFERENCE.md#infrastructure-files) |
| Collection/global patterns and frontend consumption | [PAYLOAD_LAYER_REFERENCE.md](references/PAYLOAD_LAYER_REFERENCE.md#patterns) |

**Rule**: PAYLOAD_BOOTSTRAP_REFERENCE.md is the single source of truth for infrastructure files. PAYLOAD_LAYER_REFERENCE.md references it and focuses on patterns for ongoing development.

**How to determine new vs existing project**: Check if `lib/payload/payload.config.ts` exists. If yes, it's an existing project. If no, use the bootstrap reference.

## Seed Type Distinction

Payload provides two helper types for seed data. Use the correct one:

| Entity Type | Helper Type | Example |
|-------------|-------------|---------|
| **Globals** | `RequiredDataFromCollection<GlobalType>` | `RequiredDataFromCollection<SiteConfig>` |
| **Collections** | `RequiredDataFromCollectionSlug<"slug">` | `RequiredDataFromCollectionSlug<"articles">` |

The difference: Globals use the generated TypeScript type directly, collections use the slug string.

## Decision Tree

### Setting up Payload CMS from scratch?

**FIRST**: Fetch the latest Payload + Next.js integration docs before proceeding. Use `mcp__Ref__ref_search_documentation` or `WebSearch` with query "Payload CMS Next.js 15 App Router setup 2025". The official docs cover:
- `next.config.js` configuration
- tsconfig path aliases (`@payload-config`)
- Admin route handler setup (`app/(payload)/`)
- Any version-specific requirements

Once Next.js integration is complete, proceed with project-specific setup:

1. **Install dependencies**: `pnpm add payload @payloadcms/db-postgres @payloadcms/richtext-lexical`
2. **Install dev dependencies**: `pnpm add -D dotenv-cli tsx`
3. **Create directory structure**: Set up `lib/payload/` with subdirectories
4. **Create infrastructure files**: See [PAYLOAD_BOOTSTRAP_REFERENCE.md](references/PAYLOAD_BOOTSTRAP_REFERENCE.md#infrastructure-files)
   - `get-payload.ts` - Payload client singleton
   - `deploy-hook.ts` - Vercel deploy trigger
   - `data/lexical-helpers.ts` - Rich text builder utilities
   - `data/types.ts` - Base seed type definitions
   - `globals/fields/metadata-fields.ts` - Reusable SEO fields
   - `globals/fields/page-intro-fields.ts` - Reusable page intro fields
   - `lexical/content-rich-text.tsx` - Rich text renderer component
4. **Create payload.config.ts**: Main configuration with db adapter
5. **Create Users collection**: Required for authentication
6. **Create SiteConfig global**: Site-wide settings
7. **Create seed script infrastructure**: `scripts/seed-payload.ts`
8. **Add npm scripts** to package.json:
   ```json
   "payload:types": "dotenv -e .env.local -- payload generate:types",
   "payload:generate": "dotenv -e .env.local -- payload migrate:create",
   "payload:migrate": "dotenv -e .env.local -- payload migrate",
   "payload:seed": "dotenv -e .env.local -- pnpm tsx lib/payload/scripts/seed-payload.ts"
   ```
9. **Set up environment variables**: `DATABASE_URI`, `PAYLOAD_SECRET`
10. **Generate types**: Run `pnpm payload:types`
11. **Run initial migration**: Run `pnpm payload:generate && pnpm payload:migrate`

### Creating a new collection?

1. **Create collection definition**: `lib/payload/collections/{CollectionName}.ts`
   - If collection has relationships, create referenced collections first (see "Collections with relationships" below)
2. **Export from index**: Add to `lib/payload/collections/index.ts`
3. **Register in config**: Add to `lib/payload/payload.config.ts` collections array
4. **Add seed type**: Add to `lib/payload/data/types.ts`
5. **Create seed data**: Add to `lib/payload/data/{collection}.seed.ts` (each collection gets its own file)
6. **Export seed**: Update `lib/payload/data/index.ts`
7. **Add seed function**: Add to `lib/payload/scripts/seed-payload.ts`
   - Order matters: seed referenced collections before collections that depend on them
   - Example order in `main()`: `seedAuthors()` → `seedCategories()` → `seedArticles()`
8. **Add to SEEDED_COLLECTIONS**: Add if the collection should be cleared before re-seeding (see criteria below)
9. **Create query functions** (if needed): Add to `lib/payload/queries/{collection}.ts`
   - Skip for auth-only collections like Users
   - Skip if data is only managed via admin panel, not consumed by frontend
10. **Export queries**: Update `lib/payload/queries/index.ts`
11. **Generate types**: Run `pnpm payload:types`
12. **Create migration**: Run `pnpm payload:generate`
13. **Apply migration**: Run `pnpm payload:migrate`
14. **Seed data**: Run `pnpm payload:seed`

**SEEDED_COLLECTIONS criteria**: Add a collection if:
- It has seed data that should reset on each `pnpm payload:seed`
- You want a clean slate when re-seeding (removes duplicates)

Do NOT add if:
- It's user-generated content that shouldn't be wiped (e.g., user uploads, comments)
- It's the Users collection (handled separately with default admin user)

### Creating a collection with relationships?

Follow "Creating a new collection" above, with these additional considerations:

1. **Create referenced collections first**: If Articles references Authors, create Authors collection first
2. **Define relationship fields** with `type: "relationship"` and `relationTo`
3. **Create `{Collection}WithRelations` type** in the query file for type-safe access to populated data
4. **Use `depth: 1`** in queries to populate relationships
5. **Order seed functions correctly**: In `main()`, seed referenced collections before dependent ones

See [Collection with Relationships pattern](references/PAYLOAD_LAYER_REFERENCE.md#pattern-5-collection-with-relationships) for full example.

**Why create `ArticleWithRelations`?** Payload generates union types for relationships because it doesn't know at type-generation time whether they'll be populated:
```typescript
// Generated type has unions:
interface Article {
  author: number | Author;  // Could be ID or object
}

// After querying with depth: 1, we KNOW it's populated.
// ArticleWithRelations asserts this for type safety:
type ArticleWithRelations = Omit<Article, "author"> & {
  author: Author;  // Always the full object
};
```

### Creating a new page global?

1. **Create global definition**: `lib/payload/globals/{PageName}.ts`
2. **Export from index**: Add to `lib/payload/globals/index.ts`
3. **Register in config**: Add to `lib/payload/payload.config.ts` imports and globals array
4. **Add seed type**: Update `lib/payload/data/types.ts`
5. **Create seed data**: Add to `lib/payload/data/page-metadata.seed.ts` (all page globals share this file)
6. **Export seed**: Update `lib/payload/data/index.ts`
7. **Update seed script**: Add to `seedPageMetadata()` pages array in `lib/payload/scripts/seed-payload.ts`
8. **Add query function**: Add to `lib/payload/queries/page-metadata.ts` (all page global queries share this file)
9. **Export query**: Update `lib/payload/queries/index.ts`
10. **Generate types**: Run `pnpm payload:types`
11. **Update frontend**: Use query in page component

**Seed file convention**:
- Page globals: All share `page-metadata.seed.ts`
- SiteConfig: Uses `site-config.seed.ts`
- Collections: Each gets its own file `{collection}.seed.ts`

### Adding or changing fields in an existing global?

1. **Update global definition**: Edit fields in `lib/payload/globals/{Name}.ts`
2. **Update seed data**: Modify corresponding seed file
   - Page globals: `lib/payload/data/page-metadata.seed.ts`
   - SiteConfig: `lib/payload/data/site-config.seed.ts`
3. **Generate types**: Run `pnpm payload:types`
4. **Create migration**: Run `pnpm payload:generate`
5. **Apply migration**: Run `pnpm payload:migrate`
6. **Re-seed**: Run `pnpm payload:seed`
7. **Update frontend**: Adjust components using the global

### Moving content from SiteConfig to a page global?

1. **Create/update page global**: Add fields with `createPageIntroFields()` + `createMetadataFields()`
2. **Remove from SiteConfig**: Delete fields from global definition
3. **Move seed data**: Transfer from `site-config.seed.ts` to `page-metadata.seed.ts`
4. **Update seed script**: Ensure new global is in `seedPageMetadata()` pages array
5. **Generate types**: Run `pnpm payload:types`
6. **Create migration**: Run `pnpm payload:generate`
7. **Apply migration**: Run `pnpm payload:migrate`
8. **Re-seed**: Run `pnpm payload:seed`
9. **Update frontend**: Change from `getSiteConfig()` to `get{PageName}()`

### Migrating environment variables to CMS?

1. **Identify candidates**: Content/config values (not secrets/API keys)
2. **Add fields to SiteConfig**: Create field groups for logical organization
3. **Update seed data**: Add values from `.env.local` to `site-config.seed.ts`
4. **Generate types**: Run `pnpm payload:types`
5. **Create migration**: Run `pnpm payload:generate`
6. **Apply migration**: Run `pnpm payload:migrate`
7. **Re-seed**: Run `pnpm payload:seed`
8. **Update frontend**: Replace `env.VAR_NAME` with `siteConfig.fieldName`
9. **Remove from env.ts**: Delete migrated variables from schema

**Good candidates for CMS**: Site title, description, social links, contact info, calendar URLs
**Keep in env vars**: API keys, secrets, domain config, infrastructure settings

### Creating seed data with rich text?

1. **Import helpers**: Use `richText`, `paragraph`, `text`, `externalLink`, `internalLink`, `heading` from `./lexical-helpers`
2. **Build content**: Compose Lexical JSON structure
3. **Cast type**: Use `as any` for complex Lexical structures
4. **Add biome comment**: Optional `// biome-ignore lint/suspicious/noExplicitAny: Lexical JSON`

### Removing fields from a global or collection?

1. **Remove field definition**: Delete field/group from `lib/payload/globals/{Name}.ts` or `lib/payload/collections/{Name}.ts`
2. **Remove seed data**: Delete corresponding data from `lib/payload/data/*.seed.ts`
3. **Update frontend**: Either hardcode values directly in JSX or remove usage entirely
4. **Clean up imports**: Remove unused query imports (e.g., `getSiteConfig()`) if no longer needed
5. **Generate types**: Run `pnpm payload:types`
6. **Create migration**: Run `pnpm payload:generate`
7. **Apply migration**: Run `pnpm payload:migrate`
8. **Re-seed**: Run `pnpm payload:seed`

**When to hardcode vs use CMS**: Static UI labels or values that rarely change (e.g., button text, section titles) can be hardcoded directly in JSX rather than managed through the CMS.

## File Templates

### Page Global Definition

```typescript
import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";
import { createPageIntroFields } from "./fields/page-intro-fields";

export const {PageName}: GlobalConfig = {
  slug: "{page-name}",
  hooks: { afterChange: [() => triggerDeployHook()] },
  admin: { group: "Pages", description: "{Page} page content and metadata" },
  access: { read: () => true, update: ({ req }) => !!req.user },
  fields: [createPageIntroFields(), createMetadataFields()],
};
```

### Simple Collection Definition

```typescript
import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const {CollectionName}: CollectionConfig = {
  slug: "{collection-slug}",
  hooks: {
    afterChange: [() => triggerDeployHook()],
    afterDelete: [() => triggerDeployHook()],
  },
  admin: {
    group: "{AdminGroup}",
    useAsTitle: "{titleField}",
    defaultColumns: ["{titleField}"],
    description: "{Collection description}",
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  defaultSort: "{titleField}",
  fields: [
    {
      name: "{titleField}",
      type: "text",
      required: true,
      unique: true,
      label: "{Field Label}",
    },
  ],
};
```

### Page Global Seed Data

```typescript
export const {PAGE_NAME}_PAGE_SEED: Partial<{PageName}Seed> = {
  pageIntro: {
    title: "Page Title",
    intro: richText([paragraph([text("Intro content")])]) as any,
  },
  metadata: {
    title: "page-title",
    description: "Page description",
    openGraph: {
      title: "page-title | suneet.codes",
      description: "Page description",
    },
  },
};
```

### Collection Seed Data

```typescript
import type { {CollectionName}Seed } from "./types";

export const {COLLECTION_NAME}_SEED: {CollectionName}Seed[] = [
  { {titleField}: "First Item" },
  { {titleField}: "Second Item" },
];
```

### Global Query Function

```typescript
export async function get{PageName}(): Promise<{PageName}> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "{page-name}" });
}
```

### Collection Query Function

```typescript
import { getPayloadClient } from "../get-payload";
import type { {CollectionName} } from "../payload-types";

export async function getAll{CollectionName}s(): Promise<{CollectionName}[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "{collection-slug}",
    limit: 100,
    depth: 0,
  });
  return result.docs;
}
```

### Global Seed Type

```typescript
export type {PageName}Seed = RequiredDataFromCollection<{PageName}>;
```

### Collection Seed Type

```typescript
export type {CollectionName}Seed = RequiredDataFromCollectionSlug<"{collection-slug}">;
```

## Update Checklist

When making Payload changes, update files in this order:

| Order | File | Action |
|-------|------|--------|
| 1 | `globals/{Name}.ts` or `collections/{Name}.ts` | Schema definition |
| 2 | `globals/index.ts` or `collections/index.ts` | Export |
| 3 | `payload.config.ts` | Register in config |
| 4 | `data/types.ts` | Seed type (if new) |
| 5 | `data/*.seed.ts` | Seed data |
| 6 | `data/index.ts` | Export seed |
| 7 | `scripts/seed-payload.ts` | Seed function |
| 8 | `queries/*.ts` | Query function |
| 9 | `queries/index.ts` | Export query |

Then run:
```bash
pnpm payload:types     # Generate TypeScript types
pnpm payload:generate  # Create migration (if schema changed)
pnpm payload:migrate   # Apply migration
pnpm payload:seed      # Populate data
pnpm typecheck         # Verify types
```

## Lexical Rich Text Helpers

Located in `lib/payload/data/lexical-helpers.ts`:

- `text(content, format?)` - Text node (format: `BOLD=1`, `BOLD_UNDERLINE=9`)
- `paragraph(children)` - Paragraph node
- `heading(tag, children)` - Heading node (h1-h6)
- `richText(paragraphs)` - Root rich text structure
- `externalLink(text, url)` - External link node
- `internalLink(text, path)` - Internal link node

## Mistakes

- ❌ Forgetting to export from `data/index.ts` (seed won't be found)
- ❌ Missing entry in `seed-payload.ts` pages array (data won't seed)
- ❌ Not running `pnpm payload:types` after schema changes
- ❌ Skipping migration generation/application
- ❌ Not updating frontend after moving content between globals
- ❌ Forgetting to add type to `data/types.ts` for new globals
- ❌ Using plural slugs that get singularized (see naming convention below)

## Type Naming Convention

**IMPORTANT**: Payload singularizes slug names when generating TypeScript types.

| Slug | Generated Type | Problem? |
|------|----------------|----------|
| `site-config` | `SiteConfig` | ✅ No issue |
| `site-settings` | `SiteSetting` | ⚠️ Singularized! |
| `about-page` | `AboutPage` | ✅ No issue |

**Recommendation**: Avoid slugs ending in "s" that look plural (settings, users, options). Use singular or compound names like `site-config` instead of `site-settings`.

## Validation

After changes, run:
```bash
.claude/skills/payload-layer/scripts/validate-payload-patterns.sh
pnpm payload:types
pnpm typecheck
pnpm build
```

## References

For detailed patterns and examples, see [PAYLOAD_LAYER_REFERENCE.md](references/PAYLOAD_LAYER_REFERENCE.md#patterns).
