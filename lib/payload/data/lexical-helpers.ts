/**
 * Lexical rich text helpers for creating seed data.
 * These helpers create valid Lexical JSON structures for Payload CMS.
 */

/**
 * Helper to create a text node for Lexical
 */
export const text = (content: string, format: number = 0) => ({
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
export const paragraph = (children: unknown[]) => ({
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
export const internalLink = (linkText: string, url: string) => ({
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
export const externalLink = (linkText: string, url: string) => ({
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
export const richText = (paragraphs: unknown[]) => ({
	root: {
		type: "root",
		children: paragraphs,
		direction: "ltr",
		format: "",
		indent: 0,
		version: 1,
	},
});

/**
 * Helper to create a heading node for Lexical
 */
export const heading = (
	tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
	children: unknown[],
) => ({
	type: "heading",
	tag,
	version: 1,
	children,
	direction: "ltr",
	format: "",
	indent: 0,
});

// Format constants: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline
export const BOLD = 1;
export const ITALIC = 2;
export const STRIKETHROUGH = 4;
export const UNDERLINE = 8;
export const BOLD_UNDERLINE = 9; // 1 + 8
