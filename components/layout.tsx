import { Footer } from "./footer";
import { Header } from "./header";

import { useMemo } from "react";

import { PAGE_TITLES } from "@/content/pages";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;

export const Layout = ({ children }: LayoutProps) => {
  const memoizedPages = useMemo(() => PAGE_TITLES, []);
  return (
    <div id="layout-container" className="flex w-full">
      <PageBackground />
      <div className="relative flex w-full flex-col">
        <Header pages={memoizedPages} />
        <main className="flex-auto">{children}</main>
        <Footer pages={memoizedPages} />
      </div>
    </div>
  );
};

const PageBackground = () => (
  <div
    id="layout-bg-container"
    className="fixed inset-0 flex justify-center sm:px-8"
  >
    <div className="flex w-full max-w-7xl lg:px-8">
      <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
    </div>
  </div>
);
