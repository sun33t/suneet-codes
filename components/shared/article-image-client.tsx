"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";
import { CloudinaryImage } from "./cloudinary-image";

type ArticleImageClientProps = {
	src: string;
	alt: string;
	aspectRatio?: number;
};

/**
 * Client-compatible article image component for use in Lexical block converters.
 * Unlike SuspendedArticleImage, this doesn't use async blur data URL generation.
 */
export function ArticleImageClient({
	src,
	alt,
	aspectRatio = 16 / 9,
}: ArticleImageClientProps) {
	const imageSrc = withCloudinaryCloudName(`articles/${src}`);

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
