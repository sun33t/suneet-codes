import type { PropsWithChildren } from "react";

import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<PostHogProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				disableTransitionOnChange
				enableSystem
			>
				{children}
			</ThemeProvider>
		</PostHogProvider>
	);
};
