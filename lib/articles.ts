import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

export type Frontmatter = {
  title: string;
  author: string;
  date: string;
  slug: string;
  description: string;
};

export const getAllArticles = async () => {
  const filenames = await fs.readdir(
    path.join(process.cwd(), "content/articles")
  );
  const articles = await Promise.all(
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
      return {
        filename,
        ...frontmatter,
      };
    })
  );
  return articles;
};

export const getArticleContent = async (slug: Frontmatter["slug"]) => {
  const articles = await getAllArticles();

  const filename = articles.find((article) => article.slug === slug)?.filename;

  const content = await fs.readFile(
    path.join(process.cwd(), "content/articles", `${filename}`),
    "utf-8"
  );

  return content;
};
