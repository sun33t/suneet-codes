import { getPayloadClient } from "../get-payload";
import type { Category } from "../payload-types";

export type { Category as PayloadCategory } from "../payload-types";

export type CategoryWithSlug = {
	title: string;
	slug: string;
};

/**
 * Fetches all categories from Payload CMS, sorted alphabetically by title.
 */
export async function getAllCategories(): Promise<Category[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "categories",
		sort: "title",
		limit: 100,
	});
	return result.docs;
}

/**
 * Returns categories formatted for the article filter UI.
 * Equivalent to the previous CATEGORYWITHSLUGS constant.
 */
export async function getCategoriesWithSlugs(): Promise<CategoryWithSlug[]> {
	const categories = await getAllCategories();
	return categories.map((c) => ({
		title: c.title,
		slug: c.slug,
	}));
}
