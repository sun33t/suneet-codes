const ARTICLE_FILENAME_PREFIX_LENGTH = 5; // length of the `XXXX-` prefix in the filename

export const createArticleSlug = (path: string) => {
  const prefix = path.slice(0, ARTICLE_FILENAME_PREFIX_LENGTH);

  if (!prefix.match(/^\d{4}-/)) {
    throw new Error(
      `Invalid article filename format: ${path}. Expected pattern: XXXX-*.mdx`
    );
  }

  return path.substring(ARTICLE_FILENAME_PREFIX_LENGTH);
};
