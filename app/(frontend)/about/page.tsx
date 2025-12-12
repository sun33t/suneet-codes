// cspell:disable
import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link, { type LinkProps } from "next/link";
import type React from "react";
import { memo, type PropsWithChildren } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { CloudinaryImage } from "@/components/shared/cloudinary-image";
import { NotionIcon } from "@/components/shared/notion-icon";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGE_METADATA } from "@/content/data/pageMetadata";
import { env } from "@/lib/config/env";
import {
	getServicesByCategory,
	getSiteContent,
	type PayloadService,
} from "@/lib/payload/queries";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

// https://www.robinwieruch.de/work-with-me/ see here for inspiration

const profileImageSrc = `profile/profile_wide`;

const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
	src: profileImageSrc,
	width: "512px",
});

export const metadata: Metadata = { ...PAGE_METADATA.about };

export const dynamic = "force-static";

type ServiceCardSectionProps = {
	title: string;
	services: PayloadService[];
};

const ServiceCardSection = ({ title, services }: ServiceCardSectionProps) => {
	return (
		<div className="mt-12 md:mt-0">
			<h3 className="pl-6 font-semibold underline">{title}</h3>
			<div className="mt-4 grid h-full grid-cols-1 gap-4">
				{services.map((item) => (
					<ServiceCard
						description={item.description}
						key={item.id}
						title={item.title}
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
			<CardContent className="font-extralight text-sm">
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
			className={`mt-6 w-full lg:grid lg:grid-cols-4 ${buttonVariants({ variant: "secondary" })}`}
			href={href}
			rel={isExternal ? "noopener noreferrer" : undefined}
			target={isExternal ? "_blank" : undefined}
			{...rest}
		>
			<Icon
				className="fill-accent-foreground transition group-active:stroke-zinc-600 lg:col-span-1 lg:place-self-center dark:group-active:stroke-zinc-50 dark:group-hover:stroke-zinc-50"
				style={iconStyleOverride}
			/>
			{children}
		</Link>
	);
};

const SocialLinks = ({ ctaButtonText }: { ctaButtonText: string }) => {
	return (
		<Card className="fade-in h-fit animate-in shadow-none duration-1000 lg:ml-20 lg:block lg:max-w-xs">
			<CardContent>
				<ul>
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
						className={`mt-6 w-full lg:grid lg:grid-cols-4 ${buttonVariants({ variant: "secondary" })}`}
						href="/contact"
					>
						<MessageCircle className="h-4 w-4 stroke-accent-foreground transition group-active:stroke-zinc-600 lg:col-span-1 lg:place-self-center dark:group-active:stroke-zinc-50 dark:group-hover:stroke-zinc-50" />
						{ctaButtonText}
					</Link>
				</ul>
			</CardContent>
		</Card>
	);
};

export default async function About() {
	const siteContent = await getSiteContent();
	const servicesByCategory = await getServicesByCategory();
	const developmentServices = servicesByCategory.get("Development") ?? [];
	const professionalServices = servicesByCategory.get("Professional") ?? [];

	const pageTitle = siteContent.about?.pageTitle ?? "A little bit about me";
	const profileImageAlt =
		siteContent.about?.profileImageAlt ??
		"Side profile photo of Suneet on the coast of Iceland at sunset";
	const ctaButtonText = siteContent.ui?.ctaButtonText ?? "Let's Talk";

	return (
		<PageContainer>
			<div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
				<div className="lg:pl-20">
					<div className="max-w-xs px-2.5 lg:max-w-none">
						<CloudinaryImage
							alt={profileImageAlt}
							blurDataURL={blurDataUrl}
							className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
							height={512}
							placeholder="blur"
							sizes="(min-width: 1024px) 32rem, 20rem"
							src={imageSrc}
							width={512}
						/>
					</div>
				</div>
				<div className="prose dark:prose-invert prose-strong:font-semibold prose-strong:underline lg:order-first lg:row-span-2">
					<h1 className="font-bold text-4xl tracking-tight sm:text-5xl">
						{pageTitle}
					</h1>
					<div className="mt-6 text-base">
						<MyValues />
						<MyExperience />
					</div>
				</div>
				<div className="hidden lg:flex lg:justify-center">
					<SocialLinks ctaButtonText={ctaButtonText} />
				</div>
			</div>
			<div className="mt-8 lg:mt-4">
				<h2 className="font-bold text-2xl">I&apos;m available for:</h2>
			</div>
			<div className="mt-4 grid gap-6 md:grid-cols-2">
				<ServiceCardSection
					services={developmentServices}
					title="Development Services"
				/>
				<ServiceCardSection
					services={professionalServices}
					title="Professional Services"
				/>
			</div>
			<div className="mt-24 lg:hidden">
				<SocialLinks ctaButtonText={ctaButtonText} />
			</div>
		</PageContainer>
	);
}

const MyValues = () => {
	return (
		<div>
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
		</div>
	);
};
const MyExperience = () => {
	return (
		<div>
			<div className="mt-8 lg:mt-4">
				<h2 className="font-bold text-2xl">My experience:</h2>
			</div>
			<p>
				{`Hi! I'm Suneet, I have an `}
				<strong>MSc in Computing</strong>
				{` with my dissertation focussing on bringing cultural heritage experiences to those of limited mobility through the use of mixed reality technologies.`}
			</p>
			<p>
				{`I'm a graduate of the `}
				<strong>
					<Link
						className="text-accent-foreground"
						href="https://northcoders.com"
						rel="noopener noreferrer"
						target="_blank"
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
				{` for a variety of national and international brands.`}
			</p>
			<p>
				{`My experience includes `}
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
				<strong>greenfield projects</strong>.
			</p>
			<p>
				{`Although I have some experience working in java, ruby, and python, I'm most experienced with `}
				<strong>node and TypeScript</strong>
				{`. Its a versatile and vibrant stack where the tooling and libraries are constantly being moved forwards.`}
			</p>
			<p>
				{`My most recent experience as a team-member has been at `}
				<Link
					className="font-semibold text-accent-foreground"
					href="https://www.trustalliancegroup.org/our-companies/lumin"
					rel="noopener noreferrer"
					target="_blank"
				>
					Lumin
				</Link>
				{` as a fullstack developer where I helped to address technical debt in their legacy react application and to extend their utilisation of AWS infrastructure to achieve improved performance and reliability at scale.`}
			</p>
		</div>
	);
};
