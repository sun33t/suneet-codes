import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Authors: CollectionConfig = {
	slug: "authors",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		group: "Blog",
		useAsTitle: "name",
		defaultColumns: ["name"],
		description: "Article authors",
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
			label: "Author Name",
			admin: {
				description: "Full name of the author",
			},
		},
	],
};
