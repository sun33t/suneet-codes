import { Metadata } from "next";

import { NotFound } from "@/components/not-found";

export const metadata: Metadata = {
  title: `404`,
};

export default function NotFoundPage() {
  return (
    <NotFound
      title="Article not found"
      message="Sorry, we couldn’t find the article you’re looking for."
      buttonText="Go back to articles"
      buttonHref="/articles"
    />
  );
}
