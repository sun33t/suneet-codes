import { Suspense } from "react";
import { CloudinaryImage } from "@/components/shared/cloudinary-image";
import { Skeleton } from "@/components/ui/skeleton";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import type { Testimonial } from "@/types";

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
					alt={`Company logo for ${author.name}`}
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
			alt={`LinkedIn profile image of ${author.name}`}
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
