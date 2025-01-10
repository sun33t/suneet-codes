"use client";

import { CldImage, type CldImageProps } from "next-cloudinary";

export const CloudinaryImage = (props: CldImageProps) => {
  if (!props.src || !props.alt) {
    console.warn("CloudinaryImage: missing required props src and/or alt.");
  }

  return <CldImage {...props} />;
};
