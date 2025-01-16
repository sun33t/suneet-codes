import { allArticles } from "content-collections";
import { MetadataRoute } from "next";

import { getArticleBySlug } from "@/lib/articles";
import { baseUrl } from "@/lib/baseUrl";

export async function generateSitemaps() {
  const ids = allArticles
    .filter((article) => article.isPublished)
    .map((article) => ({ id: article.slug }));

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
  const article = await getArticleBySlug(id);
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
