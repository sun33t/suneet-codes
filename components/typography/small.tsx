import { cn } from "@/lib/utils";

type SmallProps = React.ComponentPropsWithoutRef<"small">;
export const Small = ({ children, className, ...rest }: SmallProps) => {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...rest}
    >
      {children}
    </small>
  );
};
