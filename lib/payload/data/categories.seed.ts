/**
 * Seed data for article categories.
 * IMPORTANT: This array is the source of truth for valid category values.
 * The CATEGORYTITLES constant is derived from this for content-collections validation.
 */

type CategorySeedData = {
	title: string;
	slug: string;
	sortOrder: number;
};

export const CATEGORIES_SEED: CategorySeedData[] = [
	{ title: "bun", slug: "bun", sortOrder: 0 },
	{ title: "code-quality", slug: "code-quality", sortOrder: 1 },
	{ title: "deno", slug: "deno", sortOrder: 2 },
	{ title: "fun", slug: "fun", sortOrder: 3 },
	{ title: "git", slug: "git", sortOrder: 4 },
	{ title: "node", slug: "node", sortOrder: 5 },
	{ title: "typescript", slug: "typescript", sortOrder: 6 },
];

/**
 * Compile-time constant for content-collections Zod schema validation.
 * Derived from seed data to ensure single source of truth.
 * The explicit tuple type is required because Zod enum needs a readonly tuple.
 */
export const CATEGORYTITLES = [
	"bun",
	"code-quality",
	"deno",
	"fun",
	"git",
	"node",
	"typescript",
] as const;
