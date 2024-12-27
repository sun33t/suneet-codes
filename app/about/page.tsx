import clsx from "clsx";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { env } from "@/app/env";
import { Container } from "@/components/container";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import profileWide from "@/images/profile_wide.jpeg";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

export default function About() {
  return (
    <Container id="about-page-container" className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={profileWide}
              alt="Side profile photo of Suneet on the coast of Iceland at sunset"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            I’m Suneet. I live in Chester where I like to build stuff on my
            laptop.
          </h1>
          <div className="mt-6 space-y-7 text-base">
            <p>
              In 2017, I met someone who encouraged me to puruse a long-held
              dream that I had, but never had the courage to make happen. That
              dream was to become a software developer and that person is now my
              lovely wife and best-friend, Satty!
            </p>
            <p>
              In 2019, shortly after Satty and I married, I enrolled and
              completed the intense, challenging and inspiring developer
              pathway, at the Northcoders bootcamp in Manchester. These three
              months were transformational. I met some amazing people in my
              fellow students and tutors and shortly after graduating, I was
              proud to join the tuition team myself where I helped subsequent
              students on their journey into dev. This was one of the most
              rewarding experiences in my life.
            </p>
            <p>
              In 2020, I started the next stage of my journey as a developer,
              leaving education for my first production role. In the 4 years
              that followed I have worked with a variety of multi-disciplinary
              teams and extremely talented individuals, specialising in building
              fullstack apps on the PERN stack, supported by AWS infrastucture.
              I&apos;ve had the opportunity to lead projects and mentor junior
              developers and apprentices and I&apos;ve loved (almost) every
              minute of it.
            </p>
            <p>
              Today, I’m contract developer working within the nodeJS/TypeScript
              domain across all sectors and founder of pushorigin ltd - a
              collective of developers and creatives who collaborate on together
              to bring delight and joy to users all over the world. Admittedly,
              we&apos;re just getting started so I don&apos;t have too much to
              say on that at the moment but if I&apos;m fortunate enough to
              attract your attention in a few months time, I hope have an update
              for you!
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {/* <SocialLink href="#" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink> */}
            <SocialLink
              href={env.PROJECT_GITHUB_URL}
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href={env.PROJECT_LINKEDIN_URL}
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <Link
              href={`mailto:${env.PROJECT_EMAIL_ADDRESS}`}
              className="group mt-8 flex items-center border-t pt-8 text-sm font-medium hover:text-accent-foreground"
            >
              <MailIcon className="h-6 w-6 flex-none stroke-zinc-500 group-hover:stroke-teal-500 dark:stroke-zinc-500" />
              <span className="ml-4">{env.PROJECT_EMAIL_ADDRESS}</span>
            </Link>
          </ul>
        </div>
      </div>
    </Container>
  );
}
