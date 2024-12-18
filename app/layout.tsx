import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans, Roboto_Mono } from "next/font/google";

import { ModeToggle } from "@/components/mode-toggle";
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
  description: "suneet.codes",
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
      className={`${openSans.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={`relative grid min-h-screen grid-rows-[1fr_auto] antialiased`}
          >
            <header className="absolute inset-x-0 top-0 grid place-items-center border-2 border-dotted py-8">
              <p>Header</p>
              <ModeToggle />
            </header>
            <main className="place-items-center border-2 border-dotted pb-8 pt-28">
              {children}
              <pre>This is some text in mono</pre>
            </main>
            <footer className="grid place-items-center py-8">Footer</footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
