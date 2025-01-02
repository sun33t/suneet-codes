import { Metadata } from "next";

import { env } from "@/app/env";
import { SuspendedArticlesFilter } from "@/components/articles-filter";
import { SuspendedArticlesList } from "@/components/articles-list";
import { SimpleLayout } from "@/components/simple-layout";
import { type SearchParams } from "@/types";

export const metadata: Metadata = {
  title: `${env.PROJECT_BASE_TITLE} | articles`,
  description:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
};

export default function Articles({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <SimpleLayout
      title="Writing on software development and building for the web"
      intro="All of my long-form thoughts on programming, leadership, product development, and more, collected in chronological order."
    >
      <SuspendedArticlesFilter />
      <SuspendedArticlesList searchParams={searchParams} />
    </SimpleLayout>
  );
}
