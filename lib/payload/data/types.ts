import type {
	RequiredDataFromCollection,
	RequiredDataFromCollectionSlug,
} from "payload";

import type { SiteContent } from "../payload-types";

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

/** Seed type for site content global - makes id, createdAt, updatedAt optional */
export type SiteContentSeed = RequiredDataFromCollection<SiteContent>;
