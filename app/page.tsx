import { Briefcase, CalendarPlus2, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { env } from "@/app/env";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { Heading } from "@/components/typography/heading";
import { P } from "@/components/typography/paragraph";
import { Button, buttonVariants } from "@/components/ui/button";
import { type FrontmatterWithFilename, getAllArticles } from "@/lib/articles";
import { type Role, roles } from "@/lib/constants";
import { formatDate } from "@/lib/formatDate";

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="group -m-1 p-1" {...props} target="_blank">
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-accent-foreground dark:fill-zinc-400 dark:group-hover:fill-accent-foreground" />
    </Link>
  );
}

function Article({ article }: { article: FrontmatterWithFilename }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-5 w-5 flex-none fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  );
}

function Role({ role }: { role: Role }) {
  const startLabel =
    typeof role.start === "string" ? role.start : role.start.label;
  const startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime;

  const endLabel = typeof role.end === "string" ? role.end : role.end.label;
  const endDate = typeof role.end === "string" ? role.end : role.end.dateTime;

  return (
    <li className="group relative">
      <div className="absolute -inset-x-2 -inset-y-2 flex scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:rounded-md dark:bg-zinc-800/50" />

      <Link href={role.href} target="_blank" className="flex w-full gap-4">
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image
            src={role.logo}
            alt={`${role.company}-logo`}
            className="h-5 w-5"
            unoptimized
          />
        </div>

        <dl className="z-10 flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Company</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {role.company}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {role.title}
          </dd>
          <dt className="sr-only">Date</dt>
          <dd
            className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time dateTime={startDate}>{startLabel}</time>{" "}
            <span aria-hidden="true">—</span>{" "}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </dl>
      </Link>
    </li>
  );
}

function Resume({ roles }: { roles: Role[] }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Briefcase className="h-5 w-5 flex-none fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {roles.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Link
        href={env.PROJECT_CALENDAR_URL}
        target="_blank"
        className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
      >
        Let&apos;s Talk
        <CalendarPlus2 className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Link>
    </div>
  );
}

export default async function Home() {
  const { articles, error } = await getAllArticles();

  return (
    <Fragment>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <Heading as={"h1"}>{env.PROJECT_AUTHOR}</Heading>
          <P className="text-base text-muted-foreground">
            👋, I&apos;m a developer and founder based in the UK. I&apos;ve been
            building software in the{" "}
            <span className="text-accent-foreground">e-commerce</span> and{" "}
            <span className="text-accent-foreground">ombudsman</span> spaces for
            over five years after completing my MSc in Computing. When I&apos;m
            not working, I like to cook and travel with my wife.
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
          {error ? (
            <div>Error loading articles</div>
          ) : (
            <div className="flex flex-col gap-16">
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
          )}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume roles={roles} />
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
