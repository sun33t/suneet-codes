import { Suspense, memo } from "react";

import { CloudinaryImage } from "@/components/cloudinary-image";
import { Skeleton, SkeletonProps } from "@/components/ui/skeleton";
import { Project } from "@/content/projects";
import { Role } from "@/content/roles";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

const LogoSkeleton = (props: SkeletonProps) => {
  return <Skeleton {...props} className="h-5 w-5 rounded-full" />;
};

type LogoImageProps = Pick<Role, "filename"> | Pick<Project, "filename">;

const LogoImage = async ({ filename }: LogoImageProps) => {
  const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
    src: `logos/${filename}`,
    width: "20px",
  });

  return blurDataUrl ? (
    <CloudinaryImage
      src={imageSrc}
      width={20}
      height={20}
      alt={`Company logo for ${filename}`}
      sizes="20px"
      placeholder="blur"
      blurDataURL={blurDataUrl}
      className="h-5 w-5"
    />
  ) : (
    <LogoSkeleton hasPulse={false} />
  );
};

export const SuspendedLogoImage = memo((props: LogoImageProps) => {
  return (
    <Suspense fallback={<LogoSkeleton />}>
      <LogoImage {...props} />
    </Suspense>
  );
});

SuspendedLogoImage.displayName = "SuspendedLogoImage";
