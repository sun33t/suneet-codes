import type { ImageProps } from "next/image";
import { Suspense } from "react";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton, type SkeletonProps } from "./ui/skeleton";

type ArticleImageProps = Omit<ImageProps, "src"> & {
	aspectRatio?: number;
	src: string;
};

const SkeletonArticleImage = ({
	aspectRatio = 16 / 9,
	hasPulse,
}: SkeletonProps & {
	aspectRatio?: ArticleImageProps["aspectRatio"];
}) => {
	return (
		<AspectRatio className="prose prose-lg mx-auto" ratio={aspectRatio}>
			<Skeleton className="h-full w-full rounded-3xl" hasPulse={hasPulse} />
		</AspectRatio>
	);
};

export const ArticleImage = async ({
	src,
	alt,
	title,
	aspectRatio = 16 / 9,
}: ArticleImageProps) => {
	const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
		src: `articles/${src}`,
		width: "672px",
	});

	return (
		<AspectRatio className="prose prose-lg mx-auto mt-8" ratio={aspectRatio}>
			{blurDataUrl === undefined ? (
				<SkeletonArticleImage
					aria-label="failed to load article image"
					hasPulse={false}
				/>
			) : (
				<CloudinaryImage
					alt={alt}
					blurDataURL={blurDataUrl}
					fill={true}
					placeholder="blur"
					sizes="672px"
					src={imageSrc}
					style={{
						objectFit: "cover",
					}}
					title={title}
				/>
			)}
		</AspectRatio>
	);
};

export const SuspendedArticleImage = (props: ArticleImageProps) => {
	return (
		<Suspense
			fallback={<SkeletonArticleImage aria-label="loading article image" />}
		>
			<ArticleImage {...props} />
		</Suspense>
	);
};
