import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

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
        z.union([z.literal("aws"), z.literal("react"), z.literal("javascript")])
      )
      .min(1, { message: "At least one category is required" }),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [articles],
});
