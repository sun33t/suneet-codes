"use client";

import { Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

export default function ArticlesError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <Container className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <main role="main" aria-label="Error page" className="text-center">
        <Alert variant={"default"} className="mx-auto mt-8 max-w-lg text-left">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-semibold">Error!</AlertTitle>
          <AlertDescription>
            {`message: "${error.message}"`}
            {error.digest && (
              <p className="mt-2">{`Reference: ${error.digest}`}</p>
            )}
          </AlertDescription>
        </Alert>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Go Back Home
          </Link>
        </div>
      </main>
    </Container>
  );
}