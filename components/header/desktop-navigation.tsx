import { NavItem } from "./navigation-item";

import { memo } from "react";

import { ROUTES } from "@/lib/routes";
import { Route } from "@/types";

const MemoizedNavItem = memo(NavItem);

type DesktopNavigationProps = {
  routeNames: Route[];
} & React.ComponentPropsWithoutRef<"nav">;
export const DesktopNavigation = memo(
  ({ routeNames, ...rest }: DesktopNavigationProps) => {
    return (
      <nav {...rest}>
        <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
          {routeNames.map((title) => {
            const item = ROUTES.get(title);
            if (!item) {
              console.error(`Route not found: ${title}`);
              return null;
            }
            return (
              <MemoizedNavItem key={`${item.title}-dt`} href={item.slug}>
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
  }
);

DesktopNavigation.displayName = "DesktopNavigation";
