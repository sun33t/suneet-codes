import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Following: CollectionConfig = {
	slug: "following",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "category", "cta"],
		description: "Creative professionals and resources I follow",
	},
	access: {
		read: () => true,
		create: ({ req }) => !!req.user,
		update: ({ req }) => !!req.user,
		delete: ({ req }) => !!req.user,
	},
	defaultSort: "title",
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			minLength: 2,
			label: "Name/Title",
		},
		{
			name: "href",
			type: "text",
			required: true,
			label: "URL",
			admin: {
				description: "Link to the resource",
			},
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			minLength: 5,
			label: "Description",
			admin: {
				description: "Brief description of the resource",
			},
		},
		{
			name: "cta",
			type: "select",
			required: true,
			label: "Call to Action",
			options: [
				{ label: "Subscribe", value: "Subscribe" },
				{ label: "Read", value: "Read" },
				{ label: "Listen", value: "Listen" },
				{ label: "Watch", value: "Watch" },
			],
			admin: {
				description: "Button text for the link",
			},
		},
		{
			name: "category",
			type: "select",
			required: true,
			label: "Category",
			options: [
				{ label: "Newsletters + Blogs", value: "Newsletters + Blogs" },
				{ label: "Podcasts", value: "Podcasts" },
				{ label: "YouTube", value: "YouTube" },
			],
		},
		{
			name: "sortOrder",
			type: "number",
			label: "Display Order",
			defaultValue: 0,
			admin: {
				description: "Order within category (lower numbers appear first)",
			},
		},
	],
};
