import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ImageProps } from "next/image";
import { LinkProps } from "next/link";

import ansLogo from "@/images/logos/ans.svg";
import luminLogo from "@/images/logos/lumin.svg";
import onepeterfourLogo from "@/images/logos/onepeterfour.webp";
import logoPushorigin from "@/images/logos/pushorigin.svg";
import verseLogo from "@/images/logos/verse.svg";

type Slug = `/${string}`;
type Page = { title: string; slug: Slug };
export type Pages = Array<Page>;

type Project = {
  name: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
  logo: StaticImport;
};

export const PAGES: Pages = [
  { title: "About", slug: "/about" },
  { title: "Articles", slug: "/articles" },
  { title: "Projects", slug: "/projects" },
  { title: "Following", slug: "/following" },
  // { title: "Uses", slug: "/uses" },
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

export interface Role {
  company: string;
  title: string;
  logo: ImageProps["src"];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
  href: LinkProps["href"];
}

export const ROLES: Array<Role> = [
  {
    company: "Pushorigin",
    title: "Founder, Engineer",
    logo: logoPushorigin,
    start: "2024",
    end: {
      label: "Present",
      dateTime: new Date().getFullYear().toString(),
    },
    href: "https://pushorigin.co",
  },
  {
    company: "Lumin",
    title: "Fullstack Engineer",
    logo: luminLogo,
    start: "2023",
    end: "2024",
    href: "https://www.trustalliancegroup.org/our-companies/lumin",
  },
  {
    company: "ANS",
    title: "Senior Fullstack Engineer",
    logo: ansLogo,
    start: "2021",
    end: "2021",
    href: "https://ans.co.uk",
  },
  {
    company: "Verse",
    title: "Senior JavaScript Engineer",
    logo: verseLogo,
    start: "2020",
    end: "2023",
    href: "https://verse.co.uk",
  },
];

export const PROJECTS: Array<Project> = [
  {
    name: "One Peter Four",
    description:
      "Branding, newsletter and website build for this organisation design & development consultancy aligned with Christian values",
    link: { href: "https://1peter4.co.uk", label: "1peter4.co.uk" },
    logo: onepeterfourLogo,
  },
];

export type InspirationEntry = {
  title: string;
  href: string;
  description: string;
  cta: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inspirationCategories = ["Blogs", "Podcasts", "Youtube"] as const;

type InspirationCategory = (typeof inspirationCategories)[number];

export const INSPIRATION: Map<InspirationCategory, InspirationEntry[]> =
  new Map([
    [
      "Blogs",
      [
        {
          title: "Josh Comeau",
          href: "https://www.joshwcomeau.com/",
          description: "All things CSS",
          cta: "Read",
        },
        {
          title: "Alex Zajac",
          href: "https://www.hungryminds.dev/",
          description: "Get smarter about Software and AI in 5 minutes.",
          cta: "Read",
        },
      ],
    ],
    [
      "Podcasts",
      [
        {
          title: "Syntax FM",
          href: "https://syntax.fm/",
          description: "Tasty treats for web developers.",
          cta: "Listen",
        },
      ],
    ],
    [
      "Youtube",
      [
        {
          title: "Jack Herrington",
          href: "https://www.youtube.com/@jherr",
          description:
            "Frontend videos from basic to very advanced; tutorials, technology deep dives.",
          cta: "Watch",
        },
      ],
    ],
  ]);
