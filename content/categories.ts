import slugify from "slugify";

// CATEGORYTITLES determines the validation schama for category tags within article frontmatter, as well as forming the source for slugs in the CATEGORYWITHSLUGS array. This is the single source of truth for legal categories throughout the application.
export const CATEGORYTITLES = [
  "aws",
  "react",
  "javascript",
  "leadership",
  "another category",
] as const;

type CategorytitleWithSlug = {
  title: (typeof CATEGORYTITLES)[number];
  slug: string;
};

export const CATEGORYWITHSLUGS: CategorytitleWithSlug[] = CATEGORYTITLES.map(
  (title) => ({
    title,
    slug: slugify(title, { lower: true }),
  })
);

export const CATEGORY_PARAM_NAME = "category";
