import { Suspense } from "react";
import { CloudinaryImage } from "@/components/shared/cloudinary-image";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@/lib/payload/payload-types";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";

const TestimonialCardAvatar = async ({
	testimonial,
}: {
	testimonial: Testimonial;
}) => {
	const imgSrc = testimonial.authorImgSrc ?? "";
	const name = testimonial.authorName;
	const isCompanyLogo = imgSrc.startsWith("logos/");

	const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
		src: imgSrc,
		width: "40px",
	});
	if (!blurDataUrl) {
		return <AvatarSkeleton />;
	}
	if (isCompanyLogo) {
		return (
			<div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
				<CloudinaryImage
					alt={`Company logo for ${name}`}
					blurDataURL={blurDataUrl}
					height={28}
					placeholder="blur"
					sizes="28px"
					src={imageSrc}
					width={28}
				/>
			</div>
		);
	}
	return (
		<CloudinaryImage
			alt={`LinkedIn profile image of ${name}`}
			blurDataURL={blurDataUrl}
			className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800"
			height={40}
			placeholder="blur"
			src={imageSrc}
			width={40}
		/>
	);
};

const AvatarSkeleton = () => {
	return <Skeleton className="size-10 rounded-full" />;
};

export const SuspendedTestimonialCardAvatar = ({
	testimonial,
}: {
	testimonial: Testimonial;
}) => {
	return (
		<Suspense fallback={<AvatarSkeleton />}>
			<TestimonialCardAvatar testimonial={testimonial} />
		</Suspense>
	);
};
