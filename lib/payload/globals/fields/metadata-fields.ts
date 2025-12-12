import type { GroupField } from "payload";

/**
 * TypeScript type for the metadata field group.
 * Defined here as the single source of truth alongside the field definition.
 */
export type PageMetadata = {
	title: string;
	description: string;
	openGraph?: {
		title?: string | null;
		description?: string | null;
	} | null;
};

/**
 * Creates a reusable metadata field group for page globals.
 * Includes title, description, and Open Graph fields for SEO.
 */
export const createMetadataFields = (): GroupField => ({
	name: "metadata",
	type: "group",
	label: "SEO Metadata",
	admin: {
		description: "Page metadata for SEO and social sharing",
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "Page Title",
			required: true,
			admin: {
				description: "The page title shown in browser tabs and search results",
			},
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
			required: true,
			admin: {
				description: "Meta description for search engines",
			},
		},
		{
			name: "openGraph",
			type: "group",
			label: "Open Graph",
			admin: {
				description: "Metadata for social media sharing",
			},
			fields: [
				{
					name: "title",
					type: "text",
					label: "OG Title",
					admin: {
						description:
							"Title when shared on social media (defaults to page title if empty)",
					},
				},
				{
					name: "description",
					type: "textarea",
					label: "OG Description",
					admin: {
						description:
							"Description when shared on social media (defaults to page description if empty)",
					},
				},
			],
		},
	],
});
