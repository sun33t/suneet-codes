import { Button, buttonVariants } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, memo } from "react";

import { ROUTES } from "@/lib/routes";
import { Route, RouteProperties } from "@/types";

type MobileNavigationButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  isMenuOpen: boolean;
};
export const MobileNavigationButton = ({
  isMenuOpen,
  onClick,
}: MobileNavigationButtonProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-white/90 shadow-lg ring-zinc-900/5 md:hidden dark:bg-zinc-800/90 dark:ring-white/10 hover:dark:bg-zinc-800/90"
      onClick={onClick}
    >
      {isMenuOpen ? (
        <X className="h-[1.5rem] w-[1.5rem]" />
      ) : (
        <Menu className="h-[1.5rem] w-[1.5rem]" />
      )}
    </Button>
  );
};

type MobileNavigationItemProps = {
  item: RouteProperties;
  isActive: boolean;
};

const MobileNavigationItem = ({
  item,
  isActive,
}: MobileNavigationItemProps) => {
  return (
    <li
      key={`${item.title}-mob`}
      className={clsx(
        "w-full py-2 pl-4",
        isActive &&
          "rounded-xl border-none bg-zinc-50 shadow-none dark:bg-zinc-800/50",
        isActive && "text-accent-foreground"
      )}
    >
      <SheetClose asChild className="block w-full">
        <Link href={item.slug}>{item.title}</Link>
      </SheetClose>
    </li>
  );
};

type MobileNavigationMenuProps = {
  routeNames: Route[];
  pathname: string;
};

const MobileNavigationMenu = memo(
  ({ routeNames, pathname }: MobileNavigationMenuProps) => {
    return (
      <div className="mt-4 flex h-full w-full">
        <ul className="w-full space-y-4 capitalize">
          {routeNames.map((title) => {
            const item = ROUTES.get(title);
            if (!item) {
              console.error("Route not found for title:", title);
              return null;
            }
            const isActive = pathname === item.slug;
            return title !== "contact" ? (
              <MobileNavigationItem
                key={`${item.title}-mob`}
                isActive={isActive}
                item={item}
              />
            ) : (
              <li key={`${item.title}-mob`}>
                <SheetClose asChild className="mt-4">
                  <Link
                    className={buttonVariants({ variant: "default" })}
                    href={item.slug}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.routeNames) ===
      JSON.stringify(nextProps.routeNames)
    );
  }
);

MobileNavigationMenu.displayName = "MobileNavigationMenu";

type MobileNavigationProps = ComponentPropsWithoutRef<typeof Sheet> & {
  mobileAvatar: React.ReactElement;
  routeNames: Route[];
};
export const MobileNavigation = ({
  open,
  onOpenChange,
  routeNames,
  mobileAvatar,
}: MobileNavigationProps) => {
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" mobileAvatar={mobileAvatar}>
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation menu
          </SheetDescription>
        </SheetHeader>
        <MobileNavigationMenu pathname={pathname} routeNames={routeNames} />
      </SheetContent>
    </Sheet>
  );
};

MobileNavigation.displayName = "MobileNavigation";
