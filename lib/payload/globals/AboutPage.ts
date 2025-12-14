import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";
import { createMetadataFields } from "./fields/metadata-fields";
import { createPageIntroFields } from "./fields/page-intro-fields";

export const AboutPage: GlobalConfig = {
	slug: "about-page",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		group: "Pages",
		description: "About page content and metadata",
	},
	access: {
		read: () => true,
		update: ({ req }) => !!req.user,
	},
	fields: [
		createPageIntroFields(),
		{
			name: "myExperience",
			type: "richText",
			label: "My Experience Section",
			admin: {
				description:
					"Professional experience content displayed after the intro",
			},
		},
		createMetadataFields(),
	],
};
