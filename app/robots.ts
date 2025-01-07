import type { MetadataRoute } from "next";

import { baseUrl } from "@/lib/baseUrl";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = new URL("sitemap-index.xml", baseUrl);
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: sitemapUrl.href,
  };
}
