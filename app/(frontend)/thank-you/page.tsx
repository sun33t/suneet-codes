import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { PageIntro } from "@/components/layout/page-intro";
import { PageSection } from "@/components/layout/page-section";
import { Confetti } from "@/components/shared/confetti";
import { buttonVariants } from "@/components/ui/button";
import { getThankYouPage, toNextMetadata } from "@/lib/payload/queries";

export async function generateMetadata(): Promise<Metadata> {
	const page = await getThankYouPage();
	return toNextMetadata(page.metadata);
}

export default async function ThankYouPage() {
	const page = await getThankYouPage();

	return (
		<PageContainer>
			<PageIntro title={page.pageIntro.title}>
				<p>{page.pageIntro.intro}</p>
			</PageIntro>
			<PageSection>
				<Link className={buttonVariants({ variant: "default" })} href="/">
					Back home
				</Link>
			</PageSection>
			<Confetti />
		</PageContainer>
	);
}
