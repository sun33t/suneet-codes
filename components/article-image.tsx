import { AspectRatio } from "./ui/aspect-ratio";

import { ImageProps } from "next/image";

import { env } from "@/app/env";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

type ArticleImageProps = Omit<ImageProps, "src"> & {
  aspectRatio?: number;
  src: string;
};

export const ArticleImage = async ({
  src,
  alt,
  aspectRatio = 16 / 9,
}: ArticleImageProps) => {
  const imageSrc = `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/articles/${src}`;
  const blurDataUrl = await getCloudinaryBlurDataUrl(imageSrc);

  return (
    <AspectRatio ratio={aspectRatio} className="prose prose-lg mx-auto">
      <CloudinaryImage
        src={imageSrc}
        alt={alt}
        fill={true}
        sizes="65ch"
        style={{
          objectFit: "cover",
        }}
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />
    </AspectRatio>
  );
};
