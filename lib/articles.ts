import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

import {
  type AppError,
  type Frontmatter,
  type FrontmatterCategories,
  type FrontmatterWithFilename,
  frontmatterSchema,
} from "@/types";

/**
 * Method for fetching all articles from the file system
 */
export const getAllArticlesInfo = async (
  category?: FrontmatterCategories | FrontmatterCategories[]
) => {
  // initialises an empty array to store the articles
  const articles: FrontmatterWithFilename[] = [];
  const articlesDirectory = path.join(process.cwd(), "content/articles");

  // initialises an empty error to store any potential errors that occur within the try/catch block
  let articlesError: AppError = null;

  try {
    // reads all the filenames in the "content/articles" directory
    const filenames = await fs.readdir(articlesDirectory);

    const fetchedArticles = await Promise.all(
      // maps over each filename
      filenames.map(async (filename) => {
        // uses the readFile method to store the content of each file
        const content = await fs.readFile(
          path.join(articlesDirectory, filename),
          "utf-8"
        );
        // that content is then passed through the compileMDX method to extract the frontmatter
        const { frontmatter } = await compileMDX<Frontmatter>({
          source: content,
          options: {
            parseFrontmatter: true,
          },
        });

        // the frontmatter is then tested against the required schema.
        const { data, success, error } =
          frontmatterSchema.safeParse(frontmatter);

        if (!success) {
          // throw an error if any article's frontmatter does not match the scheme
          throw new Error(error.message);
        } else {
          // else return an object that contains the frontmatter and filename of the article
          return {
            filename: filename.replace(".mdx", ""),
            ...data,
          };
        }
      })
    );

    // if a category/array of categories are passed as an argument, then filter the returned article information based upon that argument
    const filteredArticles = category
      ? fetchedArticles.filter((article) => {
          if (typeof category === "string") {
            return article.categories.includes(category);
          }
          if (Array.isArray(category)) {
            return category.every((category) =>
              article.categories.includes(category)
            );
          }
        })
      : fetchedArticles;
    articles.push(...filteredArticles);
  } catch (error) {
    console.error(error);
    articlesError = error as AppError;
  }

  return { articles, error: articlesError };
};

/**
 * Method for retrieving the content of a specific article. It receives the filename for the article as an argument. This is the filename that is appended onto the frontmatter object from the getAllArticlesInfo method.
 */
export const getArticle = async (
  filename: FrontmatterWithFilename["filename"]
) => {
  let content: string = "";
  let contentError: AppError = null;

  const articlesDirectory = path.join(process.cwd(), "content/articles");

  try {
    const articleContent = await fs.readFile(
      path.join(articlesDirectory, `${filename}.mdx`),
      "utf-8"
    );
    content = articleContent;
  } catch (error) {
    contentError = error as AppError;
  }

  return { content, error: contentError };
};
