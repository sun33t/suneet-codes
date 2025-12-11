import type { Metadata } from "next";

import { NotFound } from "@/components/shared/not-found";

export const metadata: Metadata = {
	title: `404`,
};

export default function NotFoundPage() {
	return (
		<NotFound
			buttonHref="/articles"
			buttonText="Go back to articles"
			message="Sorry, we couldn’t find the article you’re looking for."
			title="Article not found"
		/>
	);
}
