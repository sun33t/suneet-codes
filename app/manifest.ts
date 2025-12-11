import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/config/baseUrl";
import { env } from "@/lib/config/env";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: env.PROJECT_BASE_TITLE,
		short_name: env.PROJECT_BASE_TITLE,
		description: env.PROJECT_BASE_DESCRIPTION,
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
