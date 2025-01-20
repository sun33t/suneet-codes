import { type Metadata } from "next";

import { env } from "@/app/env";
import { Page, PageData } from "@/types";

export const PAGE_DATA: Map<Page, PageData> = new Map([
  ["projects", { slug: "/projects", title: "projects" }],
  ["about", { slug: "/about", title: "about" }],
  ["articles", { slug: "/articles", title: "articles" }],
  ["uses", { slug: "/uses", title: "uses" }],
  ["following", { slug: "/following", title: "following" }],
  ["contact", { slug: "/contact", title: "contact" }],
]);

export const PAGE_METADATA: Record<Page, Metadata> = {
  about: {
    title: "about",
    description: `I'm ${env.PROJECT_AUTHOR} - a developer working from ${env.PROJECT_AUTHOR_LOCATION}.`,
    openGraph: {
      title: `about | ${env.PROJECT_BASE_TITLE}`,
      description: `I'm ${env.PROJECT_AUTHOR} - a developer working from ${env.PROJECT_AUTHOR_LOCATION}.`,
    },
  },
  articles: {
    title: "articles",
    description:
      "My notes on programming, leadership and mentoring, product design/development, and more.",
    openGraph: {
      title: `articles | ${env.PROJECT_BASE_TITLE}`,
      description: `My notes on programming, leadership and mentoring, product design/development, and more.`,
    },
  },
  projects: {
    title: "projects",
    description: "Projects that I've built.",
    openGraph: {
      title: `projects | ${env.PROJECT_BASE_TITLE}`,
      description: `Projects that I've built.`,
    },
  },
  following: {
    title: "following",
    description: "Developers and creative professionals whose work I follow.",
    openGraph: {
      title: `following | ${env.PROJECT_BASE_TITLE}`,
      description: `Developers and creative professionals whose work I follow.`,
    },
  },
  uses: {
    title: "uses",
    description: "What I use.",
    openGraph: {
      title: `uses | ${env.PROJECT_BASE_TITLE}`,
      description: `What I use.`,
    },
  },
  contact: {
    title: "contact",
    description: "Tell me about your project.",
    openGraph: {
      title: `contact | ${env.PROJECT_BASE_TITLE}`,
      description: `Tell me about your project.`,
    },
  },
  "thank-you": {
    title: "thank you",
    description: "Thanks for getting in touch",
    openGraph: {
      title: `thank you | ${env.PROJECT_BASE_TITLE}`,
      description: `Thanks for getting in touch`,
    },
  },
};
