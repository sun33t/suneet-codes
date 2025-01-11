import { NavItem } from "./navigation-item";

import { PageTitle } from "@/types";

type DesktopNavigationProps = {
  pages: PageTitle[];
} & React.ComponentPropsWithoutRef<"nav">;
export const DesktopNavigation = ({
  pages,
  ...rest
}: DesktopNavigationProps) => {
  return (
    <nav {...rest}>
      <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
        {pages.map(({ title }) => (
          <NavItem key={`${title}-dt`} href={`/${title}`}>
            {title}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
};
