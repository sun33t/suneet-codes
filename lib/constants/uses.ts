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
