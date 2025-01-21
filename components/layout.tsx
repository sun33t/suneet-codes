import { MobileAvatar, SuspendedAvatar } from "./avatar";
import { Footer } from "./footer";
import { Toaster } from "./ui/toaster";

import { useMemo } from "react";

import { Header } from "@/components/header";
import { ROUTES } from "@/lib/routes";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;

export const Layout = ({ children }: LayoutProps) => {
  const memoizedRouteNames = useMemo(() => Array.from(ROUTES.keys()), []);

  return (
    <div id="layout-container" className="flex w-full">
      <PageBackground />
      <div className="relative flex w-full flex-col">
        <Header
          routeNames={memoizedRouteNames}
          headerAvatar={<SuspendedAvatar />}
          homepageAvatar={<SuspendedAvatar isHomePage={true} />}
          mobileAvatar={<MobileAvatar />}
        />
        <main className="flex-auto">{children}</main>
        <Footer routeNames={memoizedRouteNames} />
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
