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

/**
 * An array of categories for blog posts and articles.
 */
export const CATEGORIES: Array<{ title: string }> = [
  { title: "react" },
  { title: "javascript" },
  { title: "aws" },
];
