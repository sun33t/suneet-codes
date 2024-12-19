import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans, Roboto_Mono } from "next/font/google";

import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";

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
  title: "suneet.codes",
  description: "Suneet Misra",
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
