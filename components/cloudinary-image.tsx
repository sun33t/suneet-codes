"use client";

import { CldImage, type CldImageProps } from "next-cloudinary";
import { useMemo } from "react";

export const CloudinaryImage = (props: CldImageProps) => {
  if (!props.src || !props.alt) {
    console.warn("CloudinaryImage: missing required props src and/or alt.");
  }

  return useMemo(() => <CldImage {...props} />, [props]);
};
