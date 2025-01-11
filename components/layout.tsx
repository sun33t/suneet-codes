import { SuspendedAvatar } from "./avatar";
import { Footer } from "./footer";
import { Header } from "./header";
import { Toaster } from "./ui/toaster";

import { PAGE_TITLES } from "@/content/pages";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;

export const Layout = async ({ children }: LayoutProps) => {
  return (
    <div id="layout-container" className="flex w-full">
      <PageBackground />
      <div className="relative flex w-full flex-col">
        <Header
          pages={PAGE_TITLES}
          headerAvatar={<SuspendedAvatar />}
          homepageAvatar={<SuspendedAvatar isHomePage={true} />}
        />
        <main className="flex-auto">{children}</main>
        <Footer pages={PAGE_TITLES} />
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
