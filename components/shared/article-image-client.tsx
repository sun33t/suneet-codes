"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";
import { CloudinaryImage } from "./cloudinary-image";

type ArticleImageClientProps = {
	src: string;
	alt: string;
	aspectRatio?: number;
	width?: number;
	height?: number;
};

/**
 * Client-compatible article image component for use in Lexical block converters.
 * Unlike SuspendedArticleImage, this doesn't use async blur data URL generation.
 *
 * If width and height are provided, renders with fixed dimensions.
 * Otherwise, uses aspectRatio with responsive fill behavior.
 */
export function ArticleImageClient({
	src,
	alt,
	aspectRatio = 16 / 9,
	width,
	height,
}: ArticleImageClientProps) {
	const imageSrc = withCloudinaryCloudName(`articles/${src}`);

	// Fixed dimensions mode
	if (width && height) {
		return (
			<div className="prose prose-lg mx-auto mt-8">
				<CloudinaryImage
					alt={alt}
					height={height}
					src={imageSrc}
					width={width}
				/>
			</div>
		);
	}

	// Aspect ratio mode (default)
	return (
		<AspectRatio className="prose prose-lg mx-auto mt-8" ratio={aspectRatio}>
			<CloudinaryImage
				alt={alt}
				fill={true}
				sizes="672px"
				src={imageSrc}
				style={{
					objectFit: "cover",
				}}
			/>
		</AspectRatio>
	);
}
