import {
  LinkCard,
  LinkCardContent,
  LinkCardDescription,
  LinkCardEyebrow,
  LinkCardFooter,
  LinkCardHeader,
  LinkCardLabel,
  LinkCardTitle,
} from "./link-card";
import { Skeleton } from "./ui/skeleton";

import { type Article } from "content-collections";
import { Suspense } from "react";

import { getArticlesByCategory } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
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

const NoArticlesWrittenCard = () => {
  return (
    <LinkCard className="h-full">
      <LinkCardHeader>
        <LinkCardTitle>Articles Coming Soon</LinkCardTitle>
      </LinkCardHeader>
      <LinkCardContent>
        <LinkCardDescription>
          {`They're on the way, I just need to rewrite them so that they make sense to anyone other than myself.`}
        </LinkCardDescription>
      </LinkCardContent>
    </LinkCard>
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
      <LinkCard
        href={`/articles/${article._meta.path}`}
        className="md:col-span-3"
      >
        <LinkCardHeader>
          <LinkCardEyebrow className="md:hidden">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </LinkCardEyebrow>
          <LinkCardTitle>{article.title}</LinkCardTitle>
        </LinkCardHeader>
        <LinkCardContent>
          <LinkCardDescription>{article.description}</LinkCardDescription>
        </LinkCardContent>
        <LinkCardFooter>
          <LinkCardLabel label="Read article" />
        </LinkCardFooter>
      </LinkCard>
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
  const classes = cn(
    "md:pl-6",
    articles.length > 0 &&
      "md:border-l md:border-zinc-100  md:dark:border-zinc-700/40"
  );

  return (
    <div className={classes}>
      <div className="flex max-w-3xl flex-col space-y-16">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article._meta.path} article={article} />
          ))
        ) : (
          <NoArticlesWrittenCard />
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
