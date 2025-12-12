import type { Metadata } from "next";
import { getPayloadClient } from "../get-payload";
import type { PageMetadata } from "../globals/fields/metadata-fields";
import type {
	AboutPage,
	ArticlesPage,
	ContactPage,
	FollowingPage,
	ProjectsPage,
	ThankYouPage,
	UsesPage,
} from "../payload-types";

// Type exports for consumers
export type {
	AboutPage as PayloadAboutPage,
	ArticlesPage as PayloadArticlesPage,
	ContactPage as PayloadContactPage,
	FollowingPage as PayloadFollowingPage,
	ProjectsPage as PayloadProjectsPage,
	ThankYouPage as PayloadThankYouPage,
	UsesPage as PayloadUsesPage,
} from "../payload-types";

// Query functions
export async function getAboutPage(): Promise<AboutPage> {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "about-page" });
}

export async function getArticlesPage(): Promise<ArticlesPage> {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "articles-page" });
}

export async function getContactPage(): Promise<ContactPage> {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "contact-page" });
}

export async function getFollowingPage(): Promise<FollowingPage> {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "following-page" });
}

export async function getProjectsPage(): Promise<ProjectsPage> {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "projects-page" });
}

export async function getThankYouPage(): Promise<ThankYouPage> {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "thank-you-page" });
}

export async function getUsesPage(): Promise<UsesPage> {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "uses-page" });
}

// Re-export PageMetadata type for consumers
export type { PageMetadata } from "../globals/fields/metadata-fields";

/**
 * Converts Payload page metadata to Next.js Metadata format.
 * Falls back to page title/description if OG values are not set.
 */
export function toNextMetadata(metadata: PageMetadata): Metadata {
	return {
		title: metadata.title ?? undefined,
		description: metadata.description ?? undefined,
		openGraph: {
			title: metadata.openGraph?.title ?? metadata.title ?? undefined,
			description:
				metadata.openGraph?.description ?? metadata.description ?? undefined,
		},
	};
}
