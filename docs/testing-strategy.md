# Testing Strategy for suneet.codes

This document serves as the primary reference for implementing test-driven development (TDD) in this Next.js 15 project. It covers the testing stack, configuration, patterns, and specific test implementations.

---

## Table of Contents

1. [Current State Assessment](#current-state-assessment)
2. [Testing Stack](#testing-stack)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Directory Structure](#directory-structure)
6. [What to Test](#what-to-test)
7. [TDD Workflow](#tdd-workflow)
8. [Test Patterns & Examples](#test-patterns--examples)
9. [Mocking Strategies](#mocking-strategies)
10. [Next.js 15 Considerations](#nextjs-15-considerations)
11. [CI/CD Integration](#cicd-integration)
12. [Implementation Checklist](#implementation-checklist)

---

## Current State Assessment

### Project Overview

- **Framework**: Next.js 15.4.8 with App Router
- **React Version**: 19.2.1
- **Language**: TypeScript 5.9.3
- **Package Manager**: pnpm
- **Linting/Formatting**: Biome
- **Git Hooks**: Lefthook (pre-commit: typecheck + Biome check)

### Existing Testing Infrastructure

**None** - No test files, testing frameworks, or test configurations exist in the project.

### Testable Code Inventory

| Category | Files | Priority |
|----------|-------|----------|
| Utility Functions | `lib/utils/*.ts`, `lib/formatDate.ts`, `lib/articles.ts` | High |
| Zod Schemas | `types/index.ts` (ContactFormFieldSchema) | High |
| Server Actions | `app/contact/action.ts` | High |
| Client Components | `components/contact-form.tsx`, `components/articles-filter.tsx`, `components/theme-toggle.tsx` | Medium |
| Hooks | `hooks/use-toast.ts` | Medium |
| Server Components | Various in `components/` | Low (use E2E) |

---

## Testing Stack

### Recommended Tools

| Layer | Tool | Purpose |
|-------|------|---------|
| **Unit Tests** | Vitest | Fast, ESM-native test runner for pure functions |
| **Component Tests** | Vitest Browser Mode + `vitest-browser-react` | Real browser testing for React components |
| **Browser Provider** | `@vitest/browser-playwright` | Runs tests in real Chromium/Firefox/WebKit |
| **E2E Tests** | Playwright | Full application end-to-end testing |
| **Network Mocking** | MSW (Mock Service Worker) | API request interception |

### Why Vitest Browser Mode?

Vitest Browser Mode is the **recommended approach** for component testing because it runs tests in real browsers rather than simulating the DOM in Node.js:

| Aspect | jsdom (old approach) | Browser Mode (recommended) |
|--------|---------------------|---------------------------|
| **Environment** | Simulated DOM in Node.js | Real browser (Chromium, Firefox, WebKit) |
| **CSS** | Not rendered | Actual CSS rendering and layout |
| **Events** | Simulated via JavaScript | Real events via Chrome DevTools Protocol |
| **Browser APIs** | Polyfilled or missing | Native browser APIs |
| **Accessibility** | Limited testing capability | Full accessibility testing |
| **Debugging** | Console only | Full browser DevTools |
| **Accuracy** | May miss real-world issues | Catches CSS, focus, and event bugs |

### Why Not jsdom?

The traditional `jsdom` approach simulates the DOM in Node.js, which can miss:

- CSS layout and styling problems
- Real browser API behavior differences
- Accurate event handling and propagation
- Proper focus management and accessibility features

**Use jsdom only for**:
- Pure unit tests (utilities, Zod schemas, server actions)
- Legacy test migration scenarios
- Environments where browser testing isn't feasible

---

## Installation

### Quick Setup (Recommended)

```bash
# Initialize Vitest with browser mode
npx vitest init browser
```

### Manual Installation

#### Core Dependencies (Unit Tests)

```bash
# Vitest core
pnpm add -D vitest vite-tsconfig-paths
```

#### Browser Mode Dependencies (Component Tests)

```bash
# Browser mode with Playwright provider
pnpm add -D @vitest/browser-playwright vitest-browser-react

# Install Playwright browsers
npx playwright install chromium
```

#### E2E Testing (Playwright)

```bash
# Interactive setup
pnpm create playwright

# Or manual installation
pnpm add -D @playwright/test
npx playwright install
```

#### Optional: Network Mocking with MSW

```bash
pnpm add -D msw
```

---

## Configuration

### Vitest Configuration (with Browser Mode)

Create `vitest.config.mts` in project root:

```typescript
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // Global test APIs (describe, it, expect)
    globals: true,

    // Test file patterns
    include: ["**/*.test.{ts,tsx}"],

    // Exclude patterns
    exclude: [
      "node_modules",
      ".next",
      ".content-collections",
      "e2e",
      "dist",
    ],

    // Browser mode configuration for component tests
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      headless: true, // Set to false for debugging
    },

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html", "lcov"],
      exclude: [
        "node_modules",
        ".next",
        ".content-collections",
        "**/*.test.{ts,tsx}",
        "**/*.config.{ts,mts,js}",
        "**/types/**",
        "e2e/**",
      ],
    },

    // Reporter configuration
    reporters: ["verbose"],

    // Timeout for async tests
    testTimeout: 10000,
  },
});
```

### Project-Based Configuration (Unit + Component Tests)

For projects that need both Node.js unit tests and browser component tests:

```typescript
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    projects: [
      // Unit tests (Node.js environment)
      {
        test: {
          name: "unit",
          include: [
            "lib/**/*.test.ts",
            "types/**/*.test.ts",
            "app/**/action.test.ts",
          ],
          environment: "node",
        },
      },
      // Component tests (Browser environment)
      {
        test: {
          name: "browser",
          include: [
            "components/**/*.test.tsx",
            "hooks/**/*.test.ts",
          ],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            headless: true,
          },
        },
      },
    ],
  },
});
```

### TypeScript Configuration

Add Vitest types to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

### Package.json Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### Playwright Configuration (E2E)

Create `playwright.config.ts` in project root:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // Start dev server before running E2E tests
  webServer: {
    command: "pnpm build && pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

### Lefthook Integration

Update `lefthook.yml` to include tests:

```yaml
pre-commit:
  parallel: true
  commands:
    typecheck:
      run: pnpm typecheck
    check:
      run: pnpm check
    test:
      run: pnpm test:run --reporter=dot
```

---

## Directory Structure

### Recommended: Colocated Tests

Place test files alongside the code they test:

```
lib/
├── utils/
│   ├── createArticleSlug.ts
│   ├── createArticleSlug.test.ts        # ← Unit test (Node.js)
│   ├── sortByTitleProperty.ts
│   ├── sortByTitleProperty.test.ts
│   ├── formatDateRelativeToCurrentYear.ts
│   └── formatDateRelativeToCurrentYear.test.ts
├── articles.ts
├── articles.test.ts
├── formatDate.ts
├── formatDate.test.ts
├── turnstile.ts
├── turnstile.test.ts
├── resend.ts
└── resend.test.ts

types/
├── index.ts
└── index.test.ts                        # ← Unit test (Node.js)

components/
├── contact-form.tsx
├── contact-form.test.tsx                # ← Browser test
├── articles-filter.tsx
├── articles-filter.test.tsx
├── theme-toggle.tsx
└── theme-toggle.test.tsx

app/
└── contact/
    ├── action.ts
    └── action.test.ts                   # ← Unit test (Node.js)

hooks/
├── use-toast.ts
└── use-toast.test.ts                    # ← Browser test

e2e/                                     # ← E2E tests (Playwright)
├── contact-form.spec.ts
├── articles.spec.ts
└── navigation.spec.ts
```

### Benefits of Colocation

1. **Discoverability**: Tests are easy to find next to the code
2. **Maintenance**: When code moves, tests move with it
3. **Context**: Clear relationship between test and implementation
4. **IDE Support**: Quick navigation between test and source

---

## What to Test

### Testing Priority Matrix

| Priority | Type | Files | Test Environment |
|----------|------|-------|------------------|
| **P0** | Utility Functions | `lib/utils/*.ts` | Node.js (unit) |
| **P0** | Zod Schemas | `types/index.ts` | Node.js (unit) |
| **P1** | Server Actions | `app/contact/action.ts` | Node.js (unit) |
| **P1** | Data Fetching | `lib/articles.ts` | Node.js (unit) |
| **P2** | Client Components | `components/*.tsx` | Browser Mode |
| **P2** | Hooks | `hooks/*.ts` | Browser Mode |
| **P3** | E2E Flows | Critical user journeys | Playwright |

### Test Coverage Goals

**Phase 1 (Initial Setup)**:
- All utility functions: 100% coverage
- Zod schemas: 100% coverage
- Server actions: 80% coverage

**Phase 2 (Component Testing)**:
- Interactive client components: 80% coverage
- Custom hooks: 100% coverage

**Phase 3 (E2E)**:
- Contact form submission flow
- Article filtering and navigation
- Theme switching persistence

---

## TDD Workflow

### The TDD Cycle

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    ┌─────────┐      ┌─────────┐      ┌──────────┐      │
│    │   RED   │ ───▶ │  GREEN  │ ───▶ │ REFACTOR │      │
│    │  Write  │      │  Make   │      │  Clean   │      │
│    │ failing │      │   it    │      │   up     │      │
│    │  test   │      │  pass   │      │  code    │      │
│    └─────────┘      └─────────┘      └──────────┘      │
│         ▲                                   │          │
│         └───────────────────────────────────┘          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Step-by-Step Process

#### 1. RED: Write a Failing Test

```typescript
// lib/utils/calculateReadingTime.test.ts
import { describe, expect, it } from "vitest";
import { calculateReadingTime } from "./calculateReadingTime";

describe("calculateReadingTime", () => {
  it("returns 1 min for short content", () => {
    expect(calculateReadingTime("Hello world")).toBe(1);
  });

  it("calculates based on 200 words per minute", () => {
    const content = "word ".repeat(400); // 400 words
    expect(calculateReadingTime(content)).toBe(2);
  });
});
```

Run the test - it should fail (function doesn't exist yet).

#### 2. GREEN: Write Minimal Code to Pass

```typescript
// lib/utils/calculateReadingTime.ts
const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = wordCount / WORDS_PER_MINUTE;
  return Math.max(1, Math.ceil(minutes));
}
```

Run the test - it should pass.

#### 3. REFACTOR: Improve Without Breaking Tests

```typescript
// lib/utils/calculateReadingTime.ts
const WORDS_PER_MINUTE = 200;
const MIN_READING_TIME = 1;

export function calculateReadingTime(content: string): number {
  if (!content.trim()) return MIN_READING_TIME;

  const words = content.trim().split(/\s+/);
  const minutes = words.length / WORDS_PER_MINUTE;

  return Math.max(MIN_READING_TIME, Math.ceil(minutes));
}
```

Run tests again - should still pass.

### TDD Best Practices

1. **Write the test first** - Resist the urge to write code before the test
2. **One behavior per test** - Keep tests focused and descriptive
3. **Test behavior, not implementation** - Focus on what, not how
4. **Use descriptive names** - Test names should describe the expected behavior
5. **Keep tests fast** - Unit tests should run in milliseconds
6. **Isolate tests** - No test should depend on another

---

## Test Patterns & Examples

### Pattern 1: Pure Utility Functions (Node.js)

```typescript
// lib/utils/createArticleSlug.test.ts
import { describe, expect, it } from "vitest";
import { createArticleSlug } from "./createArticleSlug";

describe("createArticleSlug", () => {
  describe("with numeric prefix", () => {
    it("removes 4-digit prefix from filename", () => {
      expect(createArticleSlug("0001-my-article")).toBe("my-article");
    });

    it("handles larger numbers", () => {
      expect(createArticleSlug("0042-another-article")).toBe("another-article");
    });

    it("preserves rest of slug intact", () => {
      expect(createArticleSlug("0001-my-multi-word-article")).toBe(
        "my-multi-word-article"
      );
    });
  });

  describe("without numeric prefix", () => {
    it("returns filename unchanged", () => {
      expect(createArticleSlug("my-article")).toBe("my-article");
    });
  });

  describe("edge cases", () => {
    it("handles empty string", () => {
      expect(createArticleSlug("")).toBe("");
    });

    it("handles prefix-only input", () => {
      expect(createArticleSlug("0001-")).toBe("");
    });
  });
});
```

### Pattern 2: Zod Schema Validation (Node.js)

```typescript
// types/index.test.ts
import { describe, expect, it } from "vitest";
import { ContactFormFieldSchema } from "./index";

describe("ContactFormFieldSchema", () => {
  const validData = {
    name: "John Doe",
    email: "john@example.com",
    message: "This is a valid test message with enough characters.",
  };

  describe("valid inputs", () => {
    it("accepts valid form data", () => {
      const result = ContactFormFieldSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("trims whitespace from inputs", () => {
      const result = ContactFormFieldSchema.safeParse({
        ...validData,
        name: "  John Doe  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
      }
    });
  });

  describe("name validation", () => {
    it("rejects empty name", () => {
      const result = ContactFormFieldSchema.safeParse({
        ...validData,
        name: "",
      });
      expect(result.success).toBe(false);
    });

    it("rejects name with only whitespace", () => {
      const result = ContactFormFieldSchema.safeParse({
        ...validData,
        name: "   ",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("email validation", () => {
    it("rejects invalid email format", () => {
      const result = ContactFormFieldSchema.safeParse({
        ...validData,
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
    });

    it("rejects email without domain", () => {
      const result = ContactFormFieldSchema.safeParse({
        ...validData,
        email: "john@",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("message validation", () => {
    it("rejects empty message", () => {
      const result = ContactFormFieldSchema.safeParse({
        ...validData,
        message: "",
      });
      expect(result.success).toBe(false);
    });

    it("rejects message that is too short", () => {
      const result = ContactFormFieldSchema.safeParse({
        ...validData,
        message: "Hi",
      });
      expect(result.success).toBe(false);
    });
  });
});
```

### Pattern 3: Server Actions with Mocking (Node.js)

```typescript
// app/contact/action.test.ts
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock external dependencies BEFORE importing the action
vi.mock("@/lib/turnstile", () => ({
  verifyTurnstileToken: vi.fn(),
}));

vi.mock("@/lib/resend", () => ({
  sendResendEmail: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

// Mock redirect to throw (as it does in Next.js)
vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

// Import after mocks are set up
import { createEnquiry } from "./action";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendResendEmail } from "@/lib/resend";
import { redirect } from "next/navigation";

describe("createEnquiry", () => {
  const createFormData = (overrides: Record<string, string> = {}) => {
    const formData = new FormData();
    formData.set("name", "John Doe");
    formData.set("email", "john@example.com");
    formData.set("message", "This is a valid test message with enough content.");
    formData.set("cf-turnstile-response", "valid-token");

    for (const [key, value] of Object.entries(overrides)) {
      formData.set(key, value);
    }

    return formData;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("turnstile verification", () => {
    it("returns error when turnstile verification fails", async () => {
      vi.mocked(verifyTurnstileToken).mockResolvedValue(false);

      const result = await createEnquiry({}, createFormData());

      expect(result.success).toBe(false);
      expect(result.error).toContain("verification");
      expect(sendResendEmail).not.toHaveBeenCalled();
    });
  });

  describe("form validation", () => {
    it("returns validation errors for invalid data", async () => {
      vi.mocked(verifyTurnstileToken).mockResolvedValue(true);

      const result = await createEnquiry(
        {},
        createFormData({ email: "invalid-email" })
      );

      expect(result.success).toBe(false);
      expect(result.errors?.email).toBeDefined();
    });
  });

  describe("successful submission", () => {
    it("sends email and redirects on success", async () => {
      vi.mocked(verifyTurnstileToken).mockResolvedValue(true);
      vi.mocked(sendResendEmail).mockResolvedValue({ success: true });

      await expect(createEnquiry({}, createFormData())).rejects.toThrow(
        "NEXT_REDIRECT"
      );

      expect(sendResendEmail).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith("/thank-you");
    });
  });

  describe("email sending failure", () => {
    it("returns error when email fails to send", async () => {
      vi.mocked(verifyTurnstileToken).mockResolvedValue(true);
      vi.mocked(sendResendEmail).mockResolvedValue({
        success: false,
        error: "Failed to send"
      });

      const result = await createEnquiry({}, createFormData());

      expect(result.success).toBe(false);
      expect(result.error).toContain("send");
    });
  });
});
```

### Pattern 4: React Component Testing (Browser Mode)

Using `vitest-browser-react` with the new Browser Mode API:

```typescript
// components/theme-toggle.test.tsx
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
    resolvedTheme: "light",
  }),
}));

import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders toggle button", async () => {
    const screen = render(<ThemeToggle />);
    await expect.element(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has accessible label", async () => {
    const screen = render(<ThemeToggle />);
    await expect
      .element(screen.getByRole("button", { name: /toggle theme/i }))
      .toBeInTheDocument();
  });

  it("calls setTheme when clicked", async () => {
    const screen = render(<ThemeToggle />);

    await screen.getByRole("button").click();

    expect(mockSetTheme).toHaveBeenCalled();
  });
});
```

### Pattern 5: Component with Form State (Browser Mode)

```typescript
// components/contact-form.test.tsx
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";

// Mock the server action
vi.mock("@/app/contact/action", () => ({
  createEnquiry: vi.fn(),
}));

// Mock Turnstile component
vi.mock("next-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button
      data-testid="turnstile-mock"
      onClick={() => onSuccess("mock-token")}
    >
      Verify
    </button>
  ),
}));

import { ContactForm } from "./contact-form";
import { createEnquiry } from "@/app/contact/action";

describe("ContactForm", () => {
  it("renders all form fields", async () => {
    const screen = render(<ContactForm />);

    await expect.element(screen.getByLabelText(/name/i)).toBeInTheDocument();
    await expect.element(screen.getByLabelText(/email/i)).toBeInTheDocument();
    await expect.element(screen.getByLabelText(/message/i)).toBeInTheDocument();
    await expect
      .element(screen.getByRole("button", { name: /send/i }))
      .toBeInTheDocument();
  });

  it("shows validation errors for empty submission", async () => {
    vi.mocked(createEnquiry).mockResolvedValue({
      success: false,
      errors: {
        name: ["Name is required"],
        email: ["Email is required"],
        message: ["Message is required"],
      },
    });

    const screen = render(<ContactForm />);

    // Complete turnstile
    await screen.getByTestId("turnstile-mock").click();

    // Submit empty form
    await screen.getByRole("button", { name: /send/i }).click();

    // expect.element auto-retries until element is found
    await expect
      .element(screen.getByText(/name is required/i))
      .toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    vi.mocked(createEnquiry).mockResolvedValue({ success: true });

    const screen = render(<ContactForm />);

    // Fill form using locator methods
    await screen.getByLabelText(/name/i).fill("John Doe");
    await screen.getByLabelText(/email/i).fill("john@example.com");
    await screen.getByLabelText(/message/i).fill("This is a test message");

    // Complete turnstile and submit
    await screen.getByTestId("turnstile-mock").click();
    await screen.getByRole("button", { name: /send/i }).click();

    expect(createEnquiry).toHaveBeenCalled();
  });
});
```

### Pattern 6: Testing Custom Hooks (Browser Mode)

```typescript
// hooks/use-toast.test.ts
import { renderHook } from "vitest-browser-react";
import { describe, expect, it } from "vitest";
import { useToast } from "./use-toast";

describe("useToast", () => {
  it("initially has no toasts", async () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toHaveLength(0);
  });

  it("adds a toast when toast() is called", async () => {
    const { result } = renderHook(() => useToast());

    result.current.toast({
      title: "Test Toast",
      description: "Test description",
    });

    // Browser mode may need a small wait for state updates
    await expect.poll(() => result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Test Toast");
  });

  it("removes a toast when dismiss() is called", async () => {
    const { result } = renderHook(() => useToast());

    result.current.toast({ title: "Test Toast" });

    await expect.poll(() => result.current.toasts).toHaveLength(1);

    const toastId = result.current.toasts[0].id;
    result.current.dismiss(toastId);

    await expect.poll(() => result.current.toasts).toHaveLength(0);
  });
});
```

### Pattern 7: Advanced Component Testing (Browser Mode)

Testing complex interactions, accessibility, and state management:

```typescript
// components/articles-filter.test.tsx
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/articles",
}));

import { ArticlesFilter } from "./articles-filter";

describe("ArticlesFilter", () => {
  const mockCategories = [
    { id: "1", name: "Engineering", slug: "engineering" },
    { id: "2", name: "Leadership", slug: "leadership" },
  ];

  it("renders all category options", async () => {
    const screen = render(<ArticlesFilter categories={mockCategories} />);

    await expect
      .element(screen.getByRole("button", { name: /engineering/i }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole("button", { name: /leadership/i }))
      .toBeInTheDocument();
  });

  it("highlights active category", async () => {
    const screen = render(
      <ArticlesFilter categories={mockCategories} activeCategory="engineering" />
    );

    const engineeringButton = screen.getByRole("button", { name: /engineering/i });
    await expect.element(engineeringButton).toHaveAttribute("data-active", "true");
  });

  it("handles keyboard navigation", async () => {
    const screen = render(<ArticlesFilter categories={mockCategories} />);

    // Focus first button
    await screen.getByRole("button", { name: /engineering/i }).focus();

    // Tab to next button
    await userEvent.keyboard("{Tab}");

    // Verify focus moved
    await expect
      .element(screen.getByRole("button", { name: /leadership/i }))
      .toHaveFocus();
  });
});
```

### Pattern 8: E2E Tests with Playwright

```typescript
// e2e/contact-form.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("displays contact form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test("shows validation errors for empty submission", async ({ page }) => {
    await page.getByRole("button", { name: /send/i }).click();
    await expect(page.getByText(/required/i)).toBeVisible();
  });

  test("successfully submits form and redirects", async ({ page }) => {
    await page.getByLabel(/name/i).fill("John Doe");
    await page.getByLabel(/email/i).fill("john@example.com");
    await page.getByLabel(/message/i).fill("This is a test message from Playwright");

    // Handle Turnstile - may need to mock in test environment
    // await page.frameLocator('iframe[title="Turnstile"]').getByRole('checkbox').click();

    await page.getByRole("button", { name: /send/i }).click();

    await expect(page).toHaveURL("/thank-you");
    await expect(page.getByRole("heading", { name: /thank you/i })).toBeVisible();
  });
});
```

```typescript
// e2e/articles.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Articles", () => {
  test("displays article list", async ({ page }) => {
    await page.goto("/articles");
    await expect(page.getByRole("heading", { name: /articles/i })).toBeVisible();
  });

  test("filters articles by category", async ({ page }) => {
    await page.goto("/articles");

    // Click on a category filter
    await page.getByRole("button", { name: /engineering/i }).click();

    // URL should update
    await expect(page).toHaveURL(/category=engineering/);
  });

  test("navigates to article detail page", async ({ page }) => {
    await page.goto("/articles");

    // Click first article link
    const firstArticle = page.getByRole("article").first();
    await firstArticle.click();

    // Should navigate to article page with heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
```

---

## Mocking Strategies

### Vitest Built-in Mocking

```typescript
import { vi } from "vitest";

// Mock a module
vi.mock("@/lib/resend", () => ({
  sendResendEmail: vi.fn(),
}));

// Mock with spy (Browser Mode limitation workaround)
vi.mock("./module.js", { spy: true });

// Mock a specific function
const mockFn = vi.fn();
mockFn.mockReturnValue("mocked value");
mockFn.mockResolvedValue("async mocked value");
mockFn.mockImplementation((arg) => arg * 2);

// Mock timers
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();

// Mock environment variables
vi.stubEnv("API_KEY", "test-key");
```

### Mocking Next.js Specifics

```typescript
// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams("?category=test"),
  usePathname: () => "/articles",
  redirect: vi.fn(),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));
```

### MSW for Network Mocking (Browser Mode)

MSW is the recommended approach for mocking API requests in Browser Mode:

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/contact", async ({ request }) => {
    const body = await request.json();

    if (!body.email) {
      return HttpResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    return HttpResponse.json({ success: true });
  }),

  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: "John Doe",
      email: "john@example.com",
    });
  }),
];
```

```typescript
// Setup for Browser Mode tests
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

// In your test setup
beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
```

### Browser Mode Spying Limitation

In Browser Mode, you cannot use `vi.spyOn` on imported module exports due to ESM module sealing. Use `vi.mock` with `{ spy: true }` instead:

```typescript
// ❌ This won't work in Browser Mode
import * as module from "./module.js";
vi.spyOn(module, "method");

// ✅ Use this instead
vi.mock("./module.js", { spy: true });
import { method } from "./module.js";
vi.mocked(method).mockImplementation(() => {
  // ...
});
```

---

## Next.js 15 Considerations

### Async Server Components

Vitest does not fully support async Server Components. Recommendations:

1. **Extract Logic**: Move async logic to separate functions that can be unit tested
2. **Use E2E Tests**: Test async Server Components via Playwright
3. **Test Sync Parts**: Test the synchronous rendering logic separately

```typescript
// Instead of testing the async component directly...
// lib/articles.ts - testable
export async function getArticles() {
  // ... fetch logic
}

// lib/articles.test.ts
describe("getArticles", () => {
  it("returns articles sorted by date", async () => {
    const articles = await getArticles();
    // assertions...
  });
});
```

### Server Actions

Server Actions can be tested by:

1. Mocking external dependencies (Resend, Turnstile, etc.)
2. Testing the action function directly with mock FormData
3. Handling redirect throws (Next.js redirect throws an error)

### App Router Specifics

- `useSearchParams` returns `ReadonlyURLSearchParams`
- `searchParams` prop in pages is a Promise in Next.js 15
- Dynamic params are also Promises

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers (for Vitest Browser Mode)
        run: npx playwright install chromium

      - name: Run tests
        run: pnpm test:run --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          TURNSTILE_SECRET_KEY: ${{ secrets.TURNSTILE_SECRET_KEY }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Debugging

### Browser Mode Debugging

Browser Mode provides access to full browser DevTools:

1. **Run in headed mode**: Set `headless: false` in config or use `--browser.headless=false`
2. **Open DevTools**: Press F12 or right-click → Inspect during test execution
3. **Set breakpoints**: Add breakpoints in test or component code
4. **Inspect DOM**: View actual rendered output
5. **Check console**: See JavaScript errors or warnings

```typescript
// Debug form validation
test("debug form validation", async () => {
  const screen = render(<ContactForm />);

  await screen.getByRole("button", { name: /submit/i }).click();

  // Debug: Log element state
  const errorElement = screen.getByText("Email is required");
  console.log("Error element found:", await errorElement.isVisible());

  await expect.element(errorElement).toBeInTheDocument();
});
```

### Common Debugging Patterns

```typescript
// Check if element exists with different query
const button = screen.getByRole("button", { name: /submit/i });
console.log("Button visible:", await button.isVisible());

// Use expect.poll for async state changes
await expect.poll(() => result.current.value).toBe(expectedValue);
```

---

## Implementation Checklist

### Phase 1: Setup

- [ ] Install Vitest and `@vitest/browser-playwright`
- [ ] Install `vitest-browser-react`
- [ ] Create `vitest.config.mts` with Browser Mode
- [ ] Install Playwright browsers (`npx playwright install chromium`)
- [ ] Add test scripts to `package.json`
- [ ] Update `lefthook.yml` to run tests

### Phase 2: Unit Tests (Node.js)

- [ ] `lib/utils/createArticleSlug.test.ts`
- [ ] `lib/utils/sortByTitleProperty.test.ts`
- [ ] `lib/utils/formatDateRelativeToCurrentYear.test.ts`
- [ ] `lib/formatDate.test.ts`
- [ ] `lib/articles.test.ts`
- [ ] `types/index.test.ts` (Zod schemas)
- [ ] `app/contact/action.test.ts`

### Phase 3: Component Tests (Browser Mode)

- [ ] `components/theme-toggle.test.tsx`
- [ ] `components/contact-form.test.tsx`
- [ ] `components/articles-filter.test.tsx`
- [ ] `hooks/use-toast.test.ts`

### Phase 4: E2E Setup (Playwright)

- [ ] Install and configure Playwright
- [ ] Create `playwright.config.ts`
- [ ] `e2e/navigation.spec.ts`
- [ ] `e2e/contact-form.spec.ts`
- [ ] `e2e/articles.spec.ts`

### Phase 5: CI/CD Integration

- [ ] Create GitHub Actions workflow
- [ ] Configure coverage reporting
- [ ] Set up required secrets

---

## References

- [Vitest Browser Mode Documentation](https://vitest.dev/guide/browser/)
- [Vitest Component Testing Guide](https://vitest.dev/guide/browser/component-testing)
- [vitest-browser-react Package](https://github.com/vitest-dev/vitest-browser-react)
- [Next.js 15 Testing Documentation](https://nextjs.org/docs/15/app/guides/testing)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Vitest Browser Examples Repository](https://github.com/vitest-tests/browser-examples)
