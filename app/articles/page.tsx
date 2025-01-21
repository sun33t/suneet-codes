import { Metadata } from "next";

import { SuspendedArticlesFilter } from "@/components/articles-filter";
import { SuspendedArticlesList } from "@/components/articles-list";
import { PageContainer } from "@/components/page-container";
import { PageIntro } from "@/components/page-intro";
import { PageSection } from "@/components/page-section";
import { PAGE_METADATA } from "@/content/pageMetadata";
import { type SearchParams } from "@/types";

export const metadata: Metadata = { ...PAGE_METADATA.articles };

export default function Articles({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <PageContainer>
      <PageIntro title="Articles">
        <p>
          You&apos;re probably reading this because you&apos;re curious about
          how other developers do what they do. Congratulations! You&apos;re
          awesome! Learning from each other and sharing what we know is one of
          the superpowers that we have. We&apos;re all in this together! On this
          page you&apos;ll find posts that I&apos;ve written. They&apos;re
          mostly made up from my own notes, that I wanted to put into the public
          domain in case any of it might be of help to you.
        </p>
      </PageIntro>
      <PageSection>
        <SuspendedArticlesFilter />
        <SuspendedArticlesList searchParams={searchParams} />
      </PageSection>
    </PageContainer>
  );
}
