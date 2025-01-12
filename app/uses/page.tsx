import { Metadata } from "next";
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
import { PAGE_METADATA } from "@/content/pages";
import { USES, UsesCategory, UsesEntry } from "@/content/uses";
import { sortByTitleProperty } from "@/lib/utils/sortBytitleProperty";

// https://www.robinwieruch.de/about/ look here for inspo

export const metadata: Metadata = { ...PAGE_METADATA.uses };

const UsesCard = ({
  entry: { description, link, title },
}: {
  entry: UsesEntry;
}) => {
  return (
    <LinkCard href={link.href} isExternal={true} className="mb-10 sm:mb-16">
      <LinkCardHeader>
        <LinkCardTitle>{title}</LinkCardTitle>
        <LinkCardDescription>{description}</LinkCardDescription>
      </LinkCardHeader>
      <LinkCardFooter>
        <LinkCardLabel
          label={link.label}
          iconType="external"
          accentColor={true}
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
    [sortEntries]
  );
  return (
    <PageContainer>
      <PageIntro title="What I use">
        <p>
          From time to time, I get asked about what I use to work on my
          projects. I&apos;ve tried to list as many of the tools I use below,
          and{" "}
          <Link
            className="font-semibold text-accent-foreground"
            href="https://github.com/sun33t/install-scripts-v2"
            target="_blank"
            rel="noopener noreferrer"
          >
            here&apos;s
          </Link>{" "}
          a link to my install-scripts repo too which is what I use to set up my
          dev environment. It&apos;s not the most sophisticated, but it
          get&apos;s the job done quickly and consistently!
        </p>
      </PageIntro>
      <PageSection>
        <div id="accordion" className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible>
            {usesEntries.map((category) => {
              return (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="text-base font-bold">
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
