import { z } from "zod";

/**
 * Zod schema for validating and transforming article paths.
 *
 * Validates that the path:
 * - Starts with a 4-digit numeric prefix followed by a hyphen
 * - Has a non-empty slug portion after the prefix
 *
 * Transforms the valid path into just the slug portion.
 */
export const ArticlePathSchema = z
	.string()
	.min(5, "Path too short - must have 4-digit prefix, hyphen, and slug")
	.refine((s) => /^\d{4}-/.test(s), {
		message:
			'Must start with 4-digit prefix followed by hyphen (e.g., "0001-")',
	})
	.refine((s) => s.length > 5, {
		message: "Slug portion after prefix cannot be empty",
	})
	.transform((path) => path.slice(5));

/**
 * Converts an article filename path into a URL-friendly slug by removing the
 * numeric ordering prefix.
 *
 * Article files follow the naming convention `XXXX-slug-name.mdx` where `XXXX`
 * is a 4-digit number used for ordering. Content-collections provides the path
 * without the file extension, so this function receives values like
 * `0001-my-first-article` and returns `my-first-article`.
 *
 * @param path - The article path without extension (e.g., `0001-my-article`)
 * @returns The slug portion after the prefix (e.g., `my-article`)
 * @throws {z.ZodError} If the path doesn't match the expected format
 *
 * @example
 * createArticleSlug("0001-getting-started") // returns "getting-started"
 * createArticleSlug("0042-advanced-tips") // returns "advanced-tips"
 * createArticleSlug("invalid-name") // throws ZodError
 */
export const createArticleSlug = (path: string): string => {
	return ArticlePathSchema.parse(path);
};
