---
description: Generate an optimized prompt for /speckit.specify from a planning document
argument-hint: <path-to-planning-document>
---

## Input

```text
$ARGUMENTS
```

## Purpose

This command takes a planning document (the outcome of research/planning conversations with Claude) and distills it into a concise, well-structured natural language prompt optimized for the `/speckit.specify` command.

## Instructions

### 1. Validate Input

If `$ARGUMENTS` is empty or does not point to a valid file:
- ERROR: "Please provide a path to a planning document. Usage: `/specify-prompt-from-plan path/to/planning-doc.md`"

### 2. Read and Analyze the Planning Document

Read the document at the provided path and extract:

1. **Core Feature Identity**
   - What is the primary capability being added?
   - What problem does it solve?
   - Who benefits from this feature?

2. **User-Facing Value** (prioritize these)
   - What can users DO after this feature is implemented?
   - What user workflows are enabled or improved?
   - What pain points are addressed?

3. **Scope Boundaries**
   - What is explicitly IN scope?
   - What is explicitly OUT of scope or deferred?
   - What are the stated constraints?

4. **Key Requirements** (extract only business/user requirements, NOT technical)
   - Must-have capabilities
   - User-facing behaviors
   - Data that users interact with

### 3. Filter Out Implementation Details

**EXCLUDE from the output prompt:**
- Specific technologies, frameworks, or libraries (e.g., "SQLite", "PostgreSQL", "Lexical editor")
- Database schemas, API endpoints, or code structure
- File paths, directory organization, or architecture diagrams
- Installation steps, configuration details, or deployment instructions
- Migration scripts or technical integration patterns
- Performance implementation details (caching, indexing, etc.)

**INCLUDE in the output prompt:**
- User goals and motivations
- Business requirements and success criteria
- User workflows and scenarios
- Data concepts (what users see/interact with, not how it's stored)
- Constraints from a user perspective

### 4. Detect Ambiguity, Confusion, or Contradictions

Scan the planning document for:
- Conflicting requirements or statements
- Unclear scope boundaries
- Multiple interpretations of the same feature
- Missing critical information (who, what, why)
- Assumptions that may not be valid

**If significant ambiguity is detected**, use the AskUserQuestion tool to clarify BEFORE generating the final prompt. Limit to 1-3 critical questions maximum.

Example clarification scenarios:
- Document mentions multiple user types but doesn't clarify which is primary
- Scope is unclear (is X in scope or out of scope?)
- Requirements contradict each other
- Core value proposition is ambiguous

### 5. Generate the Optimized Prompt

Create a natural language feature description that:

1. **Opens with a clear feature statement** (1-2 sentences)
   - "I want to add [capability] that allows [users] to [action]"
   - "Build a [feature] for [purpose]"

2. **Describes user value** (2-3 sentences)
   - What problem it solves
   - Who benefits
   - Why it matters

3. **Lists key user capabilities** (bullet points)
   - What users can do
   - What behaviors they expect
   - What data they interact with

4. **States scope boundaries** (if relevant)
   - What's explicitly included
   - What's explicitly excluded or deferred

5. **Includes success criteria hints** (if evident from document)
   - Measurable outcomes users care about
   - Quality expectations

**Prompt Length Target**: 150-400 words. Concise but complete.

### 6. Output Format

Present the output in this format:

```markdown
## Distilled Feature Prompt

The following prompt has been optimized for `/speckit.specify`:

---

[THE GENERATED PROMPT HERE]

---

## Usage

Copy the prompt above and run:

```
/speckit.specify [paste prompt here]
```

## Source Analysis

- **Document**: [filename]
- **Core Feature**: [2-4 word summary]
- **Filtered Out**: [brief list of implementation details that were excluded]
- **Confidence**: [High/Medium/Low] - [brief explanation]
```

### 7. Quality Checks

Before outputting, verify the prompt:

- [ ] Contains NO technology names, frameworks, or libraries
- [ ] Contains NO file paths, code structures, or architecture details
- [ ] Contains NO database schemas or API specifications
- [ ] Focuses on WHAT and WHY, not HOW
- [ ] Is written for a non-technical stakeholder
- [ ] Clearly identifies the core feature (single focus)
- [ ] Includes measurable success criteria or hints toward them

If any check fails, revise the prompt before outputting.

## Example Transformation

**Input (from planning document):**
> "Payload CMS is an open-source, TypeScript-first headless CMS that installs directly into a Next.js /app folder... We need SQLite for development, PostgreSQL for production... Collections for Testimonials, Roles, Projects, Uses..."

**Output (optimized prompt):**
> "I want to add a content management system to my portfolio site that allows me to edit testimonials, work history, projects, and tools/uses through an admin interface instead of editing code files.
>
> Currently, all site content is hardcoded in TypeScript files, which means any content update requires code changes and redeployment. The CMS should let me update content through a visual editor while keeping the site fast and statically generated.
>
> Key capabilities:
> - Edit testimonials (author info, quotes, dates)
> - Manage work history/resume entries
> - Update project showcases
> - Maintain my 'uses' page (tools and hardware)
> - Edit site copy (bio, about page text)
>
> The site should remain fully static for visitors - the CMS is only for content editing, not runtime content delivery.
>
> Success looks like: Content updates are live within minutes of saving, no developer needed for routine content changes, site performance unchanged for visitors."
