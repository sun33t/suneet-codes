import { MessageCircle } from "lucide-react";
import { Metadata } from "next";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, memo } from "react";

import { env } from "@/app/env";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { NotionIcon } from "@/components/notion-icon";
import { PageContainer } from "@/components/page-container";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGE_METADATA } from "@/content/pageMetadata";
import {
  DEVELOPMENT_SERVICES,
  PROFESSIONAL_SERVICES,
} from "@/content/services";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { ServiceItem } from "@/types";

// https://www.robinwieruch.de/work-with-me/ see here for inspo

const profileImageSrc = `profile/profile_wide`;

const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
  src: profileImageSrc,
  width: "512px",
});

export const metadata: Metadata = { ...PAGE_METADATA.about };

type ServiceCardSectionProps = {
  title: string;
  services: ServiceItem[];
};

const ServiceCardSection = ({ title, services }: ServiceCardSectionProps) => {
  return (
    <div className="mt-12 md:mt-0">
      <h3 className="pl-6 font-semibold underline">{title}</h3>
      <div className="mt-4 grid h-full grid-cols-1 gap-4">
        {services.map((item) => (
          <ServiceCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

type ServiceCardProps = {
  title: string;
  description: string;
};
const ServiceCard = memo(({ title, description }: ServiceCardProps) => {
  return (
    <Card className="grow border-none bg-zinc-50 shadow-none dark:bg-zinc-800/50">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm font-extralight">
        {description}
      </CardContent>
    </Card>
  );
});

ServiceCard.displayName = "ServiceCard";

type SocialButtonProps = Omit<LinkProps, "className"> &
  PropsWithChildren<{
    isExternal?: boolean;
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    iconStyleOverride?: React.CSSProperties;
  }>;

const SocialButton = ({
  href,
  isExternal = true,
  icon: Icon,
  children,
  iconStyleOverride,
  ...rest
}: SocialButtonProps) => {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`mt-6 w-full lg:grid lg:grid-cols-4 ${buttonVariants({ variant: "secondary" })}`}
      {...rest}
    >
      <Icon
        className="fill-accent-foreground transition group-active:stroke-zinc-600 lg:col-span-1 lg:place-self-center dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
        style={iconStyleOverride}
      />
      {children}
    </Link>
  );
};

const SocialLinks = () => {
  return (
    <Card className="h-fit shadow-none duration-1000 animate-in fade-in lg:ml-20 lg:block lg:max-w-xs">
      <CardContent>
        <ul role="list">
          <SocialButton
            href={env.PROJECT_GITHUB_URL}
            icon={GitHubIcon}
            iconStyleOverride={{ width: "1.25rem", height: "1.25rem" }}
          >
            Follow on GitHub
          </SocialButton>
          <SocialButton
            href={env.PROJECT_LINKEDIN_URL}
            icon={LinkedInIcon}
            iconStyleOverride={{ width: "1.25rem", height: "1.25rem" }}
          >
            Follow on LinkedIn
          </SocialButton>
          <SocialButton href={env.PROJECT_NOTION_URL} icon={NotionIcon}>
            View CV on Notion
          </SocialButton>
          <Link
            href="/contact"
            className={`mt-6 w-full lg:grid lg:grid-cols-4 ${buttonVariants({ variant: "secondary" })}`}
          >
            <MessageCircle className="h-4 w-4 stroke-accent-foreground transition group-active:stroke-zinc-600 lg:col-span-1 lg:place-self-center dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
            Let&apos;s Talk
          </Link>
        </ul>
      </CardContent>
    </Card>
  );
};

export default function About() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <CloudinaryImage
              src={imageSrc}
              alt="Side profile photo of Suneet on the coast of Iceland at sunset"
              width={512}
              height={512}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              blurDataURL={blurDataUrl}
              placeholder="blur"
            />
          </div>
        </div>
        <div className="prose dark:prose-invert prose-strong:font-semibold prose-strong:underline lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A little bit about me
          </h1>
          <NewWording />
          {/* <OriginalWording /> */}
        </div>
        <div className="hidden lg:flex lg:justify-center">
          <SocialLinks />
        </div>
      </div>
      <div className="mt-8 lg:mt-4">
        <h2 className="text-2xl font-bold">I&apos;m available for:</h2>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <ServiceCardSection
          services={DEVELOPMENT_SERVICES}
          title="Development Services"
        />
        <ServiceCardSection
          services={PROFESSIONAL_SERVICES}
          title="Professional Services"
        />
      </div>
      <div className="mt-24 lg:hidden">
        <SocialLinks />
      </div>
    </PageContainer>
  );
}
const NewWording = () => {
  return (
    <div className="mt-6 text-base">
      <p>
        {`Helping people is great isn’t it? It’s been my primary motivator for as long as I can remember. I’ve tried my hand at a few different things over the years, but the ones that have stuck for the longest time are the experiences where I’ve walked away at the end of the day feeling like I’ve made a difference.`}
      </p>
      <p>{`My approach to building digital services starts and ends with helping people, because at the core of all of those beautiful bits and bytes, are the people who come together with an idea for a service, and the people that use them.`}</p>
      <p>
        {`Doing this with empathy and compassion helps to nurture the creative process, leading to meaningful and impactful digital experiences.`}
      </p>
      <p>
        {`Solving problems with code, sharing ideas and contributing to a culture of continuous improvement and learning is how I make a difference. I have to understand the why behind what we're building, before I can best help the team, and myself to achieve our goals.`}
      </p>
      <p>
        {`Below is a brief summary of my experience as a developer. The more I build, the more I want to build! Seriously, I think I might have a problem...`}
      </p>
      <div className="mt-8 lg:mt-4">
        <h2 className="text-2xl font-bold">My experience:</h2>
      </div>
      <p>
        {`Hi! I'm Suneet, I have an `}
        <strong>MSc in Computing</strong>
        {` with my dissertation focussing on bringing cultural heritage experiences to those of limited mobility through the use of mixed reality technologies. I'm a graduate of the `}
        <strong>
          <Link
            href="https://northcoders.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-foreground"
          >
            Northcoders
          </Link>
        </strong>
        {` Developer Pathway which I completed in 2019 and also a former member of the tuition team there, where I was proud to help other students on their route into dev.`}
      </p>
      <p>
        {`Following my time at Northcoders, I've worked within both `}
        <strong>agency</strong>
        {` and `}
        <strong>client-side</strong>
        {` environments, on all aspects of `}
        <strong>full-stack applications</strong>
        {` for a variety of national and international brands. My experience includes `}
        <strong>addressing technical debt</strong>
        {` in existing projects, building `}
        <strong>design systems</strong>
        {` and `}
        <strong>internal tooling</strong>
        {`, designing and implementing `}
        <strong>cloud infrastructure</strong>
        {` and `}
        <strong>CI/CD</strong> {` pipelines, `}
        <strong>writing documentation</strong>
        {`, `}
        <strong>leading/mentoring junior developers</strong>
        {` and setting up `}
        <strong>greenfield projects</strong>
      </p>
      <p>
        {`Although I have some experience working in java, ruby, and python, I'm most experienced with `}
        <strong>node and TypeScript</strong>
        {`. Its a versatile and vibrant stack where the tooling and libraries are constantly being moved forwards.`}
      </p>
      <p>
        {`My most recent experience as a team-member has been at `}
        <Link
          href="https://www.trustalliancegroup.org/our-companies/lumin"
          className="font-semibold text-accent-foreground"
        >
          Lumin
        </Link>
        {` as a fullstack developer where I helped to address technical debt in their legacy react application and to extend their utilisation of AWS infrastructure to achieve improved performance and reliability at scale.`}
      </p>
    </div>
  );
};
