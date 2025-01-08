import { Metadata } from "next";
import Link from "next/link";
import { useMemo } from "react";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FOLLOWING, FollowingEntry } from "@/content/following";
import { PAGE_METADATA } from "@/content/pages";

export const metadata: Metadata = { ...PAGE_METADATA.following };

const FollowingCard = ({ title, description, cta, href }: FollowingEntry) => {
  return (
    <Card className="group relative border-none bg-transparent text-foreground shadow-none">
      <div className="absolute -inset-x-4 -bottom-0 -top-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 dark:bg-zinc-800/50" />
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <span className="relative z-10">
          <CardHeader className="space-y-3 p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription
              id="card-description"
              aria-label={`About ${title}`}
            >
              {description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="pl-0 pt-4">
            <p className="text-sm text-accent-foreground">{`${cta} >`}</p>
          </CardFooter>
        </span>
      </Link>
    </Card>
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
