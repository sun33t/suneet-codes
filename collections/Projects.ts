import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "@/lib/payload/deploy-hook";

export const Projects: CollectionConfig = {
	slug: "projects",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		useAsTitle: "company",
		defaultColumns: ["company", "link_label"],
		description: "Portfolio project showcases",
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
			name: "company",
			type: "text",
			required: true,
			minLength: 2,
			label: "Company/Project Name",
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			minLength: 20,
			label: "Project Description",
		},
		{
			name: "logoDetails",
			type: "group",
			label: "Logo Details",
			fields: [
				{
					name: "src",
					type: "text",
					label: "Logo (Cloudinary path)",
					admin: {
						description: "Cloudinary image path, e.g. onepeterfour",
					},
				},
				{
					name: "pixelWidth",
					type: "text",
					label: "Pixel Width",
					defaultValue: "20px",
					admin: {
						description: 'CSS pixel width, e.g. "20px"',
					},
				},
				{
					name: "imageWidth",
					type: "number",
					label: "Image Width",
					defaultValue: 20,
					admin: {
						description: "Image width in pixels",
					},
				},
				{
					name: "imageHeight",
					type: "number",
					label: "Image Height",
					defaultValue: 20,
					admin: {
						description: "Image height in pixels",
					},
				},
				{
					name: "className",
					type: "text",
					label: "CSS Class",
					defaultValue: "h-5 w-5",
					admin: {
						description: 'Tailwind classes, e.g. "h-5 w-5"',
					},
				},
			],
		},
		{
			name: "link",
			type: "group",
			label: "Project Link",
			fields: [
				{
					name: "href",
					type: "text",
					required: true,
					label: "URL",
					admin: {
						description: "Full URL to the project",
					},
				},
				{
					name: "label",
					type: "text",
					required: true,
					minLength: 2,
					label: "Display Text",
					admin: {
						description: 'Link text shown to users, e.g. "example.com"',
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
				description: "Lower numbers appear first",
			},
		},
	],
};
