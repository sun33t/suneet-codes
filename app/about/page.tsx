import clsx from "clsx";
import { MailIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { env } from "@/app/env";
import { Container } from "@/components/container";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { PAGE_METADATA } from "@/content/pages";
import profileWide from "@/images/profile_wide.jpg";

// https://www.robinwieruch.de/work-with-me/ see here for inspo

export const metadata: Metadata = { ...PAGE_METADATA.about };

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
        <div className="prose dark:prose-invert prose-strong:font-semibold prose-strong:underline lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A little bit about me
          </h1>
          <div className="mt-6 text-base">
            <p>
              In <time dateTime="2019">2019</time> after completing an{" "}
              <strong>MSc in Computing</strong> and a{" "}
              <strong>PGCE in Computer Science</strong> (Secondary School), I
              enrolled in the developer pathway, at the{" "}
              <strong>northcoders</strong> bootcamp in Manchester, after being
              encouraged to pursue a long-held dream of becoming a software
              developer.
            </p>
            <p>
              The three months that followed were transformational. I met some
              amazing people in my fellow students and tutors and shortly after
              graduating, I was proud to join the tuition team myself where I
              helped subsequent students on their journey into dev. This was one
              of the most rewarding experiences in my life.
            </p>
            <p>
              In <time dateTime="2020">2020</time>, I left northcoders for my
              first production role and I have never looked back. In the 4 years
              that followed I have enjoyed the opportunity to work on a variety
              of projects which have included{" "}
              <strong>fullstack e-commerce</strong> websites for national an
              international brands, <strong>component libraries</strong> and{" "}
              <strong>cli tools</strong> for digital agencies and{" "}
              <strong>microservice backends</strong> and{" "}
              <strong>cloud infrastructure</strong> for a variety of app
              development clients.
            </p>
            <p>
              My most recent experience has been as a full stack developer at{" "}
              <strong>Lumin</strong> where I helped to address technical debt in
              their legacy react application and to extend their utilisation of
              aws infrastructure to achieve improved performance and reliability
              at scale.
            </p>
            <p>
              Along the way I&apos;ve had the opportunity to lead projects and
              mentor junior developers and apprentices. No two days have been
              the same and I&apos;ve loved (almost) every minute of it!
            </p>
            <p>
              Although I have experience working in java, ruby, and python,
              today, I&apos;m a freelance developer specialising in building
              with node using TypeScript. It&apos;s my prefered ecosystem as the
              tooling and libraries are constantly being moved forwards and I
              love building for the web!
            </p>
            <p>
              I also love to learn and am keeping up-to-date with developments
              within the LLM and LCM spaces to see how these emerging
              technologies can be applied into the applications and digital
              experiences of the future.
            </p>
            <h2>I&apos;m available for:</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Development Services</h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Full-Stack Development</strong>
                    <p className="text-sm">
                      End-to-end applications with modern databases and UI
                    </p>
                  </li>
                  <li>
                    <strong>MVP Development</strong>
                    <p className="text-sm">
                      Rapid prototyping and minimum viable products
                    </p>
                  </li>
                  <li>
                    <strong>Technical Migrations</strong>
                    <p className="text-sm">
                      Addressing tech debt and migrating to modern patterns and
                      frameworks
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Professional Services</h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Technical Leadership</strong>
                    <p className="text-sm">
                      Team leadership and developer mentoring
                    </p>
                  </li>
                  <li>
                    <strong>Technical Consulting</strong>
                    <p className="text-sm">
                      Architecture and development consulting
                    </p>
                  </li>
                  <li>
                    <strong>Code Quality</strong>
                    <p className="text-sm">
                      Comprehensive code audits and reviews
                    </p>
                  </li>
                </ul>
              </div>
            </div>
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
