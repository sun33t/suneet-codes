import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Services: CollectionConfig = {
	slug: "services",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		group: "Content",
		useAsTitle: "title",
		defaultColumns: ["title", "category", "sortOrder"],
		description: "Services offered for development and professional work",
	},
	access: {
		read: () => true,
		create: ({ req }) => !!req.user,
		update: ({ req }) => !!req.user,
		delete: ({ req }) => !!req.user,
	},
	defaultSort: "sortOrder",
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			minLength: 2,
			label: "Service Name",
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			minLength: 10,
			label: "Description",
			admin: {
				description: "Brief description of the service",
			},
		},
		{
			name: "category",
			type: "select",
			required: true,
			label: "Category",
			options: [
				{ label: "Development", value: "Development" },
				{ label: "Professional", value: "Professional" },
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
