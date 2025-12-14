import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/config/baseUrl";
import { getSiteConfig } from "@/lib/payload/queries";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const siteConfig = await getSiteConfig();

	return {
		name: siteConfig.siteTitle,
		short_name: siteConfig.siteTitle,
		description: siteConfig.siteDescription,
		orientation: "portrait",
		start_url: "/",
		display: "standalone",
		icons: [
			{
				src: "/apple-icon.png",
				sizes: "any",
				type: "image/png",
			},
		],
		categories: [
			"software",
			"development",
			"app development",
			"developer",
			"software engineering",
			"web development",
			"programming",
			"coding",
			"web design",
		],
		scope: baseUrl.href,
		shortcuts: [
			{
				name: "About",
				url: "/about",
			},
			{
				name: "Articles",
				url: "/articles",
			},
			{
				name: "Contact",
				url: "/contact",
			},
			{
				name: "Projects",
				url: "/projects",
			},
		],
	};
}
