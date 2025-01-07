import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";

import { CATEGORYTITLES } from "@/content/categories";

const articles = defineCollection({
  name: "articles",
  directory: "./content/articles",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    author: z.string(),
    date: z.string().date(),
    updatedAt: z.string().date(),
    description: z.string(),
    coverImage: z.string(),
    categories: z
      .array(z.enum(CATEGORYTITLES))
      .min(1, { message: "At least one category is required" }),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "dracula",
            grid: false,
          },
        ],
      ],
    });
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [articles],
});
