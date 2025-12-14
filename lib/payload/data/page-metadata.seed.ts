import { externalLink, paragraph, richText, text } from "./lexical-helpers";
import type {
	AboutPageSeed,
	ArticlesPageSeed,
	ContactPageSeed,
	FollowingPageSeed,
	ProjectsPageSeed,
	ThankYouPageSeed,
	UsesPageSeed,
} from "./types";

export const ABOUT_PAGE_SEED: Partial<AboutPageSeed> = {
	pageTitle: "About",
	metadata: {
		title: "about",
		description: "I'm Suneet - a developer working from the UK.",
		openGraph: {
			title: "about | suneet.codes",
			description: "I'm Suneet - a developer working from the UK.",
		},
	},
};

export const ARTICLES_PAGE_SEED: Partial<ArticlesPageSeed> = {
	pageIntro: {
		title: "Articles",
		intro: richText([
			paragraph([
				text(
					"You're probably reading this because you're curious about how other developers do what they do. Congratulations! You're awesome! Learning from each other and sharing what we know is one of the superpowers that we have. We're all in this together! On this page you'll find posts that I've written. They're mostly made up from my own notes, that I wanted to put into the public domain in case any of it might be of help to you.",
				),
			]),
		]) as any,
	},
	metadata: {
		title: "articles",
		description:
			"My notes on programming, leadership and mentoring, product design/development, and more.",
		openGraph: {
			title: "articles | suneet.codes",
			description:
				"My notes on programming, leadership and mentoring, product design/development, and more.",
		},
	},
};

export const PROJECTS_PAGE_SEED: Partial<ProjectsPageSeed> = {
	pageIntro: {
		title: "Projects",
		intro: richText([
			paragraph([
				text(
					"I've worked on many projects over the years as an employee but below are the ones that I've built myself as a freelance developer. It's a list of one right now but it's growing...",
				),
			]),
		]) as any,
	},
	metadata: {
		title: "projects",
		description: "Projects that I've built.",
		openGraph: {
			title: "projects | suneet.codes",
			description: "Projects that I've built.",
		},
	},
};

export const FOLLOWING_PAGE_SEED: Partial<FollowingPageSeed> = {
	pageIntro: {
		title: "Creative professionals whose work I follow",
		intro: richText([
			paragraph([
				text(
					"This industry is always changing and there are always new challenges to overcome. These are the people who I find continually inspiring and invaluable to learn from.",
				),
			]),
		]) as any,
	},
	metadata: {
		title: "following",
		description: "Developers and creative professionals whose work I follow.",
		openGraph: {
			title: "following | suneet.codes",
			description: "Developers and creative professionals whose work I follow.",
		},
	},
};

export const USES_PAGE_SEED: Partial<UsesPageSeed> = {
	pageIntro: {
		title: "Uses",
		intro: richText([
			paragraph([
				text(
					"From time to time, I get asked about what I use to work on my projects. I've tried to list as many of the tools I use below, and ",
				),
				externalLink("here's", "https://github.com/sun33t/install-scripts-v2"),
				text(
					" a link to my install-scripts repo too which is what I use to set up my dev environment. It's not the most sophisticated, but it get's the job done quickly and consistently!",
				),
			]),
		]) as any,
	},
	metadata: {
		title: "uses",
		description: "What I use.",
		openGraph: {
			title: "uses | suneet.codes",
			description: "What I use.",
		},
	},
};

export const CONTACT_PAGE_SEED: Partial<ContactPageSeed> = {
	pageIntro: {
		title: "Contact",
		intro: richText([
			paragraph([
				text(
					"You can book some time in my calendar, send me an email, or if you prefer, fill in an enquiry form and I'll come back to you as soon as I can.",
				),
			]),
		]) as any,
	},
	metadata: {
		title: "contact",
		description: "Tell me about your project.",
		openGraph: {
			title: "contact | suneet.codes",
			description: "Tell me about your project.",
		},
	},
};

export const THANK_YOU_PAGE_SEED: Partial<ThankYouPageSeed> = {
	pageIntro: {
		title: "Thanks for getting in touch.",
		intro: richText([
			paragraph([
				text(
					"I'm looking forward to learning more about your project and I'll get back to you on the contact details provided as soon as I can. You can also rest assured that your details are kept safe and not passed on to anyone else without your express permission.",
				),
			]),
		]) as any,
	},
	metadata: {
		title: "thank you",
		description: "Thanks for getting in touch",
		openGraph: {
			title: "thank you | suneet.codes",
			description: "Thanks for getting in touch",
		},
	},
};
