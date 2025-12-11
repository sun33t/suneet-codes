---
description: Generate an optimized prompt for /speckit.plan from a planning document
argument-hint: <path-to-planning-document>
---

## Input

```text
$ARGUMENTS
```

## Purpose

This command takes a planning document and extracts the external dependencies, integrations, and constraints needed to generate an optimized prompt for the `/speckit.plan` command.

Since `/speckit.plan` assumes a **fixed technology stack**, this command identifies what's NEW or EXTERNAL that must be explicitly specified.

## Fixed Stack Reference (Do NOT ask about these)

The following are FIXED in this project and should NOT be included in the plan prompt:

| Layer | Fixed Technology |
|-------|------------------|
| Content | content-collections + MDX |
| Component | React 19 + Radix + shadcn/ui |
| Page | Next.js 15 App Router |
| Styling | Tailwind + CVA |
| Validation | Zod |
| Images | next-cloudinary |

## Instructions

### 1. Validate Input

If `$ARGUMENTS` is empty or does not point to a valid file:
- ERROR: "Please provide a path to a planning document. Usage: `/plan-prompt-from-plan path/to/planning-doc.md`"

### 2. Read and Analyze the Planning Document

Read the document and extract:

1. **New Libraries/Packages** - Any npm packages not in the fixed stack
2. **External Services** - Third-party APIs, databases, SaaS integrations
3. **Database Requirements** - If feature needs persistent storage beyond content-collections
4. **Authentication/Authorization** - If feature needs auth beyond existing setup
5. **Build/Deploy Changes** - Webhooks, CI/CD modifications, environment variables
6. **Migration Requirements** - Data migration, backwards compatibility needs

### 3. Categorize Findings

Create three categories:

**Category A: Definite External Dependencies**
- Libraries explicitly mentioned that are NOT in fixed stack
- Services explicitly required (databases, APIs, etc.)

**Category B: Potential External Dependencies**
- Libraries implied but not explicitly stated
- Services that might be needed based on requirements

**Category C: Constraints & Requirements**
- Business constraints (timeline, budget, compliance)
- Technical constraints (performance, offline support, etc.)
- Integration requirements (webhooks, callbacks, etc.)

### 4. Interactive Clarification (MANDATORY)

You MUST use the AskUserQuestion tool to confirm and clarify findings. Ask questions in rounds until ALL ambiguity is resolved.

#### Round 1: Confirm External Dependencies

For each item in Category A and B, ask the user to confirm:

```
Use AskUserQuestion with questions like:

Question: "The planning document mentions [Library/Service]. Should this be included as an external dependency for the plan?"
Options:
- Yes, include it
- No, skip it (we'll use fixed stack alternative)
- Need to discuss (provide details)
```

#### Round 2: Database & Storage

If the feature involves data persistence:

```
Question: "What database/storage solution should be used for this feature?"
Options:
- SQLite (local development, simple deployments)
- PostgreSQL (production via Neon/Vercel)
- MongoDB (document-based)
- None needed (content-collections sufficient)
- Other (specify)
```

#### Round 3: Authentication Requirements

If the feature involves protected resources:

```
Question: "Does this feature require authentication/authorization?"
Options:
- Yes, admin-only access
- Yes, user authentication required
- No authentication needed
- Use existing auth setup
```

#### Round 4: Deployment & Build Considerations

```
Question: "Are there special deployment or build requirements?"
Options (multiSelect: true):
- Deploy hooks (trigger rebuilds on content changes)
- New environment variables needed
- Build-time data fetching
- Runtime server requirements
- None of the above
```

#### Round 5: Constraints

```
Question: "Are there specific constraints for this implementation?"
Options (multiSelect: true):
- Must remain fully static (SSG only)
- Needs ISR (Incremental Static Regeneration)
- Requires server-side rendering
- Offline support needed
- Backwards compatibility required
- No specific constraints
```

#### Additional Rounds (as needed)

Continue asking questions until you have clarity on:
- [ ] All external libraries confirmed
- [ ] Database choice confirmed (if applicable)
- [ ] Auth requirements confirmed (if applicable)
- [ ] Deployment requirements confirmed
- [ ] Constraints confirmed
- [ ] No remaining ambiguity

### 5. Generate the Plan Prompt

Once all clarification is complete, generate a prompt in this format:

```markdown
## Plan Prompt for /speckit.plan

The following prompt has been optimized based on your planning document and answers:

---

Create a plan for the spec. I am building with [primary external dependency].

External integrations:
- [Library/Service 1]: [purpose from document]
- [Library/Service 2]: [purpose from document]
- [Database]: [type and purpose]

Constraints:
- [Constraint 1 from user answers]
- [Constraint 2 from user answers]

Deployment requirements:
- [Requirement 1]
- [Requirement 2]

---

## Usage

Copy the prompt above and run:

```
/speckit.plan [paste prompt here]
```

## Summary

- **Document analyzed**: [filename]
- **External dependencies**: [count] identified
- **Constraints**: [list]
- **Questions asked**: [count] rounds
```

### 6. Quality Checks

Before outputting, verify:

- [ ] No fixed stack technologies mentioned (React, Next.js, Tailwind, etc.)
- [ ] All external dependencies have clear purposes
- [ ] Database choice is explicit (if needed)
- [ ] Auth requirements are explicit (if needed)
- [ ] Deployment requirements are explicit
- [ ] All user answers incorporated
- [ ] No remaining NEEDS CLARIFICATION items

## Example Interaction Flow

**Input**: `/plan-prompt-from-plan docs/payload-cms-implementation-guide.md`

**Round 1 Questions**:
- "The document mentions Payload CMS. Include as external dependency?" → Yes
- "The document mentions @payloadcms/db-sqlite and @payloadcms/db-postgres. Which database adapter?" → PostgreSQL for production
- "The document mentions @payloadcms/richtext-lexical. Include?" → Yes

**Round 2 Questions**:
- "Database solution for this feature?" → PostgreSQL (Neon/Vercel)

**Round 3 Questions**:
- "Authentication requirements?" → Admin-only access

**Round 4 Questions**:
- "Deployment requirements?" → [Deploy hooks, New environment variables]

**Round 5 Questions**:
- "Constraints?" → [Must remain fully static]

**Output**:
```
Create a plan for the spec. I am building with Payload CMS as the content
management backend.

External integrations:
- Payload CMS (@payloadcms/next): Admin UI and content management
- @payloadcms/db-postgres: PostgreSQL database adapter
- @payloadcms/richtext-lexical: Rich text editor for content
- Neon PostgreSQL: Production database via Vercel integration

Constraints:
- Site must remain fully static for visitors (SSG only)
- Admin panel requires authentication

Deployment requirements:
- Vercel deploy hooks for content change rebuilds
- New environment variables: PAYLOAD_SECRET, DATABASE_URI
```
