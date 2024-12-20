import { cn } from "@/lib/utils";

type LargeTags = "h1" | "h2" | "h3" | "h4" | "p";

type LargeProps<C extends LargeTags> = {
  as?: C;
} & React.ComponentPropsWithoutRef<C>;
export const Large = <C extends LargeTags>({
  children,
  className,
  as,
  ...rest
}: LargeProps<C>) => {
  const Component = as || "p";
  return (
    <Component className={cn("text-lg font-semibold", className)} {...rest}>
      {children}
    </Component>
  );
};
