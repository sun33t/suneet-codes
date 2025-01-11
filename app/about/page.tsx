import { MessageCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { memo } from "react";

import { env } from "@/app/env";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { Container } from "@/components/container";
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
    <Container id="about-page-container" className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 duration-1000 animate-in fade-in lg:max-w-none">
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
        <div className="prose duration-1000 animate-in fade-in dark:prose-invert prose-strong:font-semibold prose-strong:underline lg:order-first lg:row-span-2">
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
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-center">
          <SocialLinks />
        </div>
      </div>
      <div className="mt-8 duration-1000 animate-in fade-in lg:mt-4">
        <h2 className="text-2xl font-bold">I&apos;m available for:</h2>
      </div>
      <div className="mt-4 grid gap-6 duration-1000 animate-in fade-in md:grid-cols-2">
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
    </Container>
  );
}
