import { StaticImport } from "next/dist/shared/lib/get-img-props";

import onepeterfourLogo from "@/images/logos/onepeterfour.webp";

export type Project = {
  name: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
  logo: StaticImport;
};

export const PROJECTS: Set<Project> = new Set([
  {
    name: "One Peter Four",
    description:
      "Branding, newsletter and website build for this organisation design & development consultancy aligned with Christian values",
    link: { href: "https://1peter4.co.uk", label: "1peter4.co.uk" },
    logo: onepeterfourLogo,
  },
]);
