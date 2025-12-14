"use client";

import type { SerializedLinkNode } from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { LinkJSXConverter, RichText } from "@payloadcms/richtext-lexical/react";

/**
 * Converts custom links to URLs for homepage bio content.
 */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	// For custom links, just return the URL directly
	if (linkNode.fields.linkType === "custom") {
		return linkNode.fields.url ?? "/";
	}
	// For internal doc links (if any)
	const { relationTo, value } = linkNode.fields.doc ?? {};
	if (typeof value === "object" && value !== null && "slug" in value) {
		return `/${relationTo}/${value.slug}`;
	}
	return "/";
};

/**
 * Client component for rendering homepage bio rich text content.
 * Handles basic formatting (bold, underline) and links.
 */
export function HomepageRichText({
	data,
	className,
}: {
	data: SerializedEditorState;
	className?: string;
}) {
	return (
		<RichText
			className={className}
			converters={({ defaultConverters }) => ({
				...defaultConverters,
				...LinkJSXConverter({ internalDocToHref }),
			})}
			data={data}
		/>
	);
}
