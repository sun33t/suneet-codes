import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Uses: CollectionConfig = {
	slug: "uses",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		group: "Content",
		useAsTitle: "title",
		defaultColumns: ["title", "category"],
		description: "Tools, hardware, and software recommendations",
	},
	access: {
		read: () => true,
		create: ({ req }) => !!req.user,
		update: ({ req }) => !!req.user,
		delete: ({ req }) => !!req.user,
	},
	defaultSort: "category",
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			minLength: 2,
			label: "Item Name",
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			minLength: 10,
			label: "Description",
			admin: {
				description: "Why I use this item",
			},
		},
		{
			name: "category",
			type: "select",
			required: true,
			label: "Category",
			options: [
				{ label: "Hardware", value: "Hardware" },
				{ label: "Development", value: "Development" },
				{ label: "Design", value: "Design" },
				{ label: "Productivity", value: "Productivity" },
			],
		},
		{
			name: "link",
			type: "group",
			label: "Product Link",
			fields: [
				{
					name: "href",
					type: "text",
					required: true,
					label: "URL",
				},
				{
					name: "label",
					type: "text",
					required: true,
					minLength: 2,
					label: "Display Text",
					admin: {
						description: 'Link text shown to users, e.g. "apple.com"',
					},
				},
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
