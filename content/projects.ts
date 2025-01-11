export type Project = {
  name: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
  filename: string;
};

export const PROJECTS: Array<Project> = [
  {
    name: "One Peter Four",
    description:
      "Branding, newsletter and website build for this organisation design & development consultancy aligned with Christian values",
    link: { href: "https://1peter4.co.uk", label: "1peter4.co.uk" },
    filename: "onepeterfour",
  },
];
