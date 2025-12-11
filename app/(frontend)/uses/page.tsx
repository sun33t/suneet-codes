import type { Metadata } from "next";
import Link from "next/link";

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
import { PAGE_METADATA } from "@/content/data/pageMetadata";
import type { UsesEntry } from "@/content/data/uses";
import {
	getUsesByCategory,
	type PayloadUse,
	type UsesCategory,
} from "@/lib/payload/queries";
import { sortByTitleProperty } from "@/lib/utils/sortByTitleProperty";

// https://www.robinwieruch.de/about/ look here for inspo

export const metadata: Metadata = { ...PAGE_METADATA.uses };

export const dynamic = "force-static";

function transformToUsesEntry(payload: PayloadUse): UsesEntry {
	return {
		title: payload.title,
		description: payload.description,
		link: {
			href: payload.link?.href ?? "",
			label: payload.link?.label ?? "",
		},
	};
}

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

export default async function Uses() {
	const usesByCategory = await getUsesByCategory();

	// Get categories in order and transform entries
	const categories: UsesCategory[] = [
		"Hardware",
		"Development",
		"Design",
		"Productivity",
	];

	const transformedUses = new Map<UsesCategory, UsesEntry[]>();
	for (const category of categories) {
		const payloadEntries = usesByCategory.get(category) ?? [];
		const entries = payloadEntries
			.map(transformToUsesEntry)
			.sort(sortByTitleProperty);
		transformedUses.set(category, entries);
	}

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
						{categories.map((category) => {
							const entries = transformedUses.get(category) ?? [];
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
