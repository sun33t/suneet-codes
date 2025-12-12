import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";

export const ProjectsPage: GlobalConfig = {
	slug: "projects-page",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		description: "Projects page content and metadata",
	},
	access: {
		read: () => true,
		update: ({ req }) => !!req.user,
	},
	fields: [createMetadataFields()],
};
