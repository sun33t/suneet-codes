import type { Metadata } from "next";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import {
	LinkCard,
	LinkCardDescription,
	LinkCardFooter,
	LinkCardHeader,
	LinkCardLabel,
	LinkCardTitle,
} from "@/components/link-card";
import { PageContainer } from "@/components/page-container";
import { PageIntro } from "@/components/page-intro";
import { PageSection } from "@/components/page-section";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { PAGE_METADATA } from "@/content/pageMetadata";
import { USES, type UsesCategory, type UsesEntry } from "@/content/uses";
import { sortByTitleProperty } from "@/lib/utils/sortByTitleProperty";

// https://www.robinwieruch.de/about/ look here for inspo

export const metadata: Metadata = { ...PAGE_METADATA.uses };

const UsesCard = ({
	entry: { description, link, title },
}: {
	entry: UsesEntry;
}) => {
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

export default function Uses() {
	const usesEntries = useMemo(() => Array.from(USES.keys()), []);

	const sortEntries = useCallback(sortByTitleProperty, []);

	const sortedEntries = useMemo(
		() => (category: UsesCategory) => USES.get(category)?.sort(sortEntries),
		[sortEntries],
	);
	return (
		<PageContainer>
			<PageIntro title="What I use">
				<p>
					From time to time, I get asked about what I use to work on my
					projects. I&apos;ve tried to list as many of the tools I use below,
					and{" "}
					<Link
						aria-label="View my development environment setup scripts on GitHub"
						className="font-semibold text-accent-foreground"
						href="https://github.com/sun33t/install-scripts-v2"
						rel="noopener noreferrer"
						target="_blank"
					>
						here&apos;s
					</Link>{" "}
					a link to my install-scripts repo too which is what I use to set up my
					dev environment. It&apos;s not the most sophisticated, but it
					get&apos;s the job done quickly and consistently!
				</p>
			</PageIntro>
			<PageSection>
				<div className="mx-auto max-w-2xl" id="accordion">
					<Accordion collapsible type="single">
						{usesEntries.map((category) => {
							return (
								<AccordionItem key={category} value={category}>
									<AccordionTrigger className="font-bold text-base">
										{category}
									</AccordionTrigger>
									<AccordionContent className="p-6">
										{sortedEntries(category)?.map((entry) => {
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
