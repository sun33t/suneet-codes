import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";

const articles = defineCollection({
  name: "articles",
  directory: "./content/articles",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    author: z.string(),
    date: z.string().date(),
    description: z.string(),
    coverImage: z.string(),
    categories: z
      .array(
        z.union([
          z.literal("aws"),
          z.literal("react"),
          z.literal("javascript"),
          z.literal("leadership"),
        ])
      )
      .min(1, { message: "At least one category is required" }),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "aurora-x",
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
