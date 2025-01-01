import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ImageProps } from "next/image";
import { LinkProps } from "next/link";

import ansLogo from "@/images/logos/ans.svg";
import luminLogo from "@/images/logos/lumin.svg";
import northcodersLogo from "@/images/logos/northcoders.png";
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
  { title: "Uses", slug: "/uses" },
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
  {
    company: "Northcoders",
    title: "Tutor - Developer Pathway",
    logo: northcodersLogo,
    start: "2019",
    end: "2020",
    href: "https://northcoders.com",
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
const inspirationCategories = [
  "Newsletters + Blogs",
  "Podcasts",
  "YouTube",
] as const;

type InspirationCategory = (typeof inspirationCategories)[number];

export const INSPIRATION: Map<InspirationCategory, InspirationEntry[]> =
  new Map([
    [
      "Newsletters + Blogs",
      [
        {
          title: "Josh Comeau",
          href: "https://www.joshwcomeau.com/",
          description: "All things CSS",
          cta: "Subscribe",
        },
        {
          title: "Alex Zajac",
          href: "https://www.hungryminds.dev/",
          description: "Get smarter about Software and AI in 5 minutes.",
          cta: "Subscribe",
        },
        {
          title: "NextJS Weekly",
          href: "https://nextjsweekly.com/",
          description:
            "A newsletter of the best Next.js articles, tools and projects.",
          cta: "Subscribe",
        },
        {
          title: "Remix Team",
          href: "https://remix.run/blog",
          description: "Articles from the team behind React Router and Remix.",
          cta: "Subscribe",
        },
        {
          title: "Console",
          href: "https://console.dev/",
          description:
            "A free weekly email digest of the best tools for developers.",
          cta: "Subscribe",
        },
        {
          title: "Robin Wieruch",
          href: "https://rwieruch.substack.com/",
          description:
            "Freelance Web Developer for React.js, Next.js in TypeScript and JavaScript.",
          cta: "Subscribe",
        },
        {
          title: "This Week in React",
          href: "https://thisweekinreact.com/",
          description: "The latest news directly in your inbox.",
          cta: "Subscribe",
        },
        {
          title: "Total TypeScript",
          href: "https://www.totaltypescript.com/newsletter",
          description:
            "A comprehensive production-grade TypeScript training by Matt Pocock.",
          cta: "Subscribe",
        },
        {
          title: "Lydia Hallie",
          href: "https://www.lydiahallie.com/",
          description: "Software Engineer and Technical Content Specialist",
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
        {
          title: "The Changelog",
          href: "https://changelog.com/podcast",
          description:
            "Software's best weekly news brief, deep technical interviews & talk show.",
          cta: "Listen",
        },
        {
          title: "Front-end Fire",
          href: "https://front-end-fire.com/",
          description:
            "The weekly show that helps you stay up to date on the latest and greatest in the front-end world.",
          cta: "Listen",
        },
        {
          title: "React Round Up",
          href: "https://topenddevs.com/podcasts/react-round-up",
          description: "Learn the latest in React from top end developers.",
          cta: "Listen",
        },
        {
          title: "Console DevTools",
          href: "https://console.dev/podcast",
          description:
            "Interviews with interesting people in the devtools space.",
          cta: "Listen",
        },
        {
          title: "DevTools FM",
          href: "https://www.devtools.fm/",
          description:
            "A podcast about developer tools and the people who make them.",
          cta: "Listen",
        },
        {
          title: "This Week in Tech",
          href: "https://twit.tv/shows/this-week-in-tech",
          description:
            "This Week in Tech is the top-ranked flagship tech podcast from TWiT.tv.",
          cta: "Listen",
        },
        {
          title: "Waveform",
          href: "https://podcasts.voxmedia.com/show/waveform-the-mkbhd-podcast",
          description: "The MKBHD podcast.",
          cta: "Listen",
        },
        {
          title: "JS Party",
          href: "https://changelog.com/jsparty",
          description: "A weekly celebration of JavaScript and the web.",
          cta: "Listen",
        },
      ],
    ],
    [
      "YouTube",
      [
        {
          title: "Theo",
          href: "https://www.youtube.com/@t3dotgg",
          description:
            "Commentary on the industry and changes in tooling and patterns.",
          cta: "Watch",
        },
        {
          title: "The Primeagen",
          href: "https://www.youtube.com/@ThePrimeTimeagen",
          description:
            "This is a place for all the things that are awesome on stream.",
          cta: "Watch",
        },
        {
          title: "Jack Herrington",
          href: "https://www.youtube.com/@jherr",
          description:
            "Frontend videos from basic to very advanced; tutorials, technology deep dives.",
          cta: "Watch",
        },
        {
          title: "ArjanCodes",
          href: "https://www.youtube.com/@ArjanCodes",
          description: "Videos about programming and software design.",
          cta: "Watch",
        },
        {
          title: "Awesome Coding",
          href: "https://www.youtube.com/@awesome-coding",
          description: "Pragmatic coding videos.",
          cta: "Watch",
        },
        {
          title: "Ben Awad",
          href: "https://www.youtube.com/@bawad",
          description:
            "Videos about React, React Native, GraphQL, Typescript, Node.js, PostgreSQL, Python, and all things coding.",
          cta: "Watch",
        },
        {
          title: "Codevolution",
          href: "https://www.youtube.com/@Codevolution",
          description: "Tutorials on the latest tech in web development.",
          cta: "Watch",
        },
        {
          title: "Dave Farley",
          href: "https://www.youtube.com/@ContinuousDelivery",
          description:
            "Explores ideas that help to produce Better Software Faster: Continuous Delivery, DevOps, TDD and Software Engineering.",
          cta: "Watch",
        },
        {
          title: "Diary of A CEO",
          href: "https://www.youtube.com/@TheDiaryOfACEO",
          description:
            "Life-changing, long-form interviews on a variety of topics.",
          cta: "Watch",
        },
        {
          title: "FireShip",
          href: "https://www.youtube.com/@Fireship",
          description:
            "High-intensity code tutorials and tech news to help you ship your app faster.",
          cta: "Watch",
        },
        {
          title: "FreeCodeCamp",
          href: "https://www.youtube.com/@freecodecamp",
          description: "Excellent learning resource",
          cta: "Watch",
        },
        {
          title: "Fun Fun Function",
          href: "https://www.youtube.com/@funfunfunction",
          description: "MPJ's excellent videos",
          cta: "Watch",
        },
        {
          title: "Kent C Dodds",
          href: "https://www.youtube.com/@KentCDodds-vids",
          description:
            "He helps people make the world better through quality software.",
          cta: "Watch",
        },
        {
          title: "Kevin Powell",
          href: "https://www.youtube.com/@KevinPowell",
          description:
            "Helping to learn how to make the web, and make it look good while you're at it.",
          cta: "Watch",
        },
        {
          title: "Learn with Jason",
          href: "https://www.youtube.com/@learnwithjason",
          description:
            "Live pair programming with expert web devs, career advice, and coding tutorials.",
          cta: "Watch",
        },
        {
          title: "Matt Pocock",
          href: "https://www.youtube.com/@mattpocockuk",
          description: "The TypeScript wizard.",
          cta: "Watch",
        },
        {
          title: "Matt Williams",
          href: "https://www.youtube.com/@technovangelist",
          description: "Informational videos about AI, LLMs and ollama",
          cta: "Watch",
        },
        {
          title: "Git Nation - React Conferences",
          href: "https://www.youtube.com/@ReactConferences",
          description: "Presentations from react conferences.",
          cta: "Watch",
        },
        {
          title: "Git Nation - JavaScript Conferences",
          href: "https://www.youtube.com/@JavaScriptConferences",
          description: "Presentations from JS conferences.",
          cta: "Watch",
        },
        {
          title: "Sam Selikoff",
          href: "https://www.youtube.com/@samselikoff",
          description: "Quality videos on frontend development.",
          cta: "Watch",
        },
        {
          title: "SyntaxFM",
          href: "https://www.youtube.com/@syntaxfm",
          description: "Tasty developer treats",
          cta: "Watch",
        },
        {
          title: "Traversy Media",
          href: "https://www.youtube.com/@TraversyMedia",
          description: "Web development and programming tutorials",
          cta: "Watch",
        },
        {
          title: "Typecraft",
          href: "https://www.youtube.com/@typecraft_dev",
          description: "Videos on developer tooling",
          cta: "Watch",
        },
        {
          title: "Valentin Despa",
          href: "https://www.youtube.com/@vdespa",
          description:
            "Learn more about agile software development using tools such as Postman for API testing, Gitlab CI for supporting your DevOps cycle.",
          cta: "Watch",
        },
        {
          title: "Web Dev Cody",
          href: "https://www.youtube.com/@WebDevCody",
          description:
            "A collection of various programming videos, tutorials, projects, talks, or anything software engineering and programming related.",
          cta: "Watch",
        },
        {
          title: "Web Dev Simplified",
          href: "https://www.youtube.com/@WebDevSimplified",
          description:
            "Teaching web development skills and techniques in an efficient and practical manner.",
          cta: "Watch",
        },
      ],
    ],
  ]);

type UsesEntry = {
  title: string;
  description: string;
};

type UsesCategory =
  | "Hardware"
  | "Development"
  | "VSCode Extensions"
  | "Design"
  | "Productivity";

export const USES: Map<UsesCategory, UsesEntry[]> = new Map([
  [
    "Hardware",
    [
      {
        title: "14” MacBook Pro, M3 Pro, 18GB RAM (2023)",
        description:
          "I've worked on both Windows and macOS and I find macOS a much better fit for my workflow. The current generation of Apple Silicon chips are so fast and the battery life means I can work from anywhere all day long without having to find a power outlet to plug into.",
      },
      {
        title: "Apple Studio Display",
        description:
          "It's pricey but it was the only HiDPI display I could find at the time that I needed to buy one. There's a few more hitting the market from BenQ, Asus and Samsung so you may have more choices when you come to read this.",
      },
      {
        title: "Keychron V1 ISO Wired Keyboard",
        description:
          "With Keychron K Pro Banana switches. This is a 75% layout and it's my sweet spot - Affordable and great to work on.",
      },
      {
        title: "Logitech MX Master 3S",
        description: "Rock solid mouse",
      },
      {
        title: "Fujitsu ScanSnap iX1600 Document Scanner",
        description: "Essential for digitizing all of my documents and post.",
      },
      {
        title: "Sonos One SL",
        description:
          "Affordable and good quality wireless speaker for when I'm working from home.",
      },
      {
        title: "Apple AirPods Pro",
        description:
          "Great quality earbuds for when I'm not working from home.",
      },
    ],
  ],
  [
    "Development",
    [
      {
        title: "Ghostty",
        description:
          "Zig-based terminal. Lightning fast and has replaced iTerm2 for me which had been my goto for 6 years.",
      },
      {
        title: "Oh-My-Zsh",
        description: "ZSH plugin for augmenting the terminal experience.",
      },
      {
        title: "VSCode",
        description:
          "Is it a text editor? Is it an IDE? I don't really worry about that. I work faster in here than any other editor that I've tried.",
      },
      {
        title: "Docker",
        description: "Essential for a full stack development workflow.",
      },
      {
        title: "Postman",
        description: "For storing and organising API queries.",
      },
      {
        title: "Ollama",
        description: "For working with large language models locally",
      },
      {
        title: "Parallels Desktop",
        description: "For virtualisation",
      },
      {
        title: "1Password CLI",
        description:
          "For local management of project environment variables and SSH keys",
      },
    ],
  ],
  [
    "VSCode Extensions",
    [
      {
        title: "Continue",
        description: "Local LLM integration into VSCode",
      },
    ],
  ],
  [
    "Design",
    [
      {
        title: "Figma",
        description:
          "This has become indispensible for wireframing, mind mapping and putting presentations together.",
      },
      {
        title: "Pixelmator Pro",
        description:
          "I'm not a designer or illustrator, but from time to time I need to create or edit graphics for projects and this is a great tool for that.",
      },
      {
        title: "Photomator",
        description:
          "Made by the team behind Pixelmator Pro and it's my goto for editing photos on my laptop or phone.",
      },
    ],
  ],
  [
    "Productivity",
    [
      {
        title: "Linear",
        description:
          "What I use for managing all my projects. Excellent integration with Slack and GitHub.",
      },
      {
        title: "Slack",
        description:
          "My favourite tool for team communication. I've used teams and discord but I keep coming back to Slack.",
      },
      {
        title: "Raycast",
        description:
          "Speeds up my macOS workflow and way more functional than Spotlight search",
      },
      {
        title: "1Password",
        description: "My favourite app for storing passwords and secure notes.",
      },
      {
        title: "Notion",
        description: "My main tool for note taking and bookmarking websites.",
      },
      {
        title: "DevonThink 3",
        description: "For storing all of my digitized documents.",
      },
      {
        title: "Arq Backup",
        description: "For backing up my files.",
      },
      {
        title: "Kap",
        description: "For recording my screen.",
      },
      {
        title: "Onyx",
        description: "For executing maintenance tasks within macOS.",
      },
      {
        title: "Mela",
        description:
          "I love cooking and this is my favourite app for storing recipes and ingredients lists.",
      },
    ],
  ],
]);
