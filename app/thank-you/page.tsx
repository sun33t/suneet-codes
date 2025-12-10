import type { Metadata } from "next";
import Link from "next/link";

import { Confetti } from "@/components/confetti";
import { SimpleLayout } from "@/components/simple-layout";
import { buttonVariants } from "@/components/ui/button";
import { PAGE_METADATA } from "@/content/pageMetadata";

export const metadata: Metadata = { ...PAGE_METADATA["thank-you"] };
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
