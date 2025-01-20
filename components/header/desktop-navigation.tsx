import { NavItem } from "./navigation-item";

import { memo } from "react";

import { Page, PageData } from "@/types";

const MemoizedNavItem = memo(NavItem);

type DesktopNavigationProps = {
  pageNames: Page[];
  pageData: Map<Page, PageData>;
} & React.ComponentPropsWithoutRef<"nav">;
export const DesktopNavigation = memo(
  ({ pageData, pageNames, ...rest }: DesktopNavigationProps) => {
    return (
      <nav {...rest}>
        <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
          {pageNames.map((title) => {
            const item = pageData.get(title);
            return item ? (
              <MemoizedNavItem key={`${item.title}-dt`} href={item.slug}>
                {item.title}
              </MemoizedNavItem>
            ) : null;
          })}
        </ul>
      </nav>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.pageNames.length === nextProps.pageNames.length &&
      prevProps.pageNames.every((pageName, index) => {
        return pageName === nextProps.pageNames[index];
      })
    );
  }
);

DesktopNavigation.displayName = "DesktopNavigation";
