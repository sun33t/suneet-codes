import { LinkProps } from "next/link";

import { type LogoDetails } from "@/types";

export interface Role {
  company: string;
  title: string;
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
  href: LinkProps["href"];
  logoDetails: LogoDetails;
}

export const ROLES: Array<Role> = [
  {
    company: "Juro",
    title: "Senior Software Engineer",
    logoDetails: {
      src: "juro_d0dccs",
      pixelWidth: "20px",
      imageWidth: 20,
      imageHeight: 20,
      className: "h-5 w-5 rounded-full",
    },
    start: "2025",
    end: {
      label: "Present",
      dateTime: new Date().getFullYear().toString(),
    },
    href: "https://juro.com",
  },
  {
    company: "Pushorigin",
    title: "Freelance Fullstack Engineer",
    logoDetails: {
      src: "pushorigin",
      pixelWidth: "20px",
      imageWidth: 20,
      imageHeight: 20,
      className: "h-5 w-5",
    },
    start: "2024",
    end: "2025",
    href: "https://pushorigin.co",
  },
  {
    company: "Lumin",
    title: "Fullstack Engineer",
    logoDetails: {
      src: "lumin",
      pixelWidth: "20px",
      imageWidth: 20,
      imageHeight: 20,
      className: "h-5 w-5",
    },
    start: "2023",
    end: "2024",
    href: "https://www.trustalliancegroup.org/our-companies/lumin",
  },
  {
    company: "ANS",
    title: "Senior Fullstack Engineer",
    logoDetails: {
      src: "ans",
      pixelWidth: "20px",
      imageWidth: 20,
      imageHeight: 20,
      className: "h-5 w-5",
    },
    start: "2021",
    end: "2021",
    href: "https://ans.co.uk",
  },
  {
    company: "Verse",
    title: "Senior JavaScript Engineer",
    logoDetails: {
      src: "verse",
      pixelWidth: "20px",
      imageWidth: 20,
      imageHeight: 20,
      className: "h-5 w-5",
    },
    start: "2020",
    end: "2023",
    href: "https://verse.co.uk",
  },
  {
    company: "Northcoders",
    title: "Tutor - Developer Pathway",
    logoDetails: {
      src: "northcoders",
      pixelWidth: "20px",
      imageWidth: 20,
      imageHeight: 20,
      className: "h-5 w-5",
    },
    start: "2019",
    end: "2020",
    href: "https://northcoders.com",
  },
];
