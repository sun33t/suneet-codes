import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const SiteContent: GlobalConfig = {
	slug: "site-content",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		description: "Editable site copy and UI strings",
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
		{
			name: "about",
			type: "group",
			label: "About Page Content",
			admin: {
				description: "Content displayed on the about page",
			},
			fields: [
				{
					name: "profileImageAlt",
					type: "text",
					label: "Profile Image Alt Text",
					defaultValue:
						"Side profile photo of Suneet on the coast of Iceland at sunset",
				},
			],
		},
		{
			name: "ui",
			type: "group",
			label: "UI Labels",
			admin: {
				description: "Configurable UI text labels",
			},
			fields: [
				{
					name: "ctaButtonText",
					type: "text",
					label: "CTA Button Text",
					defaultValue: "Let's Talk",
				},
				{
					name: "resumeSectionTitle",
					type: "text",
					label: "Resume Section Title",
					defaultValue: "Work",
				},
			],
		},
	],
};
