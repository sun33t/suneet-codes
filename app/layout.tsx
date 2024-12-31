import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans, Roboto_Mono } from "next/font/google";

import { env } from "@/app/env";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { TwSizeIndicator } from "@/components/tw-size-indicator";

const openSans = Open_Sans({
  weight: "variable",
  variable: "--font-open-sans",
  display: "swap",
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  weight: "variable",
  variable: "--font-roboto-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: new URL(
  //   env.NODE_ENV === "production"
  //     ? env.PROJECT_CANONICAL_URL
  //     : "http://localhost:3000"
  // ),
  title: env.PROJECT_BASE_TITLE,
  description: env.PROJECT_BASE_DESCRIPTION,
  openGraph: {
    images: ["/images/avatar.jpeg"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👾</text></svg>",
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
      className={`${openSans.variable} ${robotoMono.variable} h-full antialiased`}
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
