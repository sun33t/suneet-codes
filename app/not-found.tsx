import { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 - Page not found",
};

export default function NotFound() {
  return (
    <Container className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Go back home
          </Link>
        </div>
      </div>
    </Container>
  );
}
