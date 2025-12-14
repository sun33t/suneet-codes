import { CalendarPlus2, MailIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/features/contact-form";
import { PageContainer } from "@/components/layout/page-container";
import { PageIntro } from "@/components/layout/page-intro";
import { PageSection } from "@/components/layout/page-section";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContentRichText } from "@/lib/payload/lexical/content-rich-text";
import {
	getAllServices,
	getContactPage,
	getSiteConfig,
	toNextMetadata,
} from "@/lib/payload/queries";

export async function generateMetadata(): Promise<Metadata> {
	const page = await getContactPage();
	return toNextMetadata(page.metadata);
}

export default async function Contact() {
	const [page, services, siteConfig] = await Promise.all([
		getContactPage(),
		getAllServices(),
		getSiteConfig(),
	]);

	return (
		<PageContainer>
			<PageIntro title={page.pageIntro.title}>
				<ContentRichText data={page.pageIntro.intro} />
			</PageIntro>
			<PageSection>
				<Card className="mx-auto mb-16 max-w-xl px-6 py-6 shadow-none">
					<CardContent className="pb-0">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<Link
								aria-label="Book some time in my calendar to catch up."
								className={`w-full ${buttonVariants({ variant: "secondary" })}`}
								href={siteConfig.contact.calendarUrl}
								rel="noopener noreferrer"
								target="_blank"
							>
								Calendar
								<CalendarPlus2 className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-active:stroke-zinc-50 dark:group-hover:stroke-zinc-50" />
							</Link>
							<Link
								aria-label="Send me an email."
								className={`w-full ${buttonVariants({ variant: "secondary" })}`}
								href={`mailto:${siteConfig.contact.email}`}
							>
								Email
								<MailIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-active:stroke-zinc-50 dark:group-hover:stroke-zinc-50" />
							</Link>
						</div>
					</CardContent>
				</Card>
				<ContactForm services={services} />
			</PageSection>
		</PageContainer>
	);
}
