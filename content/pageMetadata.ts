import type { Metadata } from "next";

import { env } from "@/app/env";
import type { Route } from "@/types";

export const PAGE_METADATA: Record<Route, Metadata> = {
	about: {
		title: "about",
		description: `I'm ${env.PROJECT_AUTHOR} - a developer working from ${env.PROJECT_AUTHOR_LOCATION}.`,
		openGraph: {
			title: `about | ${env.PROJECT_BASE_TITLE}`,
			description: `I'm ${env.PROJECT_AUTHOR} - a developer working from ${env.PROJECT_AUTHOR_LOCATION}.`,
		},
	},
	articles: {
		title: "articles",
		description:
			"My notes on programming, leadership and mentoring, product design/development, and more.",
		openGraph: {
			title: `articles | ${env.PROJECT_BASE_TITLE}`,
			description: `My notes on programming, leadership and mentoring, product design/development, and more.`,
		},
	},
	projects: {
		title: "projects",
		description: "Projects that I've built.",
		openGraph: {
			title: `projects | ${env.PROJECT_BASE_TITLE}`,
			description: `Projects that I've built.`,
		},
	},
	following: {
		title: "following",
		description: "Developers and creative professionals whose work I follow.",
		openGraph: {
			title: `following | ${env.PROJECT_BASE_TITLE}`,
			description: `Developers and creative professionals whose work I follow.`,
		},
	},
	uses: {
		title: "uses",
		description: "What I use.",
		openGraph: {
			title: `uses | ${env.PROJECT_BASE_TITLE}`,
			description: `What I use.`,
		},
	},
	contact: {
		title: "contact",
		description: "Tell me about your project.",
		openGraph: {
			title: `contact | ${env.PROJECT_BASE_TITLE}`,
			description: `Tell me about your project.`,
		},
	},
	"thank-you": {
		title: "thank you",
		description: "Thanks for getting in touch",
		openGraph: {
			title: `thank you | ${env.PROJECT_BASE_TITLE}`,
			description: `Thanks for getting in touch`,
		},
	},
};
