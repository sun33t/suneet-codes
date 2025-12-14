import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCldImageUrl } from "next-cloudinary";
import { Layout } from "@/components/layout";
import { Providers } from "@/components/providers";
import { TwSizeIndicator } from "@/components/shared/tw-size-indicator";
import { baseUrl } from "@/lib/config/baseUrl";
import { env } from "@/lib/config/env";
import { getSiteConfig } from "@/lib/payload/queries";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";
import "@/styles/globals.css";

const ogImageUrl = getCldImageUrl({
	src: withCloudinaryCloudName("profile/avatar_og"),
});

const geistSans = Geist({
	weight: "variable",
	variable: "--font-geist-sans",
	display: "swap",
	subsets: ["latin"],
});
const geistMono = Geist_Mono({
	weight: "variable",
	variable: "--font-geist-mono",
	display: "swap",
	subsets: ["latin"],
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#18181b" },
		{ media: "(prefers-color-scheme: light)", color: "ffffff" },
	],
};

export async function generateMetadata(): Promise<Metadata> {
	const siteConfig = await getSiteConfig();

	return {
		metadataBase: baseUrl,
		title: {
			template: `%s | ${siteConfig.siteTitle}`,
			default: siteConfig.siteTitle,
		},
		description: siteConfig.siteDescription,
		openGraph: {
			title: siteConfig.siteTitle,
			description: siteConfig.siteDescription,
			url: baseUrl.href,
			siteName: siteConfig.siteTitle,
			images: [ogImageUrl],
			locale: "en_GB",
			type: "website",
		},
		robots: {
			...(baseUrl.hostname === env.PROJECT_DOMAIN
				? { index: true, follow: true }
				: { index: false, follow: false }),
			nocache: false,
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const siteConfig = await getSiteConfig();

	return (
		<html
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			lang="en"
			suppressHydrationWarning
		>
			<body className="flex h-full bg-background">
				<TwSizeIndicator />
				<Providers>
					<Layout siteOwner={siteConfig.siteOwner}>{children}</Layout>
				</Providers>
			</body>
		</html>
	);
}
