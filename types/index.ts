import { FrontmatterCategories } from "./frontmatter";

export * from "./frontmatter";

export type Error = {
  message: string;
} | null;

export type SearchParams = Promise<{
  category: FrontmatterCategories | FrontmatterCategories[] | undefined;
}>;
