import { Metadata } from "next";

import {
  LinkCard,
  LinkCardContent,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardHeader,
  LinkCardLabel,
  LinkCardTitle,
} from "@/components/link-card";
import { SuspendedLogoImage } from "@/components/logo-image";
import { PageContainer } from "@/components/page-container";
import { PageIntro } from "@/components/page-intro";
import { PageSection } from "@/components/page-section";
import { PAGE_METADATA } from "@/content/pages";
import { PROJECTS, Project } from "@/content/projects";

export const metadata: Metadata = { ...PAGE_METADATA.projects };

const ProjectCard = ({ filename, name, description, link }: Project) => {
  return (
    <LinkCard href={link.href} isExternal={true}>
      <LinkCardHeader>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <SuspendedLogoImage filename={filename} />
        </div>

        <LinkCardTitle className="pt-2">{name}</LinkCardTitle>
      </LinkCardHeader>
      <LinkCardContent>
        <LinkCardDescription aria-label={`About ${name}`}>
          {description}
        </LinkCardDescription>
      </LinkCardContent>
      <LinkCardFooter>
        <LinkCardLabel
          label={link.label}
          iconType="link"
          iconFirst
          accentColor={false}
        />
      </LinkCardFooter>
    </LinkCard>
  );
};

export default function Projects() {
  return (
    <PageContainer>
      <PageIntro title="Projects">
        <p>
          {`I've worked on many projects over the years as an employee but below are the ones that I've built myself as a freelance developer. It's a list of one right now but it's growing...`}
        </p>
      </PageIntro>
      <PageSection>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </ul>
      </PageSection>
    </PageContainer>
  );
}
