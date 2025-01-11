import { LinkProps } from "next/link";

export interface Role {
  company: string;
  title: string;
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
  href: LinkProps["href"];
  filename: string;
}

export const ROLES: Array<Role> = [
  {
    company: "Pushorigin",
    title: "Founder, Engineer",
    filename: "pushorigin",

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
    filename: "lumin",

    start: "2023",
    end: "2024",
    href: "https://www.trustalliancegroup.org/our-companies/lumin",
  },
  {
    company: "ANS",
    title: "Senior Fullstack Engineer",
    filename: "ans",

    start: "2021",
    end: "2021",
    href: "https://ans.co.uk",
  },
  {
    company: "Verse",
    title: "Senior JavaScript Engineer",
    filename: "verse",

    start: "2020",
    end: "2023",
    href: "https://verse.co.uk",
  },
  {
    company: "Northcoders",
    title: "Tutor - Developer Pathway",
    filename: "northcoders",

    start: "2019",
    end: "2020",
    href: "https://northcoders.com",
  },
];
