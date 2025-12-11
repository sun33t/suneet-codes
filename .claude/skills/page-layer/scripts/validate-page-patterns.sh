#!/bin/bash
# validate-page-patterns.sh
# Validates page layer code against project patterns

FILE="$1"

# Exit silently if file doesn't match page layer patterns
if [[ ! "$FILE" =~ app/.*\.(tsx|ts)$ ]]; then
  exit 0
fi

ERRORS=0
WARNINGS=0

# Check 1: Page files should not have "use client"
if [[ "$FILE" =~ app/.*/page\.tsx$ ]] || [[ "$FILE" =~ app/page\.tsx$ ]]; then
  if grep -q '"use client"' "$FILE" 2>/dev/null; then
    echo "❌ Page: Page components should be Server Components"
    echo "   Remove \"use client\" and move interactivity to child components"
    echo "   File: $FILE"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 2: Dynamic routes should have generateStaticParams
if [[ "$FILE" =~ app/\[.*\]/page\.tsx$ ]]; then
  if ! grep -q "generateStaticParams" "$FILE" 2>/dev/null; then
    echo "⚠️  Page: Dynamic route missing generateStaticParams"
    echo "   Add generateStaticParams for static generation"
    echo "   File: $FILE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 3: Check for Next.js 15 async params pattern
if [[ "$FILE" =~ app/\[.*\]/page\.tsx$ ]]; then
  # Check if params is typed as Promise
  if grep -qE "params:\s*\{" "$FILE" 2>/dev/null; then
    if ! grep -qE "params:\s*Promise<" "$FILE" 2>/dev/null; then
      echo "❌ Page: Next.js 15 requires params as Promise type"
      echo "   Change: params: { slug: string }"
      echo "   To:     params: Promise<{ slug: string }>"
      echo "   File: $FILE"
      ERRORS=$((ERRORS + 1))
    fi
  fi

  # Check if params is awaited
  if grep -qE "params\.(slug|id|[a-z]+)" "$FILE" 2>/dev/null; then
    if ! grep -qE "await params" "$FILE" 2>/dev/null; then
      echo "❌ Page: Next.js 15 requires awaiting params"
      echo "   Add: const { slug } = await params;"
      echo "   File: $FILE"
      ERRORS=$((ERRORS + 1))
    fi
  fi
fi

# Check 4: Pages should have metadata
if [[ "$FILE" =~ app/.*/page\.tsx$ ]] || [[ "$FILE" =~ app/page\.tsx$ ]]; then
  if ! grep -qE "export (const metadata|async function generateMetadata)" "$FILE" 2>/dev/null; then
    echo "⚠️  Page: Missing metadata export"
    echo "   Add: export const metadata: Metadata = { ... }"
    echo "   Or:   export async function generateMetadata() { ... }"
    echo "   File: $FILE"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 5: Layout files should accept children
if [[ "$FILE" =~ layout\.tsx$ ]]; then
  if ! grep -q "children" "$FILE" 2>/dev/null; then
    echo "❌ Page: Layout must accept children prop"
    echo "   File: $FILE"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 6: Check for hardcoded URLs instead of config
if [[ "$FILE" =~ app/.*\.tsx$ ]]; then
  if grep -qE 'href="https?://' "$FILE" 2>/dev/null; then
    # Allow external links
    if grep -qE 'href="https?://(?!.*suneet)' "$FILE" 2>/dev/null; then
      : # External links are fine
    else
      echo "⚠️  Page: Consider using config for internal URLs"
      echo "   File: $FILE"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
fi

# Check 7: Dynamic routes should handle not found
if [[ "$FILE" =~ app/\[.*\]/page\.tsx$ ]]; then
  if ! grep -q "notFound()" "$FILE" 2>/dev/null; then
    echo "⚠️  Page: Dynamic route should call notFound() for missing data"
    echo "   Import: import { notFound } from 'next/navigation';"
    echo "   File: $FILE"
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
