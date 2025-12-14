import {
	BOLD,
	externalLink,
	heading,
	paragraph,
	richText,
	text,
} from "./lexical-helpers";
import type { SiteContentSeed } from "./types";

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
 * Default values for the site content global.
 */
export const SITE_CONTENT_SEED: Partial<SiteContentSeed> = {
	siteOwner: "Suneet Misra",
	about: {
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
