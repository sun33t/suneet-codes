import type { Article } from "content-collections";
import Link from "next/link";
import { Suspense } from "react";
import { getArticlesByCategory } from "@/lib/content/articles";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/formatDate";
import type { SearchParams } from "@/types";
import {
	LinkCard,
	LinkCardContent,
	LinkCardDescription,
	LinkCardEyebrow,
	LinkCardFooter,
	LinkCardHeader,
	LinkCardLabel,
	LinkCardTitle,
} from "./link-card";
import { buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
	return (
		<div
			className="pt-2 md:grid md:grid-cols-4 md:items-baseline"
			id="skeleton-article-card"
		>
			<div className="group relative flex flex-col items-start md:col-span-3">
				<Skeleton
					className="h-4 w-[200px] sm:w-[350px]"
					id="skeleton card title"
				/>
				<div
					className="relative z-10 order-first mb-3 flex items-center pl-3.5 md:hidden"
					id="skeleton card eyebrow"
				>
					<span className="absolute inset-y-0 left-0 flex items-center">
						<span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
					</span>
					<Skeleton className="h-4 w-[130px]" />
				</div>
				<Skeleton
					className="relative z-10 mt-2 h-4 w-[200px]"
					id="skeleton card description"
				/>
				<Skeleton
					className="relative z-10 mt-4 flex h-4 w-[100px] items-center"
					id="skeleton card cta"
				/>
			</div>
			<Skeleton
				className="relative z-10 order-first mt-1 mb-3 hidden h-4 w-[130px] items-center md:block"
				id="first column time"
			/>
		</div>
	);
};

const SkeletonCardList = () => {
	return (
		<div className="md:border-zinc-100 md:border-l md:pl-6 md:dark:border-zinc-700/40">
			<div className="flex max-w-3xl flex-col space-y-16">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</div>
	);
};

const NoArticlesCard = () => {
	return (
		<LinkCard>
			<LinkCardHeader>
				<LinkCardTitle>No matching articles</LinkCardTitle>
			</LinkCardHeader>
			<LinkCardContent>
				<LinkCardDescription>
					Please try another combination of categories, or clear and try again
				</LinkCardDescription>
			</LinkCardContent>
			<LinkCardFooter>
				<Link
					aria-label="Clear filters"
					className={buttonVariants({ variant: "default", size: "sm" })}
					href="/articles"
				>
					Clear
				</Link>
			</LinkCardFooter>
		</LinkCard>
	);
};

const ArticleCard = ({ article }: { article: Article }) => {
	const formattedDate = formatDate(article.date);
	return (
		<article className="md:grid md:grid-cols-4 md:items-baseline">
			<div className="mt-1 hidden md:block">
				<p className="relative pl-3.5 text-muted-foreground text-sm md:pl-0">
					<time dateTime={article.date}>{formattedDate}</time>
					<span
						aria-hidden="true"
						className="absolute inset-y-0 left-0 flex items-center"
					></span>
				</p>
			</div>
			<LinkCard className="md:col-span-3" href={`/articles/${article.slug}`}>
				<LinkCardHeader>
					<LinkCardEyebrow className="md:hidden">
						<time dateTime={article.date}>{formatDate(article.date)}</time>
					</LinkCardEyebrow>
					<LinkCardTitle>{article.title}</LinkCardTitle>
				</LinkCardHeader>
				<LinkCardContent>
					<LinkCardDescription>{article.description}</LinkCardDescription>
				</LinkCardContent>
				<LinkCardFooter>
					<LinkCardLabel label="Read article" />
				</LinkCardFooter>
			</LinkCard>
		</article>
	);
};

const ArticlesList = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	const { category } = await searchParams;

	const articles = getArticlesByCategory({ category });
	const classes = cn(
		"md:pl-6",
		articles.length > 0 &&
			"md:border-zinc-100 md:border-l md:dark:border-zinc-700/40",
	);

	return (
		<div className={classes}>
			<div className="flex max-w-3xl flex-col space-y-16">
				{articles.length > 0 ? (
					articles.map((article) => (
						<ArticleCard article={article} key={article._meta.path} />
					))
				) : (
					<NoArticlesCard />
				)}
			</div>
		</div>
	);
};

export const SuspendedArticlesList = ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	return (
		<Suspense fallback={<SkeletonCardList />}>
			<ArticlesList searchParams={searchParams} />
		</Suspense>
	);
};
