import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    as: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
    },
  },
  defaultVariants: {
    as: "h1",
  },
});

type HeadingTags = "h1" | "h2" | "h3" | "h4";

type HeadingProps<C extends HeadingTags> = VariantProps<
  typeof headingVariants
> &
  React.ComponentPropsWithoutRef<C>;

export const Heading = <C extends HeadingTags>({
  children,
  as,
  className,
  ...rest
}: HeadingProps<C>) => {
  const Component = as || "h1";

  return (
    <Component className={cn(headingVariants({ as, className }))} {...rest}>
      {children}
    </Component>
  );
};
