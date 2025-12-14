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

## Decision Tree

### Creating a new page global?

1. **Create global definition**: `lib/payload/globals/{PageName}.ts`
2. **Export from index**: Add to `lib/payload/globals/index.ts`
3. **Register in config**: Add to `lib/payload/payload.config.ts` imports and globals array
4. **Add seed type**: Update `lib/payload/data/types.ts`
5. **Create seed data**: Add to `lib/payload/data/page-metadata.seed.ts`
6. **Export seed**: Update `lib/payload/data/index.ts`
7. **Update seed script**: Add to `lib/payload/scripts/seed-payload.ts`
8. **Add query function**: Update `lib/payload/queries/page-metadata.ts`
9. **Export query**: Update `lib/payload/queries/index.ts`
10. **Generate types**: Run `pnpm payload:types`
11. **Update frontend**: Use query in page component

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

### Query Function

```typescript
export async function get{PageName}(): Promise<{PageName}> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "{page-name}" });
}
```

### Seed Type Definition

```typescript
export type {PageName}Seed = RequiredDataFromCollection<{PageName}>;
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

For detailed patterns and examples, see [references/PAYLOAD_LAYER_REFERENCE.md](references/PAYLOAD_LAYER_REFERENCE.md).
