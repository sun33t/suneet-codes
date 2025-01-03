import { CalendarPlus2, MailIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { env } from "@/app/env";
import { ContactForm } from "@/components/contact-form";
import { SimpleLayout } from "@/components/simple-layout";
import { buttonVariants } from "@/components/ui/button";
import { PAGE_METADATA } from "@/content/pages";

export const metadata: Metadata = { ...PAGE_METADATA.contact };

export default function Contact() {
  return (
    <SimpleLayout
      title="Contact"
      intro="Book a time to catch up in my calendar, send me an email or, if you prefer, fill in an enquiry form and I'll come back to you. I look forward to hearing about your project."
    >
      <ContactForm />
      <div className="grid max-w-lg grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        <Link
          aria-label="Book some time in my calendar to catch up."
          href={env.PROJECT_CALENDAR_URL}
          target="_blank"
          className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
        >
          <CalendarPlus2 className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          Calendar
        </Link>
        <Link
          aria-label="Send me an email."
          href={`mailto:${env.PROJECT_EMAIL_ADDRESS}`}
          className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
        >
          <MailIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          Email
        </Link>
      </div>
    </SimpleLayout>
  );
}
