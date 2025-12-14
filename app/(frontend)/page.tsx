import clsx from "clsx";
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
import { env } from "@/lib/config/env";
import { ContentRichText } from "@/lib/payload/lexical/content-rich-text";
import {
	type ArticleWithRelations,
	getAllRoles,
	getLatestArticles,
	getSiteContent,
} from "@/lib/payload/queries";
import { formatDate } from "@/lib/utils/formatDate";

export const dynamic = "force-static";

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

const ArticleCard = ({ article }: { article: ArticleWithRelations }) => {
	return (
		<article>
			<LinkCard href={`/articles/${article.slug}`} key={article.id}>
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
	const [roles, siteContent, latestArticles] = await Promise.all([
		getAllRoles(),
		getSiteContent(),
		getLatestArticles(3),
	]);
	const resumeSectionTitle = siteContent.ui?.resumeSectionTitle ?? "Work";
	const ctaButtonText = siteContent.ui?.ctaButtonText ?? "Let's Talk";

	return (
		<Fragment>
			<Container className="fade-in mt-12 animate-in duration-1000">
				<div className="max-w-2xl">
					<PageIntro title={siteContent.siteOwner}>
						{siteContent.homepage?.bio && (
							<div>
								<ContentRichText data={siteContent.homepage.bio} />
							</div>
						)}
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
									return <ArticleCard article={article} key={article.id} />;
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
