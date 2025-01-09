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
import { SimpleLayout } from "@/components/simple-layout";
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
  const followingItems = useMemo(() => Array.from(FOLLOWING.keys()), []);

  const sortEntries = useCallback((a: FollowingEntry, b: FollowingEntry) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }

    if (titleA > titleB) {
      return 1;
    }

    return 0;
  }, []);

  const sorted = useMemo(
    () => (category: FollowingCategory) =>
      FOLLOWING.get(category)?.sort(sortEntries),
    [sortEntries]
  );
  return (
    <SimpleLayout
      title="Developers and creative professionals whose work I follow."
      intro="This industry is always changing and there's always new challenges to overcome. These are the people who I find inspiring and invaluable to learn from."
    >
      <div id="accordion" className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible>
          {followingItems.map((category) => {
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
    </SimpleLayout>
  );
}
