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

## Zod schemas

Use `safeParse` for non-throwing tests:

```typescript
describe("MySchema", () => {
  const valid = { name: "Test", email: "test@example.com" };

  it("accepts valid data", () => {
    expect(MySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(MySchema.safeParse({ ...valid, email: "bad" }).success).toBe(false);
  });

  it("checks error message", () => {
    const result = MySchema.safeParse({ ...valid, email: "bad" });
    if (!result.success) {
      expect(result.error.errors[0].message).toContain("email");
    }
  });

  it("throws ZodError with parse()", () => {
    expect(() => MySchema.parse({ ...valid, email: "bad" })).toThrow(ZodError);
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

## Fake timers

```typescript
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-06-15"));
});
afterEach(() => vi.useRealTimers());

it("returns today", () => {
  expect(getRelativeDate(new Date("2024-06-15"))).toBe("today");
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
