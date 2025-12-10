import { memo } from "react";
import { ROUTES } from "@/lib/routes";
import type { Route } from "@/types";
import { NavItem } from "./navigation-item";

const MemoizedNavItem = memo(NavItem);

type DesktopNavigationProps = {
	routeNames: Route[];
} & React.ComponentPropsWithoutRef<"nav">;
export const DesktopNavigation = memo(
	({ routeNames, ...rest }: DesktopNavigationProps) => {
		return (
			<nav {...rest}>
				<ul className="flex rounded-full bg-white/90 px-3 font-medium text-sm shadow-lg ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
					{routeNames.map((title) => {
						const item = ROUTES.get(title);
						if (!item) {
							console.error(`Route not found: ${title}`);
							return null;
						}
						return (
							<MemoizedNavItem href={item.slug} key={`${item.title}-dt`}>
								{item.title}
							</MemoizedNavItem>
						);
					})}
				</ul>
			</nav>
		);
	},
	(prevProps, nextProps) => {
		return (
			JSON.stringify(prevProps.routeNames) ===
			JSON.stringify(nextProps.routeNames)
		);
	},
);

DesktopNavigation.displayName = "DesktopNavigation";
