import { MobileAvatar, SuspendedAvatar } from "./avatar";
import { Footer } from "./footer";
import { Toaster } from "./ui/toaster";

import { useMemo } from "react";

import { Header } from "@/components/header";
import { PAGE_DATA } from "@/content/pages";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;

export const Layout = ({ children }: LayoutProps) => {
  const memoizedPageNames = useMemo(() => Array.from(PAGE_DATA.keys()), []);

  return (
    <div id="layout-container" className="flex w-full">
      <PageBackground />
      <div className="relative flex w-full flex-col">
        <Header
          pageNames={memoizedPageNames}
          pageData={PAGE_DATA}
          headerAvatar={<SuspendedAvatar />}
          homepageAvatar={<SuspendedAvatar isHomePage={true} />}
          mobileAvatar={<MobileAvatar />}
        />
        <main className="flex-auto">{children}</main>
        <Footer pageNames={memoizedPageNames} pageData={PAGE_DATA} />
        <Toaster />
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
