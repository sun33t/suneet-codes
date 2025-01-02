import { Metadata } from "next";

import { NotFound } from "@/components/not-found";

export const metadata: Metadata = {
  title: "404 - Page not found",
};

export default function NotFoundPage() {
  return (
    <NotFound
      title="Page not found"
      message="Sorry, we couldn’t find the page you’re looking for."
      buttonText="Go back home"
      buttonHref="/"
    />
  );
}
