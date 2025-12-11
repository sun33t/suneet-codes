# Test Patterns

## Pure functions

```typescript
describe("formatSlug", () => {
  it("converts spaces to hyphens", () => {
    expect(formatSlug("hello world")).toBe("hello-world");
  });
  it("handles empty string", () => {
    expect(formatSlug("")).toBe("");
  });
});
```

## Zod validation

Test Zod schemas using `safeParse` for non-throwing assertions and `parse` when testing error throwing:

```typescript
import { ZodError } from "zod";
import { MySchema } from "./mySchema";

describe("MySchema", () => {
  const valid = { name: "Test", email: "test@example.com" };

  // Use safeParse for validation checks
  it("accepts valid data", () => {
    expect(MySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(MySchema.safeParse({ ...valid, email: "bad" }).success).toBe(false);
  });

  // Check transformed output
  it("transforms input correctly", () => {
    const result = MySchema.safeParse(valid);
    if (result.success) {
      expect(result.data.name).toBe("test"); // assuming toLowerCase transform
    }
  });

  // Check error messages
  it("provides descriptive error message", () => {
    const result = MySchema.safeParse({ ...valid, email: "bad" });
    if (!result.success) {
      expect(result.error.errors[0].message).toContain("email");
    }
  });

  // Test throwing behavior for functions that use parse()
  it("throws ZodError with parse()", () => {
    expect(() => MySchema.parse({ ...valid, email: "bad" })).toThrow(ZodError);
  });
});
```

When a utility function uses Zod internally, test both the function behavior and the schema:

```typescript
import { ZodError } from "zod";
import { MySchema, processInput } from "./processInput";

// Test the function's behavior
describe("processInput", () => {
  it("processes valid input", () => {
    expect(processInput("  HELLO  ")).toBe("processed: hello");
  });

  it("throws ZodError for invalid input", () => {
    expect(() => processInput(null as unknown as string)).toThrow(ZodError);
  });
});

// Test the schema directly for validation/transformation details
describe("MySchema", () => {
  it("trims and lowercases input", () => {
    const result = MySchema.safeParse("  HELLO  ");
    if (result.success) {
      expect(result.data).toBe("hello");
    }
  });

  it("provides custom error message for invalid type", () => {
    const result = MySchema.safeParse(123);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Input must be a string");
    }
  });
});
```

## Async functions

```typescript
it("returns data", async () => {
  const data = await fetchUser("1");
  expect(data).toEqual({ id: "1", name: "John" });
});

it("throws on error", async () => {
  await expect(fetchUser("invalid")).rejects.toThrow("Not found");
});
```

## Mocking

Mock BEFORE importing:

```typescript
vi.mock("@/lib/database", () => ({
  query: vi.fn(),
}));

import { getUser } from "./getUser";
import { query } from "@/lib/database";

describe("getUser", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns user", async () => {
    vi.mocked(query).mockResolvedValue({ id: "1", name: "John" });
    const user = await getUser("1");
    expect(user).toEqual({ id: "1", name: "John" });
  });

  it("handles error", async () => {
    vi.mocked(query).mockRejectedValue(new Error("DB error"));
    await expect(getUser("1")).rejects.toThrow("DB error");
  });
});
```

## Next.js mocks

```typescript
vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => { throw new Error("NEXT_REDIRECT"); }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));
```

## Partial mock

```typescript
vi.mock("./utils", async () => ({
  ...(await vi.importActual("./utils")),
  fetchData: vi.fn(),
}));
```

## Parameterized tests

```typescript
it.each(["test@example.com", "user@domain.org"])("accepts %s", (email) => {
  expect(isValidEmail(email)).toBe(true);
});

it.each(["invalid", "@bad", "user@"])("rejects %s", (email) => {
  expect(isValidEmail(email)).toBe(false);
});
```

## Dependency injection for dates

Add optional parameter for test control instead of mocking globals:

```typescript
// Implementation - add optional referenceDate parameter
export const formatDate = (dateString: string, referenceDate: Date = new Date()) => {
  const currentYear = referenceDate.getFullYear();
  // ...
};

// Tests - no mocking needed, pass reference directly
const REFERENCE_DATE = new Date("2025-06-15");

it("formats current year", () => {
  expect(formatDate("2025-01-15", REFERENCE_DATE)).toBe("Jan 15");
});

it("formats other year", () => {
  expect(formatDate("2024-01-15", REFERENCE_DATE)).toBe("15 Jan 24");
});
```

Use this pattern when functions use `new Date()`, `Date.now()`, or other runtime values.

## Locale/timezone-dependent output

Use `toMatch` for outputs that vary by environment:

```typescript
it("handles timezone variation", () => {
  // Non-ISO formats parsed in local time - day may shift
  expect(formatDate("June 15, 2024")).toMatch(/^\d{1,2} Jun 24$/);
});
```

## Environment variables

```typescript
const originalEnv = process.env;
beforeEach(() => { process.env = { ...originalEnv }; });
afterEach(() => { process.env = originalEnv; });

it("uses env var", () => {
  process.env.API_URL = "https://api.example.com";
  expect(getConfig().apiUrl).toBe("https://api.example.com");
});
```

## Common assertions

```typescript
expect(x).toBe(y)              // ===
expect(x).toEqual(y)           // deep equal
expect(x).toBeTruthy()
expect(x).toBeNull()
expect(x).toBeUndefined()
expect(x).toBeGreaterThan(n)
expect(s).toMatch(/pattern/)
expect(s).toContain("sub")
expect(arr).toContain(item)
expect(arr).toHaveLength(n)
expect(obj).toHaveProperty("key")
expect(() => fn()).toThrow()
expect(() => fn()).toThrow(Error)
expect(() => fn()).toThrow("msg")
await expect(p).resolves.toBe(x)
await expect(p).rejects.toThrow()
expect(x).not.toBe(y)
```
