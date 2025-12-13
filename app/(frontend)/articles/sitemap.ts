import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/config/baseUrl";
import {
	getAllArticleSlugs,
	getArticleBySlug,
} from "@/lib/payload/queries/articles";

export async function generateSitemaps() {
	const slugs = await getAllArticleSlugs();

	if (!slugs.length) {
		return [];
	}
	return slugs.map((s) => ({ id: s.slug }));
}

export default async function sitemap({
	id,
}: {
	id: string;
}): Promise<MetadataRoute.Sitemap> {
	const article = await getArticleBySlug(id);
	const url = new URL(id, baseUrl);

	if (!article) {
		return [];
	}

	return [
		{
			url: url.href,
			lastModified: article.updatedAt ? new Date(article.updatedAt) : undefined,
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
