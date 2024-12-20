type Slug = `/${string}`;
type Page = { title: string; slug: Slug };
export type Pages = Array<Page>;

export const PAGES: Pages = [
  { title: "About", slug: "/about" },
  { title: "Articles", slug: "/articles" },
  { title: "Projects", slug: "/projects" },
  { title: "Speaking", slug: "/speaking" },
  { title: "Uses", slug: "/uses" },
];
