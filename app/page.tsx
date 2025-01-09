import { type Article } from "content-collections";
import Link from "next/link";
import { Fragment } from "react";

import { env } from "@/app/env";
import { Container } from "@/components/container";
import {
  LinkCard,
  LinkCardContentContainer,
  LinkCardDescription,
  LinkCardEyebrow,
  LinkCardFooter,
  LinkCardHeader,
  LinkCardTitle,
} from "@/components/link-card";
import { Resume } from "@/components/resume";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { Heading } from "@/components/typography/heading";
import { P } from "@/components/typography/paragraph";
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
    <LinkCard
      key={article._meta.fileName}
      href={`/articles/${article._meta.path}`}
      isExternal={true}
    >
      <LinkCardHeader>
        <LinkCardEyebrow>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </LinkCardEyebrow>
        <LinkCardTitle>{article.title}</LinkCardTitle>
      </LinkCardHeader>
      <LinkCardContentContainer>
        <LinkCardDescription>{article.description}</LinkCardDescription>
      </LinkCardContentContainer>
      <LinkCardFooter>
        <p>{`Read article >`}</p>
      </LinkCardFooter>
    </LinkCard>
  );
};

export default function Home() {
  return (
    <Fragment>
      <Container className="mt-12 duration-1000 animate-in fade-in">
        <div className="max-w-2xl">
          <Heading as={"h1"}>{env.PROJECT_AUTHOR}</Heading>
          <P className="text-base text-muted-foreground">
            👋, I&apos;m a developer and founder based in the UK. I&apos;ve been
            building software in the{" "}
            <span className="font-semibold underline">e-commerce</span>,{" "}
            <span className="font-semibold underline">retail</span> and{" "}
            <span className="font-semibold underline">hospitality</span> spaces
            as well as for the{" "}
            <span className="font-semibold underline">
              energy and comms ombudsman
            </span>{" "}
            over a five year period after completing my{" "}
            <span className="font-semibold underline">MSc in Computing</span>.
            When I&apos;m not working, I like to cook and travel with my wife
            and spend time in the outdoors with my friends.
          </P>
          <div className="mt-6 flex gap-2">
            {/* <SocialLink href="#" aria-label="Follow on X" icon={XIcon} /> */}
            {/* <SocialLink
              href="#"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            /> */}
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
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="duration-1000 animate-in fade-in">
            <div className="flex flex-col gap-16">
              {latestArticles.map((article) => {
                return (
                  <ArticleCard key={article._meta.fileName} article={article} />
                );
              })}
            </div>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <div className="duration-1000 animate-in fade-in">
              <Resume roles={ROLES} />
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
