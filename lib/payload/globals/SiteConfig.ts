import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const SiteConfig: GlobalConfig = {
	slug: "site-config",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		group: "Settings",
		description: "Editable site copy",
	},
	access: {
		read: () => true,
		update: ({ req }) => !!req.user,
	},
	fields: [
		{
			name: "siteOwner",
			type: "text",
			label: "Site Owner",
			required: true,
			admin: {
				description:
					"Name of the site owner (used in footer copyright and homepage)",
			},
		},
	],
};
