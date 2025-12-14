import {
	BOLD,
	BOLD_UNDERLINE,
	externalLink,
	heading,
	internalLink,
	paragraph,
	richText,
	text,
} from "./lexical-helpers";
import type { SiteContentSeed } from "./types";

/**
 * My Values content for the about page in Lexical format
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
 * My Experience content for the about page in Lexical format
 */
const MY_EXPERIENCE = richText([
	heading("h2", [text("My experience:")]),
	paragraph([
		text("Hi! I'm Suneet, I have an "),
		text("MSc in Computing", BOLD),
		text(
			" with my dissertation focussing on bringing cultural heritage experiences to those of limited mobility through the use of mixed reality technologies.",
		),
	]),
	paragraph([
		text("I'm a graduate of the "),
		externalLink("Northcoders", "https://northcoders.com"),
		text(
			" Developer Pathway which I completed in 2019 and also a former member of the tuition team there, where I was proud to help other students on their route into dev.",
		),
	]),
	paragraph([
		text("Following my time at Northcoders, I've worked within both "),
		text("agency", BOLD),
		text(" and "),
		text("client-side", BOLD),
		text(" environments, on all aspects of "),
		text("full-stack applications", BOLD),
		text(" for a variety of national and international brands."),
	]),
	paragraph([
		text("My experience includes "),
		text("addressing technical debt", BOLD),
		text(" in existing projects, building "),
		text("design systems", BOLD),
		text(" and "),
		text("internal tooling", BOLD),
		text(", designing and implementing "),
		text("cloud infrastructure", BOLD),
		text(" and "),
		text("CI/CD", BOLD),
		text(" pipelines, "),
		text("writing documentation", BOLD),
		text(", "),
		text("leading/mentoring junior developers", BOLD),
		text(" and setting up "),
		text("greenfield projects", BOLD),
		text("."),
	]),
	paragraph([
		text(
			"Although I have some experience working in java, ruby, and python, I'm most experienced with ",
		),
		text("node and TypeScript", BOLD),
		text(
			". Its a versatile and vibrant stack where the tooling and libraries are constantly being moved forwards.",
		),
	]),
	paragraph([
		text("My most recent experience as a team-member has been at "),
		externalLink(
			"Lumin",
			"https://www.trustalliancegroup.org/our-companies/lumin",
		),
		text(
			" as a fullstack developer where I helped to address technical debt in their legacy react application and to extend their utilisation of AWS infrastructure to achieve improved performance and reliability at scale.",
		),
	]),
]);

/**
 * Bio content for the homepage in Lexical format
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

/**
 * Default values for the site content global.
 */
export const SITE_CONTENT_SEED: Partial<SiteContentSeed> = {
	siteOwner: "Suneet Misra",
	homepage: {
		// biome-ignore lint/suspicious/noExplicitAny: Lexical JSON structure is complex
		bio: HOMEPAGE_BIO as any,
		shortBio: "Developer based in the UK",
	},
	about: {
		pageTitle: "A little bit about me",
		// biome-ignore lint/suspicious/noExplicitAny: Lexical JSON structure is complex
		myValues: MY_VALUES as any,
		// biome-ignore lint/suspicious/noExplicitAny: Lexical JSON structure is complex
		myExperience: MY_EXPERIENCE as any,
		profileImageAlt:
			"Side profile photo of Suneet on the coast of Iceland at sunset",
	},
	newsletter: {
		title: "Stay up to date",
		description:
			"Get notified when I publish something new, and unsubscribe at any time.",
		buttonText: "Join",
	},
	ui: {
		ctaButtonText: "Let's Talk",
		resumeSectionTitle: "Work",
	},
};
