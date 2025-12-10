import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

import { SuspendedArticleImage } from "@/components/article-image";
import { Code } from "@/components/mdx/code";
import { CodeWithTabs } from "@/components/mdx/code-with-tabs";
import { SeriesSection } from "@/components/mdx/series-section";

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
