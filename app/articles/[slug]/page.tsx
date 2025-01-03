import { MDXContent } from "@content-collections/mdx/react";
import { allArticles } from "content-collections";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { env } from "@/app/env";
import { ArticleImage } from "@/components/article-image";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { getArticleByFilename } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const slugs = allArticles.map((article) => ({
    slug: article._meta.path,
  }));

  return slugs;
}

export async function generateMetadata(
  { params }: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;
  const article = getArticleByFilename(slug);

  return article
    ? {
        title: `${article?.title}`,
        description: article?.description,
        openGraph: {
          images: [article?.coverImage],
          title: article?.title,
          description: article?.description,
          url: `/articles/${slug}`,
          type: "article",
          authors: article?.author,
          tags: article?.categories,
          locale: "en-GB",
          siteName: env.PROJECT_BASE_TITLE,
        },
      }
    : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = getArticleByFilename(slug);

  if (!article) {
    notFound();
  }

  return (
    <Container id="mdx-layout-container" className="mt-16">
      <div className="lg:relative">
        <div className="mx-auto max-w-2xl">
          <BackButton />
          {article && (
            <article>
              <div className="prose prose-lg mx-auto mt-8 dark:prose-invert prose-a:text-accent-foreground prose-strong:text-red-500 prose-img:rounded-xl dark:prose-strong:text-red-300">
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
                          className="inline-flex rounded-md border-none bg-secondary px-2.5 py-0.5 text-xs font-semibold text-accent-foreground transition-colors"
                        >
                          {category}
                        </div>
                      );
                    })}
                  </div>
                </header>
                <MDXContent
                  code={article.mdx}
                  components={{
                    ArticleImage(props) {
                      return <ArticleImage {...props} />;
                    },
                  }}
                />
              </div>
            </article>
          )}
        </div>
      </div>
    </Container>
  );
}
