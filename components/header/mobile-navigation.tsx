import { MobileNavItem } from "./mobile-nav-item";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageTitle } from "@/types";

type MobileNavigationProps = { pages: PageTitle[] };

export const MobileNavigation = ({ pages }: MobileNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={isMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setIsMenuOpen((prev) => !prev)}
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
        onInteractOutside={() => setIsMenuOpen(false)}
        onEscapeKeyDown={() => setIsMenuOpen(false)}
      >
        {pages.map(({ title }) => {
          return (
            <MobileNavItem
              key={`${title}-mob`}
              title={title}
              setIsMenuOpen={setIsMenuOpen}
            />
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
