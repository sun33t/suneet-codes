import { type Article } from "content-collections";
import Link from "next/link";
import { Fragment } from "react";

import { env } from "@/app/env";
import { Container } from "@/components/container";
import {
  LinkCard,
  LinkCardContent,
  LinkCardDescription,
  LinkCardEyebrow,
  LinkCardFooter,
  LinkCardHeader,
  LinkCardLabel,
  LinkCardTitle,
} from "@/components/link-card";
import { PageIntro } from "@/components/page-intro";
import { Resume } from "@/components/resume";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { Blockquote } from "@/components/typography/blockquote";
import { ROLES } from "@/content/roles";
import { latestArticles } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      className="group -m-1 p-1"
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="h-6 w-6 fill-accent-foreground transition" />
    </Link>
  );
}
const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <article>
      <LinkCard
        key={article._meta.fileName}
        href={`/articles/${article._meta.path}`}
      >
        <LinkCardHeader>
          <LinkCardEyebrow>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </LinkCardEyebrow>
          <LinkCardTitle>{article.title}</LinkCardTitle>
        </LinkCardHeader>
        <LinkCardContent>
          <LinkCardDescription>{article.description}</LinkCardDescription>
        </LinkCardContent>
        <LinkCardFooter>
          <LinkCardLabel label="Read article" />
        </LinkCardFooter>
      </LinkCard>
    </article>
  );
};

const NoArticlesCard = () => {
  return (
    <LinkCard
      href="https://fakebuddhaquotes.com/silence-is-an-empty-space-space-is-the-home-of-the-awakened-mind/"
      isExternal
    >
      <LinkCardHeader>
        <LinkCardTitle>Articles Coming Soon...</LinkCardTitle>
      </LinkCardHeader>
      <LinkCardContent>
        <LinkCardDescription className="text-foreground">
          <Blockquote>
            “Silence is an empty space. Space is the home of the awakened mind.”
          </Blockquote>
          <p className="pt-4 text-right">{`- 🧘 Buddha... maybe?`}</p>
        </LinkCardDescription>
      </LinkCardContent>
    </LinkCard>
  );
};

export default function Home() {
  return (
    <Fragment>
      <Container className="mt-12 duration-1000 animate-in fade-in">
        <div className="max-w-2xl">
          <PageIntro title={env.PROJECT_AUTHOR}>
            <div className="space-y-4 text-muted-foreground">
              <p>
                👋, I&apos;m a developer based in the UK. I&apos;ve been
                building software in the{" "}
                <span className="font-semibold text-foreground underline">
                  e-commerce
                </span>
                ,{" "}
                <span className="font-semibold text-foreground underline">
                  retail
                </span>{" "}
                and{" "}
                <span className="font-semibold text-foreground underline">
                  hospitality
                </span>{" "}
                spaces as well as for the{" "}
                <span className="font-semibold text-foreground underline">
                  energy and comms ombudsman
                </span>{" "}
                over a five year period after completing my{" "}
                <span className="font-semibold text-foreground underline">
                  MSc in Computing
                </span>
                .
              </p>
              <p>
                My aspiration is to create digital services which{" "}
                <span className="font-semibold text-foreground underline">
                  build community
                </span>{" "}
                and provide{" "}
                <span className="font-semibold text-foreground underline">
                  meaningful value
                </span>{" "}
                to those who use them.
              </p>
              <p>
                If you would like to learn more about my dev experience, check
                out my{" "}
                <Link
                  className="font-semibold text-accent-foreground"
                  href="/about"
                >
                  about page
                </Link>
                , or use the links below.
              </p>
              <p>
                When I&apos;m not working or learning new skills, I like to
                read, cook, travel with my wife and spend time in the outdoors
                with my friends.
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              <SocialLink
                href={env.PROJECT_GITHUB_URL}
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href={env.PROJECT_LINKEDIN_URL}
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </div>
          </PageIntro>
        </div>
      </Container>
      <Container className="mt-24 duration-1000 animate-in fade-in md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div id="latest-articles-container">
            <div className="flex flex-col gap-16">
              {latestArticles.length > 0 ? (
                latestArticles.map((article) => {
                  return (
                    <ArticleCard
                      key={article._meta.fileName}
                      article={article}
                    />
                  );
                })
              ) : (
                <NoArticlesCard />
              )}
            </div>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <div>
              <Resume roles={ROLES} />
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
