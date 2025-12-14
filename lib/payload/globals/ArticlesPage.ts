import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";

export const ArticlesPage: GlobalConfig = {
	slug: "articles-page",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		group: "Pages",
		description: "Articles page content and metadata",
	},
	access: {
		read: () => true,
		update: ({ req }) => !!req.user,
	},
	fields: [
		{
			name: "pageTitle",
			type: "text",
			required: true,
			label: "Page Title",
			admin: {
				description: "The heading displayed on the page (H1)",
			},
		},
		createMetadataFields(),
	],
};
