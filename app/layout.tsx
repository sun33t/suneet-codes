import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { env } from "@/app/env";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { TwSizeIndicator } from "@/components/tw-size-indicator";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    env.NODE_ENV === "production"
      ? env.PROJECT_CANONICAL_URL
      : "http://localhost:3000"
  ),
  title: {
    template: `%s | ${env.PROJECT_BASE_TITLE}`,
    default: env.PROJECT_BASE_TITLE,
  },
  description: env.PROJECT_BASE_DESCRIPTION,
  openGraph: {
    title: env.PROJECT_BASE_TITLE,
    description: env.PROJECT_BASE_DESCRIPTION,
    url: env.PROJECT_CANONICAL_URL,
    siteName: env.PROJECT_BASE_TITLE,
    images: ["/images/avatar.jpg"],
    locale: "en_GB",
    type: "website",
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
