type Slug = `/${string}`;
type Page = { title: string; slug: Slug };
export type Pages = Array<Page>;

export const PAGES: Pages = [
  { title: "About", slug: "/about" },
  { title: "Articles", slug: "/articles" },
  { title: "Projects", slug: "/projects" },
  { title: "Following", slug: "/following" },
  { title: "Uses", slug: "/uses" },
];

export const categoryNames = ["react", "javascript", "aws"] as const;

export type CategoryName = (typeof categoryNames)[number];

export type Category = {
  title: CategoryName;
  slug: string;
  className: string;
};

type Categories = Map<CategoryName, Category>;

/**
 * An array of categories for blog posts and articles.
 */
export const CATEGORIES: Categories = new Map([
  [
    "react",
    {
      title: "react",
      slug: "react",
      className: "bg-red-400 text-white dark:bg-red-200 dark:text-black",
    },
  ],
  [
    "javascript",
    {
      title: "javascript",
      slug: "javascript",
      className: "bg-green-400 text-white dark:bg-green-200 dark:text-black",
    },
  ],
  [
    "aws",
    {
      title: "aws",
      slug: "aws",
      className: "bg-yellow-400 dark:bg-yellow-200 text-black",
    },
  ],
]);
