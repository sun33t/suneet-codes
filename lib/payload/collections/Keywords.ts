import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Keywords: CollectionConfig = {
	slug: "keywords",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name"],
		description: "SEO keywords for articles",
	},
	access: {
		read: () => true,
		create: ({ req }) => !!req.user,
		update: ({ req }) => !!req.user,
		delete: ({ req }) => !!req.user,
	},
	defaultSort: "name",
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			unique: true,
			minLength: 2,
			label: "Keyword",
			admin: {
				description: "SEO keyword (e.g., 'typescript', 'react')",
			},
		},
	],
};
