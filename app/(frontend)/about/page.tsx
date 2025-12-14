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
import { ContentRichText } from "@/lib/payload/lexical/content-rich-text";
import {
	getAboutPage,
	getServicesByCategory,
	getSiteConfig,
	type PayloadService,
	toNextMetadata,
} from "@/lib/payload/queries";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

// https://www.robinwieruch.de/work-with-me/ see here for inspiration

export async function generateMetadata(): Promise<Metadata> {
	const page = await getAboutPage();
	return toNextMetadata(page.metadata);
}

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

type SocialLinksProps = {
	github: string;
	linkedin: string;
	notion: string;
};

const SocialLinks = ({ github, linkedin, notion }: SocialLinksProps) => {
	return (
		<Card className="fade-in h-fit animate-in shadow-none duration-1000 lg:ml-20 lg:block lg:max-w-xs">
			<CardContent>
				<ul>
					<SocialButton
						href={github}
						icon={GitHubIcon}
						iconStyleOverride={{ width: "1.25rem", height: "1.25rem" }}
					>
						Follow on GitHub
					</SocialButton>
					<SocialButton
						href={linkedin}
						icon={LinkedInIcon}
						iconStyleOverride={{ width: "1.25rem", height: "1.25rem" }}
					>
						Follow on LinkedIn
					</SocialButton>
					<SocialButton href={notion} icon={NotionIcon}>
						View CV on Notion
					</SocialButton>
					<Link
						className={`mt-6 w-full lg:grid lg:grid-cols-4 ${buttonVariants({ variant: "secondary" })}`}
						href="/contact"
					>
						<MessageCircle className="h-4 w-4 stroke-accent-foreground transition group-active:stroke-zinc-600 lg:col-span-1 lg:place-self-center dark:group-active:stroke-zinc-50 dark:group-hover:stroke-zinc-50" />
						Let's Talk
					</Link>
				</ul>
			</CardContent>
		</Card>
	);
};

export default async function About() {
	const [page, servicesByCategory, siteConfig] = await Promise.all([
		getAboutPage(),
		getServicesByCategory(),
		getSiteConfig(),
	]);
	const developmentServices = servicesByCategory.get("Development") ?? [];
	const professionalServices = servicesByCategory.get("Professional") ?? [];

	const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
		src: siteConfig.profileImages.aboutPageProfileImage,
		width: "512px",
	});

	return (
		<PageContainer>
			<div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
				<div className="lg:pl-20">
					<div className="max-w-xs px-2.5 lg:max-w-none">
						<CloudinaryImage
							alt={siteConfig.profileImages.aboutPageProfileImageAlt}
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
						{page.pageIntro.title}
					</h1>
					<div className="mt-6 text-base">
						<ContentRichText data={page.pageIntro.intro} />
						{page.myExperience && (
							<ContentRichText
								className="mt-8 lg:mt-4"
								data={page.myExperience}
							/>
						)}
					</div>
				</div>
				<div className="hidden lg:flex lg:justify-center">
					<SocialLinks
						github={siteConfig.socialLinks.github}
						linkedin={siteConfig.socialLinks.linkedin}
						notion={siteConfig.socialLinks.notion}
					/>
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
				<SocialLinks
					github={siteConfig.socialLinks.github}
					linkedin={siteConfig.socialLinks.linkedin}
					notion={siteConfig.socialLinks.notion}
				/>
			</div>
		</PageContainer>
	);
}
