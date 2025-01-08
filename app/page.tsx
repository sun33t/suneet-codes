import { type Article } from "content-collections";
import Link from "next/link";
import { Fragment } from "react";

import { env } from "@/app/env";
import { Container } from "@/components/container";
import { Resume } from "@/components/resume";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { Heading } from "@/components/typography/heading";
import { P } from "@/components/typography/paragraph";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const formattedDate = formatDate(article.date);
  return (
    <Card className="group relative border-none bg-transparent text-foreground shadow-none">
      <div className="absolute -inset-x-4 -bottom-0 -top-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 dark:bg-zinc-800/50" />
      <Link href={`/articles/${article._meta.path}`}>
        <span className="absolute -inset-x-4 -bottom-0 -top-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10"></span>
      </Link>
      <CardHeader className="z-10 space-y-3 p-0">
        <p className="relative pl-3.5 text-sm text-muted-foreground">
          <time dateTime={formattedDate}>{formattedDate}</time>
          <span
            className="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
          >
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          </span>
        </p>
        <CardTitle className="z-10">{article.title}</CardTitle>
        <CardDescription id="card-description" className="z-10">
          {article.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pl-0 pt-4">
        <p className="z-10 text-sm text-accent-foreground">{`Read article >`}</p>
      </CardFooter>
    </Card>
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
            <div className="flex flex-col gap-10">
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
