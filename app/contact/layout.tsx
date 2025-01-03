import { type Metadata } from "next";

import { SimpleLayout } from "@/components/simple-layout";
import { PAGE_METADATA } from "@/content/pages";

export const metadata: Metadata = { ...PAGE_METADATA.contact };

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SimpleLayout
      title="Contact"
      intro="Book a time to catch up in my calendar, send me an email or, if you prefer, fill in an enquiry form and I'll come back to you. I look forward to hearing about your project."
    >
      {children}
    </SimpleLayout>
  );
}
