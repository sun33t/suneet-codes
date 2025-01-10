"use client";

import { CldImage, type CldImageProps } from "next-cloudinary";

export const CloudinaryImage = (props: CldImageProps) => {
  return <CldImage {...props} />;
};
