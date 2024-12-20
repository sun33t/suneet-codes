import { cn } from "@/lib/utils";

type LargeProps = React.ComponentPropsWithoutRef<"div">;
export const Large = ({ children, className, ...rest }: LargeProps) => {
  return (
    <div className={cn("text-lg font-semibold", className)} {...rest}>
      {children}
    </div>
  );
};
