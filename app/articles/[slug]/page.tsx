import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";
import Link from "next/link";
import { notFound } from "next/navigation";

import { env } from "@/app/env";
import { SuspendedArticleImage } from "@/components/article-image";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { Code } from "@/components/mdx/code";
import { getArticleBySlug, getPublishedArticleSlugs } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();

  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }
  const ogImageUrl = getCldImageUrl({
    src: article.coverImage,
  });

  return {
    title: `${article.title}`,
    description: article.description,
    openGraph: {
      images: [ogImageUrl],
      title: article.title,
      description: article.description,
      url: `/articles/${slug}`,
      type: "article",
      authors: article.author,
      tags: article.categories,
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

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const MdxContent = article.mdx;

  return (
    <Container
      id="mdx-layout-container"
      className="mt-16 duration-1000 animate-in fade-in"
    >
      <div className="lg:relative">
        <div className="mx-auto max-w-2xl">
          <BackButton />
          {article && (
            <article>
              <div className="prose prose-lg mx-auto mt-8 dark:prose-invert prose-a:text-accent-foreground prose-a:no-underline prose-strong:underline prose-img:rounded-3xl">
                <header className="flex flex-col">
                  <h1 className="mt-6 flex">{article.title}</h1>
                  <div className="order-first flex items-center justify-start gap-2 text-sm text-zinc-400 dark:text-zinc-500">
                    <time dateTime={article.date} className="flex items-center">
                      <span className="h-4 w-0.5 rounded-full" />
                      <span className="ml-3">{formatDate(article.date)}</span>
                    </time>
                    <span> - </span>
                    <Link href="/about">{article.author}</Link>
                  </div>
                  <div className="mb-4 flex flex-row flex-wrap items-center justify-start gap-4">
                    {article.categories.map((category) => {
                      return (
                        <div
                          key={category}
                          className="inline-flex rounded-md border-none bg-secondary px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {category}
                        </div>
                      );
                    })}
                  </div>
                </header>
                <MdxContent components={{ SuspendedArticleImage, Code }} />
              </div>
            </article>
          )}
        </div>
      </div>
    </Container>
  );
}
