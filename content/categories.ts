import slugify from "slugify";

// CATEGORYTITLES determines the validation schema for category tags within article frontmatter, as well as forming the source for slugs in the CATEGORYWITHSLUGS array. This is the single source of truth for legal categories throughout the application.
export const CATEGORYTITLES = [
  "node",
  "code-quality",
  "typescript",
  "deno",
] as const;

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
