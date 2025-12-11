import type { Metadata } from "next";

import { NotFound } from "@/components/shared/not-found";

export const metadata: Metadata = {
	title: "404",
	description: "Page not found",
};

export default function NotFoundPage() {
	return (
		<NotFound
			buttonHref="/"
			buttonText="Go back home"
			message="Sorry, we couldn’t find the page you’re looking for."
			title="Page not found"
		/>
	);
}
