import { MobileNavItem } from "./mobile-nav-item";

import { ChevronDown } from "lucide-react";
import { memo, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageTitle } from "@/types";

const MemoizedNavItem = memo(MobileNavItem);

type MobileNavigationProps = { pages: PageTitle[] };

export const MobileNavigation = memo(
  ({ pages }: MobileNavigationProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = useCallback(() => {
      setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
      setIsMenuOpen(false);
    }, []);

    return (
      <DropdownMenu open={isMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={toggleMenu}
            className="pointer-events-auto rounded-md bg-white/90 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur aria-expanded:text-accent-foreground md:hidden dark:bg-zinc-800/90 dark:ring-white/10"
            variant="outline"
          >
            Menu
            <ChevronDown />
            <span className="sr-only">Toggle Mobile Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-md bg-white/90 text-sm font-medium capitalize shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
          onInteractOutside={closeMenu}
          onEscapeKeyDown={closeMenu}
        >
          {pages.map(({ title }) => (
            <MemoizedNavItem
              key={`${title}-mob`}
              title={title}
              setIsMenuOpen={setIsMenuOpen}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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

MobileNavigation.displayName = "MobileNavigation";
