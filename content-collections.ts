import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import { type MDXContent } from "mdx/types";
import path from "node:path";

import { CATEGORYTITLES } from "@/content/categories";

const articles = defineCollection({
  name: "articles",
  directory: "./content/articles",
  include: "**/*.mdx",
  parser: "frontmatter",
  schema: (z) => ({
    title: z.string(),
    slug: z.string(),
    author: z.string(),
    isPublished: z.boolean().default(false),
    date: z.string().date(),
    updatedAt: z.string().date(),
    description: z.string(),
    coverImage: z.string(),
    categories: z
      .array(z.enum(CATEGORYTITLES))
      .min(1, { message: "At least one category is required" }),
  }),
  transform: ({ _meta, ...article }) => {
    const mdx = createDefaultImport<MDXContent>(
      path.join("@/content/articles", _meta.filePath)
    );
    return {
      ...article,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [articles],
});
