import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";

export const ArticlesPage: GlobalConfig = {
	slug: "articles-page",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		description: "Articles page content and metadata",
	},
	access: {
		read: () => true,
		update: ({ req }) => !!req.user,
	},
	fields: [createMetadataFields()],
};
