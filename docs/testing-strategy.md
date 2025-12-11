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

| Layer | Tool | Version | Purpose |
|-------|------|---------|---------|
| Unit/Integration | Vitest | ^3.x | Fast, ESM-native test runner |
| Component Testing | React Testing Library | ^16.x | DOM testing for React |
| User Interactions | @testing-library/user-event | ^14.x | Simulating user events |
| DOM Matchers | @testing-library/jest-dom | ^6.x | Extended DOM assertions |
| E2E Testing | Playwright | ^1.x | Browser automation |
| Mocking (optional) | MSW | ^2.x | Network request mocking |

### Why Vitest?

1. **Native ESM Support**: Works seamlessly with Next.js 15's ESM-first architecture
2. **Speed**: Uses Vite's transform pipeline, significantly faster than Jest
3. **Jest-Compatible API**: Familiar syntax, easy migration path
4. **TypeScript First**: No additional configuration needed
5. **Built-in Features**: Coverage, UI mode, watch mode out of the box
6. **Next.js Official Support**: Recommended in Next.js 15 documentation

### Why Not Jest?

- Requires additional ESM configuration for Next.js 15
- Slower test execution
- More complex setup with TypeScript path aliases

---

## Installation

### Core Testing Dependencies

```bash
# Vitest and React Testing Library
pnpm add -D vitest @vitejs/plugin-react jsdom vite-tsconfig-paths

# Testing Library ecosystem
pnpm add -D @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom

# Types (if needed)
pnpm add -D @types/testing-library__jest-dom
```

### E2E Testing (Playwright)

```bash
# Interactive setup
pnpm create playwright

# Or manual installation
pnpm add -D @playwright/test
npx playwright install
```

### Optional: Network Mocking with MSW

```bash
pnpm add -D msw
```

---

## Configuration

### Vitest Configuration

Create `vitest.config.mts` in project root:

```typescript
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // Environment
    environment: "jsdom",

    // Global test APIs (describe, it, expect)
    globals: true,

    // Setup file for custom matchers and cleanup
    setupFiles: ["./vitest.setup.ts"],

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
      thresholds: {
        // Enforce minimum coverage (adjust as tests are added)
        // lines: 80,
        // functions: 80,
        // branches: 80,
        // statements: 80,
      },
    },

    // Reporter configuration
    reporters: ["verbose"],

    // Timeout for async tests
    testTimeout: 10000,

    // Retry flaky tests (optional)
    // retry: 2,
  },
});
```

### Vitest Setup File

Create `vitest.setup.ts` in project root:

```typescript
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup DOM after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router (commonly needed)
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
  redirect: vi.fn(),
}));

// Mock next/headers (for server component tests)
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
  headers: () => new Headers(),
}));

// Reset mocks between tests
afterEach(() => {
  vi.clearAllMocks();
});
```

### TypeScript Configuration

Add Vitest types to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

Or create a separate `tsconfig.test.json` if you prefer isolation.

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

### Playwright Configuration

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
      # Use dot reporter for cleaner pre-commit output
```

---

## Directory Structure

### Recommended: Colocated Tests

Place test files alongside the code they test:

```
lib/
├── utils/
│   ├── createArticleSlug.ts
│   ├── createArticleSlug.test.ts        # ← Colocated
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
└── index.test.ts                        # ← Schema validation tests

components/
├── contact-form.tsx
├── contact-form.test.tsx
├── articles-filter.tsx
├── articles-filter.test.tsx
├── theme-toggle.tsx
└── theme-toggle.test.tsx

app/
└── contact/
    ├── action.ts
    └── action.test.ts

hooks/
├── use-toast.ts
└── use-toast.test.ts

e2e/                                     # ← E2E tests separate
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

| Priority | Type | Files | Rationale |
|----------|------|-------|-----------|
| **P0** | Utility Functions | `lib/utils/*.ts` | Pure functions, easy to test, high ROI |
| **P0** | Zod Schemas | `types/index.ts` | Validates user input, critical for security |
| **P1** | Server Actions | `app/contact/action.ts` | Core business logic |
| **P1** | Data Fetching | `lib/articles.ts` | Content retrieval logic |
| **P2** | Client Components | `components/*.tsx` | User interactions |
| **P2** | Hooks | `hooks/*.ts` | Reusable stateful logic |
| **P3** | E2E Flows | Critical user journeys | Integration verification |

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

### Pattern 1: Pure Utility Functions

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

### Pattern 2: Zod Schema Validation

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
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("name");
      }
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

### Pattern 3: Server Actions with Mocking

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

### Pattern 4: React Component Testing

```typescript
// components/theme-toggle.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("renders toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it("calls setTheme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button"));

    expect(mockSetTheme).toHaveBeenCalled();
  });
});
```

### Pattern 5: Component with Form State

```typescript
// components/contact-form.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty submission", async () => {
    const user = userEvent.setup();
    vi.mocked(createEnquiry).mockResolvedValue({
      success: false,
      errors: {
        name: ["Name is required"],
        email: ["Email is required"],
        message: ["Message is required"],
      },
    });

    render(<ContactForm />);

    // Complete turnstile
    await user.click(screen.getByTestId("turnstile-mock"));

    // Submit empty form
    await user.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    vi.mocked(createEnquiry).mockResolvedValue({ success: true });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(
      screen.getByLabelText(/message/i),
      "This is a test message"
    );
    await user.click(screen.getByTestId("turnstile-mock"));
    await user.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(createEnquiry).toHaveBeenCalled();
    });
  });
});
```

### Pattern 6: Testing Custom Hooks

```typescript
// hooks/use-toast.test.ts
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToast } from "./use-toast";

describe("useToast", () => {
  it("initially has no toasts", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toHaveLength(0);
  });

  it("adds a toast when toast() is called", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: "Test Toast",
        description: "Test description",
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Test Toast");
  });

  it("removes a toast when dismiss() is called", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Test Toast" });
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });
});
```

### Pattern 7: E2E Tests with Playwright

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
    await expect(page.getByRole("article")).toHaveCount.greaterThan(0);
  });

  test("filters articles by category", async ({ page }) => {
    await page.goto("/articles");

    // Click on a category filter
    await page.getByRole("button", { name: /engineering/i }).click();

    // URL should update
    await expect(page).toHaveURL(/category=engineering/);

    // Articles should be filtered
    const articles = page.getByRole("article");
    await expect(articles).toHaveCount.greaterThan(0);
  });

  test("navigates to article detail page", async ({ page }) => {
    await page.goto("/articles");

    // Click first article
    const firstArticle = page.getByRole("article").first();
    const articleTitle = await firstArticle.getByRole("heading").textContent();
    await firstArticle.click();

    // Should navigate to article page
    await expect(page.getByRole("heading", { level: 1 })).toContainText(articleTitle!);
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

// Mock a specific function
const mockFn = vi.fn();
mockFn.mockReturnValue("mocked value");
mockFn.mockResolvedValue("async mocked value");
mockFn.mockImplementation((arg) => arg * 2);

// Spy on a method
const spy = vi.spyOn(object, "method");

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

### MSW for Network Mocking (Optional)

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
];

// mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// vitest.setup.ts
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
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
  unit-tests:
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

      - name: Run unit tests
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
          # Add required env vars for E2E
          TURNSTILE_SECRET_KEY: ${{ secrets.TURNSTILE_SECRET_KEY }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Implementation Checklist

### Phase 1: Setup (Day 1)

- [ ] Install Vitest and dependencies
- [ ] Create `vitest.config.mts`
- [ ] Create `vitest.setup.ts`
- [ ] Update `tsconfig.json` with Vitest types
- [ ] Add test scripts to `package.json`
- [ ] Update `lefthook.yml` to run tests

### Phase 2: Utility Tests (Day 1-2)

- [ ] `lib/utils/createArticleSlug.test.ts`
- [ ] `lib/utils/sortByTitleProperty.test.ts`
- [ ] `lib/utils/formatDateRelativeToCurrentYear.test.ts`
- [ ] `lib/formatDate.test.ts`
- [ ] `lib/articles.test.ts`

### Phase 3: Schema & Action Tests (Day 2-3)

- [ ] `types/index.test.ts` (Zod schemas)
- [ ] `app/contact/action.test.ts`
- [ ] `lib/turnstile.test.ts`
- [ ] `lib/resend.test.ts`

### Phase 4: Component Tests (Day 3-4)

- [ ] `components/theme-toggle.test.tsx`
- [ ] `components/contact-form.test.tsx`
- [ ] `components/articles-filter.test.tsx`
- [ ] `hooks/use-toast.test.ts`

### Phase 5: E2E Setup (Day 4-5)

- [ ] Install and configure Playwright
- [ ] Create `playwright.config.ts`
- [ ] `e2e/navigation.spec.ts`
- [ ] `e2e/contact-form.spec.ts`
- [ ] `e2e/articles.spec.ts`

### Phase 6: CI/CD Integration (Day 5)

- [ ] Create GitHub Actions workflow
- [ ] Configure coverage reporting
- [ ] Set up required secrets

---

## References

- [Next.js 15 Testing Documentation](https://nextjs.org/docs/15/app/guides/testing)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Next.js with Vitest Example](https://github.com/vercel/next.js/tree/canary/examples/with-vitest)
- [Next.js with Playwright Example](https://github.com/vercel/next.js/tree/canary/examples/with-playwright)
