#!/bin/bash
# validate-component-patterns.sh
# Validates component layer code against project patterns

FILE="$1"

# Exit silently if file doesn't match component layer patterns
if [[ ! "$FILE" =~ components/.*\.tsx$ ]]; then
  exit 0
fi

ERRORS=0
WARNINGS=0

# Check 1: forwardRef components should have displayName
if grep -q "React.forwardRef" "$FILE" 2>/dev/null; then
  # Extract component name using sed (portable across macOS/Linux)
  COMPONENT_NAME=$(grep "= React.forwardRef" "$FILE" | sed -E 's/.*const ([A-Za-z0-9_]+) = React\.forwardRef.*/\1/' | head -1)
  if [[ -n "$COMPONENT_NAME" ]] && ! grep -q "${COMPONENT_NAME}.displayName" "$FILE" 2>/dev/null; then
    echo "❌ Component: forwardRef component '$COMPONENT_NAME' missing displayName"
    echo "   Add: ${COMPONENT_NAME}.displayName = \"${COMPONENT_NAME}\";"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 2: Check for inline styles (style={{ }})
if grep -qE 'style=\{\{' "$FILE" 2>/dev/null; then
  echo "⚠️  Component: Found inline styles - prefer Tailwind classes"
  echo "   File: $FILE"
  WARNINGS=$((WARNINGS + 1))
fi

# Check 3: Check for string concatenation in className
if grep -qE 'className=\{[^}]*\+' "$FILE" 2>/dev/null; then
  echo "⚠️  Component: Found string concatenation in className - use cn() utility"
  echo "   File: $FILE"
  WARNINGS=$((WARNINGS + 1))
fi

# Check 4: Check for template literals in className without cn()
if grep -qE 'className=\{`' "$FILE" 2>/dev/null; then
  if ! grep -q "import.*cn.*from" "$FILE" 2>/dev/null; then
    echo "⚠️  Component: Found template literal className without cn() import"
    echo "   Consider using cn() from @/lib/utils for class merging"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

# Check 5: UI components should use CVA pattern
if [[ "$FILE" =~ components/ui/ ]]; then
  # Check if it's a non-trivial component (not just re-export)
  if grep -q "export.*function\|export.*const.*=" "$FILE" 2>/dev/null; then
    # Complex UI components should consider CVA
    LINES=$(wc -l < "$FILE")
    if [[ $LINES -gt 20 ]] && ! grep -q "cva\|class-variance-authority" "$FILE" 2>/dev/null; then
      echo "⚠️  Component: UI component may benefit from CVA for variants"
      echo "   File: $FILE"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
fi

# Check 6: Client components should have "use client" for hooks
if grep -qE "useState|useEffect|useRef|useCallback|useMemo|useContext" "$FILE" 2>/dev/null; then
  if ! grep -q '"use client"' "$FILE" 2>/dev/null; then
    echo "❌ Component: Uses React hooks but missing \"use client\" directive"
    echo "   Add \"use client\" at the top of the file"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 7: Check for onClick/onChange without "use client"
if grep -qE "onClick=\{|onChange=\{|onSubmit=\{" "$FILE" 2>/dev/null; then
  if ! grep -q '"use client"' "$FILE" 2>/dev/null; then
    # Check if handler is passed as prop (acceptable in server components)
    if ! grep -qE "onClick:\s*\(" "$FILE" 2>/dev/null; then
      echo "⚠️  Component: Has event handlers - may need \"use client\" directive"
      echo "   File: $FILE"
      WARNINGS=$((WARNINGS + 1))
    fi
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
