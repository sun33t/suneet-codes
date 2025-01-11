import { Suspense } from "react";

import { CloudinaryImage } from "@/components/cloudinary-image";
import { Skeleton, SkeletonProps } from "@/components/ui/skeleton";
import { Project } from "@/content/projects";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

const ProjectLogoSkeleton = (props: SkeletonProps) => {
  return <Skeleton {...props} className="h-5 w-5 rounded-full" />;
};

const ProjectLogo = async ({ filename }: Pick<Project, "filename">) => {
  const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
    src: `logos/${filename}`,
    width: "24px",
  });

  return blurDataUrl ? (
    <CloudinaryImage
      src={imageSrc}
      width={24}
      height={24}
      alt={`${filename} logo`}
      sizes="24px"
      placeholder="blur"
      blurDataURL={blurDataUrl}
      className="h-6 w-6"
    />
  ) : (
    <ProjectLogoSkeleton hasPulse={false} />
  );
};

export const SuspendedProjectLogo = (props: Pick<Project, "filename">) => {
  return (
    <Suspense fallback={<ProjectLogoSkeleton />}>
      <ProjectLogo {...props} />
    </Suspense>
  );
};
