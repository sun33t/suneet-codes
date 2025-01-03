import { CalendarPlus2, ClipboardType, MailIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { env } from "@/app/env";
import { SimpleLayout } from "@/components/simple-layout";
import { buttonVariants } from "@/components/ui/button";
import { PAGE_METADATA } from "@/content/pages";

export const metadata: Metadata = { ...PAGE_METADATA.contact };
export default function Contact() {
  return (
    <SimpleLayout
      title="Contact"
      intro="Book a time to catch up in my calendar, send me an email or, if you prefer, fill in a an enquiry form and I'll come back to you. I look forward to hearing about your project."
    >
      <div className="grid max-w-sm grid-cols-1">
        <Link
          aria-description="Book some time in my calendar to catch up."
          href={env.PROJECT_CALENDAR_URL}
          target="_blank"
          className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
        >
          <CalendarPlus2 className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          Calendar
        </Link>
        <Link
          aria-description="Send me an email."
          href={`mailto:${env.PROJECT_EMAIL_ADDRESS}`}
          className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
        >
          <MailIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          Email
        </Link>
        <Link
          aria-description="Fill in an enquiry form."
          href={`#`}
          className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
        >
          <ClipboardType className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          Enquiry
        </Link>
      </div>
    </SimpleLayout>
  );
}
