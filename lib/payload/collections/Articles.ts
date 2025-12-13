import {
	BlocksFeature,
	CodeBlock,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block, CollectionConfig } from "payload";
import { triggerDeployHook } from "../deploy-hook";

/**
 * Custom block for embedding Cloudinary images in article content.
 */
const ArticleImageBlock: Block = {
	slug: "articleImage",
	labels: {
		singular: "Article Image",
		plural: "Article Images",
	},
	fields: [
		{
			name: "src",
			type: "text",
			required: true,
			label: "Image Source",
			admin: {
				description: "Cloudinary image ID (e.g., 'my-image-name_abc123')",
			},
		},
		{
			name: "alt",
			type: "text",
			required: true,
			label: "Alt Text",
			admin: {
				description: "Descriptive text for accessibility",
			},
		},
		{
			name: "aspectRatio",
			type: "number",
			label: "Aspect Ratio",
			defaultValue: 1.78,
			admin: {
				description:
					"Width/height ratio (default 16:9 = 1.78). Used when width/height not specified.",
			},
		},
		{
			name: "width",
			type: "number",
			label: "Width (px)",
			admin: {
				description: "Optional fixed width in pixels",
			},
		},
		{
			name: "height",
			type: "number",
			label: "Height (px)",
			admin: {
				description: "Optional fixed height in pixels",
			},
		},
	],
};

export const Articles: CollectionConfig = {
	slug: "articles",
	hooks: {
		afterChange: [() => triggerDeployHook()],
		afterDelete: [() => triggerDeployHook()],
	},
	admin: {
		group: "Blog",
		useAsTitle: "title",
		defaultColumns: ["title", "isPublished", "date", "author"],
		description: "Blog articles with rich text content",
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
			name: "isPublished",
			type: "checkbox",
			defaultValue: false,
			label: "Published",
			admin: {
				description: "Only published articles are visible on the site",
				position: "sidebar",
			},
		},
		{
			name: "title",
			type: "text",
			required: true,
			minLength: 5,
			label: "Article Title",
			admin: {
				description: "The title of the article",
			},
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			label: "URL Slug",
			admin: {
				description: "Used in URLs (e.g., 'my-article-title')",
				position: "sidebar",
			},
		},
		{
			name: "author",
			type: "relationship",
			relationTo: "authors",
			required: true,
			label: "Author",
			admin: {
				description: "Select the article author",
				position: "sidebar",
			},
		},
		{
			name: "date",
			type: "date",
			required: true,
			label: "Publish Date",
			admin: {
				description: "The date the article was published",
				position: "sidebar",
				date: {
					pickerAppearance: "dayOnly",
					displayFormat: "yyyy-MM-dd",
				},
			},
		},
		{
			name: "updatedAt",
			type: "date",
			label: "Last Updated",
			admin: {
				description: "The date the article was last updated",
				position: "sidebar",
				date: {
					pickerAppearance: "dayOnly",
					displayFormat: "yyyy-MM-dd",
				},
			},
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
			admin: {
				description: "Short description for article cards and SEO",
			},
		},
		{
			name: "coverImage",
			type: "text",
			required: true,
			label: "Cover Image",
			admin: {
				description:
					"Cloudinary image ID (e.g., 'linting-formatting-node_dsdot4')",
			},
		},
		{
			name: "keywords",
			type: "relationship",
			relationTo: "keywords",
			hasMany: true,
			label: "Keywords",
			admin: {
				description: "SEO keywords for the article",
				position: "sidebar",
			},
		},
		{
			name: "categories",
			type: "relationship",
			relationTo: "categories",
			hasMany: true,
			required: true,
			minRows: 1,
			label: "Categories",
			admin: {
				description: "Select at least one category",
				position: "sidebar",
			},
		},
		{
			name: "content",
			type: "richText",
			label: "Article Content",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					...defaultFeatures,
					BlocksFeature({
						blocks: [
							ArticleImageBlock,
							CodeBlock({
								defaultLanguage: "shell",
								languages: {
									bash: "Bash",
									css: "CSS",
									dockerfile: "Dockerfile",
									go: "Go",
									graphql: "GraphQL",
									html: "HTML",
									java: "Java",
									javascript: "JavaScript",
									json: "JSON",
									markdown: "Markdown",
									plaintext: "Plain Text",
									python: "Python",
									rust: "Rust",
									shell: "Shell",
									sql: "SQL",
									tsx: "TSX",
									typescript: "TypeScript",
									yaml: "YAML",
								},
							}),
						],
					}),
				],
			}),
			admin: {
				description: "The main content of the article",
			},
		},
	],
};
