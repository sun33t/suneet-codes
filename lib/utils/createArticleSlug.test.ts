import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { ArticlePathSchema, createArticleSlug } from "./createArticleSlug";

describe("createArticleSlug", () => {
	describe("valid inputs", () => {
		it("removes 4-digit prefix from filename", () => {
			expect(createArticleSlug("0001-my-article")).toBe("my-article");
		});

		it("handles different numeric prefixes", () => {
			expect(createArticleSlug("0042-another-article")).toBe("another-article");
			expect(createArticleSlug("9999-last-article")).toBe("last-article");
		});

		it("preserves the full slug after prefix", () => {
			expect(createArticleSlug("0001-my-multi-word-article-title")).toBe(
				"my-multi-word-article-title",
			);
		});

		it("handles single character slug", () => {
			expect(createArticleSlug("0001-a")).toBe("a");
		});
	});

	describe("invalid inputs", () => {
		it("throws ZodError for filename without numeric prefix", () => {
			expect(() => createArticleSlug("my-article")).toThrow(ZodError);
		});

		it("throws ZodError for filename with wrong prefix format (3 digits)", () => {
			expect(() => createArticleSlug("001-my-article")).toThrow(ZodError);
		});

		it("throws ZodError for filename with letters in prefix", () => {
			expect(() => createArticleSlug("000a-my-article")).toThrow(ZodError);
		});

		it("throws ZodError for empty string", () => {
			expect(() => createArticleSlug("")).toThrow(ZodError);
		});

		it("throws ZodError for prefix without hyphen", () => {
			expect(() => createArticleSlug("0001my-article")).toThrow(ZodError);
		});

		it("throws ZodError for empty slug after prefix", () => {
			expect(() => createArticleSlug("0001-")).toThrow(ZodError);
		});
	});

	describe("error messages", () => {
		it("provides helpful message for path too short", () => {
			const result = ArticlePathSchema.safeParse("abc");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					"Path too short - must have 4-digit prefix, hyphen, and slug",
				);
			}
		});

		it("provides helpful message for missing numeric prefix", () => {
			const result = ArticlePathSchema.safeParse("abcd-my-article");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					'Must start with 4-digit prefix followed by hyphen (e.g., "0001-")',
				);
			}
		});

		it("provides helpful message for empty slug", () => {
			const result = ArticlePathSchema.safeParse("0001-");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					"Slug portion after prefix cannot be empty",
				);
			}
		});
	});
});
