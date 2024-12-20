import { memo } from "react";

import { cn } from "@/lib/utils";

type ParagraphProps = React.ComponentPropsWithoutRef<"p">;

export const P = memo(({ children, className, ...rest }: ParagraphProps) => {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...rest}
    >
      {children}
    </p>
  );
});

P.displayName = "P";
