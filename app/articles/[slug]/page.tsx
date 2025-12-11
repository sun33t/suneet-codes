import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCldImageUrl } from "next-cloudinary";

import { env } from "@/app/env";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { allPublishedArticles, getArticleBySlug } from "@/lib/content/articles";
import { formatDate } from "@/lib/utils/formatDate";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const slugs = allPublishedArticles.map((article) => ({
		slug: article.slug,
	}));

	return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route params
	const slug = (await params).slug;
	const article = getArticleBySlug(slug);

	if (!article) {
		notFound();
	}
	const ogImageUrl = getCldImageUrl({
		width: 960,
		height: 600,
		src: withCloudinaryCloudName(`articles/${article.coverImage}`),
	});

	return {
		title: `${article.title}`,
		description: article.description,
		keywords: [...article.keywords],
		authors: [{ name: article.author }],
		openGraph: {
			images: [ogImageUrl],
			title: article.title,
			description: article.description,
			url: `/articles/${slug}`,
			type: "article",
			authors: article.author,
			tags: article.categories,
			locale: "en-GB",
			siteName: env.PROJECT_BASE_TITLE,
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const articleFrontmatter = getArticleBySlug(slug);

	if (!articleFrontmatter) {
		notFound();
	}
	const { default: Article } = await import(
		`@/content/articles/${articleFrontmatter?._meta.fileName}`
	);

	return (
		<Container
			className="fade-in mt-16 animate-in duration-1000"
			id="mdx-layout-container"
		>
			<div className="lg:relative">
				<div className="mx-auto max-w-2xl">
					<BackButton />
					{articleFrontmatter && (
						<article>
							<div className="prose prose-base dark:prose-invert mx-auto mt-8 prose-code:rounded-sm prose-img:rounded-xl prose-code:bg-yellow-200/60 prose-code:px-1 prose-a:text-accent-foreground prose-a:no-underline prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-pink-600/50">
								<header className="flex flex-col">
									<h1 className="mt-6 flex">{articleFrontmatter.title}</h1>
									<div className="order-first flex items-center justify-start gap-2 text-sm text-zinc-400 dark:text-zinc-500">
										<time
											className="flex items-center"
											dateTime={articleFrontmatter.date}
										>
											<span className="h-4 w-0.5 rounded-full" />
											<span className="ml-3">
												{formatDate(articleFrontmatter.date)}
											</span>
										</time>
										<span> - </span>
										<Link href="/about">{articleFrontmatter.author}</Link>
									</div>
									<div className="mb-4 flex flex-row flex-wrap items-center justify-start gap-4">
										{articleFrontmatter.categories.map((category) => {
											return (
												<div
													className="inline-flex rounded-md border-none bg-secondary px-2.5 py-0.5 font-semibold text-xs"
													key={category}
												>
													{category}
												</div>
											);
										})}
									</div>
								</header>
								<Article />
							</div>
						</article>
					)}
				</div>
			</div>
		</Container>
	);
}
