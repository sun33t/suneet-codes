import type {
	RequiredDataFromCollection,
	RequiredDataFromCollectionSlug,
} from "payload";

import type {
	AboutPage,
	ArticlesPage,
	ContactPage,
	FollowingPage,
	ProjectsPage,
	SiteContent,
	ThankYouPage,
	UsesPage,
} from "../payload-types";

/** Seed type for projects - makes id, createdAt, updatedAt optional */
export type ProjectSeed = RequiredDataFromCollectionSlug<"projects">;

/** Seed type for roles - makes id, createdAt, updatedAt optional */
export type RoleSeed = RequiredDataFromCollectionSlug<"roles">;

/** Seed type for testimonials - makes id, createdAt, updatedAt optional */
export type TestimonialSeed = RequiredDataFromCollectionSlug<"testimonials">;

/** Seed type for uses - makes id, createdAt, updatedAt optional */
export type UseSeed = RequiredDataFromCollectionSlug<"uses">;

/** Seed type for services - makes id, createdAt, updatedAt optional */
export type ServiceSeed = RequiredDataFromCollectionSlug<"services">;

/** Seed type for following - makes id, createdAt, updatedAt optional */
export type FollowingSeed = RequiredDataFromCollectionSlug<"following">;

/** Seed type for categories - makes id, createdAt, updatedAt optional */
export type CategorySeed = RequiredDataFromCollectionSlug<"categories">;

/** Seed type for articles - makes id, createdAt, updatedAt optional */
export type ArticleSeed = RequiredDataFromCollectionSlug<"articles">;

/** Seed type for site content global - makes id, createdAt, updatedAt optional */
export type SiteContentSeed = RequiredDataFromCollection<SiteContent>;

/** Seed type for about page global */
export type AboutPageSeed = RequiredDataFromCollection<AboutPage>;

/** Seed type for articles page global */
export type ArticlesPageSeed = RequiredDataFromCollection<ArticlesPage>;

/** Seed type for contact page global */
export type ContactPageSeed = RequiredDataFromCollection<ContactPage>;

/** Seed type for following page global */
export type FollowingPageSeed = RequiredDataFromCollection<FollowingPage>;

/** Seed type for projects page global */
export type ProjectsPageSeed = RequiredDataFromCollection<ProjectsPage>;

/** Seed type for thank you page global */
export type ThankYouPageSeed = RequiredDataFromCollection<ThankYouPage>;

/** Seed type for uses page global */
export type UsesPageSeed = RequiredDataFromCollection<UsesPage>;
