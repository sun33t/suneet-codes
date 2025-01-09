import { Metadata } from "next";
import { useMemo } from "react";

import {
  LinkCard,
  LinkCardContentContainer,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardHeader,
  LinkCardTitle,
} from "@/components/link-card";
import { SimpleLayout } from "@/components/simple-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FOLLOWING, FollowingEntry } from "@/content/following";
import { PAGE_METADATA } from "@/content/pages";

export const metadata: Metadata = { ...PAGE_METADATA.following };

const FollowingCard = ({ title, description, cta, href }: FollowingEntry) => {
  return (
    <LinkCard href={href} isExternal={true}>
      <LinkCardHeader>
        <LinkCardTitle>{title}</LinkCardTitle>
      </LinkCardHeader>
      <LinkCardContentContainer>
        <LinkCardDescription>{description}</LinkCardDescription>
      </LinkCardContentContainer>
      <LinkCardFooter>
        <p className="text-sm text-accent-foreground">{`${cta} >`}</p>
      </LinkCardFooter>
    </LinkCard>
  );
};

export default function Following() {
  const followingItems = useMemo(() => Array.from(FOLLOWING.keys()), []);
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
                  {FOLLOWING.get(category)?.map((entry) => (
                    <div key={entry.title} className="mb-10 sm:mb-16">
                      <FollowingCard {...entry} />
                    </div>
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
