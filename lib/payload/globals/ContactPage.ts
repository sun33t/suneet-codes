import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";

export const ContactPage: GlobalConfig = {
	slug: "contact-page",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		description: "Contact page content and metadata",
	},
	access: {
		read: () => true,
		update: ({ req }) => !!req.user,
	},
	fields: [createMetadataFields()],
};
