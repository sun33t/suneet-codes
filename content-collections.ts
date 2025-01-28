import { defineCollection, defineConfig } from "@content-collections/core";

import { CATEGORYTITLES } from "@/content/categories";

const ARTICLE_FILENAME_PREFIX_LENGTH = 5; // length of the `XXXX-` prefix in the filename

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
    return {
      ...doc,
      slug: doc._meta.path.substring(ARTICLE_FILENAME_PREFIX_LENGTH),
    };
  },
});

export default defineConfig({
  collections: [articles],
});
