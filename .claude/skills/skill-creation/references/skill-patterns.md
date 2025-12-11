# Skill Patterns

## Directory Structures

Minimal (simple skills):
```
skill-name/
└── SKILL.md
```

Standard (skills with supplementary content):
```
skill-name/
├── SKILL.md
└── references/
    └── patterns.md
```

Complete (complex skills with utilities):
```
skill-name/
├── SKILL.md
├── references/
│   └── detailed-guide.md
├── scripts/
│   └── validate.sh
└── assets/
    └── template.md
```

Use minimal unless content exceeds ~2,000 words or requires supplementary resources.

## SKILL.md Templates

### Minimal (no references)

```yaml
---
name: skill-name
description: This skill should be used when the user asks to "action 1", "action 2", "action 3", "action 4". Provides guidance for [domain/task].
---

# Skill Name

## Workflow

### 1. First Step

Instructions in imperative form.

### 2. Second Step

More instructions.

(Add more steps as needed for the workflow)
```

### With references

```yaml
---
name: skill-name
description: This skill should be used when the user asks to "action 1", "action 2", "action 3", "action 4". Provides guidance for [domain/task].
---

# Skill Name

## Workflow

### 1. First Step

Instructions in imperative form.

### 2. Second Step

More instructions.

(Add more steps as needed for the workflow)

## References

For detailed patterns, see [references/patterns.md](references/patterns.md).
```

Notes:
- H1 heading: human-readable version of skill name (e.g., `name: pdf-processing` → `# PDF Processing`)
- Add workflow steps as needed (not limited to 2)
- "Provides [X]" should describe the capability briefly (e.g., "Provides PDF manipulation guidance", "Provides Git workflow automation")

Only include References section if reference files exist.

## Naming Conventions

Name field and directory name must match:
- Lowercase letters, numbers, hyphens only
- Max 64 characters
- Descriptive of capability

Correct: `pdf-processing`, `git-commit-helper`, `api-documentation`
Wrong: `skill1`, `mySkill`, `PDF_Processing`

## Description Patterns

Include 3-5 trigger phrases. Use action verbs in quotes. Max 1024 characters.

Action-based:
```yaml
description: This skill should be used when the user asks to "create X", "add Y", "configure Z", "set up W". Provides guidance for [domain/task].
```

Topic-based (use when actions vary but topic is consistent):
```yaml
description: This skill should be used when the user mentions [topic], [technology], or asks about [concept]. Provides guidance for [domain/task].
```

Combined (action phrases + topic fallback):
```yaml
description: This skill should be used when the user asks to "create X", "add Y", "configure Z", or mentions [topic]. Provides guidance for [domain/task].
```

Prefer action-based. Use topic-based or combined only when action phrases alone are insufficient.

## Common Mistakes

### Vague description

Wrong:
```yaml
description: Provides guidance for working with hooks.
```

Correct:
```yaml
description: This skill should be used when the user asks to "create a hook", "add a PreToolUse hook", "validate tool use", "implement hook events". Provides hooks API guidance.
```

### SKILL.md too long

Wrong: 8,000 words in SKILL.md

Correct: Under 2,000 words in SKILL.md, excess in references/

### Using second-person (wrong)

Wrong:
```
You should start by reading the file.
You need to validate the input.
```

Correct (imperative form):
```
Start by reading the file.
Validate the input.
```

### Unreferenced resources

Wrong: References exist but SKILL.md doesn't mention them

Correct: Include explicit references:
```markdown
For detailed patterns, see [references/patterns.md](references/patterns.md).
```

## Validation Checklist

Structure:
- SKILL.md exists with valid YAML frontmatter
- Frontmatter has `name` and `description`
- Referenced files exist

Description:
- Uses third person ("This skill should be used when...")
- Contains specific trigger phrases
- States what the skill provides

Content:
- Body uses imperative form
- Body minimum ~500 words (workflow + key instructions)
- Body target ~2,000 words, max 5,000
- Excess content moved to references/
- Resources explicitly referenced in SKILL.md if they exist
