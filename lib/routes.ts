import type { Route, RouteProperties } from "@/types";

export const ROUTES: Map<Route, RouteProperties> = new Map([
	["projects", { slug: "/projects", title: "projects" }],
	["about", { slug: "/about", title: "about" }],
	["articles", { slug: "/articles", title: "articles" }],
	["uses", { slug: "/uses", title: "uses" }],
	["following", { slug: "/following", title: "following" }],
	["contact", { slug: "/contact", title: "contact" }],
]);
