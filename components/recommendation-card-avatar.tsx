import { CloudinaryImage } from "./cloudinary-image";
import { Skeleton } from "./ui/skeleton";

import { Suspense } from "react";

import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { Recommendation } from "@/types";

const RecommendationCardAvatar = async ({
  author,
}: {
  author: Recommendation["author"];
}) => {
  const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
    src: `recommendations/${author.imgSrc}`,
    width: "40px",
  });
  return blurDataUrl ? (
    <CloudinaryImage
      src={imageSrc}
      alt={`LinkedIn profile image of ${author.name}`}
      width={40}
      height={40}
      className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800"
      blurDataURL={blurDataUrl}
      placeholder="blur"
    />
  ) : (
    <AvatarSkeleton />
  );
};

const AvatarSkeleton = () => {
  return <Skeleton className="size-10 rounded-full" />;
};

export const SuspendedRecommendationCardAvatar = ({
  author,
}: {
  author: Recommendation["author"];
}) => {
  return (
    <Suspense fallback={<AvatarSkeleton />}>
      <RecommendationCardAvatar author={author} />
    </Suspense>
  );
};
