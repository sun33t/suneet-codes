import type { Metadata } from "next";

import { SuspendedArticlesFilter } from "@/components/features/articles-filter";
import { SuspendedArticlesList } from "@/components/features/articles-list";
import { PageContainer } from "@/components/layout/page-container";
import { PageIntro } from "@/components/layout/page-intro";
import { PageSection } from "@/components/layout/page-section";
import { ContentRichText } from "@/lib/payload/lexical/content-rich-text";
import {
	getArticlesPage,
	getCategoriesWithSlugs,
	toNextMetadata,
} from "@/lib/payload/queries";
import type { SearchParams } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
	const page = await getArticlesPage();
	return toNextMetadata(page.metadata);
}

export default async function Articles({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const [page, categories] = await Promise.all([
		getArticlesPage(),
		getCategoriesWithSlugs(),
	]);

	return (
		<PageContainer>
			<PageIntro title={page.pageIntro.title}>
				<ContentRichText data={page.pageIntro.intro} />
			</PageIntro>
			<PageSection>
				<SuspendedArticlesFilter categories={categories} />
				<SuspendedArticlesList searchParams={searchParams} />
			</PageSection>
		</PageContainer>
	);
}
