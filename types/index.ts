import { type Article } from "content-collections";

export type SearchParams = Promise<{
  category: Article["categories"]["0"] | Article["categories"] | undefined;
}>;
