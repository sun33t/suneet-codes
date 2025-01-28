import { SuspendedArticleImage } from "./components/article-image";
import { CodeWithTabs } from "./components/mdx/code-with-tabs";

import type { MDXComponents } from "mdx/types";

import { Code } from "@/components/mdx/code";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    SuspendedArticleImage,
    CodeWithTabs,
  };
}
