import { cn } from "@/lib/utils";

function Skeleton({
  className,
  hasPulse = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hasPulse?: boolean }) {
  return (
    <div
      className={cn(
        hasPulse && "animate-pulse",
        "rounded-md bg-primary/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
