import { CloudinaryImage } from "./cloudinary-image";
import { Skeleton } from "./ui/skeleton";

import { Suspense } from "react";

import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { Testimonial } from "@/types";

const TestimonialCardAvatar = async ({
  author,
}: {
  author: Testimonial["author"];
}) => {
  const isCompanyLogo = author.imgSrc.startsWith("logos/");

  const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
    src: `${author.imgSrc}`,
    width: "40px",
  });
  if (!blurDataUrl) {
    return <AvatarSkeleton />;
  }
  if (isCompanyLogo) {
    return (
      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        <CloudinaryImage
          src={imageSrc}
          width={28}
          height={28}
          alt={`Company logo for ${author.name}`}
          sizes="28px"
          blurDataURL={blurDataUrl}
        />
      </div>
    );
  }
  return (
    <CloudinaryImage
      src={imageSrc}
      alt={`LinkedIn profile image of ${author.name}`}
      width={40}
      height={40}
      className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800"
      blurDataURL={blurDataUrl}
      placeholder="blur"
    />
  );
};

const AvatarSkeleton = () => {
  return <Skeleton className="size-10 rounded-full" />;
};

export const SuspendedTestimonialCardAvatar = ({
  author,
}: {
  author: Testimonial["author"];
}) => {
  return (
    <Suspense fallback={<AvatarSkeleton />}>
      <TestimonialCardAvatar author={author} />
    </Suspense>
  );
};
