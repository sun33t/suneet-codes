import Link from "next/link";

import { env } from "@/app/env";
import { ContainerInner, ContainerOuter } from "@/components/container";
import { PageTitle } from "@/types";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="transition hover:text-accent-foreground">
      {children}
    </Link>
  );
};

export const Footer = ({ pages }: { pages: PageTitle[] }) => {
  return (
    <footer
      id="footer"
      className="mt-32 flex-none duration-1000 animate-in fade-in"
    >
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div
                className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium capitalize"
                aria-label="Footer Navigation"
              >
                {pages.map(({ title }) => (
                  <NavLink key={`${title}-footer`} href={title}>
                    {title}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} {env.PROJECT_AUTHOR}. All
                rights reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
};
