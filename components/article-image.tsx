// this works currently with an image in the public directory. However, we could try passing in some props to identify the location of the image within the file hierarchy and use a dynamic import to load the image here. That way we could benefit from nextJS's automatic image optimisation features.
import { AspectRatio } from "./ui/aspect-ratio";

import Image from "next/image";

type ArticleImageProps = {
  src: string;
  alt: string;
  blurDataURL?: string;
  aspectRatio?: number;
};

const defaultBlurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

export const ArticleImage = ({
  src,
  alt,
  blurDataURL = defaultBlurDataURL,
  aspectRatio = 16 / 9,
}: ArticleImageProps) => {
  return (
    <AspectRatio ratio={aspectRatio} className="prose prose-lg mx-auto">
      <Image
        src={src}
        alt={alt}
        fill={true}
        sizes="65ch"
        style={{
          objectFit: "cover",
        }}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
      />
    </AspectRatio>
  );
};
