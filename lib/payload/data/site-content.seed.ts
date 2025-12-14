import type { SiteContentSeed } from "./types";

/**
 * Helper to create a text node for Lexical
 */
const text = (content: string, format: number = 0) => ({
	type: "text",
	text: content,
	format,
	detail: 0,
	mode: "normal",
	style: "",
	version: 1,
});

/**
 * Helper to create a paragraph node for Lexical
 */
const paragraph = (children: unknown[]) => ({
	type: "paragraph",
	version: 1,
	children,
	direction: "ltr",
	format: "",
	indent: 0,
	textFormat: 0,
	textStyle: "",
});

/**
 * Helper to create an internal link node for Lexical (Payload format)
 */
const internalLink = (linkText: string, url: string) => ({
	type: "link",
	version: 3,
	children: [text(linkText, 1)], // bold text
	direction: "ltr",
	format: "",
	indent: 0,
	fields: {
		linkType: "custom",
		url,
		newTab: false,
	},
});

/**
 * Helper to create an external link node for Lexical (Payload format)
 */
const externalLink = (linkText: string, url: string) => ({
	type: "link",
	version: 3,
	children: [text(linkText, 1)], // bold text
	direction: "ltr",
	format: "",
	indent: 0,
	fields: {
		linkType: "custom",
		url,
		newTab: true,
	},
});

/**
 * Helper to create a root node wrapper for Lexical
 */
const richText = (paragraphs: unknown[]) => ({
	root: {
		type: "root",
		children: paragraphs,
		direction: "ltr",
		format: "",
		indent: 0,
		version: 1,
	},
});

// Format constants: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline
const BOLD_UNDERLINE = 9; // 1 + 8

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
 * Note: Rich text fields (myValues, myExperience) may require manual adjustment
 * through the admin panel for complex formatting.
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
