# Vitest Setup

## Install

```bash
pnpm add -D vitest
# Optional for @/ imports:
pnpm add -D vite-tsconfig-paths
```

## vitest.config.mts

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules", ".next", ".content-collections", "e2e"],
  },
});
```

With path aliases:

```typescript
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules", ".next", ".content-collections", "e2e"],
  },
});
```

With coverage:

```typescript
coverage: {
  provider: "v8",
  reporter: ["text", "html", "lcov"],
  exclude: ["node_modules", ".next", "**/*.test.ts", "**/*.config.{ts,mts,js}"],
}
```

## tsconfig.json

```json
{ "compilerOptions": { "types": ["vitest/globals"] } }
```

## package.json scripts

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

## Lefthook pre-commit

```yaml
test:
  run: pnpm test:run --reporter=dot
```

## Environment options

- `"node"` - utilities, schemas, server logic (default)
- `"jsdom"` - code requiring window/document (legacy)

## Reporters

- `"default"` - standard
- `"verbose"` - detailed
- `"dot"` - minimal (CI)
