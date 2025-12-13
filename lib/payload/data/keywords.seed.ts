/**
 * Seed data for article keywords.
 * Keywords are used for SEO metadata on articles.
 */

type KeywordSeedData = {
	name: string;
};

export const KEYWORDS_SEED: KeywordSeedData[] = [
	{ name: "conventional-commits" },
	{ name: "eslint" },
	{ name: "git-hooks" },
	{ name: "gitmoji" },
	{ name: "husky" },
	{ name: "javascript" },
	{ name: "lint-staged" },
	{ name: "node" },
	{ name: "prettier" },
	{ name: "typescript" },
];
