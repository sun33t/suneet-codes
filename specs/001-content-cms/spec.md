# Feature Specification: Content Management System

**Feature Branch**: `001-content-cms`
**Created**: 2025-12-11
**Status**: Draft
**Input**: Add a content management system to the portfolio site to edit testimonials, work history, projects, and tools/uses through an admin interface instead of editing code files.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Edit Testimonials (Priority: P1)

As the site owner, I want to edit, add, and remove testimonials through a visual admin interface so that I can keep my testimonials current without modifying code files.

**Why this priority**: Testimonials are the most frequently updated content and directly impact credibility. They have complex nested data (author info, multiple paragraphs) that benefits most from a visual editor.

**Independent Test**: Can be fully tested by logging into the admin panel, creating a new testimonial with author details and quotes, then verifying it appears on the live site after rebuild.

**Acceptance Scenarios**:

1. **Given** I am logged into the admin panel, **When** I navigate to Testimonials, **Then** I see a list of all existing testimonials with author name and date.
2. **Given** I am viewing the testimonials list, **When** I click "Add New", **Then** I see a form with fields for author name, role, profile image, handle, profile URL, date, short body, and full body paragraphs.
3. **Given** I am editing a testimonial, **When** I add multiple paragraphs to the full body, **Then** each paragraph is stored and displayed correctly on the site.
4. **Given** I have saved a testimonial, **When** the site rebuilds, **Then** the new/updated testimonial appears on the public site.
5. **Given** I am viewing a testimonial, **When** I click delete and confirm, **Then** the testimonial is removed from the system.

---

### User Story 2 - Manage Work History (Priority: P1)

As the site owner, I want to manage my work history/resume entries through the admin interface so that I can update my career information as it changes.

**Why this priority**: Work history is core to the portfolio site's purpose and changes with each new role. Equal priority to testimonials as both are essential for a complete portfolio.

**Independent Test**: Can be fully tested by adding a new role entry with company, title, dates, and logo, then verifying it appears in the correct order on the resume section.

**Acceptance Scenarios**:

1. **Given** I am logged into the admin panel, **When** I navigate to Work History, **Then** I see a list of all roles sorted by date (most recent first).
2. **Given** I am adding a new role, **When** I fill in company name, job title, start date, end date (or "Present"), company URL, and upload a logo, **Then** the role is saved with all information.
3. **Given** I have multiple roles, **When** I reorder them, **Then** the display order updates on the public site after rebuild.
4. **Given** I am editing a role, **When** I change the end date from a year to "Present", **Then** the role displays as current on the site.

---

### User Story 3 - Update Projects (Priority: P2)

As the site owner, I want to manage my project showcases through the admin interface so that I can add new projects and update existing ones.

**Why this priority**: Projects change less frequently than testimonials and work history but are still important for showcasing work.

**Independent Test**: Can be fully tested by creating a new project with company name, description, link, and logo, then verifying it displays on the projects page.

**Acceptance Scenarios**:

1. **Given** I am logged into the admin panel, **When** I navigate to Projects, **Then** I see a list of all projects with company names.
2. **Given** I am adding a new project, **When** I provide company name, description, link URL, link label, and logo, **Then** the project is saved.
3. **Given** I have saved a project, **When** the site rebuilds, **Then** the project appears on the projects page with correct formatting.

---

### User Story 4 - Maintain Uses/Tools Page (Priority: P2)

As the site owner, I want to manage my "uses" page items (tools, hardware, software) through the admin interface so that I can keep my gear recommendations current.

**Why this priority**: Uses content is helpful but lower priority than core portfolio content. Categories are fixed (Hardware, Development, Design, Productivity).

**Independent Test**: Can be fully tested by adding a new item to the Hardware category with title, description, and link, then verifying it appears under the correct category.

**Acceptance Scenarios**:

1. **Given** I am logged into the admin panel, **When** I navigate to Uses, **Then** I see all items grouped by category.
2. **Given** I am adding a new uses item, **When** I select a category (Hardware/Development/Design/Productivity), enter title, description, link URL, and link label, **Then** the item is saved.
3. **Given** I have items in multiple categories, **When** I view the public uses page after rebuild, **Then** items are correctly grouped under their category headings.
4. **Given** I am editing a uses item, **When** I change its category, **Then** it moves to the new category on the public site.

---

### User Story 5 - Edit Site Copy (Priority: P3)

As the site owner, I want to edit static site copy (homepage bio, about page content, UI labels) through the admin interface so that I can refine messaging without code changes.

**Why this priority**: Site copy changes infrequently compared to portfolio content. Provides value but is lower urgency than content collections.

**Independent Test**: Can be fully tested by editing the homepage bio text and verifying the change appears on the homepage after rebuild.

**Acceptance Scenarios**:

1. **Given** I am logged into the admin panel, **When** I navigate to Site Content, **Then** I see sections for homepage, about page, and UI strings.
2. **Given** I am editing homepage content, **When** I modify the bio text and save, **Then** the updated bio appears on the homepage after rebuild.
3. **Given** I am editing UI labels, **When** I change a button label like "Let's Talk", **Then** that label updates wherever it's used on the site.

---

### User Story 6 - Trigger Site Rebuild (Priority: P2)

As the site owner, after making content changes, I want to trigger a site rebuild so that my changes go live.

**Why this priority**: Essential for the content-to-live workflow. Without this, content changes have no effect on the public site.

**Independent Test**: Can be fully tested by making a content change, triggering rebuild, and verifying the change appears on the public site.

**Acceptance Scenarios**:

1. **Given** I have made content changes, **When** I trigger a rebuild (manually or automatically), **Then** a new site build is initiated.
2. **Given** a rebuild is in progress, **When** the build completes, **Then** the updated content is live on the public site.
3. **Given** content changes were made, **When** I view the public site after rebuild, **Then** I see the updated content within the expected timeframe.

---

### Edge Cases

- What happens when uploading an image that exceeds size limits? System displays a clear error message with size requirements.
- How does the system handle required fields left empty? Form validation prevents saving with clear indication of which fields need attention.
- What happens if a rebuild fails? Admin is notified and the previous version remains live.
- How are concurrent edits handled (single admin user)? Not applicable for initial implementation; single admin user assumed.
- What happens to existing content during migration? All existing content is preserved and accessible in the new system immediately after migration.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a protected admin interface accessible only to authenticated users.
- **FR-002**: System MUST allow creating, reading, updating, and deleting testimonials with fields: author name, author role, author profile image, author handle, author profile URL, date, short body, and full body (multiple paragraphs).
- **FR-003**: System MUST allow creating, reading, updating, and deleting work history entries with fields: company name, job title, company logo, company URL, start date, end date (or "Present"), and display order.
- **FR-004**: System MUST allow creating, reading, updating, and deleting project entries with fields: company name, description, logo, link URL, and link label.
- **FR-005**: System MUST allow creating, reading, updating, and deleting uses/tools entries with fields: title, description, link URL, link label, and category (Hardware/Development/Design/Productivity).
- **FR-006**: System MUST provide a way to edit site copy including homepage bio, about page content, and UI labels.
- **FR-007**: System MUST support image uploads for testimonial author photos, company logos, and profile images. Maximum file size: 5MB. Maximum dimensions: 4096x4096 pixels. Allowed formats: JPEG, PNG, WebP.
- **FR-008**: System MUST preserve all existing content from current TypeScript data files after migration.
- **FR-009**: System MUST generate fully static pages for public visitors (no runtime database queries for visitors).
- **FR-010**: System MUST provide a mechanism to trigger site rebuilds after content changes.
- **FR-011**: System MUST validate required fields before allowing content to be saved.
- **FR-012**: System MUST maintain the current site performance for public visitors (static HTML delivery).

### Key Entities

- **Testimonial**: A recommendation from a colleague or client. Contains author information (name, role, image, handle, profile URL), date, short excerpt for cards, and full body as multiple paragraphs.
- **Role/Work History**: A position held at a company. Contains company name, job title, company logo, company URL, start year, end year (or current), and display order for sorting.
- **Project**: A showcased work project. Contains company name, description, logo, and link with URL and label.
- **Uses Item**: A tool, hardware, or software recommendation. Contains title, description, category (Hardware/Development/Design/Productivity), and link with URL and label.
- **Site Content**: Singleton configuration for editable site copy including homepage bio, about page content, newsletter section text, and UI labels/button text.
- **Media**: Uploaded images for use across content types. Contains the image file and alt text.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Content updates are visible on the live site within 10 minutes of saving and triggering a rebuild.
- **SC-002**: Site owner can complete a testimonial content update (edit existing testimonial) in under 2 minutes.
- **SC-003**: All existing content (testimonials, roles, projects, uses items) is successfully migrated with zero data loss.
- **SC-004**: Public site page load time remains unchanged (within 10% of current performance) after CMS implementation.
- **SC-005**: Admin interface is accessible and functional on both desktop and mobile devices.
- **SC-006**: 100% of content types currently hardcoded are editable through the admin interface (testimonials, roles, projects, uses, site copy).
- **SC-007**: No developer intervention required for routine content updates (adding/editing/removing content items).

## Assumptions

- Single admin user (the site owner); no multi-user permissions needed for initial implementation.
- Categories for uses items (Hardware, Development, Design, Productivity) are fixed and do not need to be admin-editable.
- MDX blog articles remain in the file system and are not managed by the CMS in this phase.
- The existing static site generation approach is preserved; visitors never hit a database.
- Image uploads can use the existing Cloudinary integration or a similar approach.
- Rebuild triggers can be manual initially; automatic triggers after save are a nice-to-have.

## Out of Scope

- Managing MDX blog articles through the CMS (future phase).
- Multiple admin users or role-based permissions.
- Public-facing dynamic content or real-time updates.
- Comments or user-generated content.
- Version history or content rollback functionality.
- Content scheduling (publish in future).
- Multi-language/internationalization support.
