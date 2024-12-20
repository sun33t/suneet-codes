import { cn } from "@/lib/utils";

type BlockquoteProps = React.ComponentPropsWithoutRef<"blockquote">;

export const Blockquote = ({
  children,
  className,
  ...rest
}: BlockquoteProps) => {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...rest}
    >
      {children}
    </blockquote>
  );
};
