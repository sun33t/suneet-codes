# Payload Layer Reference

## Purpose

This reference covers **patterns for ongoing Payload development** in an existing project:
- Adding page globals and collections
- Creating seed data and queries
- Frontend consumption patterns

For **initial setup and infrastructure file templates**, see [PAYLOAD_BOOTSTRAP_REFERENCE.md](PAYLOAD_BOOTSTRAP_REFERENCE.md#bootstrap-checklist).

## File Organization

See [PAYLOAD_BOOTSTRAP_REFERENCE.md](PAYLOAD_BOOTSTRAP_REFERENCE.md#directory-structure) for the complete directory structure and infrastructure file templates.

Key directories:
- `lib/payload/globals/` - Global configurations (SiteConfig, page globals)
- `lib/payload/collections/` - Collection configurations
- `lib/payload/data/` - Seed data and lexical helpers
- `lib/payload/queries/` - Query functions for frontend
- `lib/payload/scripts/` - Seed execution script

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

### Pattern 4: Simple Collection

**When to use**: Basic data like Authors, Keywords, or any simple entity.

**Collection definition** (`lib/payload/collections/{CollectionName}.ts`):
```typescript
import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Authors: CollectionConfig = {
  slug: "authors",
  hooks: {
    afterChange: [() => triggerDeployHook()],
    afterDelete: [() => triggerDeployHook()],
  },
  admin: {
    group: "Blog",
    useAsTitle: "name",
    defaultColumns: ["name"],
    description: "Article authors",
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  defaultSort: "name",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      label: "Author Name",
      admin: {
        description: "Full name of the author",
      },
    },
  ],
};
```

**Export** (`lib/payload/collections/index.ts`):
```typescript
export { Authors } from "./Authors";
```

**Seed type** (`lib/payload/data/types.ts`):
```typescript
export type AuthorSeed = RequiredDataFromCollectionSlug<"authors">;
```

**Seed data** (`lib/payload/data/authors.seed.ts`):
```typescript
import type { AuthorSeed } from "./types";

export const AUTHORS_SEED: AuthorSeed[] = [
  { name: "Suneet Misra" },
  { name: "Guest Author" },
];
```

**Seed function** (`lib/payload/scripts/seed-payload.ts`):
```typescript
async function seedAuthors() {
  const payload = await getPayloadClient();

  console.log("Seeding authors...");

  for (const author of AUTHORS_SEED) {
    try {
      await payload.create({
        collection: "authors",
        data: author,
      });
      console.log(`  ✓ Created author: ${author.name}`);
    } catch (error) {
      console.error(`  ✗ Failed to create author ${author.name}:`, error);
    }
  }

  console.log("Authors seeding complete!");
}
```

### Pattern 5: Collection with Relationships

**When to use**: Collections that reference other collections (e.g., Articles with Authors, Categories).

**Important**: Create related collections first (Authors, Categories, Keywords before Articles).

**Collection definition** (`lib/payload/collections/Articles.ts`):
```typescript
import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Articles: CollectionConfig = {
  slug: "articles",
  hooks: {
    afterChange: [() => triggerDeployHook()],
    afterDelete: [() => triggerDeployHook()],
  },
  admin: {
    group: "Blog",
    useAsTitle: "title",
    defaultColumns: ["title", "isPublished", "date", "author"],
    description: "Blog articles with rich text content",
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  defaultSort: "-date",
  fields: [
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
      label: "Published",
      admin: {
        description: "Only published articles are visible",
        position: "sidebar",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      minLength: 5,
      label: "Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
      admin: {
        description: "Used in URLs (e.g., 'my-article-title')",
        position: "sidebar",
      },
    },
    // Single relationship (required)
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      label: "Author",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Publish Date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "yyyy-MM-dd",
        },
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
      admin: {
        description: "Short description for article cards and SEO",
      },
    },
    // Many-to-many relationship (optional)
    {
      name: "keywords",
      type: "relationship",
      relationTo: "keywords",
      hasMany: true,
      label: "Keywords",
      admin: {
        description: "SEO keywords for the article",
        position: "sidebar",
      },
    },
    // Many-to-many relationship (required, min 1)
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      required: true,
      minRows: 1,
      label: "Categories",
      admin: {
        description: "Select at least one category",
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
    },
  ],
};
```

**Query with populated relationships** (`lib/payload/queries/articles.ts`):
```typescript
import { getPayloadClient } from "../get-payload";
import type { Article, Author, Category, Keyword } from "../payload-types";

export type { Article as PayloadArticle } from "../payload-types";

/**
 * Article with populated relationships (full objects instead of IDs).
 *
 * Why this type exists:
 * - The generated `Article` type has union types: `author: number | Author`
 * - This is because Payload doesn't know if relationships will be populated
 * - When using `depth: 1`, relationships ARE populated as full objects
 * - This type reflects that reality for type safety
 */
export type ArticleWithRelations = Omit<
  Article,
  "categories" | "keywords" | "author"
> & {
  categories: Category[];
  keywords: Keyword[];
  author: Author;
};

/**
 * Fetches all articles with populated relationships.
 */
export async function getAllArticles(): Promise<ArticleWithRelations[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "articles",
    sort: "-date",
    limit: 100,
    depth: 1, // Populate relationships one level deep
  });
  return result.docs as ArticleWithRelations[];
}

/**
 * Fetches only published articles.
 */
export async function getPublishedArticles(): Promise<ArticleWithRelations[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "articles",
    where: {
      isPublished: { equals: true },
    },
    sort: "-date",
    limit: 100,
    depth: 1,
  });
  return result.docs as ArticleWithRelations[];
}

/**
 * Fetches a single article by slug.
 */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithRelations | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "articles",
    where: {
      slug: { equals: slug },
      isPublished: { equals: true },
    },
    depth: 1,
    limit: 1,
  });
  return (result.docs[0] as ArticleWithRelations) ?? null;
}

/**
 * Fetches all published article slugs for generateStaticParams.
 */
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "articles",
    where: {
      isPublished: { equals: true },
    },
    limit: 100,
    depth: 0, // No need to populate for just slugs
  });
  return result.docs.map((article) => ({ slug: article.slug }));
}
```

**Understanding depth parameter**:
- `depth: 0` - Returns only IDs for relationships (faster, less data)
- `depth: 1` - Populates relationships one level (full objects)
- `depth: 2` - Populates nested relationships (relationships of relationships)

**Understanding union types in generated types**:
```typescript
// In payload-types.ts, relationships are typed as unions:
interface Article {
  author: number | Author;       // Could be ID or full object
  categories?: (number | Category)[] | null;
}

// After querying with depth: 1, we know they're populated:
// article.author.name  // ✅ Works at runtime
// But TypeScript still sees: number | Author

// Solution: Create ArticleWithRelations type that asserts the populated shape
```

### Pattern 6: Collection with Slug and Sort Order

**When to use**: Collections used for filtering/categorization (Categories, Tags).

```typescript
import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Categories: CollectionConfig = {
  slug: "categories",
  hooks: {
    afterChange: [() => triggerDeployHook()],
    afterDelete: [() => triggerDeployHook()],
  },
  admin: {
    group: "Blog",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "sortOrder"],
    description: "Article categories for filtering",
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  defaultSort: "sortOrder",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
      minLength: 2,
      label: "Category Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description: "Used in URLs for filtering",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      label: "Display Order",
      defaultValue: 0,
      admin: {
        description: "Order in filter list (lower numbers first)",
      },
    },
  ],
};
```

### Pattern 7: Frontend Consumption

**Helper function `toNextMetadata`**: Defined in `lib/payload/queries/page-metadata.ts`, converts Payload's `PageMetadata` to Next.js `Metadata` format. Falls back to page title/description if OG values are not set.

**Page component with global data**:
```tsx
import type { Metadata } from "next";
import {
  get{PageName},
  toNextMetadata,  // From page-metadata.ts
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

**Page component with collection data (articles list)**:
```tsx
import type { Metadata } from "next";
import {
  getArticlesPage,
  getPublishedArticles,
  toNextMetadata,
} from "@/lib/payload/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getArticlesPage();
  return toNextMetadata(page.metadata);
}

export default async function ArticlesPage() {
  const [page, articles] = await Promise.all([
    getArticlesPage(),
    getPublishedArticles(),
  ]);

  return (
    <PageContainer>
      <h1>{page.pageIntro.title}</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <a href={`/articles/${article.slug}`}>{article.title}</a>
            <p>By {article.author.name}</p> {/* Populated relationship */}
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
```

**Dynamic route with generateStaticParams**:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getAllArticleSlugs,
} from "@/lib/payload/queries";

// Generate static paths at build time
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs; // Returns [{ slug: "article-1" }, { slug: "article-2" }, ...]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <p>By {article.author.name}</p>
      <div>
        Categories: {article.categories.map((c) => c.title).join(", ")}
      </div>
      {/* Render article.content with rich text renderer */}
    </article>
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

For full implementation templates, see [PAYLOAD_BOOTSTRAP_REFERENCE.md](PAYLOAD_BOOTSTRAP_REFERENCE.md#infrastructure-files).

| Field Group | File | Fields | TypeScript Type |
|-------------|------|--------|-----------------|
| `createPageIntroFields()` | `globals/fields/page-intro-fields.ts` | `title` (text), `intro` (richText) | `PageIntro` |
| `createMetadataFields()` | `globals/fields/metadata-fields.ts` | `title`, `description`, `openGraph` | `PageMetadata` |

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
