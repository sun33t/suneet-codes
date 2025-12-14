import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";
import { createPageIntroFields } from "./fields/page-intro-fields";

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
	fields: [createPageIntroFields(), createMetadataFields()],
};
