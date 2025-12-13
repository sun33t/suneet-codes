import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCldImageUrl } from "next-cloudinary";
import { Container } from "@/components/layout/container";
import { SuspendedArticleImage } from "@/components/shared/article-image";
import { BackButton } from "@/components/shared/back-button";
import { env } from "@/lib/config/env";
import { ArticleRichText } from "@/lib/payload/lexical/article-rich-text";
import {
	getAllArticleSlugs,
	getArticleBySlug,
} from "@/lib/payload/queries/articles";
import { formatDate } from "@/lib/utils/formatDate";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const slugs = await getAllArticleSlugs();
	return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = (await params).slug;
	const article = await getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	const ogImageUrl = getCldImageUrl({
		width: 960,
		height: 600,
		src: withCloudinaryCloudName(`articles/${article.coverImage}`),
	});

	// Extract keywords from the keywords relationship
	const keywords = article.keywords?.map((k) => k.name) ?? [];

	// Extract category titles from populated categories
	const categoryTitles = article.categories.map((cat) => cat.title);

	return {
		title: `${article.title}`,
		description: article.description,
		keywords,
		authors: [{ name: article.author }],
		openGraph: {
			images: [ogImageUrl],
			title: article.title,
			description: article.description,
			url: `/articles/${slug}`,
			type: "article",
			authors: article.author,
			tags: categoryTitles,
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

	const article = await getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	return (
		<Container
			className="fade-in mt-16 animate-in duration-1000"
			id="article-layout-container"
		>
			<div className="lg:relative">
				<div className="mx-auto max-w-2xl">
					<BackButton />
					<article>
						<div className="prose prose-base dark:prose-invert mx-auto mt-8 prose-code:rounded-sm prose-img:rounded-xl prose-code:bg-yellow-200/60 prose-code:px-1 prose-a:text-accent-foreground prose-a:no-underline prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-pink-600/50">
							<header className="flex flex-col">
								<h1 className="mt-6 flex">{article.title}</h1>
								<div className="order-first flex items-center justify-start gap-2 text-sm text-zinc-400 dark:text-zinc-500">
									<time className="flex items-center" dateTime={article.date}>
										<span className="h-4 w-0.5 rounded-full" />
										<span className="ml-3">{formatDate(article.date)}</span>
									</time>
									<span> - </span>
									<Link href="/about">{article.author}</Link>
								</div>
								<div className="mb-4 flex flex-row flex-wrap items-center justify-start gap-4">
									{article.categories.map((category) => {
										return (
											<div
												className="inline-flex rounded-md border-none bg-secondary px-2.5 py-0.5 font-semibold text-xs"
												key={category.id}
											>
												{category.title}
											</div>
										);
									})}
								</div>
							</header>
							<SuspendedArticleImage
								alt={article.title}
								src={article.coverImage}
							/>
							{article.content && <ArticleRichText data={article.content} />}
						</div>
					</article>
				</div>
			</div>
		</Container>
	);
}
