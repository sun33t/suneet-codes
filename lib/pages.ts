type Page = { title: string; slug: string };
export type Pages = Array<Page>;

export const pages: Pages = [
  { title: "About", slug: "/about" },
  { title: "Articles", slug: "/articles" },
  { title: "Projects", slug: "/projects" },
  { title: "Speaking", slug: "/speaking" },
  { title: "Uses", slug: "/uses" },
];
