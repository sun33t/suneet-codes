#!/bin/bash
# validate-content-patterns.sh
# Validates content layer code against project patterns

FILE="$1"

# Exit silently if file doesn't match content layer patterns
if [[ ! "$FILE" =~ (content/articles/|content/data/|content-collections\.ts|lib/content/) ]]; then
  exit 0
fi

ERRORS=0
WARNINGS=0

# Check 1: MDX files must have numeric prefix
if [[ "$FILE" =~ content/articles/.*\.mdx$ ]]; then
  FILENAME=$(basename "$FILE")
  if [[ ! "$FILENAME" =~ ^[0-9]{4}- ]]; then
    echo "❌ Content: Article filename must start with 4-digit prefix (e.g., 0001-)"
    echo "   Found: $FILENAME"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 2: MDX files must have required frontmatter fields
if [[ "$FILE" =~ \.mdx$ ]] && [[ -f "$FILE" ]]; then
  REQUIRED_FIELDS=("title" "author" "date" "updatedAt" "description" "coverImage" "keywords" "categories")

  for field in "${REQUIRED_FIELDS[@]}"; do
    if ! grep -q "^${field}:" "$FILE" 2>/dev/null; then
      echo "❌ Content: Missing required frontmatter field '$field' in $FILE"
      ERRORS=$((ERRORS + 1))
    fi
  done
fi

# Check 3: Date format must be YYYY-MM-DD
if [[ "$FILE" =~ \.mdx$ ]] && [[ -f "$FILE" ]]; then
  # Check date field format
  DATE_LINE=$(grep "^date:" "$FILE" 2>/dev/null)
  if [[ -n "$DATE_LINE" ]] && [[ ! "$DATE_LINE" =~ ^date:\ ?[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "⚠️  Content: Date may not be in YYYY-MM-DD format"
    echo "   Found: $DATE_LINE"
    WARNINGS=$((WARNINGS + 1))
  fi

  # Check updatedAt field format
  UPDATED_LINE=$(grep "^updatedAt:" "$FILE" 2>/dev/null)
  if [[ -n "$UPDATED_LINE" ]] && [[ ! "$UPDATED_LINE" =~ ^updatedAt:\ ?[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "⚠️  Content: updatedAt may not be in YYYY-MM-DD format"
    echo "   Found: $UPDATED_LINE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 4: Categories must not be empty
if [[ "$FILE" =~ \.mdx$ ]] && [[ -f "$FILE" ]]; then
  CATEGORIES_LINE=$(grep "^categories:" "$FILE" 2>/dev/null)
  if [[ "$CATEGORIES_LINE" =~ categories:\ ?\[\] ]]; then
    echo "❌ Content: Categories array cannot be empty - at least one category required"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 5: content/data files should export const
if [[ "$FILE" =~ content/data/.*\.ts$ ]] && [[ -f "$FILE" ]]; then
  if ! grep -q "export const" "$FILE" 2>/dev/null; then
    echo "⚠️  Content: Data files should export const declarations"
    WARNINGS=$((WARNINGS + 1))
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
