"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const BackButton = () => {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => router.push("/articles")}
        aria-label="Go back to articles"
        className="flex items-center justify-center rounded-full bg-white/90 shadow-lg transition focus:bg-white lg:absolute lg:-top-1.5 lg:left-0 lg:mt-0 dark:bg-zinc-800/90 dark:focus:bg-zinc-800/90"
        size="icon"
        variant="outline"
      >
        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
      </Button>
    </div>
  );
};
