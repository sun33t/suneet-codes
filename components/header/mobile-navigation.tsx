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
import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

import { Page, PageData } from "@/types";

type MobileNavigationButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  isMenuOpen: boolean;
};
export const MobileNavigationButton = ({
  isMenuOpen,
  ...rest
}: MobileNavigationButtonProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-white/90 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur hover:bg-white/90 hover:text-accent-foreground aria-expanded:text-accent-foreground md:hidden dark:bg-zinc-800/90 dark:ring-white/10 hover:dark:bg-zinc-800/90"
      {...rest}
    >
      {isMenuOpen ? (
        <X className="h-[1.5rem] w-[1.5rem]" />
      ) : (
        <AlignRight className="h-[1.5rem] w-[1.5rem]" />
      )}
    </Button>
  );
};

type MobileNavigationProps = ComponentPropsWithoutRef<typeof Sheet> & {
  mobileAvatar: React.ReactElement;
  pageNames: Page[];
  pageData: Map<Page, PageData>;
};
export const MobileNavigation = ({
  open,
  onOpenChange,
  pageData,
  pageNames,
  mobileAvatar,
}: MobileNavigationProps) => {
  const pathname = usePathname();
  const contactPageData = pageData.get("contact");
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" mobileAvatar={mobileAvatar}>
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation menu
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex h-full w-full">
          <ul className="w-full space-y-4 capitalize">
            {pageNames.map((title) => {
              const item = pageData.get(title);
              const isActive = pathname === `/${title}`;
              return title !== "contact" && item ? (
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
              ) : null;
            })}
            {contactPageData && (
              <li>
                <SheetClose asChild className="mt-4">
                  <Link
                    className={buttonVariants({ variant: "default" })}
                    href={contactPageData.slug}
                  >
                    {contactPageData.title}
                  </Link>
                </SheetClose>
              </li>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
