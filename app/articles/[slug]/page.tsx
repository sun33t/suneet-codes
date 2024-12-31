import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { env } from "@/app/env";
import { ArticleCategories } from "@/components/article-categories";
import { ArticleImage } from "@/components/article-image";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import {
  type Frontmatter,
  getAllArticles,
  getArticleContent,
} from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

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

export async function generateMetadata(
  { params }: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;
  const { content, error } = await getArticleContent(slug);

  if (error) {
    console.error(error);
  }

  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    title: data.frontmatter.title,
    description: data.frontmatter.description,
    openGraph: {
      images: [data.frontmatter.coverImage],
      title: data.frontmatter.title,
      description: data.frontmatter.description,
      url: `/articles/${slug}`,
      type: "article",
      authors: data.frontmatter.author,
      tags: data.frontmatter.categories,
      locale: "en-GB",
      siteName: env.PROJECT_BASE_TITLE,
    },
  };
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
    <Container id="mdx-layout-container" className="mt-16">
      <div className="lg:relative">
        <div className="mx-auto max-w-2xl">
          <BackButton />
          <article>
            <div className="prose prose-lg mx-auto mt-8 dark:prose-invert prose-a:text-accent-foreground prose-strong:text-red-500 prose-img:rounded-xl dark:prose-strong:text-red-300">
              <header className="flex flex-col">
                <h1 className="mt-6 flex">{data.frontmatter.title}</h1>
                <div className="order-first flex items-center justify-start gap-2 text-sm text-zinc-400 dark:text-zinc-500">
                  <time
                    dateTime={data.frontmatter.date}
                    className="flex items-center"
                  >
                    <span className="h-4 w-0.5 rounded-full" />
                    <span className="ml-3">
                      {formatDate(data.frontmatter.date)}
                    </span>
                  </time>
                  <span> - </span>
                  <Link href="/about">{data.frontmatter.author}</Link>
                </div>
                <div className="mb-4 flex flex-row flex-wrap items-center justify-start gap-4">
                  {data.frontmatter.categories.map((category) => {
                    return (
                      <div
                        key={category}
                        className="inline-flex rounded-md border-none bg-secondary px-2.5 py-0.5 text-xs font-semibold text-accent-foreground transition-colors"
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
              </header>
              {data.content}
            </div>
          </article>
        </div>
      </div>
    </Container>
  );
}
