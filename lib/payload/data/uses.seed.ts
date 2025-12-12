import type { UseSeed } from "./types";

export const USES_SEED: UseSeed[] = [
	// Hardware (7 items)
	{
		title: '14" MacBook Pro, M3 Pro, 18GB RAM (2023)',
		description:
			"I've worked on both Windows and macOS and I find macOS a much better fit for my workflow. The current generation of Apple Silicon chips are so fast and the battery life means I can work from anywhere all day long without having to find a power outlet to plug into.",
		category: "Hardware",
		link: {
			href: "https://www.apple.com/uk/macbook-pro/",
			label: "apple.com",
		},
		sortOrder: 0,
	},
	{
		title: "Apple Studio Display",
		description:
			"It's pricey but it was the only HiDPI display I could find at the time that I needed to buy one. There's a few more hitting the market from BenQ, Asus and Samsung so you may have more choices when you come to read this.",
		category: "Hardware",
		link: {
			href: "https://www.apple.com/uk/studio-display/",
			label: "apple.com",
		},
		sortOrder: 1,
	},
	{
		title: "Keychron V1 ISO Wired Keyboard",
		description:
			"With Keychron K Pro Banana switches. This is a 75% layout and it's my sweet spot - Affordable and great to work on.",
		category: "Hardware",
		link: {
			href: "https://www.keychron.uk/products/keychron-v1-qmk-via-custom-mechanical-keyboard?variant=43249923948714",
			label: "keychron.uk",
		},
		sortOrder: 2,
	},
	{
		title: "Logitech MX Master 3S",
		description: "Rock solid mouse",
		category: "Hardware",
		link: {
			href: "https://www.logitech.com/en-gb/products/mice/mx-master-3s.html?srsltid=AfmBOopoDtlLq2zHq-ql0WPAW5vfUbAKaGWP3_XvcES0Y47rpiYDsT9N",
			label: "logitech.com",
		},
		sortOrder: 3,
	},
	{
		title: "Fujitsu ScanSnap iX1600 Document Scanner",
		description: "Essential for digitizing all of my documents and post.",
		category: "Hardware",
		link: {
			href: "https://www.scansnapit.com/uk/products/scansnap-ix1600",
			label: "scansnapit.com",
		},
		sortOrder: 4,
	},
	{
		title: "Sonos One SL",
		description:
			"Affordable and good quality wireless speaker for when I'm working from home.",
		category: "Hardware",
		link: {
			href: "https://www.sonos.com/en-gb/shop/one-sl",
			label: "sonos.com",
		},
		sortOrder: 5,
	},
	{
		title: "Apple AirPods Pro",
		description: "Great quality earbuds for when I'm not working from home.",
		category: "Hardware",
		link: {
			href: "https://www.apple.com/uk/airpods-pro/",
			label: "apple.com",
		},
		sortOrder: 6,
	},

	// Development (8 items)
	{
		title: "Ghostty",
		description:
			"Zig-based terminal. Lightning fast and has replaced iTerm2 for me which had been my goto for 6 years.",
		category: "Development",
		link: {
			href: "https://ghostty.org/",
			label: "ghostty.org",
		},
		sortOrder: 0,
	},
	{
		title: "Oh-My-Zsh",
		description: "ZSH plugin for augmenting the terminal experience.",
		category: "Development",
		link: {
			href: "https://ohmyz.sh/",
			label: "ohmyz.sh",
		},
		sortOrder: 1,
	},
	{
		title: "VSCode",
		description:
			"Is it a text editor? Is it an IDE? I don't really worry about that. I work faster in here than any other editor that I've tried.",
		category: "Development",
		link: {
			href: "https://code.visualstudio.com/",
			label: "visualstudio.com",
		},
		sortOrder: 2,
	},
	{
		title: "Docker",
		description: "Essential for a full stack development workflow.",
		category: "Development",
		link: {
			href: "https://www.docker.com/",
			label: "docker.com",
		},
		sortOrder: 3,
	},
	{
		title: "Postman",
		description: "For storing and organising API queries.",
		category: "Development",
		link: {
			href: "https://www.postman.com/",
			label: "postman.com",
		},
		sortOrder: 4,
	},
	{
		title: "Ollama",
		description: "For working with large language models locally",
		category: "Development",
		link: {
			href: "https://ollama.com/",
			label: "ollama.com",
		},
		sortOrder: 5,
	},
	{
		title: "Parallels Desktop",
		description: "For virtualisation",
		category: "Development",
		link: {
			href: "https://www.parallels.com/",
			label: "parallels.com",
		},
		sortOrder: 6,
	},
	{
		title: "1Password CLI",
		description:
			"For local management of project environment variables and SSH keys",
		category: "Development",
		link: {
			href: "https://developer.1password.com/docs/cli/get-started/",
			label: "1password.com",
		},
		sortOrder: 7,
	},

	// Design (3 items)
	{
		title: "Figma",
		description:
			"This has become indispensible for wireframing, mind mapping and putting presentations together.",
		category: "Design",
		link: {
			href: "https://www.figma.com/",
			label: "figma.com",
		},
		sortOrder: 0,
	},
	{
		title: "Pixelmator Pro",
		description:
			"I'm not a designer or illustrator, but from time to time I need to create or edit graphics for projects and this is a great tool for that.",
		category: "Design",
		link: {
			href: "https://www.pixelmator.com/pro/",
			label: "pixelmator.com",
		},
		sortOrder: 1,
	},
	{
		title: "Photomator",
		description:
			"Made by the team behind Pixelmator Pro and it's my goto for editing photos on my laptop or phone.",
		category: "Design",
		link: {
			href: "https://www.pixelmator.com/photomator/",
			label: "pixelmator.com",
		},
		sortOrder: 2,
	},

	// Productivity (11 items)
	{
		title: "Homebrew",
		description: "The missing package manager for macOS",
		category: "Productivity",
		link: {
			href: "https://brew.sh/",
			label: "brew.sh",
		},
		sortOrder: 0,
	},
	{
		title: "Linear",
		description:
			"What I use for managing all my projects. Excellent integration with Slack and GitHub.",
		category: "Productivity",
		link: {
			href: "https://linear.app/",
			label: "linear.app",
		},
		sortOrder: 1,
	},
	{
		title: "Slack",
		description:
			"My favourite tool for team communication. I've used teams and discord but I keep coming back to Slack.",
		category: "Productivity",
		link: {
			href: "https://slack.com/intl/en-gb/",
			label: "slack.com",
		},
		sortOrder: 2,
	},
	{
		title: "Raycast",
		description:
			"Speeds up my macOS workflow and way more functional than Spotlight search",
		category: "Productivity",
		link: {
			href: "https://www.raycast.com/",
			label: "raycast.com",
		},
		sortOrder: 3,
	},
	{
		title: "1Password",
		description: "My favourite app for storing passwords and secure notes.",
		category: "Productivity",
		link: {
			href: "https://1password.com/",
			label: "1password.com",
		},
		sortOrder: 4,
	},
	{
		title: "Notion",
		description: "My main tool for note taking and bookmarking websites.",
		category: "Productivity",
		link: {
			href: "https://www.notion.com/",
			label: "notion.com",
		},
		sortOrder: 5,
	},
	{
		title: "DevonThink 3",
		description: "For storing all of my digitized documents.",
		category: "Productivity",
		link: {
			href: "https://www.devontechnologies.com/apps/devonthink",
			label: "devontechnologies.com",
		},
		sortOrder: 6,
	},
	{
		title: "Arq Backup",
		description: "For backing up my files.",
		category: "Productivity",
		link: {
			href: "https://www.arqbackup.com/",
			label: "arqbackup.com",
		},
		sortOrder: 7,
	},
	{
		title: "Kap",
		description: "For recording my screen.",
		category: "Productivity",
		link: {
			href: "https://getkap.co/",
			label: "getkap.co",
		},
		sortOrder: 8,
	},
	{
		title: "Onyx",
		description: "For executing maintenance tasks within macOS.",
		category: "Productivity",
		link: {
			href: "https://www.titanium-software.fr/en/onyx.html",
			label: "titanium-software.fr",
		},
		sortOrder: 9,
	},
	{
		title: "Mela",
		description:
			"I love cooking and this is my favourite app for storing recipes and ingredients lists.",
		category: "Productivity",
		link: {
			href: "https://mela.recipes/",
			label: "mela.recipes",
		},
		sortOrder: 10,
	},
];
