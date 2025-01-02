"use client";

import { Container } from "./container";
import { ModeToggle } from "./mode-toggle";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatarImage from "@/images/avatar.jpeg";
import { type Pages } from "@/types";

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
}

const AvatarContainer = ({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={clsx(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
      )}
      {...rest}
    />
  );
};

const Avatar = ({
  large = false,
  className,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
  large?: boolean;
}) => {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto")}
      {...rest}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        className={clsx(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
        priority
      />
    </Link>
  );
};

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive ? "text-accent-foreground" : "hover:text-accent-foreground"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-accent-foreground/0 via-accent-foreground/40 to-accent-foreground/0" />
        )}
      </Link>
    </li>
  );
}

type DesktopNavigationProps = {
  pages: Pages;
} & React.ComponentPropsWithoutRef<"nav">;
function DesktopNavigation({ pages, ...rest }: DesktopNavigationProps) {
  return (
    <nav {...rest}>
      <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
        {pages.map((page) => (
          <NavItem key={`${page.slug}-desktop`} href={page.slug}>
            {page.title}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}

const MobileNavItem = ({
  page,
  setIsMenuOpen,
}: {
  page: { title: string; slug: string };
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const isActive = usePathname() === page.slug;
  return (
    <DropdownMenuItem
      className={clsx(
        "text-sm font-medium",
        isActive && "text-accent-foreground"
      )}
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href={page.slug} legacyBehavior passHref>
        {page.title}
      </Link>
    </DropdownMenuItem>
  );
};

type MobileNavigationProps = { pages: Pages };
const MobileNavigation = ({ pages }: MobileNavigationProps) => {
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
        className="rounded-md bg-white/90 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
        onInteractOutside={() => setIsMenuOpen(false)}
        onEscapeKeyDown={() => setIsMenuOpen(false)}
      >
        {pages.map((page) => {
          return (
            <MobileNavItem
              key={`${page.slug}-mobile`}
              page={page}
              setIsMenuOpen={setIsMenuOpen}
            />
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type HeaderProps = {
  pages: Pages;
};
export const Header = ({ pages }: HeaderProps) => {
  const isHomePage = usePathname() === "/";

  const headerRef = useRef<React.ComponentRef<"div">>(null);
  const avatarRef = useRef<React.ComponentRef<"div">>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0;
    const upDelay = 64;

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return;
      }

      const { top, height } = headerRef.current.getBoundingClientRect();
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial.current) {
        setProperty("--header-position", "sticky");
      }

      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed");
        removeProperty("--header-top");
        removeProperty("--avatar-top");
      } else {
        removeProperty("--header-inner-position");
        setProperty("--header-top", "0px");
        setProperty("--avatar-top", "0px");
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return;
      }

      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      );

      const borderScale = 1 / (toScale / scale);
      const borderX = (-toX + x) * borderScale;
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty("--avatar-border-transform", borderTransform);
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
    }

    function updateStyles() {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.current = false;
    }

    updateStyles();
    window.addEventListener("scroll", updateStyles, { passive: true });
    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("scroll", updateStyles);
      window.removeEventListener("resize", updateStyles);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        id="header"
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: "var(--avatar-image-transform)" }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div
                id="mobile-nav-container"
                className="flex flex-1 justify-end md:justify-center"
              >
                <MobileNavigation pages={pages} />
                <DesktopNavigation
                  pages={pages}
                  className="pointer-events-auto hidden md:block"
                />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
        />
      )}
    </>
  );
};
