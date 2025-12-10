import Link from "next/link";
import { Container } from "./container";
import { buttonVariants } from "./ui/button";

interface NotFoundPageProps {
	title: string;
	message: string;
	buttonText: string;
	buttonHref: string;
}

export function NotFound({
	title,
	message,
	buttonText,
	buttonHref,
}: NotFoundPageProps) {
	return (
		<Container className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<main aria-label="404 error page" className="text-center">
				<p className="font-semibold text-base">404</p>
				<h1 className="mt-4 font-semibold text-5xl tracking-tight sm:text-7xl">
					{title}
				</h1>
				<p className="mt-6 text-pretty font-medium text-lg text-muted-foreground sm:text-xl/8">
					{message}
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						className={buttonVariants({ variant: "default" })}
						href={buttonHref}
					>
						{buttonText}
					</Link>
				</div>
			</main>
		</Container>
	);
}
