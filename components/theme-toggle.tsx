"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export const ThemeToggle = memo(() => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      className="rounded-full bg-white/90 shadow-lg focus:bg-white dark:bg-zinc-800/90 dark:focus:bg-zinc-800/90"
      size="icon"
      variant="outline"
      onClick={
        mounted
          ? () => {
              if (resolvedTheme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }
          : undefined
      }
    >
      <Sun className="h-4 w-4 text-zinc-950 dark:hidden" />
      <Moon className="hidden h-4 w-4 text-zinc-950 dark:block dark:text-zinc-50" />
    </Button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
