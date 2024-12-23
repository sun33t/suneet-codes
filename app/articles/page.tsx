import Link from "next/link";

import { Container } from "@/components/container";
import { getAllArticles } from "@/lib/articles";

export default async function Articles() {
  const { articles, error } = await getAllArticles();

  if (error) {
    console.error(error);
  }
  return (
    <Container id="articles-page-container" className="mt-9">
      <div className="flex items-center justify-center">Articles Page</div>
      {!error ? (
        articles.map((article) => (
          <div key={article.slug}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </div>
        ))
      ) : (
        <div>Failed to load articles</div>
      )}
    </Container>
  );
}
