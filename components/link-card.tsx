import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";

type LinkCardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  href?: LinkProps["href"];
  isExternal?: boolean;
};

const LinkCardOuterContainer = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const classes = cn(
    "group relative rounded-xl bg-transparent text-foreground",
    className
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

const LinkCardHoverEffect = () => {
  return (
    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 dark:bg-zinc-800/50" />
  );
};

const LinkCardInnerContainer = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...rest} id="card-inner" className="relative z-10">
      {children}
    </span>
  );
};

export const LinkCard = ({
  children,
  className,
  href,
  isExternal = false,
  ...rest
}: LinkCardProps) => {
  return (
    <LinkCardOuterContainer {...rest} className={className}>
      {href && (
        <Link
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          href={href}
        >
          <LinkCardHoverEffect />
          <LinkCardInnerContainer>{children}</LinkCardInnerContainer>
        </Link>
      )}
    </LinkCardOuterContainer>
  );
};

export const LinkCardHeader = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const classes = cn("flex flex-col space-y-3", className);
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export const LinkCardEyebrow = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const classes = cn(
    "relative pl-3.5 text-sm text-muted-foreground",
    className
  );
  return (
    <p {...rest} className={classes}>
      {children}
      <span
        className="absolute inset-y-0 left-0 flex items-center"
        aria-hidden="true"
      >
        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
      </span>
    </p>
  );
};

export const LinkCardTitle = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const classes = cn("font-semibold leading-none tracking-tight", className);
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export const LinkCardDescription = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const classes = cn("text-sm text-muted-foreground", className);
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export const LinkCardContentContainer = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const classes = cn("mt-3", className);
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export const LinkCardFooter = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const classes = cn(
    "mt-4 flex items-center justify-start text-sm text-accent-foreground",
    className
  );
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};
