import type { SiteConfigSeed } from "./types";

/**
 * Default values for the site config global.
 */
export const SITE_CONFIG_SEED: Partial<SiteConfigSeed> = {
	siteOwner: "Suneet Misra",
	siteTitle: "suneet.codes",
	siteDescription: "A web based portfolio of work",
	socialLinks: {
		github: "https://github.com/sun33t",
		linkedin: "https://linkedin.com/in/suneetmisra",
		bluesky: "https://bsky.app/profile/suneet.codes",
		notion:
			"https://tidy-marquess-a52.notion.site/Suneet-Misra-182158716429804bb0b2f2c574ae4214",
	},
	contact: {
		email: "hello@suneet.codes",
		calendarUrl: "https://calendar.notion.so/meet/suneetmisra/ni17z4luz",
	},
};
