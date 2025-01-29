"use client";

import * as Switch from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";

export const ThemeToggle = memo(() => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  const handleToggle = (e: boolean) => {
    if (e) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Switch.Root
        className="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        onCheckedChange={handleToggle}
        defaultChecked={resolvedTheme === "dark"}
        checked={resolvedTheme === "dark"}
      >
        <Switch.Thumb className="pointer-events-none block h-4 w-4 rounded-full bg-transparent shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0">
          <Sun className="h-4 w-4 text-zinc-950 dark:hidden dark:text-zinc-50" />
          <Moon className="hidden h-4 w-4 text-zinc-950 dark:block dark:text-zinc-50" />
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
});

ThemeToggle.displayName = "ThemeToggle";
