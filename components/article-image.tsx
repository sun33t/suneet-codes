import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton, type SkeletonProps } from "./ui/skeleton";

import { ImageProps } from "next/image";
import { Suspense } from "react";

import { CloudinaryImage } from "@/components/cloudinary-image";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

type ArticleImageProps = Omit<ImageProps, "src"> & {
  aspectRatio?: number;
  src: string;
};

const SkeletonArticleImage = ({
  aspectRatio = 16 / 9,
  hasPulse,
}: SkeletonProps & {
  aspectRatio?: ArticleImageProps["aspectRatio"];
}) => {
  return (
    <AspectRatio ratio={aspectRatio} className="prose prose-lg mx-auto">
      <Skeleton hasPulse={hasPulse} className="h-full w-full rounded-3xl" />
    </AspectRatio>
  );
};

export const ArticleImage = async ({
  src,
  alt,
  title,
  aspectRatio = 16 / 9,
}: ArticleImageProps) => {
  const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
    src: `articles/${src}`,
    width: "672px",
  });

  return (
    <AspectRatio ratio={aspectRatio} className="prose prose-lg mx-auto mt-8">
      {blurDataUrl === undefined ? (
        <SkeletonArticleImage
          hasPulse={false}
          aria-label="failed to load article image"
        />
      ) : (
        <CloudinaryImage
          title={title}
          src={imageSrc}
          alt={alt}
          fill={true}
          sizes="672px"
          style={{
            objectFit: "cover",
          }}
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
      )}
    </AspectRatio>
  );
};

export const SuspendedArticleImage = (props: ArticleImageProps) => {
  return (
    <Suspense
      fallback={<SkeletonArticleImage aria-label="loading article image" />}
    >
      <ArticleImage {...props} />
    </Suspense>
  );
};
