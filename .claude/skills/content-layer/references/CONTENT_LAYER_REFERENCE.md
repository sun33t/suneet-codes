# Content Layer Reference

## Overview

The content layer manages all MDX articles and static content data for the portfolio/blog site. It uses `content-collections` for type-safe content management with Zod schema validation.

## File Organization

```
content/
├── articles/                    # MDX blog articles
│   ├── 0001-article-name.mdx
│   ├── 0002-another-article.mdx
│   └── ...
└── data/                        # Static TypeScript data
    ├── categories.ts            # Article category definitions
    ├── projects.ts              # Portfolio projects
    ├── roles.ts                 # Resume/work experience
    └── testimonials.ts          # Testimonial quotes

content-collections.ts           # Schema configuration (root)
lib/content/articles.ts          # Article fetching utilities
```

## Patterns

### Pattern 1: Article Schema (content-collections.ts)

**When to use**: Defining or modifying article frontmatter structure

**Structure**:
```typescript
import { defineCollection, defineConfig } from "@content-collections/core";
import { CATEGORYTITLES } from "@/content/data/categories";
import { createArticleSlug } from "./lib/utils/createArticleSlug";

const articles = defineCollection({
  name: "articles",
  directory: "./content/articles",
  include: "**/*.mdx",
  parser: "frontmatter-only",
  schema: (z) => ({
    title: z.string(),
    author: z.string(),
    isPublished: z.boolean().default(false),
    date: z.string().date(),
    updatedAt: z.string().date(),
    description: z.string(),
    coverImage: z.string(),
    keywords: z.array(z.string()),
    categories: z
      .array(z.enum(CATEGORYTITLES))
      .min(1, { message: "At least one category is required" }),
  }),
  transform: (doc) => {
    const slug = createArticleSlug(doc._meta.path);
    return { ...doc, slug };
  },
});

export default defineConfig({
  collections: [articles],
});
```

**Key points**:
- `parser: "frontmatter-only"` - Only parses YAML frontmatter, not MDX body
- Categories validated against `CATEGORYTITLES` enum
- Slug computed from filename via `createArticleSlug` utility
- All fields required unless `.default()` specified

### Pattern 2: Category Definitions

**When to use**: Adding or managing valid article categories

**Structure**:
```typescript
// content/data/categories.ts
import slugify from "slugify";

export const CATEGORYTITLES = [
  "bun",
  "code-quality",
  "deno",
  "fun",
  "git",
  "node",
  "typescript",
] as const;

type CategoryTitleWithSlug = {
  title: (typeof CATEGORYTITLES)[number];
  slug: string;
};

export const CATEGORYWITHSLUGS: CategoryTitleWithSlug[] =
  CATEGORYTITLES.toSorted().map((title) => ({
    title,
    slug: slugify(title, { lower: true, trim: true, strict: true }),
  }));

export const CATEGORY_PARAM_NAME = "category";
```

**Key points**:
- `CATEGORYTITLES` is the single source of truth for valid categories
- Uses `as const` for literal type inference
- `CATEGORYWITHSLUGS` auto-generates URL-safe slugs
- Adding a category here automatically makes it valid in article frontmatter

### Pattern 3: Article Frontmatter

**When to use**: Creating new articles or modifying existing ones

**Structure**:
```yaml
---
isPublished: true
title: "Full Article Title"
author: Suneet Misra
date: 2025-01-27
updatedAt: 2025-02-11
description: A concise description for SEO and article previews.
coverImage: cloudinary-public-id_suffix
keywords:
  [
    "javascript",
    "typescript",
    "relevant-keyword",
  ]
categories: ["node", "code-quality", "typescript"]
---
```

**Field requirements**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| isPublished | boolean | Yes (default: false) | Controls visibility |
| title | string | Yes | Full article title |
| author | string | Yes | Author name |
| date | string (YYYY-MM-DD) | Yes | Publication date |
| updatedAt | string (YYYY-MM-DD) | Yes | Last update date |
| description | string | Yes | SEO meta description |
| coverImage | string | Yes | Cloudinary public ID |
| keywords | string[] | Yes | SEO keywords |
| categories | CategoryTitle[] | Yes (min 1) | From CATEGORYTITLES |

### Pattern 4: MDX Custom Components

**When to use**: Adding rich content to articles

**Available components**:
```mdx
{/* Cover image with Cloudinary */}
<SuspendedArticleImage
  src="cloudinary-public-id"
  alt="descriptive alt text"
/>

{/* Series navigation */}
<SeriesSection
  seriesDescription="Description of the series..."
  seriesEntries={[
    { id: 1, title: "Part 1", slug: "slug-1", isCurrent: true },
    { id: 2, title: "Part 2", slug: "slug-2" },
  ]}
/>

{/* Code blocks with syntax highlighting (CodeHike) */}
```typescript
// Code here gets syntax highlighting automatically
```
```

### Pattern 5: Article Fetching (lib/content/articles.ts)

**When to use**: Querying articles for pages

**Key exports**:
- `allArticles` - All articles from content-collections
- `publishedArticles` - Filtered to `isPublished: true`
- `latestArticles` - Most recent published articles (for homepage)
- `getArticleBySlug(slug)` - Single article lookup

## Error Handling

Content-collections validates at build time:
- Missing required frontmatter fields → Build error with field name
- Invalid category → Build error showing valid options
- Invalid date format → Build error

## Testing

No unit tests for content - validation happens at build time:
```bash
pnpm build  # Validates all article frontmatter
```

## Integration Points

- **Pages**: Articles fetched via `lib/content/articles.ts` exports
- **Components**: MDX components from `components/mdx/`
- **Images**: Cloudinary via `next-cloudinary`
- **Types**: Generated types available via `import { Article } from "content-collections"`

## Anti-Patterns

### Don't: Invalid Category

```yaml
# Bad - category doesn't exist
categories: ["react", "nextjs"]
```

**Why it's wrong**: Categories must be from `CATEGORYTITLES`. Build will fail.

### Do: Valid Categories

```yaml
# Good - using defined categories
categories: ["typescript", "node"]
```

### Don't: Wrong Date Format

```yaml
# Bad
date: January 27, 2025
updatedAt: 01/27/2025
```

**Why it's wrong**: Dates must be ISO format `YYYY-MM-DD`.

### Do: Correct Date Format

```yaml
# Good
date: 2025-01-27
updatedAt: 2025-01-27
```

### Don't: Skip Numeric Prefix

```bash
# Bad filename
my-article.mdx
```

**Why it's wrong**: Slug generation expects `NNNN-slug.mdx` format.

### Do: Use Numeric Prefix

```bash
# Good filename
0005-my-article.mdx
```

## Checklist

Before completing work in this layer:

- [ ] All required frontmatter fields present
- [ ] Categories are valid (from CATEGORYTITLES)
- [ ] Date format is YYYY-MM-DD
- [ ] Filename follows NNNN-slug.mdx pattern
- [ ] `isPublished` set appropriately (false for drafts)
- [ ] Cover image uploaded to Cloudinary
- [ ] `pnpm build` passes without errors
