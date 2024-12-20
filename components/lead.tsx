import { cn } from "@/lib/utils";

type LeadProps = React.ComponentPropsWithoutRef<"p">;
export const Lead = ({ children, className, ...rest }: LeadProps) => {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...rest}>
      {children}
    </p>
  );
};
