import { Suspense, memo } from "react";

import { CloudinaryImage } from "@/components/cloudinary-image";
import { Skeleton, SkeletonProps } from "@/components/ui/skeleton";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { type LogoDetails } from "@/types";

const LogoSkeleton = (props: SkeletonProps) => {
  return <Skeleton {...props} className="h-5 w-5 rounded-full" />;
};

type LogoImageProps = {
  company: string;
  logoDetails: LogoDetails;
};

const LogoImage = async ({ logoDetails, company }: LogoImageProps) => {
  const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
    src: `logos/${logoDetails.src}`,
    width: logoDetails.pixelWidth,
  });

  return blurDataUrl ? (
    <CloudinaryImage
      src={imageSrc}
      width={logoDetails.imageWidth}
      height={logoDetails.imageHeight}
      alt={`Company logo for ${company}`}
      sizes={logoDetails.pixelWidth}
      blurDataURL={blurDataUrl}
      className={logoDetails.className}
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
