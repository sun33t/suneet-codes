import type { SiteContentSeed } from "./types";

/**
 * Default values for the site content global.
 * Note: Rich text fields (bio, myValues, myExperience) require manual entry
 * through the admin panel as they need Lexical editor format.
 */
export const SITE_CONTENT_SEED: Partial<SiteContentSeed> = {
	homepage: {
		shortBio: "Developer based in the UK",
	},
	about: {
		pageTitle: "A little bit about me",
		profileImageAlt:
			"Side profile photo of Suneet on the coast of Iceland at sunset",
	},
	newsletter: {
		title: "Stay up to date",
		description:
			"Get notified when I publish something new, and unsubscribe at any time.",
		buttonText: "Join",
	},
	ui: {
		ctaButtonText: "Let's Talk",
		resumeSectionTitle: "Work",
	},
};
