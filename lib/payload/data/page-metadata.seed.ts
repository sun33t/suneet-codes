import {
	BOLD_UNDERLINE,
	externalLink,
	internalLink,
	paragraph,
	richText,
	text,
} from "./lexical-helpers";
import type {
	AboutPageSeed,
	ArticlesPageSeed,
	ContactPageSeed,
	FollowingPageSeed,
	HomePageSeed,
	ProjectsPageSeed,
	ThankYouPageSeed,
	UsesPageSeed,
} from "./types";

/**
 * My Values content for the about page intro in Lexical format
 */
const MY_VALUES = richText([
	paragraph([
		text(
			"Helping people is great isn't it? It's been my primary motivator for as long as I can remember. I've tried my hand at a few different things over the years, but the ones that have stuck for the longest time are the experiences where I've walked away at the end of the day feeling like I've made a difference.",
		),
	]),
	paragraph([
		text(
			"My approach to building digital services starts and ends with helping people, because at the core of all of those beautiful bits and bytes, are the people who come together with an idea for a service, and the people that use them.",
		),
	]),
	paragraph([
		text(
			"Doing this with empathy and compassion helps to nurture the creative process, leading to meaningful and impactful digital experiences.",
		),
	]),
	paragraph([
		text(
			"Solving problems with code, sharing ideas and contributing to a culture of continuous improvement and learning is how I make a difference. I have to understand the why behind what we're building, before I can best help the team, and myself to achieve our goals.",
		),
	]),
	paragraph([
		text(
			"Below is a brief summary of my experience as a developer. The more I build, the more I want to build! Seriously, I think I might have a problem...",
		),
	]),
]);

/**
 * Bio content for the homepage intro in Lexical format
 */
const HOMEPAGE_BIO = richText([
	paragraph([
		text(
			"👋, I'm a developer based in the UK. I've been building software in the ",
		),
		text("e-commerce", BOLD_UNDERLINE),
		text(", "),
		text("retail", BOLD_UNDERLINE),
		text(" and "),
		text("hospitality", BOLD_UNDERLINE),
		text(" spaces as well as for the "),
		text("energy and comms ombudsman", BOLD_UNDERLINE),
		text(" over a five year period after completing my "),
		text("MSc in Computing", BOLD_UNDERLINE),
		text("."),
	]),
	paragraph([
		text("I love to create digital experiences which "),
		text("build community", BOLD_UNDERLINE),
		text(" and provide "),
		text("meaningful value", BOLD_UNDERLINE),
		text("."),
	]),
	paragraph([
		text("If you'd like to learn more about my journey into dev, here's my "),
		internalLink("about page", "/about"),
		text(", or if you're interested in working together here's my "),
		externalLink("cv", "CV_URL_PLACEHOLDER"),
		text(", or use the links below."),
	]),
	paragraph([
		text(
			"When I'm not working or learning new skills, I like to read, cook, travel with my wife and spend time in the outdoors with my friends.",
		),
	]),
]);

export const HOME_PAGE_SEED: Partial<HomePageSeed> = {
	pageIntro: {
		title: "Suneet Misra",
		intro: HOMEPAGE_BIO as any,
	},
	metadata: {
		title: "suneet.codes",
		description: "Developer based in the UK",
		openGraph: {
			title: "suneet.codes",
			description: "Developer based in the UK",
		},
	},
};

export const ABOUT_PAGE_SEED: Partial<AboutPageSeed> = {
	pageIntro: {
		title: "A little bit about me",
		intro: MY_VALUES as any,
	},
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
