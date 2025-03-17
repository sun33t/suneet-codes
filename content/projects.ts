import { type LogoDetails } from "@/types";

export type Project = {
  company: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
  logoDetails: LogoDetails;
};

export const PROJECTS: Array<Project> = [
  {
    company: "One Peter Four",
    description:
      "Branding, newsletter and website build for this organisation design & development consultancy aligned with Christian values",
    link: { href: "https://1peter4.co.uk", label: "1peter4.co.uk" },
    logoDetails: {
      src: "onepeterfour",
      pixelWidth: "20px",
      imageWidth: 20,
      imageHeight: 20,
      className: "h-5 w-5",
    },
  },
];
