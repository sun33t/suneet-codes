import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Categories: CollectionConfig = {
	slug: "categories",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "sortOrder"],
		description: "Article categories for filtering and organization",
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
			unique: true,
			minLength: 2,
			label: "Category Title",
			admin: {
				description: "Category name (e.g., 'typescript', 'node')",
			},
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			label: "URL Slug",
			admin: {
				description: "Used in URLs for filtering (auto-generated from title)",
				readOnly: true,
			},
		},
		{
			name: "sortOrder",
			type: "number",
			label: "Display Order",
			defaultValue: 0,
			admin: {
				description: "Order in filter list (lower numbers appear first)",
			},
		},
	],
};
