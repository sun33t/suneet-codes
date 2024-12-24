import { Badge } from "./ui/badge";

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
          <Badge key={category.title} className={category.className}>
            {category.title}
          </Badge>
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
