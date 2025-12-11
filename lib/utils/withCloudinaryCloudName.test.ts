import { beforeEach, describe, expect, it, vi } from "vitest";
import { ZodError } from "zod";

vi.mock("@/lib/config/env", () => ({
	env: {
		NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "test-cloud-name",
	},
}));

import {
	CloudinaryPathSchema,
	withCloudinaryCloudName,
} from "./withCloudinaryCloudName";

describe("withCloudinaryCloudName", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("basic functionality", () => {
		it("prepends cloud name to the provided path", () => {
			const result = withCloudinaryCloudName("profile/avatar");

			expect(result).toBe("test-cloud-name/profile/avatar");
		});

		it("handles simple file names", () => {
			const result = withCloudinaryCloudName("image.jpg");

			expect(result).toBe("test-cloud-name/image.jpg");
		});

		it("handles nested paths", () => {
			const result = withCloudinaryCloudName("folder/subfolder/image.png");

			expect(result).toBe("test-cloud-name/folder/subfolder/image.png");
		});
	});

	describe("real-world usage patterns", () => {
		it("creates avatar path as used in layout.tsx", () => {
			const result = withCloudinaryCloudName("profile/avatar_og");

			expect(result).toBe("test-cloud-name/profile/avatar_og");
		});

		it("creates article cover image path as used in articles page", () => {
			const articleCoverImage = "my-article-cover";
			const result = withCloudinaryCloudName(`articles/${articleCoverImage}`);

			expect(result).toBe("test-cloud-name/articles/my-article-cover");
		});

		it("creates small avatar path as used in avatar component", () => {
			const result = withCloudinaryCloudName("profile/avatar_small");

			expect(result).toBe("test-cloud-name/profile/avatar_small");
		});
	});

	describe("edge cases", () => {
		it("handles empty string input", () => {
			const result = withCloudinaryCloudName("");

			expect(result).toBe("test-cloud-name/");
		});

		it("handles path with trailing slash", () => {
			const result = withCloudinaryCloudName("profile/");

			expect(result).toBe("test-cloud-name/profile/");
		});

		it("handles path with special characters", () => {
			const result = withCloudinaryCloudName("folder/image-with_special.chars");

			expect(result).toBe("test-cloud-name/folder/image-with_special.chars");
		});

		it("handles path with spaces in the middle", () => {
			const result = withCloudinaryCloudName("folder/image with spaces");

			expect(result).toBe("test-cloud-name/folder/image with spaces");
		});
	});

	describe("leading slash normalization", () => {
		it("removes single leading slash", () => {
			const result = withCloudinaryCloudName("/profile/avatar");

			expect(result).toBe("test-cloud-name/profile/avatar");
		});

		it("removes multiple leading slashes", () => {
			const result = withCloudinaryCloudName("///profile/avatar");

			expect(result).toBe("test-cloud-name/profile/avatar");
		});

		it("handles path that is only slashes", () => {
			const result = withCloudinaryCloudName("///");

			expect(result).toBe("test-cloud-name/");
		});
	});

	describe("whitespace trimming", () => {
		it("trims leading whitespace", () => {
			const result = withCloudinaryCloudName("  profile/avatar");

			expect(result).toBe("test-cloud-name/profile/avatar");
		});

		it("trims trailing whitespace", () => {
			const result = withCloudinaryCloudName("profile/avatar  ");

			expect(result).toBe("test-cloud-name/profile/avatar");
		});

		it("trims both leading and trailing whitespace", () => {
			const result = withCloudinaryCloudName("  profile/avatar  ");

			expect(result).toBe("test-cloud-name/profile/avatar");
		});

		it("handles whitespace-only input", () => {
			const result = withCloudinaryCloudName("   ");

			expect(result).toBe("test-cloud-name/");
		});

		it("trims whitespace before normalizing leading slashes", () => {
			const result = withCloudinaryCloudName("  /profile/avatar  ");

			expect(result).toBe("test-cloud-name/profile/avatar");
		});
	});

	describe("input validation", () => {
		it("throws ZodError for null input", () => {
			expect(() => withCloudinaryCloudName(null as unknown as string)).toThrow(
				ZodError,
			);
		});

		it("throws ZodError for undefined input", () => {
			expect(() =>
				withCloudinaryCloudName(undefined as unknown as string),
			).toThrow(ZodError);
		});

		it("throws ZodError for number input", () => {
			expect(() => withCloudinaryCloudName(123 as unknown as string)).toThrow(
				ZodError,
			);
		});

		it("throws ZodError for object input", () => {
			expect(() => withCloudinaryCloudName({} as unknown as string)).toThrow(
				ZodError,
			);
		});

		it("provides descriptive error message for invalid type", () => {
			const result = CloudinaryPathSchema.safeParse(123);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					"Cloudinary path must be a string",
				);
			}
		});

		it("provides descriptive error message for required field", () => {
			const result = CloudinaryPathSchema.safeParse(undefined);

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					"Cloudinary path is required",
				);
			}
		});
	});
});

describe("CloudinaryPathSchema", () => {
	describe("valid inputs", () => {
		it("accepts valid path string", () => {
			const result = CloudinaryPathSchema.safeParse("profile/avatar");

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toBe("profile/avatar");
			}
		});

		it("accepts empty string", () => {
			const result = CloudinaryPathSchema.safeParse("");

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toBe("");
			}
		});
	});

	describe("transformations", () => {
		it("trims whitespace", () => {
			const result = CloudinaryPathSchema.safeParse("  profile/avatar  ");

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toBe("profile/avatar");
			}
		});

		it("removes leading slashes", () => {
			const result = CloudinaryPathSchema.safeParse("/profile/avatar");

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toBe("profile/avatar");
			}
		});

		it("trims whitespace before removing leading slashes", () => {
			const result = CloudinaryPathSchema.safeParse("  /profile/avatar  ");

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toBe("profile/avatar");
			}
		});
	});

	describe("invalid inputs", () => {
		it("rejects null", () => {
			const result = CloudinaryPathSchema.safeParse(null);

			expect(result.success).toBe(false);
		});

		it("rejects undefined", () => {
			const result = CloudinaryPathSchema.safeParse(undefined);

			expect(result.success).toBe(false);
		});

		it("rejects number", () => {
			const result = CloudinaryPathSchema.safeParse(123);

			expect(result.success).toBe(false);
		});

		it("rejects object", () => {
			const result = CloudinaryPathSchema.safeParse({});

			expect(result.success).toBe(false);
		});
	});
});
