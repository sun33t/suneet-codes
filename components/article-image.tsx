import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

import { ImageProps } from "next/image";
import { Suspense } from "react";

import { env } from "@/app/env";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

type ArticleImageProps = Omit<ImageProps, "src"> & {
  aspectRatio?: number;
  src: string;
};

const SkeletonArticleImage = ({
  aspectRatio = 16 / 9,
}: {
  aspectRatio?: ArticleImageProps["aspectRatio"];
}) => {
  return (
    <AspectRatio ratio={aspectRatio} className="prose prose-lg mx-auto">
      <Skeleton className="h-full w-full rounded-3xl" />
    </AspectRatio>
  );
};

export const ArticleImage = async ({
  src,
  alt,
  aspectRatio = 16 / 9,
}: ArticleImageProps) => {
  const imageSrc = `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/articles/${src}`;
  const blurDataUrl = await getCloudinaryBlurDataUrl({
    src: imageSrc,
    width: "672px",
  });

  return (
    <AspectRatio ratio={aspectRatio} className="prose prose-lg mx-auto">
      <CloudinaryImage
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
    </AspectRatio>
  );
};

export const SuspendedArticleImage = (props: ArticleImageProps) => {
  return (
    <Suspense fallback={<SkeletonArticleImage />}>
      <ArticleImage {...props} />
    </Suspense>
  );
};
