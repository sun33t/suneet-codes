import { memo, Suspense } from "react";

import { CloudinaryImage } from "@/components/cloudinary-image";
import { Skeleton, type SkeletonProps } from "@/components/ui/skeleton";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import type { LogoDetails } from "@/types";

const LogoSkeleton = (props: SkeletonProps) => {
	return <Skeleton {...props} className="h-5 w-5 rounded-full" />;
};

type LogoImageProps = {
	company: string;
	logoDetails: LogoDetails;
};

const LogoImage = async ({ logoDetails, company }: LogoImageProps) => {
	const { blurDataUrl, imageSrc } = await getCloudinaryBlurDataUrl({
		src: `logos/${logoDetails.src}`,
		width: logoDetails.pixelWidth,
	});

	return blurDataUrl ? (
		<CloudinaryImage
			alt={`Company logo for ${company}`}
			blurDataURL={blurDataUrl}
			className={logoDetails.className}
			height={logoDetails.imageHeight}
			sizes={logoDetails.pixelWidth}
			src={imageSrc}
			width={logoDetails.imageWidth}
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
