import slugify from "slugify";
import { CATEGORYTITLES } from "@/lib/payload/data";

// Re-export CATEGORYTITLES for backwards compatibility
// The source of truth is now lib/payload/data/categories.seed.ts
export { CATEGORYTITLES };

type CategoryTitleWithSlug = {
	title: (typeof CATEGORYTITLES)[number];
	slug: string;
};

export const CATEGORYWITHSLUGS: CategoryTitleWithSlug[] =
	CATEGORYTITLES.toSorted().map((title) => ({
		title,
		slug: slugify(title, { lower: true, trim: true, strict: true }),
	}));

export const CATEGORY_PARAM_NAME = "category";
