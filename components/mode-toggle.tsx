"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { memo, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ModeToggle = memo(function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const memoizedSetThemeLight = useCallback(
    () => setTheme("light"),
    [setTheme]
  );
  const memoizedSetThemeDark = useCallback(() => setTheme("dark"), [setTheme]);
  const memoizedSetThemeSystem = useCallback(
    () => setTheme("system"),
    [setTheme]
  );

  return useMemo(
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Toggle theme mode"
            variant="outline"
            size="icon"
            className="bg-white/90 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 hover:bg-white/90 hover:text-accent-foreground aria-expanded:text-accent-foreground dark:bg-zinc-800/90 dark:ring-white/10 hover:dark:bg-zinc-800/90"
          >
            <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-md bg-white/90 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
        >
          <DropdownMenuItem
            onClick={memoizedSetThemeLight}
            className={clsx(
              "text-sm font-medium",
              theme === "light" && "text-accent-foreground"
            )}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={memoizedSetThemeDark}
            className={clsx(
              "text-sm font-medium",
              theme === "dark" && "text-accent-foreground"
            )}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={memoizedSetThemeSystem}
            className={clsx(
              "text-sm font-medium",
              theme === "system" && "text-accent-foreground"
            )}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    [theme, memoizedSetThemeLight, memoizedSetThemeDark, memoizedSetThemeSystem]
  );
});
