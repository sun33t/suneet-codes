import type { Metadata } from "next";
import { useCallback, useMemo } from "react";

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
	FOLLOWING,
	type FollowingCategory,
	type FollowingEntry,
} from "@/content/following";
import { PAGE_METADATA } from "@/content/pageMetadata";
import { sortByTitleProperty } from "@/lib/utils/sortByTitleProperty";

export const metadata: Metadata = { ...PAGE_METADATA.following };

const FollowingCard = ({
	entry: { cta, description, href, title },
}: {
	entry: FollowingEntry;
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

export default function Following() {
	const followingEntries = useMemo(() => Array.from(FOLLOWING.keys()), []);

	const sortEntries = useCallback(sortByTitleProperty, []);

	const sorted = useMemo(
		() => (category: FollowingCategory) =>
			FOLLOWING.get(category)?.sort(sortEntries),
		[sortEntries],
	);
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
						{followingEntries.map((category) => {
							return (
								<AccordionItem key={category} value={category}>
									<AccordionTrigger className="font-bold text-base">
										{category}
									</AccordionTrigger>
									<AccordionContent className="p-6">
										{sorted(category)?.map((entry) => (
											<FollowingCard entry={entry} key={entry.title} />
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
