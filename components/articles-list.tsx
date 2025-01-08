import { buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

import { type Article } from "content-collections";
import Link from "next/link";
import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticlesByCategory } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import { type SearchParams } from "@/types";

const SkeletonCard = () => {
  return (
    <div
      className="pt-2 md:grid md:grid-cols-4 md:items-baseline"
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

const ArticleCard = ({ article }: { article: Article }) => {
  const formattedDate = formatDate(article.date);
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <div className="mt-1 hidden md:block">
        <p className="relative pl-3.5 text-sm text-muted-foreground md:pl-0">
          <time dateTime={article.date}>{formattedDate}</time>
          <span
            className="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
          ></span>
        </p>
      </div>
      <Card className="group relative border-none bg-transparent text-foreground shadow-none md:col-span-3">
        <div className="absolute -inset-x-4 -bottom-0 -top-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 md:-top-4 dark:bg-zinc-800/50" />
        <Link href={`/articles/${article._meta.path}`}>
          <span className="absolute -inset-x-4 -bottom-0 -top-6 sm:-inset-x-6 sm:rounded-2xl md:-top-4" />
          <span className="relative z-10">
            <CardHeader className="space-y-3 p-0">
              <p className="relative pl-3.5 text-sm text-muted-foreground md:hidden">
                <time dateTime={article.date}>{formattedDate}</time>
                <span
                  className="absolute inset-y-0 left-0 flex items-center"
                  aria-hidden="true"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                </span>
              </p>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription
                id="card-description"
                aria-label={`About ${article.title}`}
              >
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pl-0 pt-4">
              <p className="text-sm text-accent-foreground">{`Read article >`}</p>
            </CardFooter>
          </span>
        </Link>
      </Card>
    </article>
  );
};

const ArticlesList = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { category } = await searchParams;

  const articles = getArticlesByCategory({ category });

  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-3xl flex-col space-y-10">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article._meta.path} article={article} />
          ))
        ) : (
          <Card className="bg-transparent shadow-none">
            <CardHeader>
              <CardTitle>No matching articles</CardTitle>
              <CardDescription>
                Please try another combination of categories, or clear and try
                again.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/articles"
                className={buttonVariants({ variant: "default", size: "sm" })}
                aria-label="Clear filters"
              >
                Clear
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export const SuspendedArticlesList = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  return (
    <Suspense fallback={<SkeletonCardList />}>
      <ArticlesList searchParams={searchParams} />
    </Suspense>
  );
};
