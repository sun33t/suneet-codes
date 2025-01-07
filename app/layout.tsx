import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { env } from "@/app/env";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { TwSizeIndicator } from "@/components/tw-size-indicator";
import { baseUrl } from "@/lib/baseUrl";
import "@/styles/globals.css";

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

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    template: `%s | ${env.PROJECT_BASE_TITLE}`,
    default: env.PROJECT_BASE_TITLE,
  },
  description: env.PROJECT_BASE_DESCRIPTION,
  openGraph: {
    title: env.PROJECT_BASE_TITLE,
    description: env.PROJECT_BASE_DESCRIPTION,
    url: baseUrl.href,
    siteName: env.PROJECT_BASE_TITLE,
    images: ["/images/avatar.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex h-full bg-background">
        <TwSizeIndicator />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
