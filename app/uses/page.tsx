import { Metadata } from "next";
import { useMemo } from "react";

import {
  LinkCard,
  LinkCardDescription,
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
import { PAGE_METADATA } from "@/content/pages";
import { USES, UsesEntry } from "@/content/uses";

// https://www.robinwieruch.de/about/ look here for inspo

export const metadata: Metadata = { ...PAGE_METADATA.uses };

const UsesCard = ({
  entry: { description, href, title },
}: {
  entry: UsesEntry;
}) => {
  return (
    <LinkCard href={href} isExternal={true}>
      <LinkCardHeader>
        <LinkCardTitle className="transition-colors group-hover:text-accent-foreground">
          {title}
        </LinkCardTitle>
        <LinkCardDescription>{description}</LinkCardDescription>
      </LinkCardHeader>
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
                    return (
                      <div key={item.title} className="mb-10 sm:mb-16">
                        <UsesCard entry={item} />
                      </div>
                    );
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
