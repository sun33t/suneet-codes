import { Card } from "./card";

import { Fragment } from "react";

import {
  FrontmatterCategories,
  FrontmatterWithFilename,
  getAllArticles,
} from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

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

export const ArticleList = async ({
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
    <Fragment>
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </Fragment>
  );
};
