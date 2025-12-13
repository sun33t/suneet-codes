"use client";

import type {
	DefaultNodeTypes,
	SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
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
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const normalizedLanguage = language ?? "plaintext";
	const displayTitle = language ?? "code";

	return (
		<div className="overflow-hidden rounded-lg">
			{/* Header bar */}
			<div className="flex items-center justify-between rounded-t-xl bg-muted px-4 py-2">
				<div className="flex-1" />
				<span className="text-sm text-zinc-950 dark:text-zinc-50">
					{displayTitle}
				</span>
				<div className="flex flex-1 justify-end">
					<button
						aria-label="Copy to clipboard"
						className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
						onClick={copyToClipboard}
						type="button"
					>
						{copied ? (
							<Check className="h-4 w-4" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</button>
				</div>
			</div>
			{/* Code area */}
			<Highlight
				code={code.trim()}
				language={normalizedLanguage}
				theme={themes.nightOwl}
			>
				{({ style, tokens, getLineProps, getTokenProps }) => (
					<pre
						className="overflow-x-auto bg-zinc-950 p-4 text-sm"
						style={{
							...style,
							margin: 0,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
							borderBottomLeftRadius: "0.75rem",
							borderBottomRightRadius: "0.75rem",
						}}
					>
						{tokens.map((line, lineIndex) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: tokens are static code content
							<div key={lineIndex} {...getLineProps({ line })}>
								{line.map((token, tokenIndex) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: tokens are static
									<span key={tokenIndex} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
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
