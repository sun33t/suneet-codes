import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { PageIntro } from "@/components/layout/page-intro";
import { PageSection } from "@/components/layout/page-section";
import {
	LinkCard,
	LinkCardDescription,
	LinkCardFooter,
	LinkCardHeader,
	LinkCardLabel,
	LinkCardTitle,
} from "@/components/shared/link-card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { Use } from "@/lib/payload/payload-types";
import {
	getUsesByCategory,
	getUsesPage,
	toNextMetadata,
	type UsesCategory,
} from "@/lib/payload/queries";
import { sortByTitleProperty } from "@/lib/utils/sortByTitleProperty";

// https://www.robinwieruch.de/about/ look here for inspiration

export async function generateMetadata(): Promise<Metadata> {
	const page = await getUsesPage();
	return toNextMetadata(page.metadata);
}

export const dynamic = "force-static";

const UsesCard = ({ entry: { description, link, title } }: { entry: Use }) => {
	return (
		<LinkCard className="mb-10 sm:mb-16" href={link.href} isExternal={true}>
			<LinkCardHeader>
				<LinkCardTitle>{title}</LinkCardTitle>
				<LinkCardDescription>{description}</LinkCardDescription>
			</LinkCardHeader>
			<LinkCardFooter>
				<LinkCardLabel
					accentColor={true}
					iconType="external"
					label={link.label}
				/>
			</LinkCardFooter>
		</LinkCard>
	);
};

export default async function Uses() {
	const [page, usesByCategory] = await Promise.all([
		getUsesPage(),
		getUsesByCategory(),
	]);

	// Get categories in order
	const categories: UsesCategory[] = [
		"Hardware",
		"Development",
		"Design",
		"Productivity",
	];

	const sortedUses = new Map<UsesCategory, Use[]>();
	for (const category of categories) {
		const entries = usesByCategory.get(category) ?? [];
		sortedUses.set(category, entries.sort(sortByTitleProperty));
	}

	return (
		<PageContainer>
			<PageIntro title={page.pageIntro.title}>
				<p>{page.pageIntro.intro}</p>
			</PageIntro>
			<PageSection>
				<div className="mx-auto max-w-2xl" id="accordion">
					<Accordion collapsible type="single">
						{categories.map((category) => {
							const entries = sortedUses.get(category) ?? [];
							return (
								<AccordionItem key={category} value={category}>
									<AccordionTrigger className="font-bold text-base">
										{category}
									</AccordionTrigger>
									<AccordionContent className="p-6">
										{entries.map((entry) => {
											return <UsesCard entry={entry} key={entry.title} />;
										})}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</PageSection>
		</PageContainer>
	);
}
