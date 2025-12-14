import Link from "next/link";

import { ROUTES } from "@/lib/config/routes";
import type { Route } from "@/types";
import { ContainerInner, ContainerOuter } from "./container";

const NavLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<Link className="transition hover:text-accent-foreground" href={href}>
			{children}
		</Link>
	);
};

type FooterProps = {
	routeNames: Route[];
	siteOwner: string;
};

export const Footer = ({ routeNames, siteOwner }: FooterProps) => {
	return (
		<footer
			className="fade-in mt-32 flex-none animate-in duration-1000"
			id="footer"
		>
			<ContainerOuter>
				<div className="border-zinc-100 border-t pt-10 pb-16 dark:border-zinc-700/40">
					<ContainerInner>
						<div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
							<div className="flex flex-wrap justify-center gap-x-6 gap-y-1 font-medium text-sm capitalize">
								{routeNames.map((title) => {
									const item = ROUTES.get(title);
									if (!item) {
										console.error(`No route found for ${title}`);
										return null;
									}
									return (
										<NavLink href={item.slug} key={`${title}-footer`}>
											{item.title}
										</NavLink>
									);
								})}
							</div>
							<p className="text-sm text-zinc-400 dark:text-zinc-500">
								&copy; {new Date().getFullYear()} {siteOwner}. All rights
								reserved.
							</p>
						</div>
					</ContainerInner>
				</div>
			</ContainerOuter>
		</footer>
	);
};
