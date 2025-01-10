import { Metadata } from "next";

import { SuspendedArticlesFilter } from "@/components/articles-filter";
import { SuspendedArticlesList } from "@/components/articles-list";
import { SimpleLayout } from "@/components/simple-layout";
import { PAGE_METADATA } from "@/content/pages";
import { type SearchParams } from "@/types";

export const metadata: Metadata = { ...PAGE_METADATA.articles };

export default function Articles({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <SimpleLayout
      title="Articles"
      intro="You're probably reading this because you're curious about how other developers do what they do. Congratulations! You're awesome! Learning from each other and sharing what we know is one of the superpowers that we have. We're all in this together! On this page you'll find posts that I've written. They're mostly made up from my own notes, that I wanted to put into the public domain in case any of it might be of help to you."
    >
      <SuspendedArticlesFilter />
      <SuspendedArticlesList searchParams={searchParams} />
    </SimpleLayout>
  );
}
