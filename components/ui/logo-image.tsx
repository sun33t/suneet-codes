import { CloudinaryImage } from "../cloudinary-image";
import { Skeleton, SkeletonProps } from "./skeleton";

import { Suspense } from "react";

import { Role } from "@/content/roles";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

const LogoSkeleton = (props: SkeletonProps) => {
  return <Skeleton {...props} className="h-5 w-5 rounded-full" />;
};

const LogoImage = async ({ filename }: Pick<Role, "filename">) => {
  const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
    src: `logos/${filename}`,
    width: "20px",
  });

  return blurDataUrl ? (
    <CloudinaryImage
      src={imageSrc}
      width={20}
      height={20}
      alt={`${filename} logo`}
      sizes="20px"
      placeholder="blur"
      blurDataURL={blurDataUrl}
      className="h-5 w-5"
    />
  ) : (
    <LogoSkeleton hasPulse={false} />
  );
};

export const SuspendedLogoImage = (props: Pick<Role, "filename">) => {
  return (
    <Suspense fallback={<LogoSkeleton />}>
      <LogoImage {...props} />
    </Suspense>
  );
};
