import { PropsWithChildren } from "react";

type PageHeadingProps = PropsWithChildren<{
  title: string;
}>;

export const PageIntro = ({ title, children }: PageHeadingProps) => {
  return (
    <div>
      <header className="max-w-2xl">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          aria-label={`${title} page`}
        >
          {title}
        </h1>
        <div className="mt-6 text-base">{children}</div>
      </header>
    </div>
  );
};
