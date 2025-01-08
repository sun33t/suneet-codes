import { Metadata } from "next";
import Link from "next/link";
import { PropsWithChildren, useMemo } from "react";

import { SimpleLayout } from "@/components/simple-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGE_METADATA } from "@/content/pages";
import { USES } from "@/content/uses";

// https://www.robinwieruch.de/about/ look here for inspo

export const metadata: Metadata = { ...PAGE_METADATA.uses };

const Tool = ({
  title,
  href,
  children,
}: PropsWithChildren<{ title: string; href: string }>) => {
  return (
    <Card className="group relative border-none bg-transparent text-foreground shadow-none">
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 dark:bg-zinc-800/50" />
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <span className="relative z-10">
          <CardHeader className="space-y-3 p-0">
            <CardTitle className="group-hover:text-accent-foreground">
              {title}
            </CardTitle>
            <CardDescription
              id="card-description"
              aria-label={`About ${title}`}
            >
              {children}
            </CardDescription>
          </CardHeader>
        </span>
      </Link>
    </Card>
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
                      <div
                        key={item.title}
                        id={item.title}
                        className="mb-10 sm:mb-16"
                      >
                        <Tool
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </Tool>
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
