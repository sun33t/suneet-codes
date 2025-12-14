import type { GlobalConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const SiteConfig: GlobalConfig = {
	slug: "site-config",
	hooks: {
		afterChange: [() => triggerDeployHook()],
	},
	admin: {
		group: "Settings",
		description: "Site-wide configuration and settings",
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
			name: "siteTitle",
			type: "text",
			label: "Site Title",
			required: true,
			admin: {
				description:
					"The main title of the site (used in metadata and branding)",
			},
		},
		{
			name: "siteDescription",
			type: "textarea",
			label: "Site Description",
			required: true,
			admin: {
				description: "Default meta description for SEO",
			},
		},
		{
			name: "socialLinks",
			type: "group",
			label: "Social Links",
			admin: {
				description: "Links to social media profiles and external presence",
			},
			fields: [
				{
					name: "github",
					type: "text",
					label: "GitHub URL",
					required: true,
					admin: {
						description: "GitHub profile URL",
					},
				},
				{
					name: "linkedin",
					type: "text",
					label: "LinkedIn URL",
					required: true,
					admin: {
						description: "LinkedIn profile URL",
					},
				},
				{
					name: "bluesky",
					type: "text",
					label: "Bluesky URL",
					required: true,
					admin: {
						description: "Bluesky profile URL",
					},
				},
				{
					name: "notion",
					type: "text",
					label: "Notion URL",
					required: true,
					admin: {
						description: "Notion CV/portfolio URL",
					},
				},
			],
		},
		{
			name: "contact",
			type: "group",
			label: "Contact Information",
			admin: {
				description: "Contact details and booking links",
			},
			fields: [
				{
					name: "email",
					type: "email",
					label: "Contact Email",
					required: true,
					admin: {
						description: "Public contact email address",
					},
				},
				{
					name: "calendarUrl",
					type: "text",
					label: "Calendar URL",
					required: true,
					admin: {
						description: "Booking/calendar link for scheduling meetings",
					},
				},
			],
		},
	],
};
