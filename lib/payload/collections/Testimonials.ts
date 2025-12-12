import type { CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

export const Testimonials: CollectionConfig = {
	slug: "testimonials",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		useAsTitle: "authorName",
		defaultColumns: ["authorName", "authorRole", "date"],
		description: "Recommendations from colleagues and clients",
	},
	access: {
		read: () => true,
		create: ({ req }) => !!req.user,
		update: ({ req }) => !!req.user,
		delete: ({ req }) => !!req.user,
	},
	defaultSort: "-date",
	fields: [
		{
			name: "authorName",
			type: "text",
			required: true,
			minLength: 2,
			label: "Author Name",
		},
		{
			name: "authorRole",
			type: "text",
			required: true,
			minLength: 2,
			label: "Job Title and Company",
		},
		{
			name: "authorImgSrc",
			type: "text",
			label: "Profile Image (Cloudinary path)",
			admin: {
				description: "Cloudinary image path, e.g. testimonials/sean_connell",
			},
		},
		{
			name: "authorHandle",
			type: "text",
			label: "LinkedIn Handle",
		},
		{
			name: "authorProfileUrl",
			type: "text",
			label: "Full LinkedIn URL",
		},
		{
			name: "date",
			type: "date",
			required: true,
			label: "Date of Testimonial",
			admin: {
				date: {
					pickerAppearance: "dayOnly",
					displayFormat: "d MMM yyyy",
				},
			},
		},
		{
			name: "shortBody",
			type: "textarea",
			required: true,
			minLength: 20,
			label: "Short Excerpt",
			admin: {
				description: "1-2 sentences for card display",
			},
		},
		{
			name: "fullBody",
			type: "array",
			required: true,
			minRows: 1,
			label: "Full Testimonial",
			admin: {
				description: "Full testimonial content as paragraphs",
			},
			fields: [
				{
					name: "paragraph",
					type: "textarea",
					required: true,
					label: "Paragraph",
				},
			],
		},
	],
};
