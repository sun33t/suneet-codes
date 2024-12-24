import { Badge } from "./ui/badge";

import { CATEGORIES, type CategoryName } from "@/lib/constants";

export const ArticleCategories = ({
  categories,
}: {
  categories: CategoryName[];
}) => {
  return (
    <div
      id="article-categories"
      className="my-4 flex flex-row items-center justify-center gap-4"
    >
      {categories?.map((categoryTitle) => {
        const category = CATEGORIES.get(categoryTitle);
        return category !== undefined ? (
          <Badge key={category.title} className={category.className}>
            {category.title}
          </Badge>
        ) : null;
      })}
    </div>
  );
};
