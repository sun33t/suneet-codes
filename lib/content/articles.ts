import { type Article, allArticles } from "content-collections";

export const allPublishedArticles = allArticles.filter(
	(article) => article.isPublished,
);

const articlesSortedByDate = allPublishedArticles.toSorted((a, b) => {
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
					return category.every((cat) => article.categories.includes(cat));
				}
				return false;
			})
		: articlesSortedByDate;
	return articlesByCategory;
};

export const getArticleBySlug = (slug: Article["slug"]) => {
	return allPublishedArticles.find((article) => article.slug === slug) ?? null;
};

export const latestArticles = articlesSortedByDate.slice(0, 3);
