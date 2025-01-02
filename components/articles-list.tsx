import { Card } from "./card";
import { Skeleton } from "./ui/skeleton";

import { Suspense } from "react";

import {
  FrontmatterCategories,
  FrontmatterWithFilename,
  getAllArticles,
} from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

const SkeletonCard = () => {
  return (
    <div
      className="md:grid md:grid-cols-4 md:items-baseline"
      id="skeleton-article-card"
    >
      <div className="group relative flex flex-col items-start md:col-span-3">
        <Skeleton
          id="skeleton card title"
          className="h-4 w-[200px] sm:w-[350px]"
        />
        <div
          id="skeleton card eyebrow"
          className="relative z-10 order-first mb-3 flex items-center pl-3.5 md:hidden"
        >
          <span className="absolute inset-y-0 left-0 flex items-center">
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
          </span>
          <Skeleton className="h-4 w-[130px]" />
        </div>
        <Skeleton
          id="skeleton card description"
          className="relative z-10 mt-2 h-4 w-[200px]"
        />
        <Skeleton
          id="skeleton card cta"
          className="relative z-10 mt-4 flex h-4 w-[100px] items-center"
        />
      </div>
      <Skeleton
        id="first column time"
        className="relative z-10 order-first mb-3 mt-1 hidden h-4 w-[130px] items-center md:block"
      />
    </div>
  );
};

const SkeletonCardList = () => {
  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-3xl flex-col space-y-16">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

function Article({ article }: { article: FrontmatterWithFilename }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

const ArticlesList = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: FrontmatterCategories | FrontmatterCategories[] | undefined;
  }>;
}) => {
  const { q } = await searchParams;
  const { articles, error } = await getAllArticles(q);

  if (error) {
    console.error(error);
  }
  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-3xl flex-col space-y-16">
        {articles.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export const SuspendedArticlesList = ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: FrontmatterCategories | FrontmatterCategories[] | undefined;
  }>;
}) => {
  return (
    <Suspense fallback={<SkeletonCardList />}>
      <ArticlesList searchParams={searchParams} />
    </Suspense>
  );
};
