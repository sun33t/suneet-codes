import { CalendarPlus2, ClipboardType, MailIcon } from "lucide-react";
import Link from "next/link";

import { env } from "@/app/env";
import { buttonVariants } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="grid max-w-sm grid-cols-1">
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
      <Link
        aria-label="Fill in an enquiry form."
        href="contact/form"
        className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
      >
        <ClipboardType className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        Enquiry
      </Link>
    </div>
  );
}
