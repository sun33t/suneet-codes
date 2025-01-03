export type ArticleCategory = {
  title: "react" | "javascript" | "aws" | "leadership";
  slug: string;
};

export const CATEGORIES: ArticleCategory[] = [
  {
    title: "react",
    slug: "react",
  },
  {
    title: "javascript",
    slug: "javascript",
  },
  {
    title: "aws",
    slug: "aws",
  },
  {
    title: "leadership",
    slug: "leadership",
  },
];

export const CATEGORY_PARAM_NAME = "category";
