import { Badge } from "./ui/badge";

import clsx from "clsx";

export const ArticleCategories = ({ categories }: { categories: string[] }) => {
  const cn = (category: string) =>
    clsx({
      "bg-red-400 text-white dark:bg-red-200 dark:text-black":
        category === "react",
      "bg-green-400 text-white dark:bg-green-200 dark:text-black":
        category === "aws",
      "bg-yellow-400 dark:bg-yellow-200 text-black": category === "javascript",
    });
  return (
    <div
      id="article-categories"
      className="my-4 flex flex-row items-center justify-center gap-4"
    >
      {categories?.map((category) => (
        <Badge key={category} className={cn(category)}>
          {category}
        </Badge>
      ))}
      {/* <Badge className="bg-red-600 text-white dark:bg-red-200 dark:text-black">
        react
      </Badge>
      <Badge className="bg-green-600 text-white dark:bg-green-200 dark:text-black">
        aws
      </Badge> */}
    </div>
  );
};
