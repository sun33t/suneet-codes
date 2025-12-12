import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";

export const AboutPage: GlobalConfig = {
	slug: "about-page",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		description: "About page content and metadata",
	},
	access: {
		read: () => true,
		update: ({ req }) => !!req.user,
	},
	fields: [createMetadataFields()],
};
