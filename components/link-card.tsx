import { ExternalLinkIcon, LinkIcon, SquareChevronRight } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { JSX, memo } from "react";

import { cn } from "@/lib/utils";

type LinkCardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  href?: LinkProps["href"];
  isExternal?: boolean;
};

const LinkCardOuterContainer = memo(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    const classes = cn(
      "group relative rounded-xl bg-transparent text-foreground",
      className
    );

    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
);

LinkCardOuterContainer.displayName = "LinkCardOuterContainer";

const LinkCardHoverEffect = memo(() => {
  return (
    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 dark:bg-zinc-800/50" />
  );
});

LinkCardHoverEffect.displayName = "LinkCardHoverEffect";

const LinkCardInnerContainer = memo(
  ({ children, ...rest }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
      <span {...rest} id="card-inner" className="relative z-10">
        {children}
      </span>
    );
  }
);

LinkCardInnerContainer.displayName = "LinkCardInnerContainer";

export const LinkCard = memo(
  ({
    children,
    className,
    href,
    isExternal = false,
    ...rest
  }: LinkCardProps) => {
    return (
      <LinkCardOuterContainer {...rest} className={className}>
        {href ? (
          <Link
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            href={href}
          >
            <LinkCardHoverEffect />
            <LinkCardInnerContainer>{children}</LinkCardInnerContainer>
          </Link>
        ) : (
          <>
            <LinkCardHoverEffect />
            <LinkCardInnerContainer>{children}</LinkCardInnerContainer>
          </>
        )}
      </LinkCardOuterContainer>
    );
  }
);

LinkCard.displayName = "LinkCard";

export const LinkCardHeader = memo(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    const classes = cn("flex flex-col space-y-3", className);
    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
);

LinkCardHeader.displayName = "LinkCardHeader";

export const LinkCardEyebrow = memo(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
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
          <span
            className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
            aria-hidden="true"
            role="presentation"
          />
        </span>
      </p>
    );
  }
);

LinkCardEyebrow.displayName = "LinkCardEyebrow";

export const LinkCardTitle = memo(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    const classes = cn("font-semibold leading-none tracking-tight", className);
    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
);

LinkCardTitle.displayName = "LinkCardTitle";

export const LinkCardDescription = memo(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    const classes = cn("text-sm text-muted-foreground", className);
    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
);

LinkCardDescription.displayName = "LinkCardDescription";

export const LinkCardContent = memo(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    const classes = cn("mt-3", className);
    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
);

LinkCardContent.displayName = "LinkCardContent";

export const LinkCardFooter = memo(
  ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    const classes = cn("mt-4", className);
    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
);

LinkCardFooter.displayName = "LinkCardFooter";

type IconType = "internal" | "external" | "link";

type LinkCardLabelProps = React.HTMLAttributes<HTMLParagraphElement> & {
  label: string;
  iconType?: IconType;
  iconFirst?: boolean;
  accentColor?: boolean;
};

type IconDictionary = Record<Required<IconType>, () => JSX.Element>;

const MemoizedExternalLinkIcon = memo(() => (
  <ExternalLinkIcon className="h-4 w-4" />
));

const MemoizedSquareChevronRight = memo(() => (
  <SquareChevronRight className="h-4 w-4" />
));

const MemoizedLinkIcon = memo(() => <LinkIcon className="h-3 w-3" />);

MemoizedExternalLinkIcon.displayName = "ExternalLinkIcon";
MemoizedSquareChevronRight.displayName = "SquareChevronRight";
MemoizedLinkIcon.displayName = "LinkIcon";

const iconDict: IconDictionary = {
  external: () => <MemoizedExternalLinkIcon />,
  internal: () => <MemoizedSquareChevronRight />,
  link: () => <MemoizedLinkIcon />,
};

export const LinkCardLabel = memo(
  ({
    label,
    iconFirst = false,
    iconType = "internal",
    className,
    accentColor = true,
  }: LinkCardLabelProps) => {
    const classes = cn(
      "flex items-center gap-2 text-sm",
      iconFirst ? "flex-row-reverse justify-end" : "justify-start",
      { "text-accent-foreground": accentColor },
      className
    );

    const LabelIcon = iconDict[iconType];

    return (
      <p className={classes}>
        {label}
        <LabelIcon />
      </p>
    );
  }
);

LinkCardLabel.displayName = "LinkCardLabel";
