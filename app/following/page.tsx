import { Metadata } from "next";
import { useCallback, useMemo } from "react";

import {
  LinkCard,
  LinkCardContent,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardHeader,
  LinkCardLabel,
  LinkCardTitle,
} from "@/components/link-card";
import { PageContainer } from "@/components/page-container";
import { PageHeading } from "@/components/page-heading";
import { PageSection } from "@/components/page-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FOLLOWING,
  FollowingCategory,
  FollowingEntry,
} from "@/content/following";
import { PAGE_METADATA } from "@/content/pages";
import { sortByTitleProperty } from "@/lib/utils/sortBytitleProperty";

export const metadata: Metadata = { ...PAGE_METADATA.following };

const FollowingCard = ({
  entry: { cta, description, href, title },
}: {
  entry: FollowingEntry;
}) => {
  return (
    <LinkCard href={href} isExternal={true} className="mb-10 sm:mb-16">
      <LinkCardHeader>
        <LinkCardTitle>{title}</LinkCardTitle>
      </LinkCardHeader>
      <LinkCardContent>
        <LinkCardDescription>{description}</LinkCardDescription>
      </LinkCardContent>
      <LinkCardFooter>
        <LinkCardLabel label={cta} iconType="external" />
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
    [sortEntries]
  );
  return (
    <PageContainer>
      <PageHeading title="Developers and creative professionals whose work I follow.">
        <p>
          This industry is always changing and there&apos;s always new
          challenges to overcome. These are the people who I find inspiring and
          invaluable to learn from.
        </p>
      </PageHeading>
      <PageSection>
        <div id="accordion" className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible>
            {followingEntries.map((category) => {
              return (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="text-base font-bold">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent className="p-6">
                    {sorted(category)?.map((entry) => (
                      <FollowingCard key={entry.title} entry={entry} />
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
