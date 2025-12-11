# Tasks: Content Management System

**Input**: Design documents from `/specs/001-content-cms/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in the specification. Tests are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a Next.js 15 App Router project with:
- `app/` for routes (using route groups `(payload)` and `(frontend)`)
- `collections/` for Payload collection configs
- `globals/` for Payload global configs
- `lib/payload/` for query functions
- `scripts/` for migration scripts

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Install Payload CMS packages and configure the project

- [x] T001 Install Payload CMS packages: `pnpm i payload @payloadcms/next @payloadcms/richtext-lexical graphql`
- [x] T002 Install database adapters: `pnpm i @payloadcms/db-postgres @payloadcms/db-sqlite`
- [x] T003 [P] Add `@payload-config` path alias to tsconfig.json
- [x] T004 [P] Add environment variables to .env.local: PAYLOAD_SECRET, DATABASE_URI
- [x] T005 Update next.config.ts with `withPayload` wrapper
- [x] T006 Create payload.config.ts at project root with base configuration
- [x] T007 Copy Payload app files to app/(payload)/ from Payload blank template
- [x] T008 Move existing routes from app/ to app/(frontend)/ route group

**Checkpoint**: Payload admin panel accessible at /admin, existing routes unchanged

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core collections and infrastructure required by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create Media collection in collections/Media.ts with upload config and image sizes
- [x] T010 Create Users collection config in collections/Users.ts (Payload built-in auth)
- [x] T011 [P] Create lib/payload/get-payload.ts with singleton getPayload helper
- [x] T012 Add collections and globals arrays to payload.config.ts
- [x] T013 Run `pnpm dev` to verify Payload initializes and generates payload-types.ts
- [x] T014 Create first admin user via /admin interface
- [x] T015 Verify admin authentication: test login, session persistence, and logout at /admin

**Checkpoint**: Foundation ready - admin panel works, Media uploads functional, user stories can begin

---

## Phase 3: User Story 1 - Edit Testimonials (Priority: P1) MVP

**Goal**: Manage testimonials through admin interface with full CRUD operations

**Independent Test**: Log into admin, create a testimonial with author details and multiple paragraphs, verify it appears on the public site after rebuild

### Implementation for User Story 1

- [x] T016 [US1] Create Testimonials collection in collections/Testimonials.ts per data-model.md
- [x] T017 [US1] Add Testimonials to collections array in payload.config.ts
- [x] T018 [US1] Create getAllTestimonials query function in lib/payload/queries/testimonials.ts
- [x] T019 [US1] Create seed script for testimonials in scripts/seed-payload.ts (testimonials section)
- [x] T020 [US1] Run seed script to migrate existing testimonials from content/data/testimonials.ts
- [x] T021 [US1] Update app/(frontend)/projects/page.tsx to use getAllTestimonials() (testimonials are on projects page)
- [x] T022 [US1] Update components/features/testimonials.tsx to use Payload data shape
- [x] T023 [US1] Add `export const dynamic = 'force-static'` to pages using testimonials
- [x] T024 [US1] Verify testimonials CRUD in admin panel and display on public site

**Checkpoint**: Testimonials fully managed via CMS, existing content preserved

---

## Phase 4: User Story 2 - Manage Work History (Priority: P1)

**Goal**: Manage work history/resume entries through admin interface

**Independent Test**: Add a new role with company, title, dates, and logo, verify it appears correctly ordered on the resume section

### Implementation for User Story 2

- [x] T025 [US2] Create Roles collection in collections/Roles.ts per data-model.md
- [x] T026 [US2] Add Roles to collections array in payload.config.ts
- [x] T027 [US2] Create getAllRoles query function in lib/payload/queries/roles.ts
- [x] T028 [US2] Add roles migration to scripts/seed-payload.ts
- [x] T029 [US2] Run seed script to migrate existing roles from content/data/roles.ts
- [x] T030 [US2] Update app/(frontend)/page.tsx to use getAllRoles() (Resume receives roles as props)
- [x] T031 [US2] Handle logo display - stored all logoDetails attributes (src, pixelWidth, imageWidth, imageHeight, className) in CMS
- [x] T032 [US2] Verify roles CRUD in admin panel and display in resume section

**Checkpoint**: Work history fully managed via CMS, display order working

---

## Phase 5: User Story 3 - Update Projects (Priority: P2)

**Goal**: Manage project showcases through admin interface

**Independent Test**: Create a new project with company name, description, link, and logo, verify it displays on the projects page

### Implementation for User Story 3

- [x] T033 [US3] Create Projects collection in collections/Projects.ts per data-model.md
- [x] T034 [US3] Add Projects to collections array in payload.config.ts
- [x] T035 [US3] Create getAllProjects query function in lib/payload/queries/projects.ts
- [x] T036 [US3] Add projects migration to scripts/seed-payload.ts
- [x] T037 [US3] Run seed script to migrate existing projects from content/data/projects.ts
- [x] T038 [US3] Update app/(frontend)/projects/page.tsx to use getAllProjects()
- [x] T039 [US3] Verify projects CRUD in admin panel and display on projects page

**Checkpoint**: Projects fully managed via CMS

---

## Phase 6: User Story 4 - Maintain Uses/Tools Page (Priority: P2)

**Goal**: Manage uses/tools page items with category grouping

**Independent Test**: Add a new item to the Hardware category, verify it appears under the correct category heading

### Implementation for User Story 4

- [x] T040 [US4] Create Uses collection in collections/Uses.ts per data-model.md with category select
- [x] T041 [US4] Add Uses to collections array in payload.config.ts
- [x] T042 [US4] Create getAllUses and getUsesByCategory query functions in lib/payload/queries/uses.ts
- [x] T043 [US4] Add uses migration to scripts/seed-payload.ts (handle Map to category field)
- [x] T044 [US4] Run seed script to migrate existing uses from content/data/uses.ts
- [x] T045 [US4] Update app/(frontend)/uses/page.tsx to use getUsesByCategory()
- [x] T046 [US4] Verify uses CRUD in admin panel with category grouping

**Checkpoint**: Uses page fully managed via CMS with proper category grouping

---

## Phase 7: User Story 5 - Edit Site Copy (Priority: P3)

**Goal**: Edit static site copy (bio, about content, UI labels) through admin

**Independent Test**: Edit the homepage bio text, verify the change appears on the homepage after rebuild

### Implementation for User Story 5

- [x] T047 [US5] Create SiteContent global in globals/SiteContent.ts per data-model.md
- [x] T048 [US5] Add SiteContent to globals array in payload.config.ts
- [x] T049 [US5] Create getSiteContent query function in lib/payload/queries/site-content.ts
- [x] T050 [US5] Seed initial site content values from existing hardcoded strings
- [x] T051 [US5] Update app/(frontend)/page.tsx to use getSiteContent() for bio text
- [x] T052 [US5] Update app/(frontend)/about/page.tsx to use getSiteContent() for about content
- [x] T053 [US5] Update components using UI labels to pull from SiteContent global
- [x] T054 [US5] Verify site copy editing in admin panel and display on public pages

**Checkpoint**: Site copy editable via CMS without code changes

---

## Phase 8: User Story 6 - Trigger Site Rebuild (Priority: P2)

**Goal**: Content changes trigger site rebuilds to publish updates

**Independent Test**: Make a content change, trigger rebuild, verify the change appears on the public site

### Implementation for User Story 6

- [ ] T055 [US6] Add VERCEL_DEPLOY_HOOK_URL environment variable to .env.local
- [ ] T056 [US6] Create deploy hook helper in lib/payload/deploy-hook.ts
- [ ] T057 [US6] Add afterChange hooks to all collections to trigger deploy (Testimonials, Roles, Projects, Uses)
- [ ] T058 [US6] Add afterChange hook to SiteContent global
- [ ] T059 [US6] Configure Vercel deploy hook URL in production environment
- [ ] T060 [US6] Test rebuild trigger by making a content change and verifying deployment

**Checkpoint**: Content changes automatically trigger site rebuilds

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and verification

- [ ] T061 Create lib/payload/queries/index.ts to export all query functions
- [ ] T062 [P] Add payload-types.ts to .gitignore (auto-generated)
- [ ] T063 [P] Add payload.db to .gitignore (SQLite local dev)
- [ ] T064 [P] Add media/ directory to .gitignore (uploaded files)
- [ ] T065 Remove or archive old content/data/*.ts files after migration verified
- [ ] T066 Verify all public pages have `export const dynamic = 'force-static'`
- [ ] T067 Run `pnpm build` to verify static generation works with Payload
- [ ] T068 Run `pnpm typecheck` to verify no TypeScript errors
- [ ] T069 Run `pnpm check` to verify no Biome linting errors
- [ ] T070 Run page-layer validation script on modified pages in app/(frontend)/
- [ ] T071 Test admin panel on mobile device for responsive design
- [ ] T072 Document environment variables needed for production in README or docs

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - US1 and US2 (P1 priority) can proceed in parallel
  - US3 and US4 (P2 priority) can proceed in parallel
  - US5 (P3 priority) can start after Foundational
  - US6 (P2 priority) depends on at least one collection existing
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (Testimonials - P1)**: Depends on Media collection from Foundational
- **User Story 2 (Roles - P1)**: Depends on Media collection from Foundational
- **User Story 3 (Projects - P2)**: Depends on Media collection from Foundational
- **User Story 4 (Uses - P2)**: No media dependency, can start after Foundational
- **User Story 5 (Site Copy - P3)**: No collection dependencies, can start after Foundational
- **User Story 6 (Rebuild - P2)**: Requires at least one collection with hooks

### Within Each User Story

- Collection before query function
- Query function before page/component updates
- Migration before verification
- All implementation before checkpoint verification

### Parallel Opportunities

**Phase 1 (Setup)**:
```bash
# Parallel: T003 + T004 (different files)
Task: "Add @payload-config path alias to tsconfig.json"
Task: "Add environment variables to .env.local"
```

**Phase 2 (Foundational)**:
```bash
# T011 parallel with T009-T010
Task: "Create lib/payload/get-payload.ts"
```

**After Foundational Completes**:
```bash
# US1 and US2 can proceed in parallel (P1 priority)
# Developer A: User Story 1 (Testimonials)
# Developer B: User Story 2 (Roles)
```

**Phase 9 (Polish)**:
```bash
# Parallel: T061 + T062 + T063 (different files)
Task: "Add payload-types.ts to .gitignore"
Task: "Add payload.db to .gitignore"
Task: "Add media/ directory to .gitignore"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Testimonials)
4. Complete Phase 4: User Story 2 (Roles)
5. **STOP and VALIDATE**: Both P1 stories functional, admin panel works
6. Deploy/demo if ready - core portfolio content editable

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 (Testimonials) → Test independently → Deploy (MVP!)
3. Add US2 (Roles) → Test independently → Deploy
4. Add US3 (Projects) + US4 (Uses) → Test → Deploy
5. Add US5 (Site Copy) → Test → Deploy
6. Add US6 (Rebuild triggers) → Test → Deploy
7. Polish → Final validation → Deploy

### Parallel Team Strategy

With two developers:

1. Both complete Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Testimonials) → User Story 3 (Projects)
   - Developer B: User Story 2 (Roles) → User Story 4 (Uses)
3. Single developer handles US5 (Site Copy) + US6 (Rebuild)
4. Both handle Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Media collection is shared prerequisite for US1, US2, US3
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Run `pnpm build` frequently to catch static generation issues early
