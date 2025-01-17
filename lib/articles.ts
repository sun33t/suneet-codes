import { type Article, allArticles } from "content-collections";

const articlesSortedByDate = allArticles
  .filter((article) => article.isPublished)
  .toSorted((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

export const getPublishedArticles = async () => {
  return await allArticles.filter((article) => article.isPublished);
};

export const getPublishedArticleSlugs = async () => {
  return (await getPublishedArticles()).map((article) => ({
    slug: article.slug,
  }));
};

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

export const getArticleBySlug = async (slug: Article["slug"]) => {
  return await (allArticles.find(
    (article) => article.slug === slug && article.isPublished
  ) ?? null);
};

export const latestArticles = articlesSortedByDate.slice(0, 3);
