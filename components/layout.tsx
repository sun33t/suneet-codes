import { Footer } from "./footer";
import { Header } from "./header";
import { Toaster } from "./ui/toaster";

import { useMemo } from "react";

import { env } from "@/app/env";
import { PAGE_TITLES } from "@/content/pages";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;

const avatarImageSrc = `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/profile/avatar_small`;

const avatarBlurDataUrl = await getCloudinaryBlurDataUrl({
  src: avatarImageSrc,
  width: "64px",
});

export const Layout = ({ children }: LayoutProps) => {
  const memoizedPages = useMemo(() => PAGE_TITLES, []);
  return (
    <div id="layout-container" className="flex w-full">
      <PageBackground />
      <div className="relative flex w-full flex-col">
        {avatarBlurDataUrl && (
          <Header pages={memoizedPages} avatarBlurDataUrl={avatarBlurDataUrl} />
        )}
        <main className="flex-auto">{children}</main>
        <Footer pages={memoizedPages} />
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
