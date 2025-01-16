import { type Article, allArticles } from "content-collections";

const articlesSortedByDate = allArticles
  .filter((article) => article.isPublished)
  .toSorted((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

export const getArticlesByCategory = ({
  category,
}: {
  category: Article["categories"]["0"] | Article["categories"] | undefined;
}) => {
  const articlesByCategory = category
    ? articlesSortedByDate.filter((article) => {
        if (typeof category === "string") {
          return article.categories.includes(category);
        }
        if (Array.isArray(category)) {
          return category.every((category) =>
            article.categories.includes(category)
          );
        }
      })
    : articlesSortedByDate;
  return articlesByCategory;
};

export const getArticleBySlug = (slug: Article["slug"]) => {
  return (
    allArticles.find(
      (article) => article.slug === slug && article.isPublished
    ) ?? null
  );
};

export const latestArticles = articlesSortedByDate.slice(0, 3);
