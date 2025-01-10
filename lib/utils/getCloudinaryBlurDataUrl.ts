"use server";

import { type GetCldImageUrlOptions, getCldImageUrl } from "next-cloudinary";

const blurDataUrlCache = new Map<string, string>();

export const getCloudinaryBlurDataUrl = async (
  options: GetCldImageUrlOptions
) => {
  if (blurDataUrlCache.has(options.src)) {
    return blurDataUrlCache.get(options.src);
  }

  const imageUrl = getCldImageUrl(options);
  const cloudinaryResponse = await fetch(imageUrl);
  const arrayBuffer = await cloudinaryResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${cloudinaryResponse.type};base64,${base64}`;

  blurDataUrlCache.set(options.src, dataUrl);

  return dataUrl;
};
