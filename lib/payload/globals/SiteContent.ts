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
			name: "homepage",
			type: "group",
			label: "Homepage Content",
			admin: {
				description: "Content displayed on the homepage",
			},
			fields: [
				{
					name: "bio",
					type: "richText",
					label: "Main Bio",
					admin: {
						description: "Main bio text with formatting support",
					},
				},
				{
					name: "shortBio",
					type: "textarea",
					label: "Short Bio / Tagline",
					admin: {
						description: "Brief tagline text",
					},
				},
			],
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
					name: "myExperience",
					type: "richText",
					label: "My Experience Section",
					admin: {
						description: "Professional experience content",
					},
				},
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
			name: "newsletter",
			type: "group",
			label: "Newsletter Section",
			admin: {
				description: "Newsletter signup section content",
			},
			fields: [
				{
					name: "title",
					type: "text",
					label: "Title",
					defaultValue: "Stay up to date",
				},
				{
					name: "description",
					type: "text",
					label: "Description",
					defaultValue:
						"Get notified when I publish something new, and unsubscribe at any time.",
				},
				{
					name: "buttonText",
					type: "text",
					label: "Button Text",
					defaultValue: "Join",
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
