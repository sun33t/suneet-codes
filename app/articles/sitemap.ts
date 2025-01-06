import { allArticles } from "content-collections";
import { MetadataRoute } from "next";

import { getArticleByFilename } from "@/lib/articles";
import { baseUrl } from "@/lib/baseUrl";

export async function generateSitemaps() {
  const ids = allArticles.map((article) => ({ id: article._meta.path }));

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
  const article = await getArticleByFilename(id);

  if (!article) {
    return [];
  }

  return [
    {
      url: `${baseUrl}/${id}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
