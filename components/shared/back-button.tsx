"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg aria-hidden="true" fill="none" viewBox="0 0 16 16" {...props}>
			<path
				d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</svg>
	);
}

export const BackButton = () => {
	const router = useRouter();

	return (
		<Button
			aria-label="Go back to articles"
			className="lg:-top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition focus:bg-white lg:absolute lg:left-0 lg:mt-0 dark:bg-zinc-800/90 dark:focus:bg-zinc-800/90"
			onClick={() => router.push("/articles")}
			size="icon"
			variant="outline"
		>
			<ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
		</Button>
	);
};
