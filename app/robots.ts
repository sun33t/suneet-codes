import type { MetadataRoute } from "next";

import { baseUrl } from "@/lib/baseUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap-index.xml`,
  };
}
