# Page Layer Reference

## Overview

The page layer manages all Next.js App Router pages, layouts, and route-specific files. It uses React Server Components by default with Next.js 15's async params pattern.

## File Organization

```
app/
├── layout.tsx                  # Root layout (fonts, providers, global structure)
├── page.tsx                    # Home page (/)
├── not-found.tsx               # Global 404 page
├── about/
│   └── page.tsx                # /about
├── articles/
│   ├── page.tsx                # /articles (list page)
│   └── [slug]/
│       ├── page.tsx            # /articles/[slug] (dynamic route)
│       └── not-found.tsx       # Article-specific 404
├── contact/
│   └── page.tsx                # /contact
├── following/
│   └── page.tsx                # /following
├── projects/
│   └── page.tsx                # /projects
├── thank-you/
│   └── page.tsx                # /thank-you
└── uses/
    └── page.tsx                # /uses
```

## Patterns

### Pattern 1: Root Layout

**When to use**: Required at `app/layout.tsx`, wraps entire application

**Structure**:
```tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCldImageUrl } from "next-cloudinary";
import { Layout } from "@/components/layout";
import { Providers } from "@/components/providers";
import { TwSizeIndicator } from "@/components/shared/tw-size-indicator";
import { baseUrl } from "@/lib/config/baseUrl";
import { env } from "@/lib/config/env";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";
import "@/styles/globals.css";

const ogImageUrl = getCldImageUrl({
  src: withCloudinaryCloudName("profile/avatar_og"),
});

const geistSans = Geist({
  weight: "variable",
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },
    { media: "(prefers-color-scheme: light)", color: "ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    template: `%s | ${env.PROJECT_BASE_TITLE}`,
    default: env.PROJECT_BASE_TITLE,
  },
  description: env.PROJECT_BASE_DESCRIPTION,
  openGraph: {
    title: env.PROJECT_BASE_TITLE,
    description: env.PROJECT_BASE_DESCRIPTION,
    url: baseUrl.href,
    siteName: env.PROJECT_BASE_TITLE,
    images: [ogImageUrl],
    locale: "en_GB",
    type: "website",
  },
  robots: {
    ...(baseUrl.hostname === env.PROJECT_DOMAIN
      ? { index: true, follow: true }
      : { index: false, follow: false }),
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex h-full bg-background">
        <TwSizeIndicator />
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
```

**Key points**:
- Font loading with `next/font/google`
- `suppressHydrationWarning` on `<html>` for theme provider
- Providers wrap Layout for context availability
- `metadataBase` for resolving relative URLs
- Conditional robots based on environment

### Pattern 2: Static Page

**When to use**: Pages with no dynamic data

**Structure**:
```tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me and my journey.",
};

export default function AboutPage() {
  return (
    <Container className="mt-16">
      <PageIntro title="About Me">
        <p className="text-muted-foreground">
          Page introduction text here.
        </p>
      </PageIntro>
      {/* Page content */}
    </Container>
  );
}
```

**Key points**:
- Export `metadata` object for static meta tags
- Use layout components (Container, PageIntro)
- Server component by default (no `"use client"`)
- Animation classes on Container (`fade-in animate-in duration-1000`)

### Pattern 3: Dynamic Route (Next.js 15)

**When to use**: Pages with URL parameters (e.g., `/articles/[slug]`)

**Structure**:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCldImageUrl } from "next-cloudinary";
import { Container } from "@/components/layout/container";
import { env } from "@/lib/config/env";
import { allPublishedArticles, getArticleBySlug } from "@/lib/content/articles";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";

// CRITICAL: Next.js 15 params are Promises
type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static paths at build time
export async function generateStaticParams() {
  return allPublishedArticles.map((article) => ({
    slug: article.slug,
  }));
}

// Dynamic metadata based on params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // MUST await
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const ogImageUrl = getCldImageUrl({
    width: 960,
    height: 600,
    src: withCloudinaryCloudName(`articles/${article.coverImage}`),
  });

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      images: [ogImageUrl],
      title: article.title,
      description: article.description,
      url: `/articles/${slug}`,
      type: "article",
      authors: article.author,
      tags: article.categories,
      locale: "en-GB",
      siteName: env.PROJECT_BASE_TITLE,
    },
  };
}

// Page component
export default async function Page({ params }: Props) {
  const { slug } = await params; // MUST await

  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  // Dynamic import for MDX content
  const { default: ArticleContent } = await import(
    `@/content/articles/${article._meta.fileName}`
  );

  return (
    <Container className="mt-16">
      <article>
        <h1>{article.title}</h1>
        <ArticleContent />
      </article>
    </Container>
  );
}
```

**Key points**:
- `params` type is `Promise<{ slug: string }>` in Next.js 15
- MUST `await params` before accessing properties
- `generateStaticParams` returns array of param objects
- `generateMetadata` is async and receives same props
- Use `notFound()` for missing data (renders not-found.tsx)
- Dynamic imports for MDX content

### Pattern 4: Not Found Page

**When to use**: Custom 404 pages (global or route-specific)

**Structure**:
```tsx
// app/not-found.tsx (global) or app/articles/[slug]/not-found.tsx (route)
import { NotFound } from "@/components/shared/not-found";

export default function NotFoundPage() {
  return (
    <NotFound
      title="Page Not Found"
      message="The page you're looking for doesn't exist."
      linkHref="/"
      linkText="Go home"
    />
  );
}
```

**Key points**:
- Named `not-found.tsx` (not `404.tsx`)
- Route-specific not-found overrides global
- Triggered by `notFound()` function call

### Pattern 5: Metadata with OpenGraph Images

**When to use**: Pages needing social sharing images

**Structure**:
```tsx
import type { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";
import { env } from "@/lib/config/env";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";

const ogImageUrl = getCldImageUrl({
  width: 1200,
  height: 630,
  src: withCloudinaryCloudName("path/to/og-image"),
});

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for search engines and social sharing.",
  openGraph: {
    title: "Page Title",
    description: "Page description for social sharing.",
    url: "/page-path",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Image description",
      },
    ],
    type: "website", // or "article" for blog posts
    locale: "en_GB",
    siteName: env.PROJECT_BASE_TITLE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title",
    description: "Page description",
    images: [ogImageUrl],
  },
};
```

**Key points**:
- Use `getCldImageUrl` from `next-cloudinary` for optimized OG images
- Standard OG image size: 1200x630
- Include both `openGraph` and `twitter` for full coverage
- Use `withCloudinaryCloudName` helper for image paths

## Error Handling

Pages should handle:
- Missing data → Call `notFound()`
- Invalid params → Call `notFound()` or redirect
- Errors → Let error.tsx boundary handle

```tsx
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const data = getData(slug);
  if (!data) {
    notFound(); // Renders not-found.tsx
  }

  return <div>{data.title}</div>;
}
```

## Testing

Pages tested via:
- `pnpm build` - Validates all routes build successfully
- `pnpm typecheck` - TypeScript validation
- Browser testing at each route

## Integration Points

- **Layout Components**: `@/components/layout/` (Container, PageIntro, etc.)
- **Content**: `@/lib/content/articles` for article data
- **Config**: `@/lib/config/env` for environment variables
- **Images**: `next-cloudinary` for optimized images
- **Navigation**: `next/link` and `next/navigation`

## Anti-Patterns

### Don't: Sync Params Access (Next.js 15)

```tsx
// Bad - params is a Promise in Next.js 15
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params; // Type error!
}
```

**Why it's wrong**: Next.js 15 changed params to be async.

### Do: Await Params

```tsx
// Good - await the Promise
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

### Don't: Client Components for Pages

```tsx
// Bad - unnecessary client boundary
"use client";

export default function AboutPage() {
  return <div>About</div>;
}
```

**Why it's wrong**: Pages should be server components. Move interactivity to child components.

### Do: Server Components with Client Children

```tsx
// Good - page is server, interactive parts are client
import { InteractiveWidget } from "@/components/features/interactive-widget";

export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <InteractiveWidget /> {/* Client component */}
    </div>
  );
}
```

### Don't: Missing generateStaticParams

```tsx
// Bad - dynamic route without static params
// app/articles/[slug]/page.tsx
export default async function Page({ params }) {
  // No generateStaticParams = dynamic rendering only
}
```

**Why it's wrong**: Prevents static generation, slower builds and serving.

### Do: Include generateStaticParams

```tsx
// Good - enables static generation
export async function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}
```

## Checklist

Before completing work in this layer:

- [ ] Params typed as `Promise<{...}>` and awaited (Next.js 15)
- [ ] `generateStaticParams` for dynamic routes
- [ ] `generateMetadata` or static `metadata` export
- [ ] OpenGraph images configured with proper dimensions
- [ ] `notFound()` called for missing data
- [ ] Using layout components (Container, etc.)
- [ ] No `"use client"` on page files
- [ ] `pnpm build` succeeds
- [ ] `pnpm typecheck` passes
