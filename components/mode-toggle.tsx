"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur aria-expanded:text-teal-500 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 aria-expanded:dark:text-teal-400"
        >
          <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-md bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={clsx(
            "text-sm font-medium",
            theme === "light"
              ? "text-teal-500 dark:text-teal-400"
              : "text-zinc-800 dark:text-zinc-200"
          )}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={clsx(
            "text-sm font-medium",
            theme === "dark"
              ? "text-teal-500 dark:text-teal-400"
              : "text-zinc-800 dark:text-zinc-200"
          )}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={clsx(
            "text-sm font-medium",
            theme === "system"
              ? "text-teal-500 dark:text-teal-400"
              : "text-zinc-800 dark:text-zinc-200"
          )}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
