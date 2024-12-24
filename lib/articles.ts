import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import z from "zod";

import { categoryNames } from "@/lib/constants";

/**
 * Frontmatter could also include:
 *   tags?: string[];
 *   readingTime?: number;
 *   coverImage?: string;
 *   isPublished?: boolean;
 */

/**
 *
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

const frontmatterSchema = z.object({
  title: z.string(),
  author: z.string(),
  date: z.string().date(),
  slug: z.string(),
  description: z.string(),
  categories: z.array(
    constructZodLiteralUnionType(
      categoryNames.map((literal) => z.literal(literal))
    )
  ),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type FrontmatterWithFilename = Frontmatter & {
  filename: string;
};

type Error = {
  message: string;
} | null;

export const getAllArticles = async () => {
  const articles: FrontmatterWithFilename[] = [];
  let articlesError: Error = null;

  try {
    const filenames = await fs.readdir(
      path.join(process.cwd(), "content/articles")
    );
    const fetchedArticles = await Promise.all(
      filenames.map(async (filename) => {
        const content = await fs.readFile(
          path.join(process.cwd(), "content/articles", filename),
          "utf-8"
        );
        const { frontmatter } = await compileMDX<Frontmatter>({
          source: content,
          options: {
            parseFrontmatter: true,
          },
        });

        const { data, success, error } =
          frontmatterSchema.safeParse(frontmatter);

        if (!success) {
          throw new Error(error.message);
        } else {
          return {
            filename,
            ...data,
          };
        }
      })
    );

    articles.push(...fetchedArticles);
  } catch (error) {
    console.error(error);
    articlesError = error as Error;
  }

  return { articles, error: articlesError };
};

export const getArticleContent = async (slug: Frontmatter["slug"]) => {
  let content: string = "";
  let contentError: Error = null;

  const { articles, error: articlesError } = await getAllArticles();

  if (articlesError) {
    contentError = articlesError;
    console.error(articlesError.message);
    return { content, error: contentError };
  }

  try {
    const filename = articles.find(
      (article) => article.slug === slug
    )?.filename;
    if (!filename) {
      throw new Error(`Article with slug ${slug} not found`);
    }
    const fetchedContent = await fs.readFile(
      path.join(process.cwd(), "content/articles", `${filename}`),
      "utf-8"
    );
    content = fetchedContent;
  } catch (error) {
    contentError = error as Error;
  }

  return { content, error: contentError };
};
