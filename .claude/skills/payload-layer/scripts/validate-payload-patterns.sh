#!/bin/bash
# validate-payload-patterns.sh
# Validates Payload CMS layer code against project patterns

FILE="$1"

# Exit silently if file doesn't match payload layer patterns
if [[ ! "$FILE" =~ lib/payload/.*\.(ts|tsx)$ ]]; then
  exit 0
fi

ERRORS=0
WARNINGS=0

# Check 1: Global files should use triggerDeployHook
if [[ "$FILE" =~ lib/payload/globals/[A-Z].*\.ts$ ]]; then
  if ! grep -q "triggerDeployHook" "$FILE" 2>/dev/null; then
    echo "⚠️  Payload: Global missing triggerDeployHook"
    echo "   Add: hooks: { afterChange: [() => triggerDeployHook()] }"
    echo "   File: $FILE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 2: Page globals should use createPageIntroFields
if [[ "$FILE" =~ lib/payload/globals/.*Page\.ts$ ]]; then
  if ! grep -q "createPageIntroFields" "$FILE" 2>/dev/null; then
    echo "⚠️  Payload: Page global missing createPageIntroFields"
    echo "   Import and use createPageIntroFields() in fields array"
    echo "   File: $FILE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 3: Page globals should use createMetadataFields
if [[ "$FILE" =~ lib/payload/globals/.*Page\.ts$ ]]; then
  if ! grep -q "createMetadataFields" "$FILE" 2>/dev/null; then
    echo "⚠️  Payload: Page global missing createMetadataFields"
    echo "   Import and use createMetadataFields() in fields array"
    echo "   File: $FILE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 4: Global should be exported from index
if [[ "$FILE" =~ lib/payload/globals/[A-Z].*\.ts$ ]] && [[ ! "$FILE" =~ index\.ts$ ]]; then
  GLOBAL_NAME=$(basename "$FILE" .ts)
  INDEX_FILE="$(dirname "$FILE")/index.ts"
  if [ -f "$INDEX_FILE" ]; then
    if ! grep -q "export.*$GLOBAL_NAME" "$INDEX_FILE" 2>/dev/null; then
      echo "❌ Payload: Global not exported from index.ts"
      echo "   Add: export { $GLOBAL_NAME } from \"./$GLOBAL_NAME\";"
      echo "   File: $INDEX_FILE"
      ERRORS=$((ERRORS + 1))
    fi
  fi
fi

# Check 5: Seed files should export constants
if [[ "$FILE" =~ lib/payload/data/.*\.seed\.ts$ ]]; then
  if ! grep -q "^export const" "$FILE" 2>/dev/null; then
    echo "⚠️  Payload: Seed file has no exported constants"
    echo "   Export seed data with: export const {NAME}_SEED = { ... };"
    echo "   File: $FILE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 6: Query files should export async functions
if [[ "$FILE" =~ lib/payload/queries/.*\.ts$ ]] && [[ ! "$FILE" =~ index\.ts$ ]]; then
  if ! grep -q "export async function" "$FILE" 2>/dev/null; then
    echo "⚠️  Payload: Query file has no exported async functions"
    echo "   Add: export async function get{Name}() { ... }"
    echo "   File: $FILE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 7: Query functions should use getPayloadClient
if [[ "$FILE" =~ lib/payload/queries/.*\.ts$ ]] && [[ ! "$FILE" =~ index\.ts$ ]]; then
  if grep -q "export async function" "$FILE" 2>/dev/null; then
    if ! grep -q "getPayloadClient" "$FILE" 2>/dev/null; then
      echo "❌ Payload: Query function not using getPayloadClient"
      echo "   Import: import { getPayloadClient } from \"../get-payload\";"
      echo "   File: $FILE"
      ERRORS=$((ERRORS + 1))
    fi
  fi
fi

# Check 8: Seed data using richText should import from lexical-helpers
if [[ "$FILE" =~ lib/payload/data/.*\.seed\.ts$ ]]; then
  if grep -q "richText\[" "$FILE" 2>/dev/null || grep -q "paragraph\[" "$FILE" 2>/dev/null; then
    if ! grep -q "from.*lexical-helpers" "$FILE" 2>/dev/null; then
      echo "⚠️  Payload: Seed file using rich text without lexical-helpers import"
      echo "   Add: import { richText, paragraph, text } from \"./lexical-helpers\";"
      echo "   File: $FILE"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
fi

# Check 9: Types file should import from payload-types
if [[ "$FILE" =~ lib/payload/data/types\.ts$ ]]; then
  if ! grep -q "from.*payload-types" "$FILE" 2>/dev/null; then
    echo "❌ Payload: types.ts not importing from payload-types"
    echo "   Add: import type { ... } from \"../payload-types\";"
    echo "   File: $FILE"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 10: Globals should have access controls
if [[ "$FILE" =~ lib/payload/globals/[A-Z].*\.ts$ ]]; then
  if ! grep -q "access:" "$FILE" 2>/dev/null; then
    echo "❌ Payload: Global missing access controls"
    echo "   Add: access: { read: () => true, update: ({ req }) => !!req.user }"
    echo "   File: $FILE"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Report results
if [ $ERRORS -gt 0 ]; then
  echo ""
  echo "Found $ERRORS error(s) and $WARNINGS warning(s)"
  exit 1
fi

if [ $WARNINGS -gt 0 ]; then
  echo ""
  echo "Found $WARNINGS warning(s) - review recommended"
fi

exit 0
