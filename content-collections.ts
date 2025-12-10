import { defineCollection, defineConfig } from "@content-collections/core";
import { CATEGORYTITLES } from "@/content/categories";
import { createArticleSlug } from "./lib/utils/createArticleSlug";

const articles = defineCollection({
	name: "articles",
	directory: "./content/articles",
	include: "**/*.mdx",
	parser: "frontmatter-only",
	schema: (z) => ({
		title: z.string(),
		author: z.string(),
		isPublished: z.boolean().default(false),
		date: z.string().date(),
		updatedAt: z.string().date(),
		description: z.string(),
		coverImage: z.string(),
		keywords: z.array(z.string()),
		categories: z
			.array(z.enum(CATEGORYTITLES))
			.min(1, { message: "At least one category is required" }),
	}),
	transform: (doc) => {
		if (!doc._meta?.path) {
			throw new Error(`Invalid document metadata: missing _meta.path`);
		}
		const slug = createArticleSlug(doc._meta.path);
		if (!slug || slug.length < 1) {
			throw new Error(`Invalid slug generated from path: ${doc._meta.path}`);
		}
		return {
			...doc,
			slug,
		};
	},
});

export default defineConfig({
	collections: [articles],
});
