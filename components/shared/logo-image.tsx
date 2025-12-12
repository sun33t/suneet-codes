import { memo, Suspense } from "react";

import { Skeleton, type SkeletonProps } from "@/components/ui/skeleton";
import type { Project } from "@/lib/payload/payload-types";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { CloudinaryImage } from "./cloudinary-image";

const LogoSkeleton = (props: SkeletonProps) => {
	return <Skeleton {...props} className="h-5 w-5 rounded-full" />;
};

type LogoImageProps = {
	company: string;
	logoDetails: Project["logoDetails"];
};

const LogoImage = async ({ logoDetails, company }: LogoImageProps) => {
	const src = logoDetails?.src ?? "";
	const pixelWidth = logoDetails?.pixelWidth ?? "20px";
	const imageWidth = logoDetails?.imageWidth ?? 20;
	const imageHeight = logoDetails?.imageHeight ?? 20;
	const className = logoDetails?.className ?? "h-5 w-5";

	const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
		src: `logos/${src}`,
		width: pixelWidth,
	});

	return blurDataUrl ? (
		<CloudinaryImage
			alt={`Company logo for ${company}`}
			blurDataURL={blurDataUrl}
			className={className}
			height={imageHeight}
			sizes={pixelWidth}
			src={imageSrc}
			width={imageWidth}
		/>
	) : (
		<LogoSkeleton hasPulse={false} />
	);
};

export const SuspendedLogoImage = memo((props: LogoImageProps) => {
	return (
		<Suspense fallback={<LogoSkeleton />}>
			<LogoImage {...props} />
		</Suspense>
	);
});

SuspendedLogoImage.displayName = "SuspendedLogoImage";
