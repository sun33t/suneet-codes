import { Metadata } from "next";
import Image from "next/image";

import {
  LinkCard,
  LinkCardContentContainer,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardHeader,
  LinkCardTitle,
} from "@/components/link-card";
import { SimpleLayout } from "@/components/simple-layout";
import { PAGE_METADATA } from "@/content/pages";
import { PROJECTS, Project } from "@/content/projects";

export const metadata: Metadata = { ...PAGE_METADATA.projects };

function LinkIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  );
}

const ProjectCard = ({ logo, name, description, link }: Project) => {
  console.log(link);
  return (
    <LinkCard href={link.href} isExternal={true}>
      <LinkCardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image
            src={logo}
            alt={`Company logo for ${name}`}
            className="width={24} height={24} h-6 w-6"
            unoptimized
          />
        </div>

        <LinkCardTitle className="pt-2">{name}</LinkCardTitle>
      </LinkCardHeader>
      <LinkCardContentContainer>
        <LinkCardDescription aria-label={`About ${name}`}>
          {description}
        </LinkCardDescription>
      </LinkCardContentContainer>
      <LinkCardFooter>
        <p className="mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
          <LinkIcon className="h-6 w-6 flex-none" />
          <span className="ml-2">{link.label}</span>
        </p>
      </LinkCardFooter>
    </LinkCard>
  );
};

export default function Projects() {
  return (
    <SimpleLayout
      title="Projects"
      intro="I’ve worked on many projects over the years as an employee but these are the projects that I've built myself as a freelance and self-employed developer. I've only just started so the list is very small!
      "
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </ul>
    </SimpleLayout>
  );
}
