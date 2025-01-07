import { Metadata } from "next";

import { Card } from "@/components/card";
import { SimpleLayout } from "@/components/simple-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PAGE_METADATA } from "@/content/pages";
import { USES } from "@/content/uses";

// https://www.robinwieruch.de/about/ look here for inspo

export const metadata: Metadata = { ...PAGE_METADATA.uses };

const Tool = ({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card as="li" className="mb-4">
      <Card.Title as="h4" href={href} isExternal={true}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
};

export default function Uses() {
  return (
    <SimpleLayout
      title="What I use"
      intro="From time to time, I get asked about what I use to work on my projects. I've put this list together to help answer that question and hopefully help you out."
    >
      <div id="accordion" className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible>
          {Array.from(
            USES.keys().map((category) => {
              return (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="text-base">
                    {category}
                  </AccordionTrigger>
                  {USES.get(category)?.map((item) => {
                    return (
                      <AccordionContent
                        key={item.title}
                        title={item.title}
                        className="space-y-20 p-6"
                      >
                        <Tool
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </Tool>
                      </AccordionContent>
                    );
                  })}
                </AccordionItem>
              );
            })
          )}
        </Accordion>
      </div>
    </SimpleLayout>
  );
}
