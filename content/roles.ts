import { ImageProps } from "next/image";
import { LinkProps } from "next/link";

import ansLogo from "@/public/logos/ans.svg";
import luminLogo from "@/public/logos/lumin.svg";
import northcodersLogo from "@/public/logos/northcoders.png";
import logoPushorigin from "@/public/logos/pushorigin.svg";
import verseLogo from "@/public/logos/verse.svg";

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
  {
    company: "Northcoders",
    title: "Tutor - Developer Pathway",
    logo: northcodersLogo,
    start: "2019",
    end: "2020",
    href: "https://northcoders.com",
  },
];
