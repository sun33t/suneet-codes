"use client";

import type { SerializedLinkNode } from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { LinkJSXConverter, RichText } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";

/**
 * Converts custom links to URLs for rich text content.
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
 * Client component for rendering general rich text content.
 * Handles basic formatting (bold, underline) and links.
 *
 * Default styles: `space-y-4 [&_a]:text-accent-foreground [&_strong]:font-semibold`
 */
export function ContentRichText({
	data,
	className,
}: {
	data: SerializedEditorState;
	className?: string;
}) {
	return (
		<RichText
			className={cn(
				"space-y-4 [&_a]:text-accent-foreground [&_strong]:font-semibold",
				className,
			)}
			converters={({ defaultConverters }) => ({
				...defaultConverters,
				...LinkJSXConverter({ internalDocToHref }),
			})}
			data={data}
		/>
	);
}
