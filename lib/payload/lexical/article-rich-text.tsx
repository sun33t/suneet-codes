"use client";

import type {
	DefaultNodeTypes,
	SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ArticleImageClient } from "@/components/shared/article-image-client";

/**
 * Type for the articleImage block fields
 */
type ArticleImageBlockFields = {
	src: string;
	alt: string;
	aspectRatio?: number | null;
	blockType: "articleImage";
};

/**
 * Type for the Code block fields (Payload's built-in CodeBlock)
 */
type CodeBlockFields = {
	code: string;
	language?: string | null;
	blockType: "Code";
};

/**
 * Extended node types including our custom blocks
 */
type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<ArticleImageBlockFields>
	| SerializedBlockNode<CodeBlockFields>;

/**
 * Code block component for rendering syntax-highlighted code
 */
function CodeBlockRenderer({
	code,
	language,
}: {
	code: string;
	language?: string | null;
}) {
	return (
		<pre className={`language-${language ?? "plaintext"}`}>
			<code>{code}</code>
		</pre>
	);
}

/**
 * JSX converters for custom Lexical blocks used in articles.
 */
const articleConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => ({
	...defaultConverters,
	blocks: {
		articleImage: ({ node }) => (
			<ArticleImageClient
				alt={node.fields.alt}
				aspectRatio={node.fields.aspectRatio ?? 16 / 9}
				src={node.fields.src}
			/>
		),
		Code: ({ node }) => (
			<CodeBlockRenderer
				code={node.fields.code}
				language={node.fields.language}
			/>
		),
	},
});

/**
 * Client component wrapper for RichText with article-specific converters.
 * Use this in article pages to render content with custom blocks.
 */
export function ArticleRichText({ data }: { data: SerializedEditorState }) {
	return <RichText converters={articleConverters} data={data} />;
}
