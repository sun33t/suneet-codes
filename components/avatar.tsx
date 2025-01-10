"use server";

import { CloudinaryImage } from "./cloudinary-image";

import clsx from "clsx";
import Link from "next/link";

import { env } from "@/app/env";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

const avatarImageSrc = `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/profile/avatar_small`;

const avatarBlurDataUrl = await getCloudinaryBlurDataUrl({
  src: avatarImageSrc,
  width: 64,
});

export const Avatar = async ({
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
      <CloudinaryImage
        src={avatarImageSrc}
        alt="profile picture"
        width={64}
        height={64}
        sizes={large ? "4rem" : "2.25rem"}
        blurDataURL={avatarBlurDataUrl}
        placeholder="blur"
        className={clsx(
          "rounded-full bg-zinc-100 object-cover duration-1000 animate-in fade-in dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
      />
    </Link>
  );
};
