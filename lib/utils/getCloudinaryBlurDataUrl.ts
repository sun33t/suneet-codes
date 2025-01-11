"use server";

import { type GetCldImageUrlOptions, getCldImageUrl } from "next-cloudinary";

import { env } from "@/app/env";

const blurDataUrlCache = new Map<string, string>();

export const getCloudinaryBlurDataUrl = async (
  options: GetCldImageUrlOptions
): Promise<{ blurDataUrl: string | undefined; imageSrc: string }> => {
  // create cloudinary image path
  const imageSrc = `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${options.src}`;

  // check cache first for existing blurDataUrl
  if (blurDataUrlCache.has(imageSrc)) {
    return {
      blurDataUrl: blurDataUrlCache.get(imageSrc),
      imageSrc,
    };
  }

  // no cache found, compile cloudinary image url
  const imageUrl = getCldImageUrl({ ...options, src: imageSrc });

  // fetch image information from cloudinary
  const cloudinaryResponse = await fetch(imageUrl);

  // if (Object.keys(cloudinaryResponse).length === 0) {
  //   console.error(
  //     `Failure to fetch image with name: ${options.src} from cloudinary, please check the imageUrl and try again`
  //   );
  //   return null;
  // }

  // convert response to arrayBuffer and then to base64 string
  const arrayBuffer = await cloudinaryResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${cloudinaryResponse.type};base64,${base64}`;

  // cache the generated blurDataUrl for future use
  blurDataUrlCache.set(imageSrc, dataUrl);

  // return the generated blurDataUrl and the compiled image path
  return { blurDataUrl: dataUrl, imageSrc };
};
