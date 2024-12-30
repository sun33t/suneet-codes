import { Metadata } from "next";

import { ArticleCategories } from "@/components/article-categories";
import { Card } from "@/components/card";
import { SimpleLayout } from "@/components/simple-layout";
import {
  type FrontmatterCategories,
  type FrontmatterWithFilename,
  getAllArticles,
} from "@/lib/articles";
import { CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/formatDate";

type SearchParams = Promise<{
  [key: string]: FrontmatterCategories | FrontmatterCategories[] | undefined;
}>;

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
export const metadata: Metadata = {
  title: "Articles",
  description:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
};

export default async function Articles({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;
  const { articles, error } = await getAllArticles(q);

  if (error) {
    console.error(error);
  }
  return (
    <SimpleLayout
      title="Writing on software development and building for the web"
      intro="All of my long-form thoughts on programming, leadership, product development, and more, collected in chronological order."
    >
      <div className="mb-20 flex flex-row flex-wrap items-center gap-4">
        <h2 className="flex-none font-bold">Filter articles by category:</h2>
        <ArticleCategories
          categories={[...CATEGORIES.values().map((value) => value.title)]}
        />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
