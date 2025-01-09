import { Metadata } from "next";
import { useMemo } from "react";

import {
  LinkCard,
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
import { PAGE_METADATA } from "@/content/pages";
import { USES, UsesEntry } from "@/content/uses";

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
  const usesItems = useMemo(() => Array.from(USES.keys()), []);
  return (
    <SimpleLayout
      title="What I use"
      intro="From time to time, I get asked about what I use to work on my projects. I've put this list together to help answer that question and hopefully help you out."
    >
      <div id="accordion" className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible>
          {usesItems.map((category) => {
            return (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-base font-bold">
                  {category}
                </AccordionTrigger>
                <AccordionContent className="p-6">
                  {USES.get(category)?.map((item) => {
                    return <UsesCard entry={item} key={item.title} />;
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </SimpleLayout>
  );
}
