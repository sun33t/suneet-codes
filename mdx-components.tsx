import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { Code } from "@/components/mdx/code";
import { CodeWithTabs } from "@/components/mdx/code-with-tabs";
import { SeriesSection } from "@/components/mdx/series-section";
import { SuspendedArticleImage } from "@/components/shared/article-image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		Code,
		SuspendedArticleImage,
		CodeWithTabs,
		Image,
		a: Link,
		SeriesSection,
	};
}
