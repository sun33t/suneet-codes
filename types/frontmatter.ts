import z from "zod";

import { categoryNames } from "@/lib/constants/categories";

/**
 * Frontmatter could also include:
 *   tags?: string[];
 *   readingTime?: number;
 *   coverImage?: string;
 *   isPublished?: boolean;
 */

/**
 * Type guard to ensure there are enough literals to form a valid union type.
 * @param literals - Array of Zod literal types
 * @returns True if the array contains at least two elements
 * https://github.com/colinhacks/zod/issues/831#issuecomment-1918536468
 */
function isValidZodLiteralUnion<T extends z.ZodLiteral<unknown>>(
  literals: T[]
): literals is [T, T, ...T[]] {
  return literals.length >= 2;
}

/**
 *
 * https://github.com/colinhacks/zod/issues/831#issuecomment-1918536468
 */
function constructZodLiteralUnionType<T extends z.ZodLiteral<unknown>>(
  literals: T[]
) {
  if (!isValidZodLiteralUnion(literals)) {
    throw new Error(
      "Literals passed do not meet the criteria for constructing a union schema, the minimum length is 2"
    );
  }
  return z.union(literals);
}

const frontmatterCategories = constructZodLiteralUnionType(
  categoryNames.map((literal) => z.literal(literal))
);

export const frontmatterSchema = z.object({
  title: z.string(),
  author: z.string(),
  date: z.string().date(),
  description: z.string(),
  coverImage: z.string(),
  categories: z
    .array(frontmatterCategories)
    .min(1, { message: "At least one category is required" }),
});

export type FrontmatterCategories = z.infer<typeof frontmatterCategories>;
export type Frontmatter = z.infer<typeof frontmatterSchema>;
export type FrontmatterWithFilename = Frontmatter & {
  filename: string;
};
