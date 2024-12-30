"use client";

import { Button } from "./ui/button";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { CATEGORIES, type CategoryName } from "@/lib/constants";

export const ArticleCategories = ({
  categories,
}: {
  categories: CategoryName[];
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamName = "q";

  const isFiltered = useMemo(() => {
    return searchParams.size > 0;
  }, [searchParams.size]);

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (params.has(searchParamName, value)) {
        params.delete(searchParamName, value);
      } else {
        params.append(searchParamName, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const isSelected = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      return params.has(searchParamName, value);
    },
    [searchParams]
  );

  const ClearFilter = () => {
    const router = useRouter();
    return (
      <Button
        size="sm"
        variant="link"
        className="h-0 text-sm underline"
        disabled={!isFiltered}
        onClick={() =>
          router.push("/articles", {
            scroll: false,
          })
        }
      >
        clear
      </Button>
    );
  };

  const renderedCategories = useMemo(
    () =>
      categories?.map((categoryTitle) => {
        const category = CATEGORIES.get(categoryTitle);
        const selected = category && isSelected(category.slug);

        return category !== undefined ? (
          <Link
            scroll={false}
            data-selected={selected}
            key={category.title}
            href={pathname + "?" + createQueryString(category.slug)}
            className="inline-flex items-center rounded-md border-none bg-secondary px-2.5 py-0.5 text-xs font-semibold text-accent-foreground no-underline transition-colors hover:bg-black hover:text-white hover:ring-2 hover:ring-accent-foreground hover:ring-offset-2 focus:outline-none data-[selected=true]:bg-black data-[selected=true]:text-white dark:hover:bg-white dark:hover:text-black dark:data-[selected=true]:bg-white dark:data-[selected=true]:text-black"
          >
            {category.title}
          </Link>
        ) : null;
      }),
    [categories, createQueryString, pathname, isSelected]
  );
  return (
    <div
      id="article-categories"
      aria-label="Article Categories"
      className="my-4 flex flex-row items-center justify-start gap-4"
    >
      {renderedCategories}
      {isFiltered && <ClearFilter />}
    </div>
  );
};
