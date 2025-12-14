import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { GroupField } from "payload";

/**
 * TypeScript type for the page intro field group.
 * Defined here as the single source of truth alongside the field definition.
 */
export type PageIntro = {
	title: string;
	intro: SerializedEditorState;
};

/**
 * Creates a reusable page intro field group for page globals.
 * Includes title (H1 heading) and intro text displayed below.
 */
export const createPageIntroFields = (): GroupField => ({
	name: "pageIntro",
	type: "group",
	label: "Page Intro",
	admin: {
		description: "Content displayed at the top of the page",
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "Page Title",
			required: true,
			admin: {
				description: "The main heading displayed on the page (H1)",
			},
		},
		{
			name: "intro",
			type: "richText",
			label: "Intro Text",
			required: true,
			admin: {
				description: "Introductory content displayed below the title",
			},
		},
	],
});
