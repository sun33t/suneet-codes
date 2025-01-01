import { Metadata } from "next";

import { Card } from "@/components/card";
import { SimpleLayout } from "@/components/simple-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { INSPIRATION, InspirationEntry } from "@/lib/constants";

type InspirationProps = InspirationEntry;

const Inspiration = ({ title, description, cta, href }: InspirationProps) => {
  return (
    <Card as="article" className="px-4">
      <Card.Title as="h4" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Following",
  description: `Developers and creative professionals whose work I follow.`,
};

export default function Following() {
  return (
    <SimpleLayout
      title="Developers and creative professionals whose work I follow."
      intro="This industry is always changing and there's always new challenges to overcome. These are the people who I find inspiring and invaluable to learn from."
    >
      <div className="space-y-20">
        <Accordion type="single" collapsible className="max-w-md">
          {Array.from(
            INSPIRATION.keys().map((category) => {
              return (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="text-base font-bold hover:no-underline">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      key={category}
                      title={category}
                      className="flex flex-col space-y-16"
                    >
                      {INSPIRATION.get(category)?.map((entry) => (
                        <Inspiration key={entry.href} {...entry} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })
          )}
        </Accordion>
      </div>
    </SimpleLayout>
  );
}
