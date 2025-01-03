import { type Article } from "content-collections";

export type Page =
  | "about"
  | "articles"
  | "projects"
  | "following"
  | "uses"
  | "contact";
export type PageTitle = Record<"title", Page>;

export type SearchParams = Promise<{
  category: Article["categories"]["0"] | Article["categories"] | undefined;
}>;
