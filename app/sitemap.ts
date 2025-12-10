import type { MetadataRoute } from "next";

import { baseUrl } from "@/lib/baseUrl";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: baseUrl.href,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: new URL("about", baseUrl).href,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: new URL("articles", baseUrl).href,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: new URL("projects", baseUrl).href,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: new URL("following", baseUrl).href,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: new URL("uses", baseUrl).href,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: new URL("contact", baseUrl).href,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];
}
