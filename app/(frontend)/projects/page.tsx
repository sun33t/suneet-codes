import type { Metadata } from "next";

import { Testimonials } from "@/components/features/testimonials";
import { PageContainer } from "@/components/layout/page-container";
import { PageIntro } from "@/components/layout/page-intro";
import { PageSection } from "@/components/layout/page-section";
import {
	LinkCard,
	LinkCardContent,
	LinkCardDescription,
	LinkCardFooter,
	LinkCardHeader,
	LinkCardLabel,
	LinkCardTitle,
} from "@/components/shared/link-card";
import { SuspendedLogoImage } from "@/components/shared/logo-image";
import { PAGE_METADATA } from "@/content/data/pageMetadata";
import { PROJECTS, type Project } from "@/content/data/projects";

export const metadata: Metadata = { ...PAGE_METADATA.projects };

export const dynamic = "force-static";

const ProjectCard = ({ logoDetails, company, description, link }: Project) => {
	return (
		<LinkCard href={link.href} isExternal={true}>
			<LinkCardHeader>
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
					<SuspendedLogoImage company={company} logoDetails={logoDetails} />
				</div>

				<LinkCardTitle className="pt-2">{company}</LinkCardTitle>
			</LinkCardHeader>
			<LinkCardContent>
				<LinkCardDescription aria-label={`About ${company}`}>
					{description}
				</LinkCardDescription>
			</LinkCardContent>
			<LinkCardFooter>
				<LinkCardLabel
					accentColor={false}
					iconFirst
					iconType="link"
					label={link.label}
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
				<ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
					{PROJECTS.map((project) => (
						<ProjectCard key={project.company} {...project} />
					))}
				</ul>
			</PageSection>
			<div className="mt-36">
				<Testimonials />
			</div>
		</PageContainer>
	);
}
