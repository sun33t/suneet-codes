import { z } from "zod";

import { env } from "@/app/env";

/**
 * Zod schema for validating and transforming Cloudinary resource paths.
 *
 * Validates that the input is a string, then:
 * - Trims leading and trailing whitespace
 * - Removes leading slashes to prevent double slashes in the output
 */
export const CloudinaryPathSchema = z
	.string({
		required_error: "Cloudinary path is required",
		invalid_type_error: "Cloudinary path must be a string",
	})
	.transform((val) => val.trim().replace(/^\/+/, ""));

/**
 * Creates a full Cloudinary resource path by prepending the cloud name from environment variables.
 *
 * @param path - The relative path to the resource within Cloudinary (e.g., "profile/avatar" or "articles/cover-image").
 *
 * @returns The full Cloudinary resource path with the cloud name prepended.
 *
 * @throws {ZodError} If the path is null, undefined, or not a string.
 *
 * @remarks
 * - Leading slashes are normalized to prevent double slashes in the output.
 * - Leading and trailing whitespace is trimmed from the path.
 *
 * @example
 * // With NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="my-cloud"
 * withCloudinaryCloudName("profile/avatar");
 * // Returns: "my-cloud/profile/avatar"
 *
 * @example
 * // Leading slash is normalized
 * withCloudinaryCloudName("/articles/cover");
 * // Returns: "my-cloud/articles/cover"
 */
export const withCloudinaryCloudName = (path: string) => {
	const normalizedPath = CloudinaryPathSchema.parse(path);

	return `${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${normalizedPath}`;
};
