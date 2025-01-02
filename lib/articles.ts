import { type Article, allArticles } from "content-collections";

export const getArticlesByCategory = ({
  category,
}: {
  category: Article["categories"]["0"] | Article["categories"] | undefined;
}) => {
  const articlesByCategory = category
    ? allArticles.filter((article) => {
        if (typeof category === "string") {
          return article.categories.includes(category);
        }
        if (Array.isArray(category)) {
          return category.every((category) =>
            article.categories.includes(category)
          );
        }
      })
    : allArticles;
  return articlesByCategory;
};

export const getArticleByFilename = (filename: Article["_meta"]["path"]) => {
  return allArticles.find((article) => article._meta.path === filename);
};

// TODO method for retriving the last 3 articles for the homepage

export const latestArticles = allArticles
  .toSorted((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  })
  .slice(0, 3);
