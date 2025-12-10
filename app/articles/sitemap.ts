import type { MetadataRoute } from "next";

import { allPublishedArticles, getArticleBySlug } from "@/lib/articles";
import { baseUrl } from "@/lib/baseUrl";

export async function generateSitemaps() {
	const ids = allPublishedArticles.map((article) => ({
		id: article.slug,
	}));

	if (!ids.length) {
		return [];
	}
	return ids;
}

export default async function sitemap({
	id,
}: {
	id: string;
}): Promise<MetadataRoute.Sitemap> {
	const article = getArticleBySlug(id);
	const url = new URL(id, baseUrl);

	if (!article) {
		return [];
	}

	return [
		{
			url: url.href,
			lastModified: new Date(article.updatedAt),
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
