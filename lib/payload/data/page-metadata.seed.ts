import type {
	AboutPageSeed,
	ArticlesPageSeed,
	ContactPageSeed,
	FollowingPageSeed,
	ProjectsPageSeed,
	ThankYouPageSeed,
	UsesPageSeed,
} from "./types";

export const ABOUT_PAGE_SEED: Partial<AboutPageSeed> = {
	metadata: {
		title: "about",
		description: "I'm Suneet - a developer working from the UK.",
		openGraph: {
			title: "about | suneet.codes",
			description: "I'm Suneet - a developer working from the UK.",
		},
	},
};

export const ARTICLES_PAGE_SEED: Partial<ArticlesPageSeed> = {
	metadata: {
		title: "articles",
		description:
			"My notes on programming, leadership and mentoring, product design/development, and more.",
		openGraph: {
			title: "articles | suneet.codes",
			description:
				"My notes on programming, leadership and mentoring, product design/development, and more.",
		},
	},
};

export const PROJECTS_PAGE_SEED: Partial<ProjectsPageSeed> = {
	metadata: {
		title: "projects",
		description: "Projects that I've built.",
		openGraph: {
			title: "projects | suneet.codes",
			description: "Projects that I've built.",
		},
	},
};

export const FOLLOWING_PAGE_SEED: Partial<FollowingPageSeed> = {
	metadata: {
		title: "following",
		description: "Developers and creative professionals whose work I follow.",
		openGraph: {
			title: "following | suneet.codes",
			description: "Developers and creative professionals whose work I follow.",
		},
	},
};

export const USES_PAGE_SEED: Partial<UsesPageSeed> = {
	metadata: {
		title: "uses",
		description: "What I use.",
		openGraph: {
			title: "uses | suneet.codes",
			description: "What I use.",
		},
	},
};

export const CONTACT_PAGE_SEED: Partial<ContactPageSeed> = {
	metadata: {
		title: "contact",
		description: "Tell me about your project.",
		openGraph: {
			title: "contact | suneet.codes",
			description: "Tell me about your project.",
		},
	},
};

export const THANK_YOU_PAGE_SEED: Partial<ThankYouPageSeed> = {
	metadata: {
		title: "thank you",
		description: "Thanks for getting in touch",
		openGraph: {
			title: "thank you | suneet.codes",
			description: "Thanks for getting in touch",
		},
	},
};
