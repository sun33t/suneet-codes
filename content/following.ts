export type FollowingEntry = {
  title: string;
  href: string;
  description: string;
  cta: string;
};

type FollowingCategory = "Newsletters + Blogs" | "Podcasts" | "YouTube";

export const FOLLOWING: Map<FollowingCategory, FollowingEntry[]> = new Map([
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
