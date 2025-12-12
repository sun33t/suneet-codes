import type { Metadata } from "next";
import Link from "next/link";

import { SimpleLayout } from "@/components/layout/simple-layout";
import { Confetti } from "@/components/shared/confetti";
import { buttonVariants } from "@/components/ui/button";
import { getThankYouPage, toNextMetadata } from "@/lib/payload/queries";

export async function generateMetadata(): Promise<Metadata> {
	const page = await getThankYouPage();
	return toNextMetadata(page.metadata);
}
export default function ThankYouPage() {
	return (
		<SimpleLayout
			intro="I'm looking forward to learning more about your project and I'll get back to you on the contact details provided as soon as I can. You can also rest assured that your details are kept safe and not passed on to anyone else without your express permission"
			title="Thanks for getting in touch."
		>
			<Link className={buttonVariants({ variant: "default" })} href="/">
				Back home
			</Link>
			<Confetti />
		</SimpleLayout>
	);
}
