import { type Article, allArticles } from "content-collections";

const articlesSortedByDate = allArticles.toSorted((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  return dateB.getTime() - dateA.getTime();
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

export const getArticleByFilename = (filename: Article["_meta"]["path"]) => {
  return allArticles.find((article) => article._meta.path === filename);
};

export const latestArticles = articlesSortedByDate.slice(0, 3);
