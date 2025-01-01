export const categoryNames = ["react", "javascript", "aws"] as const;

export type CategoryName = (typeof categoryNames)[number];

export type Category = {
  title: CategoryName;
  slug: string;
};

export const CATEGORIES: Category[] = [
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
];
