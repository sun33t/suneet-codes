import { MessageCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { memo } from "react";

import { env } from "@/app/env";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { PageContainer } from "@/components/page-container";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGE_METADATA } from "@/content/pages";
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

const SocialLinks = () => {
  return (
    <Card className="h-fit shadow-none duration-1000 animate-in fade-in lg:ml-20 lg:block lg:max-w-xs">
      <CardContent>
        <ul role="list">
          {/* <SocialLink href="#" icon={XIcon}>
          Follow on X
        </SocialLink>
        <SocialLink href="#" icon={InstagramIcon} className="mt-4">
          Follow on Instagram
        </SocialLink> */}
          <Link
            href={env.PROJECT_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
          >
            <GitHubIcon className="h-4 w-4 fill-accent-foreground transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
            Follow on GitHub
          </Link>
          <Link
            href={env.PROJECT_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
          >
            <LinkedInIcon className="h-4 w-4 fill-accent-foreground transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
            Follow on LinkedIn
          </Link>
          <Link
            href="/contact"
            className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
          >
            <MessageCircle className="h-4 w-4 stroke-accent-foreground transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
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
      <p>
        {`At the end of the long list of `}
        <strong>
          <Link href="#" className="text-accent-foreground">
            Things That I’ve Tried
          </Link>
        </strong>
        <span className="font-semibold text-accent-foreground">™</span>
        {` is software developer. It’s what I’ve been doing with my time for the last 6(ish) years. That and learning the ways of married life (since 2019) and (forgive me for mentioning it) learning how to cope with the grief of losing my parents. Grief is tough and complex and one of the ways that I try to work through that grief is by (you guessed it) helping people! I am eternally grateful for the people in my life who are helping me.`}
      </p>
      <p>
        {`On a daily basis I try to do this by solving problems with code, and on any given day, who I'm trying to help changes all the time. Clients, colleagues, end users all need help for different reasons when it comes to digital products and developers are uniquely positioned to assist.`}
      </p>
      <p>
        {`So you might be wondering why is this bonkers guy going on and on about helping people instead of telling me about the applications he's built or the stacks that he works in?`}
      </p>
      <p>
        {`Well, to this fabulous question I would answer that, as important as it is to highlight technical experience, if you're reading this, it might mean that you're interested in working with me which is great!`}
      </p>
      <p>
        {`I want to let you know that my approach to building digital experiences starts and ends with helping people, because at the core of all of these beautiful bits and bytes are the people who come together with ideas for digital services and the people that use them.`}
      </p>
      <p>
        {`Approaching that task with empathy, compassion and the ability to listen to others and to nurture the creative process is absolutely essential to building great digital experiences that are meaningful and impactful.`}
      </p>
      <p>
        {`But getting back to your fabulous question... shipping code is also damn important and fun!`}
      </p>
      <p>
        {`Below is a brief summary of my experience as a developer. Each project has provided me with the opportunity to further my knowledge and
        experience of the engineering process, and going forwards, maybe we
        could put that experience to good use by... let's say it together... `}
        <strong>helping you</strong>!
      </p>
      <p>
        {`I'm Suneet, I have an `}
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
        {`. Its a versatile and vibrant stack where the tooling and libraries are constantly being moved forwards. It's also because I love building for the web!`}
      </p>
      <p>
        {`My most recent experience as a team-member has been at `}
        <strong>Lumin</strong>
        {` as a fullstack developer where I helped to address technical debt in their legacy react application and to extend their utilisation of aws infrastructure to achieve improved performance and reliability at scale.`}
      </p>
      <p>{`Following this experience I have taken a short career break to catch my breath. A lot has happened in the last two years. The passing of my Mum in 2022 following an agressive terminal illness that took us all by surprise, and add to that a severe back injury which followed on from the same period (and thankfully I'm now on the mend from), one change of workplace in 2023 and two house moves in 2024. I felt the need to step back and take a beat.`}</p>
      <p>
        {`I've caught my breath now and am hungry for future projects. It's an exciting time to be a developer. LLM's, AI, advances in frontend and backend tooling and browser api's means that we're on a new frontier of how we build for the interactions and interfaces of tomorrow.`}
      </p>
      <p>
        {`I'm looking forwards to the possibility of building cool stuff with people that I love working with. Hopefully, that will be `}
        <strong>you</strong>!
      </p>
    </div>
  );
};
