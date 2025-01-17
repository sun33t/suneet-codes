import { NavItem } from "./navigation-item";

import { memo } from "react";

import { PageTitle } from "@/types";

const MemoizedNavItem = memo(NavItem);

type DesktopNavigationProps = {
  pages: PageTitle[];
} & React.ComponentPropsWithoutRef<"nav">;
export const DesktopNavigation = memo(
  ({ pages, ...rest }: DesktopNavigationProps) => {
    return (
      <nav {...rest}>
        <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
          {pages.map(({ title }) => (
            <MemoizedNavItem key={`${title}-dt`} href={`/${title}`}>
              {title}
            </MemoizedNavItem>
          ))}
        </ul>
      </nav>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.pages.length === nextProps.pages.length &&
      prevProps.pages.every((page, index) => {
        return page.title === nextProps.pages[index].title;
      })
    );
  }
);

DesktopNavigation.displayName = "DesktopNavigation";
