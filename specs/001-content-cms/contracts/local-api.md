# Local API Contracts

**Feature**: 001-content-cms
**Date**: 2025-12-11

## Overview

This document defines the Local API contracts for querying Payload CMS content in Server Components. The Local API bypasses HTTP and queries the database directly, making it ideal for static site generation.

---

## Query Functions

All query functions are located in `lib/payload/queries/` and follow this pattern:

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

export async function queryFunction() {
  const payload = await getPayload({ config })
  // ... query logic
}
```

---

## Testimonials

### `getAllTestimonials()`

Returns all testimonials sorted by date (newest first).

**File**: `lib/payload/queries/testimonials.ts`

**Signature**:
```typescript
export async function getAllTestimonials(): Promise<Testimonial[]>
```

**Implementation**:
```typescript
export async function getAllTestimonials() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: '-date',
    depth: 1, // Populate author.image
  })
  return docs
}
```

**Return Shape**:
```typescript
{
  id: string
  author: {
    name: string
    role: string
    image?: Media | null
    handle?: string | null
    profileUrl?: string | null
  }
  date: string // ISO date
  shortBody: string
  fullBody: Array<{ paragraph: string }>
  createdAt: string
  updatedAt: string
}[]
```

**Usage**:
```typescript
// app/(frontend)/page.tsx
const testimonials = await getAllTestimonials()
```

---

## Roles

### `getAllRoles()`

Returns all work history entries sorted by display order.

**File**: `lib/payload/queries/roles.ts`

**Signature**:
```typescript
export async function getAllRoles(): Promise<Role[]>
```

**Implementation**:
```typescript
export async function getAllRoles() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'roles',
    limit: 100,
    sort: 'sortOrder',
    depth: 1, // Populate logo
  })
  return docs
}
```

**Return Shape**:
```typescript
{
  id: string
  company: string
  title: string
  logo?: Media | null
  href: string
  start: string
  end: string
  sortOrder?: number | null
  createdAt: string
  updatedAt: string
}[]
```

**Usage**:
```typescript
// components/features/resume.tsx
const roles = await getAllRoles()
```

---

## Projects

### `getAllProjects()`

Returns all projects sorted by display order.

**File**: `lib/payload/queries/projects.ts`

**Signature**:
```typescript
export async function getAllProjects(): Promise<Project[]>
```

**Implementation**:
```typescript
export async function getAllProjects() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: 'sortOrder',
    depth: 1, // Populate logo
  })
  return docs
}
```

**Return Shape**:
```typescript
{
  id: string
  company: string
  description: string
  logo?: Media | null
  link: {
    href: string
    label: string
  }
  sortOrder?: number | null
  createdAt: string
  updatedAt: string
}[]
```

**Usage**:
```typescript
// app/(frontend)/projects/page.tsx
const projects = await getAllProjects()
```

---

## Uses

### `getAllUses()`

Returns all uses items sorted by category and display order.

**File**: `lib/payload/queries/uses.ts`

**Signature**:
```typescript
export async function getAllUses(): Promise<Use[]>
```

**Implementation**:
```typescript
export async function getAllUses() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'uses',
    limit: 200,
    sort: ['category', 'sortOrder'],
  })
  return docs
}
```

### `getUsesByCategory()`

Returns uses items grouped by category.

**Signature**:
```typescript
export async function getUsesByCategory(): Promise<Map<UsesCategory, Use[]>>
```

**Implementation**:
```typescript
export async function getUsesByCategory() {
  const uses = await getAllUses()
  const grouped = new Map<UsesCategory, Use[]>()

  for (const use of uses) {
    const category = use.category as UsesCategory
    if (!grouped.has(category)) {
      grouped.set(category, [])
    }
    grouped.get(category)!.push(use)
  }

  return grouped
}
```

**Return Shape (getAllUses)**:
```typescript
{
  id: string
  title: string
  description: string
  category: 'hardware' | 'development' | 'design' | 'productivity'
  link: {
    href: string
    label: string
  }
  sortOrder?: number | null
  createdAt: string
  updatedAt: string
}[]
```

**Usage**:
```typescript
// app/(frontend)/uses/page.tsx
const usesByCategory = await getUsesByCategory()
```

---

## Site Content

### `getSiteContent()`

Returns the site content global.

**File**: `lib/payload/queries/site-content.ts`

**Signature**:
```typescript
export async function getSiteContent(): Promise<SiteContent>
```

**Implementation**:
```typescript
export async function getSiteContent() {
  const payload = await getPayload({ config })
  const siteContent = await payload.findGlobal({
    slug: 'site-content',
    depth: 1, // Populate about.profileImage
  })
  return siteContent
}
```

**Return Shape**:
```typescript
{
  id: string
  homepage?: {
    bio?: SerializedEditorState | null
    shortBio?: string | null
  } | null
  about?: {
    pageTitle?: string | null
    myValues?: SerializedEditorState | null
    myExperience?: SerializedEditorState | null
    profileImage?: Media | null
  } | null
  newsletter?: {
    title?: string | null
    description?: string | null
    buttonText?: string | null
  } | null
  ui?: {
    ctaButtonText?: string | null
    resumeSectionTitle?: string | null
  } | null
  createdAt: string
  updatedAt: string
}
```

**Usage**:
```typescript
// app/(frontend)/page.tsx
const siteContent = await getSiteContent()
const bio = siteContent.homepage?.bio
```

---

## Media Type Reference

When `depth >= 1`, media relationships return the full Media object:

```typescript
type Media = {
  id: string
  alt: string
  url: string
  filename: string
  mimeType: string
  width: number
  height: number
  sizes?: {
    thumbnail?: { url: string; width: number; height: number }
    card?: { url: string; width: number; height: number }
    full?: { url: string; width: number; height: number }
  }
  createdAt: string
  updatedAt: string
}
```

When `depth = 0`, media relationships return just the ID:

```typescript
type MediaRef = string // ID only
```

---

## Rich Text Handling

Rich text fields return Lexical's serialized state. To render:

```typescript
import { RichText } from '@payloadcms/richtext-lexical/react'

// In component
<RichText data={siteContent.homepage?.bio} />
```

Or convert to HTML/Markdown:

```typescript
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical'

const html = await convertLexicalToHTML({
  data: siteContent.homepage?.bio,
})
```

---

## Error Handling

All query functions should handle errors gracefully:

```typescript
export async function getAllTestimonials() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'testimonials',
      limit: 100,
      sort: '-date',
    })
    return docs
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return []
  }
}
```

For required data (where empty array is not acceptable), let the error propagate to trigger error boundaries.

---

## Caching Behavior

With `force-static` on pages, queries run at build time only:

```typescript
// app/(frontend)/testimonials/page.tsx
export const dynamic = 'force-static'

export default async function TestimonialsPage() {
  // This runs at build time, not on every request
  const testimonials = await getAllTestimonials()
  // ...
}
```

For the admin panel (runtime), queries execute fresh on each request.

---

## Index File

Export all query functions from a central index:

```typescript
// lib/payload/queries/index.ts
export { getAllTestimonials } from './testimonials'
export { getAllRoles } from './roles'
export { getAllProjects } from './projects'
export { getAllUses, getUsesByCategory } from './uses'
export { getSiteContent } from './site-content'
```

**Usage**:
```typescript
import { getAllTestimonials, getSiteContent } from '@/lib/payload/queries'
```
