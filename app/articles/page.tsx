import { Metadata } from "next";
import { Suspense } from "react";

import { ArticleCategories } from "@/components/article-categories";
import { ArticleList } from "@/components/article-list";
import { SimpleLayout } from "@/components/simple-layout";
import { FrontmatterCategories } from "@/lib/articles";
import { CATEGORIES } from "@/lib/constants/categories";

type SearchParams = Promise<{
  [key: string]: FrontmatterCategories | FrontmatterCategories[] | undefined;
}>;

export const metadata: Metadata = {
  title: "Articles",
  description:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
};

export default function Articles({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <SimpleLayout
      title="Writing on software development and building for the web"
      intro="All of my long-form thoughts on programming, leadership, product development, and more, collected in chronological order."
    >
      <div className="mb-20 flex flex-row flex-wrap items-center gap-4">
        <h2 className="flex-none font-bold">Filter articles by category:</h2>
        <ArticleCategories categories={CATEGORIES} />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          <Suspense fallback={<div>Loading...</div>}>
            <ArticleList searchParams={searchParams} />
          </Suspense>
          {/* {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))} */}
        </div>
      </div>
    </SimpleLayout>
  );
}
