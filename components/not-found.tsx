import { Container } from "./container";
import { buttonVariants } from "./ui/button";

import Link from "next/link";

interface NotFoundPageProps {
  title: string;
  message: string;
  buttonText: string;
  buttonHref: string;
}

export function NotFound({
  title,
  message,
  buttonText,
  buttonHref,
}: NotFoundPageProps) {
  return (
    <Container className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <main role="main" aria-label="404 error page" className="text-center">
        <p className="text-base font-semibold">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
          {message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={buttonHref}
            className={buttonVariants({ variant: "default" })}
          >
            {buttonText}
          </Link>
        </div>
      </main>
    </Container>
  );
}
