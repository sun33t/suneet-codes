import { getPayloadClient } from "../get-payload";
import type { Article, Author, Category, Keyword } from "../payload-types";

export type { Article as PayloadArticle } from "../payload-types";

/**
 * Article with populated relationships (full objects instead of IDs)
 */
export type ArticleWithRelations = Omit<
	Article,
	"categories" | "keywords" | "author"
> & {
	categories: Category[];
	keywords: Keyword[];
	author: Author;
};

/**
 * Fetches all articles from Payload CMS, sorted by date descending.
 * Relationships are populated as full objects.
 */
export async function getAllArticles(): Promise<ArticleWithRelations[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "articles",
		sort: "-date",
		limit: 100,
		depth: 1,
	});
	return result.docs as ArticleWithRelations[];
}

/**
 * Fetches only published articles, sorted by date descending.
 * Relationships are populated as full objects.
 */
export async function getPublishedArticles(): Promise<ArticleWithRelations[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "articles",
		where: {
			isPublished: { equals: true },
		},
		sort: "-date",
		limit: 100,
		depth: 1,
	});
	return result.docs as ArticleWithRelations[];
}

/**
 * Fetches a single article by its slug.
 * Returns null if not found or not published.
 */
export async function getArticleBySlug(
	slug: string,
): Promise<ArticleWithRelations | null> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "articles",
		where: {
			slug: { equals: slug },
			isPublished: { equals: true },
		},
		depth: 1,
		limit: 1,
	});
	return (result.docs[0] as ArticleWithRelations) ?? null;
}

/**
 * Fetches published articles filtered by category slug(s).
 * Accepts a single category slug or an array of slugs.
 * When array is provided, articles must have ALL specified categories.
 */
export async function getArticlesByCategory(
	category: string | string[] | undefined,
): Promise<ArticleWithRelations[]> {
	if (!category) {
		return getPublishedArticles();
	}

	const payload = await getPayloadClient();

	// First get the category IDs for the given slugs
	const categorySlugs = Array.isArray(category) ? category : [category];
	const categoriesResult = await payload.find({
		collection: "categories",
		where: {
			slug: { in: categorySlugs },
		},
		limit: categorySlugs.length,
	});

	const categoryIds = categoriesResult.docs.map((cat) => cat.id);

	if (categoryIds.length === 0) {
		return [];
	}

	// Build the where clause to match ALL categories
	const result = await payload.find({
		collection: "articles",
		where: {
			and: [
				{ isPublished: { equals: true } },
				...categoryIds.map((id) => ({
					categories: { contains: id },
				})),
			],
		},
		sort: "-date",
		limit: 100,
		depth: 1,
	});

	return result.docs as ArticleWithRelations[];
}

/**
 * Fetches the latest N published articles for homepage display.
 */
export async function getLatestArticles(
	count = 3,
): Promise<ArticleWithRelations[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "articles",
		where: {
			isPublished: { equals: true },
		},
		sort: "-date",
		limit: count,
		depth: 1,
	});
	return result.docs as ArticleWithRelations[];
}

/**
 * Fetches all published article slugs for generateStaticParams.
 */
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "articles",
		where: {
			isPublished: { equals: true },
		},
		limit: 100,
		depth: 0,
	});
	return result.docs.map((article) => ({ slug: article.slug }));
}
