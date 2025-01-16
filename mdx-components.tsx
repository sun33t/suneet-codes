import { SuspendedArticleImage } from "./components/article-image";
import { Code } from "./components/code";

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    SuspendedArticleImage,
    Code,
    ...components,
  };
}
