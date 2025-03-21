"use client";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, memo, useCallback, useMemo } from "react";

import { CATEGORYWITHSLUGS, CATEGORY_PARAM_NAME } from "@/content/categories";

const SkeletonFilter = () => {
  return (
    <div className="mb-20 flex flex-row flex-wrap items-center gap-4">
      <h2 className="flex-none font-bold">Filter articles by category:</h2>
      <div
        id="article-categories"
        aria-label="Article Categories"
        className="my-4 flex flex-row flex-wrap items-center justify-start gap-4"
      >
        <Skeleton className="h-[20px] w-[80px]" />
        <Skeleton className="h-[20px] w-[80px]" />
        <Skeleton className="h-[20px] w-[80px]" />
      </div>
    </div>
  );
};

const ArticlesFilter = memo(() => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParamName = CATEGORY_PARAM_NAME;

  const isFiltered = useMemo(() => {
    return searchParams.size > 0;
  }, [searchParams.size]);

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (params.has(categoryParamName, value)) {
        params.delete(categoryParamName, value);
      } else {
        params.append(categoryParamName, value);
      }

      return params.toString();
    },
    [searchParams, categoryParamName]
  );

  const isSelected = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      return params.has(categoryParamName, value);
    },
    [searchParams, categoryParamName]
  );

  const ClearFilter = memo(() => {
    const router = useRouter();
    return (
      <Button
        size="sm"
        variant="link"
        className="h-0 text-xs underline"
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
  });

  ClearFilter.displayName = "ClearFilter";

  const renderedCategories = useMemo(
    () =>
      CATEGORYWITHSLUGS.map((category) => {
        const selected = isSelected(category.slug);

        return (
          <Link
            scroll={false}
            data-selected={selected}
            key={category.title}
            href={pathname + "?" + createQueryString(category.slug)}
            className="inline-flex items-center rounded-md border-none bg-secondary px-2.5 py-0.5 text-xs font-semibold text-accent-foreground no-underline transition-colors hover:bg-black hover:text-white hover:ring-2 hover:ring-accent-foreground hover:ring-offset-2 focus:outline-none data-[selected=true]:bg-black data-[selected=true]:text-white dark:hover:bg-white dark:hover:text-black dark:data-[selected=true]:bg-white dark:data-[selected=true]:text-black"
          >
            {category.title}
          </Link>
        );
      }),
    [createQueryString, pathname, isSelected]
  );
  return (
    <div className="mb-8 flex max-w-3xl flex-row flex-wrap items-center gap-4">
      <h2 className="flex-none text-base text-muted-foreground">
        Filter by category:
      </h2>
      <div
        id="article-categories"
        aria-label="Article Categories"
        className="my-4 flex flex-row flex-wrap items-center justify-start gap-4"
      >
        {renderedCategories}
        {isFiltered && <ClearFilter />}
      </div>
    </div>
  );
});

ArticlesFilter.displayName = "ArticlesFilter";

export const SuspendedArticlesFilter = () => {
  return (
    <Suspense fallback={<SkeletonFilter />}>
      <ArticlesFilter />
    </Suspense>
  );
};
