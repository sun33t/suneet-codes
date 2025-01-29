import { CloudinaryImage } from "./cloudinary-image";
import { Skeleton, type SkeletonProps } from "./ui/skeleton";

import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, Suspense } from "react";

import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";

export const AvatarContainer = ({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={clsx(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
      )}
      {...rest}
    />
  );
};

type AvatarProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "style" | "className"
> & {
  isHomePage?: boolean;
};

export const Avatar = async ({ isHomePage = false, ...rest }: AvatarProps) => {
  const avatarImageSrc = `profile/avatar_small`;

  const { blurDataUrl } = await getCloudinaryBlurDataUrl({
    src: avatarImageSrc,
    width: "64px",
  });

  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(
        isHomePage && "block h-16 w-16 origin-left",
        "pointer-events-auto"
      )}
      style={
        isHomePage ? { transform: "var(--avatar-image-transform)" } : undefined
      }
      {...rest}
    >
      {blurDataUrl ? (
        <CloudinaryImage
          src={withCloudinaryCloudName("profile/avatar_small")}
          alt="profile picture"
          width={64}
          height={64}
          sizes={isHomePage ? "4rem" : "2.25rem"}
          blurDataURL={blurDataUrl}
          placeholder="blur"
          className={clsx(
            "rounded-full bg-zinc-100 object-cover duration-1000 animate-in fade-in dark:bg-zinc-800",
            isHomePage ? "h-16 w-16" : "h-9 w-9"
          )}
        />
      ) : (
        <AvatarSkeleton hasPulse={false} isHomePage={isHomePage} />
      )}
    </Link>
  );
};
export const MobileAvatar = async () => {
  const avatarImageSrc = `profile/avatar_small`;

  const { blurDataUrl } = await getCloudinaryBlurDataUrl({
    src: avatarImageSrc,
    width: "64px",
  });

  return blurDataUrl ? (
    <CloudinaryImage
      src={withCloudinaryCloudName("profile/avatar_small")}
      alt="profile picture"
      width={64}
      height={64}
      sizes="2.25rem"
      blurDataURL={blurDataUrl}
      placeholder="blur"
      className={
        "h-9 w-9 rounded-full bg-zinc-100 object-cover duration-1000 animate-in fade-in dark:bg-zinc-800"
      }
    />
  ) : (
    <AvatarSkeleton hasPulse={false} isHomePage={false} />
  );
};

const AvatarSkeleton = ({
  isHomePage,
  ...rest
}: SkeletonProps & { isHomePage?: boolean }) => {
  const classes = clsx("rounded-full", isHomePage ? "h-16 w-16" : "h-9 w-9");

  return <Skeleton className={classes} {...rest} />;
};

export const SuspendedAvatar = ({ isHomePage }: { isHomePage?: boolean }) => {
  return (
    <Suspense fallback={<AvatarSkeleton isHomePage={isHomePage} />}>
      <Avatar isHomePage={isHomePage} />
    </Suspense>
  );
};
