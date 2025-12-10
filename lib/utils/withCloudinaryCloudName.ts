import { env } from "@/app/env";

export const withCloudinaryCloudName = (cloudName: string) => {
	return `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${cloudName}`;
};
