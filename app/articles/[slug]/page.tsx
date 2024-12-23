import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";

import { ArticleImage } from "@/components/article-image";
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
    components: {
      Image,
      ArticleImage,
    },
  });
  return (
    <div className="prose prose-lg mx-auto mt-8 dark:prose-invert prose-h1:text-center prose-img:rounded-xl">
      {data.content}
    </div>
  );
}
