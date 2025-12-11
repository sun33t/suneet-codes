"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { type UseThemeProps, useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ThemeIcon = ({
	mounted,
	theme,
	resolvedTheme,
}: {
	mounted: boolean;
	theme: UseThemeProps["theme"];
	resolvedTheme: UseThemeProps["resolvedTheme"];
}) => {
	if (!mounted) return null;

	if (theme === "system") {
		return <Monitor className="h-4 w-4 text-zinc-800 dark:text-zinc-100" />;
	}

	if (resolvedTheme === "dark") {
		return <Moon className="h-4 w-4 text-zinc-100" />;
	}

	return <Sun className="h-4 w-4 text-zinc-800" />;
};

export const ThemeToggle = memo(() => {
	const [mounted, setMounted] = useState<boolean>(false);
	const { setTheme, theme, resolvedTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const cycleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else if (theme === "dark") {
			setTheme("system");
		} else {
			setTheme("light");
		}
	};

	return (
		<Button
			className="rounded-full bg-white/90 shadow-lg focus:bg-white dark:bg-zinc-800/90 dark:focus:bg-zinc-800/90"
			onClick={mounted ? cycleTheme : undefined}
			size="icon"
			variant="outline"
		>
			<ThemeIcon
				mounted={mounted}
				resolvedTheme={resolvedTheme}
				theme={theme}
			/>
		</Button>
	);
});

ThemeToggle.displayName = "ThemeToggle";
