# Component Layer Reference

## Overview

The component layer manages all React components for the portfolio/blog site. It uses shadcn/ui patterns with Radix UI primitives, class-variance-authority (CVA) for variants, and Tailwind CSS for styling.

## File Organization

```
components/
├── ui/                          # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── features/                    # Feature-specific components
│   ├── articles-filter.tsx
│   ├── articles-list.tsx
│   ├── contact-form.tsx
│   ├── resume.tsx
│   └── testimonials.tsx
├── shared/                      # Reusable shared components
│   ├── avatar.tsx
│   ├── cloudinary-image.tsx
│   ├── link-card.tsx
│   ├── social-icons.tsx
│   └── theme-toggle.tsx
├── layout/                      # Layout components
│   ├── container.tsx
│   ├── footer.tsx
│   ├── header/
│   │   ├── index.tsx
│   │   ├── desktop-navigation.tsx
│   │   └── mobile-navigation.tsx
│   ├── page-container.tsx
│   ├── page-intro.tsx
│   └── section.tsx
├── mdx/                         # MDX-specific components
│   ├── code.tsx
│   ├── code-tabs.tsx
│   ├── copy-button.tsx
│   └── series-section.tsx
└── providers/                   # Context providers
    ├── index.tsx
    ├── posthog-provider.tsx
    └── theme-provider.tsx
```

## Patterns

### Pattern 1: CVA Component (shadcn/ui style)

**When to use**: Creating UI primitives with multiple variants

**Structure**:
```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

**Key points**:
- Use `cva()` for variant definitions
- Extend native HTML attributes for full type safety
- Use `forwardRef` for ref forwarding
- Use `cn()` for className merging (handles conflicts)
- Set `displayName` for DevTools debugging
- Export both component and variants

### Pattern 2: Composition Components (Compound Pattern)

**When to use**: Complex components with multiple sub-components

**Structure** (LinkCard example):
```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  href: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function LinkCard({ href, isExternal, children }: LinkCardProps) {
  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} {...linkProps} className="group block">
      <article className="relative rounded-2xl border p-6 transition hover:bg-accent">
        {children}
      </article>
    </Link>
  );
}

export function LinkCardHeader({ children }: { children: React.ReactNode }) {
  return <header className="flex flex-col gap-2">{children}</header>;
}

export function LinkCardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-foreground">{children}</h3>;
}

export function LinkCardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-muted-foreground", className)}>{children}</p>;
}

// Usage:
// <LinkCard href="/articles/my-article">
//   <LinkCardHeader>
//     <LinkCardTitle>Article Title</LinkCardTitle>
//   </LinkCardHeader>
//   <LinkCardDescription>Description here</LinkCardDescription>
// </LinkCard>
```

**Key points**:
- Parent component provides context/wrapper
- Child components handle specific sections
- Flexible composition over rigid props
- Each sub-component is independently styled

### Pattern 3: Server Components (Default)

**When to use**: Components that don't need client interactivity

**Structure**:
```tsx
// No "use client" directive = Server Component
import { Article } from "content-collections";
import { LinkCard, LinkCardTitle } from "@/components/shared/link-card";
import { formatDate } from "@/lib/utils/formatDate";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <LinkCard href={`/articles/${article.slug}`}>
      <LinkCardTitle>{article.title}</LinkCardTitle>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
    </LinkCard>
  );
}
```

**Key points**:
- No `"use client"` directive at top
- Can directly access server-only code
- Smaller client bundle
- Default in Next.js App Router

### Pattern 4: Client Components

**When to use**: Components needing useState, useEffect, event handlers, browser APIs

**Structure**:
```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  defaultTheme?: "light" | "dark" | "system";
}

export function ThemeToggle({ defaultTheme = "system" }: ThemeToggleProps) {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  );
}
```

**Key points**:
- `"use client"` directive at very top of file
- Keep client boundary as small as possible
- Pass server data as props, don't fetch in client
- Can use hooks and browser APIs

### Pattern 5: Layout Components

**When to use**: Structural components for page layout

**Structure**:
```tsx
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

**Key points**:
- Accept `className` for customization
- Spread remaining props for flexibility
- Use semantic HTML elements
- Consistent spacing/sizing patterns

## Error Handling

Components should handle:
- Loading states (Suspense boundaries)
- Empty states (no data)
- Error states (error boundaries in parent)

```tsx
export function ArticlesList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return <EmptyState message="No articles yet" />;
  }

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
```

## Testing

Components tested via:
- TypeScript type checking (`pnpm typecheck`)
- Biome lint/format (`pnpm check`)
- Visual testing in browser

## Integration Points

- **UI Primitives**: Import from `@/components/ui/`
- **Utilities**: `cn()` from `@/lib/utils`
- **Icons**: Lucide React (`lucide-react`)
- **Images**: `next-cloudinary` for optimized images
- **Links**: `next/link` for client-side navigation
- **Themes**: `next-themes` for dark mode

## Anti-Patterns

### Don't: Unnecessary Client Directive

```tsx
// Bad - doesn't need client
"use client";

export function StaticCard({ title }: { title: string }) {
  return <div>{title}</div>;
}
```

**Why it's wrong**: Adds to client bundle unnecessarily. Only use `"use client"` when hooks or interactivity needed.

### Do: Server Component by Default

```tsx
// Good - server component
export function StaticCard({ title }: { title: string }) {
  return <div>{title}</div>;
}
```

### Don't: Inline Styles

```tsx
// Bad
<div style={{ marginTop: "1rem", padding: "0.5rem" }}>
```

**Why it's wrong**: Inconsistent with Tailwind approach, harder to maintain.

### Do: Tailwind Classes

```tsx
// Good
<div className="mt-4 p-2">
```

### Don't: String Concatenation for Classes

```tsx
// Bad
<div className={"base-class " + (active ? "active" : "")}>
```

**Why it's wrong**: Doesn't handle conflicts, error-prone.

### Do: Use cn() Utility

```tsx
// Good
<div className={cn("base-class", active && "active")}>
```

### Don't: Missing displayName

```tsx
// Bad
const Button = React.forwardRef<...>(...)
export { Button };
```

**Why it's wrong**: DevTools shows "ForwardRef" instead of component name.

### Do: Set displayName

```tsx
// Good
const Button = React.forwardRef<...>(...)
Button.displayName = "Button";
export { Button };
```

## Checklist

Before completing work in this layer:

- [ ] Component in correct directory (ui/features/shared/layout/mdx/providers)
- [ ] `"use client"` only if hooks/interactivity needed
- [ ] Using `cn()` for className merging
- [ ] Props interface with proper types
- [ ] `displayName` set for forwardRef components
- [ ] Extending HTML attributes where appropriate
- [ ] `pnpm typecheck` passes
- [ ] `pnpm check` passes
