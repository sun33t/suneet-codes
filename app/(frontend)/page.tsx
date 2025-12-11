import clsx from "clsx";
import type { Article } from "content-collections";
import Link, { type LinkProps } from "next/link";
import { Fragment } from "react";
import { Resume } from "@/components/features/resume";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { BlueskyIcon } from "@/components/shared/bluesky-icon";
import {
	LinkCard,
	LinkCardContent,
	LinkCardDescription,
	LinkCardEyebrow,
	LinkCardFooter,
	LinkCardHeader,
	LinkCardLabel,
	LinkCardTitle,
} from "@/components/shared/link-card";
import { NotionIcon } from "@/components/shared/notion-icon";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/social-icons";
import type { Role } from "@/content/data/roles";
import { env } from "@/lib/config/env";
import { latestArticles } from "@/lib/content/articles";
import {
	getAllRoles,
	getSiteContent,
	type PayloadRole,
} from "@/lib/payload/queries";
import { formatDate } from "@/lib/utils/formatDate";

export const dynamic = "force-static";

function transformToRole(payload: PayloadRole): Role {
	return {
		company: payload.company,
		title: payload.title,
		logoDetails: {
			src: payload.logoDetails?.src ?? "",
			pixelWidth: payload.logoDetails?.pixelWidth ?? "20px",
			imageWidth: payload.logoDetails?.imageWidth ?? 20,
			imageHeight: payload.logoDetails?.imageHeight ?? 20,
			className: payload.logoDetails?.className ?? "h-5 w-5 rounded-full",
		},
		href: payload.href,
		start: payload.start,
		end:
			payload.end === "Present"
				? { label: "Present", dateTime: new Date().getFullYear().toString() }
				: payload.end,
	};
}

const SocialLink = ({
	icon: Icon,
	iconClasses,
	...props
}: LinkProps & {
	icon:
		| typeof LinkedInIcon
		| typeof GitHubIcon
		| typeof NotionIcon
		| typeof BlueskyIcon;
	iconClasses?: string;
}) => {
	const iconClassName = clsx("fill-accent-foreground transition", iconClasses);
	return (
		<Link {...props} rel="noopener noreferrer" target="_blank">
			<Icon className={iconClassName} />
		</Link>
	);
};

const ArticleCard = ({ article }: { article: Article }) => {
	return (
		<article>
			<LinkCard href={`/articles/${article.slug}`} key={article._meta.fileName}>
				<LinkCardHeader>
					<LinkCardEyebrow>
						<time dateTime={article.date}>{formatDate(article.date)}</time>
					</LinkCardEyebrow>
					<LinkCardTitle>{article.title}</LinkCardTitle>
				</LinkCardHeader>
				<LinkCardContent>
					<LinkCardDescription>{article.description}</LinkCardDescription>
				</LinkCardContent>
				<LinkCardFooter>
					<LinkCardLabel label="Read article" />
				</LinkCardFooter>
			</LinkCard>
		</article>
	);
};

const NoArticlesCard = () => {
	return (
		<LinkCard
			href="https://fakebuddhaquotes.com/silence-is-an-empty-space-space-is-the-home-of-the-awakened-mind/"
			isExternal
		>
			<LinkCardHeader>
				<LinkCardTitle>Articles Coming Soon...</LinkCardTitle>
			</LinkCardHeader>
			<LinkCardContent>
				<LinkCardDescription className="text-foreground">
					<blockquote className="mt-6 border-l-2 pl-6 italic">
						“Silence is an empty space. Space is the home of the awakened mind.”
					</blockquote>
					<p className="pt-4 text-right">{`- 🧘 Buddha... maybe?`}</p>
				</LinkCardDescription>
			</LinkCardContent>
		</LinkCard>
	);
};

export default async function Home() {
	const [payloadRoles, siteContent] = await Promise.all([
		getAllRoles(),
		getSiteContent(),
	]);
	const roles = payloadRoles.map(transformToRole);
	const resumeSectionTitle = siteContent.ui?.resumeSectionTitle ?? "Work";
	const ctaButtonText = siteContent.ui?.ctaButtonText ?? "Let's Talk";

	return (
		<Fragment>
			<Container className="fade-in mt-12 animate-in duration-1000">
				<div className="max-w-2xl">
					<PageIntro title={env.PROJECT_AUTHOR}>
						<div className="space-y-4 text-muted-foreground">
							<p>
								👋, I&apos;m a developer based in the UK. I&apos;ve been
								building software in the{" "}
								<span className="font-semibold text-foreground underline">
									e-commerce
								</span>
								,{" "}
								<span className="font-semibold text-foreground underline">
									retail
								</span>{" "}
								and{" "}
								<span className="font-semibold text-foreground underline">
									hospitality
								</span>{" "}
								spaces as well as for the{" "}
								<span className="font-semibold text-foreground underline">
									energy and comms ombudsman
								</span>{" "}
								over a five year period after completing my{" "}
								<span className="font-semibold text-foreground underline">
									MSc in Computing
								</span>
								.
							</p>
							<p>
								I love to create digital experiences which{" "}
								<span className="font-semibold text-foreground underline">
									build community
								</span>{" "}
								and provide{" "}
								<span className="font-semibold text-foreground underline">
									meaningful value
								</span>{" "}
								.
							</p>
							<p>
								If you&apos;d like to learn more about my journey into dev,
								here&apos;s my{" "}
								<Link
									className="font-semibold text-accent-foreground"
									href="/about"
								>
									about page
								</Link>
								, or if you&apos;re interested in working together here&apos;s
								my{" "}
								<Link
									className="font-semibold text-accent-foreground"
									href={env.PROJECT_NOTION_URL}
									rel="noopener noreferrer"
									target="_blank"
								>
									cv
								</Link>
								, or use the links below.
							</p>
							<p>
								When I&apos;m not working or learning new skills, I like to
								read, cook, travel with my wife and spend time in the outdoors
								with my friends.
							</p>
						</div>
						<div className="mt-6 flex items-center gap-4">
							<SocialLink
								aria-label="Follow on GitHub"
								href={env.PROJECT_GITHUB_URL}
								icon={GitHubIcon}
								iconClasses="h-6 w-6"
							/>
							<SocialLink
								aria-label="Follow on LinkedIn"
								href={env.PROJECT_LINKEDIN_URL}
								icon={LinkedInIcon}
								iconClasses="h-6 w-6"
							/>
							<SocialLink
								aria-label="Read my CV on Notion"
								href={env.PROJECT_NOTION_URL}
								icon={NotionIcon}
								iconClasses="h-5 w-5"
							/>
							<SocialLink
								aria-label="Follow me on bluesky"
								href={env.PROJECT_BLUESKY_URL}
								icon={BlueskyIcon}
								iconClasses="h-5 w-5"
							/>
						</div>
					</PageIntro>
				</div>
			</Container>
			<Container className="fade-in mt-24 animate-in duration-1000 md:mt-28">
				<div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
					<div id="latest-articles-container">
						<div className="flex flex-col gap-16">
							{latestArticles.length > 0 ? (
								latestArticles.map((article) => {
									return (
										<ArticleCard
											article={article}
											key={article._meta.fileName}
										/>
									);
								})
							) : (
								<NoArticlesCard />
							)}
						</div>
					</div>
					<div className="space-y-10 lg:pl-16 xl:pl-24">
						{/* <Newsletter /> */}
						<div>
							<Resume
								ctaButtonText={ctaButtonText}
								roles={roles}
								sectionTitle={resumeSectionTitle}
							/>
						</div>
					</div>
				</div>
			</Container>
		</Fragment>
	);
}
