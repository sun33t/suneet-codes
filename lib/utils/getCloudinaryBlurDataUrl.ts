"use server";

import { type GetCldImageUrlOptions, getCldImageUrl } from "next-cloudinary";

import { env } from "@/app/env";

const blurDataUrlCache = new Map<string, string>();

export const getCloudinaryBlurDataUrl = async (
  options: GetCldImageUrlOptions
): Promise<{ blurDataUrl: string | undefined; imageSrc: string }> => {
  const imageSrc = `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${options.src}`;

  if (blurDataUrlCache.has(imageSrc)) {
    return {
      blurDataUrl: blurDataUrlCache.get(imageSrc),
      imageSrc,
    };
  }

  const imageUrl = getCldImageUrl({ ...options, src: imageSrc });

  const cloudinaryResponse = await fetch(imageUrl);

  // if (Object.keys(cloudinaryResponse).length === 0) {
  //   console.error(
  //     `Failure to fetch image with name: ${options.src} from cloudinary, please check the imageUrl and try again`
  //   );
  //   return null;
  // }
  const arrayBuffer = await cloudinaryResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${cloudinaryResponse.type};base64,${base64}`;

  blurDataUrlCache.set(imageSrc, dataUrl);

  return { blurDataUrl: dataUrl, imageSrc };
};
