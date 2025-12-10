import { cn } from "@/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
	hasPulse?: boolean;
};
function Skeleton({ className, hasPulse = true, ...props }: SkeletonProps) {
	return (
		<div
			className={cn(
				hasPulse && "animate-pulse",
				"rounded-md bg-primary/10",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
