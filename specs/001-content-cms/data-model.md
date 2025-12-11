# Data Model: Content Management System

**Feature**: 001-content-cms
**Date**: 2025-12-11

## Overview

This document defines the Payload CMS collections and globals that will manage the portfolio site content. Each entity maps to existing TypeScript data structures in `content/data/`.

---

## Collections

### 1. Users (Built-in)

Payload's built-in authentication collection. Single admin user for content management.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| email | email | Yes | Login identifier |
| password | password | Yes | Hashed by Payload |

**Access**: Admin only (default Payload auth)

---

### 2. Media

Upload collection for images (testimonial photos, company logos).

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| alt | text | Yes | Alt text for accessibility |
| *file* | upload | Yes | Image file (auto-managed) |
| *url* | text | Auto | Generated URL to file |
| *filename* | text | Auto | Original filename |
| *mimeType* | text | Auto | File MIME type |
| *width* | number | Auto | Image width in pixels |
| *height* | number | Auto | Image height in pixels |

**Image Sizes**:
- `thumbnail`: 400x300 (for admin previews)
- `card`: 768px width (for testimonial/project cards)
- `full`: 1920px width (max size)

**Allowed MIME Types**: `image/*`

**Access**:
- Read: Public
- Create/Update/Delete: Authenticated

---

### 3. Testimonials

Recommendations from colleagues and clients.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| author | group | Yes | Author information |
| author.name | text | Yes | Full name |
| author.role | text | Yes | Job title and company |
| author.image | upload (Media) | No | Profile photo |
| author.handle | text | No | LinkedIn handle |
| author.profileUrl | text | No | Full LinkedIn URL |
| date | date | Yes | Date of testimonial |
| shortBody | textarea | Yes | Excerpt for cards (~1-2 sentences) |
| fullBody | array | Yes | Full testimonial paragraphs |
| fullBody[].paragraph | textarea | Yes | Single paragraph |

**Admin Config**:
- Title field: `author.name`
- Default columns: `author.name`, `author.role`, `date`
- Default sort: `-date` (newest first)

**Migration Source**: `content/data/testimonials.ts` (9 entries)

**Access**:
- Read: Public
- Create/Update/Delete: Authenticated

---

### 4. Roles

Work history / resume entries.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| company | text | Yes | Company name |
| title | text | Yes | Job title |
| logo | upload (Media) | No | Company logo |
| href | text | Yes | Company website URL |
| start | text | Yes | Start year (e.g., "2023") |
| end | text | Yes | End year or "Present" |
| sortOrder | number | No | Display order (lower = first) |

**Admin Config**:
- Title field: `company`
- Default columns: `company`, `title`, `start`, `end`
- Default sort: `sortOrder`

**Migration Source**: `content/data/roles.ts` (8 entries)

**Note**: The current TypeScript schema has `logoDetails` with `pixelWidth`, `imageWidth`, `imageHeight`, `className`. These are presentational concerns that will be handled in components, not stored in CMS.

**Access**:
- Read: Public
- Create/Update/Delete: Authenticated

---

### 5. Projects

Portfolio project showcases.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| company | text | Yes | Company/project name |
| description | textarea | Yes | Project description |
| logo | upload (Media) | No | Project/company logo |
| link | group | Yes | Project link |
| link.href | text | Yes | URL to project |
| link.label | text | Yes | Display text (e.g., "example.com") |
| sortOrder | number | No | Display order (lower = first) |

**Admin Config**:
- Title field: `company`
- Default columns: `company`, `link.label`
- Default sort: `sortOrder`

**Migration Source**: `content/data/projects.ts` (1 entry)

**Access**:
- Read: Public
- Create/Update/Delete: Authenticated

---

### 6. Uses

Tools, hardware, and software recommendations.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | Yes | Item name |
| description | textarea | Yes | Why I use it |
| category | select | Yes | Category for grouping |
| link | group | Yes | Link to product |
| link.href | text | Yes | URL |
| link.label | text | Yes | Display text |
| sortOrder | number | No | Order within category |

**Category Options**:
- `hardware` (label: "Hardware")
- `development` (label: "Development")
- `design` (label: "Design")
- `productivity` (label: "Productivity")

**Admin Config**:
- Title field: `title`
- Default columns: `title`, `category`
- Default sort: `category`, `sortOrder`

**Migration Source**: `content/data/uses.ts` (25 entries across 4 categories)

**Access**:
- Read: Public
- Create/Update/Delete: Authenticated

---

## Globals

### 1. SiteContent

Singleton for editable site copy and UI strings.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| homepage | group | No | Homepage content |
| homepage.bio | richText | No | Main bio (supports formatting) |
| homepage.shortBio | textarea | No | Tagline text |
| about | group | No | About page content |
| about.pageTitle | text | No | Default: "A little bit about me" |
| about.myValues | richText | No | Values section |
| about.myExperience | richText | No | Experience section |
| about.profileImage | upload (Media) | No | About page photo |
| newsletter | group | No | Newsletter section |
| newsletter.title | text | No | Default: "Stay up to date" |
| newsletter.description | text | No | Default: "Get notified when..." |
| newsletter.buttonText | text | No | Default: "Join" |
| ui | group | No | UI labels |
| ui.ctaButtonText | text | No | Default: "Let's Talk" |
| ui.resumeSectionTitle | text | No | Default: "Work" |

**Admin Config**:
- Organized into collapsible sections per group

**Access**:
- Read: Public
- Update: Authenticated

---

## Entity Relationships

```
┌─────────────────┐
│     Media       │◄────────────────────────────────────┐
│  (uploads)      │                                     │
└────────┬────────┘                                     │
         │                                              │
         │ upload (1:1)                                 │ upload (1:1)
         │                                              │
         ▼                                              │
┌─────────────────┐    ┌─────────────────┐    ┌────────┴────────┐
│  Testimonials   │    │     Roles       │    │    Projects     │
│                 │    │                 │    │                 │
│  author.image ──┼────│  logo ──────────┼────│  logo ──────────┤
└─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────┐    ┌─────────────────┐
│      Uses       │    │   SiteContent   │
│                 │    │    (global)     │
│  (no media)     │    │                 │
└─────────────────┘    │  about.profile  │
                       │  Image ─────────┼──► Media
                       └─────────────────┘
```

---

## Validation Rules

### Testimonials

| Field | Validation |
|-------|------------|
| author.name | Required, min 2 characters |
| author.role | Required, min 2 characters |
| date | Required, valid date |
| shortBody | Required, min 20 characters |
| fullBody | Required, min 1 paragraph |

### Roles

| Field | Validation |
|-------|------------|
| company | Required, min 2 characters |
| title | Required, min 2 characters |
| href | Required, valid URL |
| start | Required, 4-digit year |
| end | Required, 4-digit year or "Present" |

### Projects

| Field | Validation |
|-------|------------|
| company | Required, min 2 characters |
| description | Required, min 20 characters |
| link.href | Required, valid URL |
| link.label | Required, min 2 characters |

### Uses

| Field | Validation |
|-------|------------|
| title | Required, min 2 characters |
| description | Required, min 10 characters |
| category | Required, from enum |
| link.href | Required, valid URL |
| link.label | Required, min 2 characters |

---

## TypeScript Types (Generated)

Payload auto-generates types in `payload-types.ts`. Example usage:

```typescript
import type { Testimonial, Role, Project, Use, SiteContent, Media } from '@/payload-types'

// Type-safe access
const testimonials: Testimonial[] = await getAllTestimonials()
const siteContent: SiteContent = await getSiteContent()
```

---

## Migration Mapping

### Testimonials

| Current Field | Payload Field |
|---------------|---------------|
| `author.name` | `author.name` |
| `author.role` | `author.role` |
| `author.imgSrc` | `author.image` (upload) |
| `author.handle` | `author.handle` |
| `author.profileUrl` | `author.profileUrl` |
| `date` (Date) | `date` (ISO string) |
| `shortBody` | `shortBody` |
| `fullBody` (string[]) | `fullBody` (array of objects) |

### Roles

| Current Field | Payload Field |
|---------------|---------------|
| `company` | `company` |
| `title` | `title` |
| `logoDetails.src` | `logo` (upload) |
| `href` | `href` |
| `start` | `start` |
| `end` / `end.label` | `end` |
| Array index | `sortOrder` |

### Projects

| Current Field | Payload Field |
|---------------|---------------|
| `company` | `company` |
| `description` | `description` |
| `logoDetails.src` | `logo` (upload) |
| `link.href` | `link.href` |
| `link.label` | `link.label` |
| Array index | `sortOrder` |

### Uses

| Current Field | Payload Field |
|---------------|---------------|
| Map key | `category` |
| `title` | `title` |
| `description` | `description` |
| `link.href` | `link.href` |
| `link.label` | `link.label` |
| Array index within category | `sortOrder` |

---

## Access Control Summary

| Collection | Read | Create | Update | Delete |
|------------|------|--------|--------|--------|
| Users | Auth | Auth | Auth | Auth |
| Media | Public | Auth | Auth | Auth |
| Testimonials | Public | Auth | Auth | Auth |
| Roles | Public | Auth | Auth | Auth |
| Projects | Public | Auth | Auth | Auth |
| Uses | Public | Auth | Auth | Auth |
| SiteContent (global) | Public | N/A | Auth | N/A |

"Public" = `() => true`
"Auth" = `({ req }) => !!req.user`
