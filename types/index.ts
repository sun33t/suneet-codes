import { type Article } from "content-collections";

type Slug = `/${string}`;

type Page = { title: string; slug: Slug };
export type Pages = Array<Page>;

export type SearchParams = Promise<{
  category: Article["categories"]["0"] | Article["categories"] | undefined;
}>;
