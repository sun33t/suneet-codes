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
      intro="My notes on programming, leadership and mentoring, product design/development, and more."
    >
      <SuspendedArticlesFilter />
      <SuspendedArticlesList searchParams={searchParams} />
    </SimpleLayout>
  );
}
