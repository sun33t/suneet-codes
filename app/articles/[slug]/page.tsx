import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleCategories } from "@/components/article-categories";
import { ArticleImage } from "@/components/article-image";
import { Container } from "@/components/container";
import {
  type Frontmatter,
  getAllArticles,
  getArticleContent,
} from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

export async function generateStaticParams() {
  const { articles, error } = await getAllArticles();

  if (error) {
    return [];
  }

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

  const { content, error } = await getArticleContent(slug);

  if (error) {
    notFound();
  }

  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
      Image,
      ArticleImage,
      ArticleCategories,
    },
  });
  return (
    <Container id="mdx-layout-container">
      <div className="prose prose-lg mx-auto mt-8 dark:prose-invert prose-h1:text-center prose-a:text-accent-foreground prose-strong:text-red-500 prose-img:rounded-xl dark:prose-strong:text-red-300">
        <h1>{data.frontmatter.title}</h1>
        <ArticleCategories categories={data.frontmatter.categories} />
        <small className="flex items-center justify-center">
          {`written by ${data.frontmatter.author} on ${formatDate(data.frontmatter.date)}`}
        </small>
        {data.content}
      </div>
    </Container>
  );
}
