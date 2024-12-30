import Link from "next/link";
import { useMemo } from "react";

import { CATEGORIES, type CategoryName } from "@/lib/constants";

export const ArticleCategories = ({
  categories,
}: {
  categories: CategoryName[];
}) => {
  const renderedCategories = useMemo(
    () =>
      categories?.map((categoryTitle) => {
        const category = CATEGORIES.get(categoryTitle);
        return category !== undefined ? (
          <Link
            key={category.title}
            href={`/articles?q=${category.slug}`}
            className="inline-flex items-center rounded-md border-none bg-secondary px-2.5 py-0.5 text-xs font-semibold text-accent-foreground no-underline transition-colors hover:ring-2 hover:ring-accent-foreground hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-accent-foreground focus:ring-offset-2"
          >
            {category.title}
          </Link>
        ) : null;
      }),
    [categories]
  );
  return (
    <div
      id="article-categories"
      aria-label="Article Categories"
      className="my-4 flex flex-row items-center justify-center gap-4"
    >
      {renderedCategories}
    </div>
  );
};
