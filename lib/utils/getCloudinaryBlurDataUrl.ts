"use server";

import { getCldImageUrl } from "next-cloudinary";

export const getCloudinaryBlurDataUrl = async (src: string) => {
  const imageUrl = getCldImageUrl({
    src,
    width: "65ch",
  });
  const cloudinaryResponse = await fetch(imageUrl);
  const arrayBuffer = await cloudinaryResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${cloudinaryResponse.type};base64,${base64}`;
  return dataUrl;
};
