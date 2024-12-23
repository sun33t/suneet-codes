import { compileMDX } from "next-mdx-remote/rsc";
import { Fragment } from "react";

import { Frontmatter, getAllArticles, getArticleContent } from "@/lib/articles";

export async function generateStaticParams() {
  const articles = await getAllArticles();

  const slugs = articles.map((article) => ({
    slug: article.slug,
  }));

  return slugs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const content = await getArticleContent(slug);
  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    // components: {}
  });
  return <Fragment>{data.content}</Fragment>;
}
