"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, Suspense, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { CategoryWithSlug } from "@/lib/payload/queries";

const CATEGORY_PARAM_NAME = "category";

type ArticlesFilterProps = {
	categories: CategoryWithSlug[];
};

const SkeletonFilter = () => {
	return (
		<div className="mb-20 flex flex-row flex-wrap items-center gap-4">
			<h2 className="flex-none font-bold">Filter articles by category:</h2>
			<div
				className="my-4 flex flex-row flex-wrap items-center justify-start gap-4"
				id="article-categories"
			>
				<Skeleton className="h-[20px] w-[80px]" />
				<Skeleton className="h-[20px] w-[80px]" />
				<Skeleton className="h-[20px] w-[80px]" />
			</div>
		</div>
	);
};

const ArticlesFilter = memo(({ categories }: ArticlesFilterProps) => {
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
		[searchParams, categoryParamName],
	);

	const isSelected = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString());

			return params.has(categoryParamName, value);
		},
		[searchParams, categoryParamName],
	);

	const ClearFilter = memo(() => {
		const router = useRouter();
		return (
			<Button
				className="h-0 text-xs underline"
				disabled={!isFiltered}
				onClick={() =>
					router.push("/articles", {
						scroll: false,
					})
				}
				size="sm"
				variant="link"
			>
				clear
			</Button>
		);
	});

	ClearFilter.displayName = "ClearFilter";

	const renderedCategories = useMemo(
		() =>
			categories.map((category) => {
				const selected = isSelected(category.slug);

				return (
					<Link
						className="inline-flex items-center rounded-md border-none bg-secondary px-2.5 py-0.5 font-semibold text-accent-foreground text-xs no-underline transition-colors hover:bg-black hover:text-white hover:ring-2 hover:ring-accent-foreground hover:ring-offset-2 focus:outline-none data-[selected=true]:bg-black data-[selected=true]:text-white dark:data-[selected=true]:bg-white dark:data-[selected=true]:text-black dark:hover:bg-white dark:hover:text-black"
						data-selected={selected}
						href={`${pathname}?${createQueryString(category.slug)}`}
						key={category.title}
						scroll={false}
					>
						{category.title}
					</Link>
				);
			}),
		[categories, createQueryString, pathname, isSelected],
	);
	return (
		<div className="mb-8 flex max-w-3xl flex-row flex-wrap items-center gap-4">
			<h2 className="flex-none text-base text-muted-foreground">
				Filter by category:
			</h2>
			<div
				className="my-4 flex flex-row flex-wrap items-center justify-start gap-4"
				id="article-categories"
			>
				{renderedCategories}
				{isFiltered && <ClearFilter />}
			</div>
		</div>
	);
});

ArticlesFilter.displayName = "ArticlesFilter";

export const SuspendedArticlesFilter = ({
	categories,
}: ArticlesFilterProps) => {
	return (
		<Suspense fallback={<SkeletonFilter />}>
			<ArticlesFilter categories={categories} />
		</Suspense>
	);
};
