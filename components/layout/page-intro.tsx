import type { PropsWithChildren } from "react";

type PageHeadingProps = PropsWithChildren<{
	title: string;
}>;

export const PageIntro = ({ title, children }: PageHeadingProps) => {
	return (
		<div>
			<header className="max-w-2xl">
				<h1
					aria-label={`${title} page`}
					className="font-bold text-4xl tracking-tight sm:text-5xl"
				>
					{title}
				</h1>
				<div className="mt-6 text-base">{children}</div>
			</header>
		</div>
	);
};
