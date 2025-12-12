import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { PageIntro } from "@/components/layout/page-intro";
import { PageSection } from "@/components/layout/page-section";
import {
	LinkCard,
	LinkCardContent,
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
import {
	type FollowingCategory,
	getFollowingByCategory,
	getFollowingPage,
	type PayloadFollowing,
	toNextMetadata,
} from "@/lib/payload/queries";
import { sortByTitleProperty } from "@/lib/utils/sortByTitleProperty";

export async function generateMetadata(): Promise<Metadata> {
	const page = await getFollowingPage();
	return toNextMetadata(page.metadata);
}

export const dynamic = "force-static";

const FollowingCard = ({
	entry: { cta, description, href, title },
}: {
	entry: PayloadFollowing;
}) => {
	return (
		<LinkCard className="mb-10 sm:mb-16" href={href} isExternal={true}>
			<LinkCardHeader>
				<LinkCardTitle>{title}</LinkCardTitle>
			</LinkCardHeader>
			<LinkCardContent>
				<LinkCardDescription>{description}</LinkCardDescription>
			</LinkCardContent>
			<LinkCardFooter>
				<LinkCardLabel iconType="external" label={cta} />
			</LinkCardFooter>
		</LinkCard>
	);
};

export default async function Following() {
	const followingByCategory = await getFollowingByCategory();
	const categories = Array.from(followingByCategory.keys());

	const getSortedEntries = (category: FollowingCategory) => {
		const entries = followingByCategory.get(category) ?? [];
		return [...entries].sort(sortByTitleProperty);
	};

	return (
		<PageContainer>
			<PageIntro title="Creative professionals whose work I follow">
				<p>
					{`This industry is always changing and there are always new
          challenges to overcome. These are the people who I find continually inspiring and
          invaluable to learn from.`}
				</p>
			</PageIntro>
			<PageSection>
				<div className="mx-auto max-w-2xl" id="accordion">
					<Accordion collapsible type="single">
						{categories.map((category) => {
							return (
								<AccordionItem key={category} value={category}>
									<AccordionTrigger className="font-bold text-base">
										{category}
									</AccordionTrigger>
									<AccordionContent className="p-6">
										{getSortedEntries(category).map((entry) => (
											<FollowingCard entry={entry} key={entry.id} />
										))}
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
