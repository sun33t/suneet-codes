import { CalendarPlus2, MailIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { env } from "@/app/env";
import { ContactForm } from "@/components/contact-form";
import { PageContainer } from "@/components/page-container";
import { PageIntro } from "@/components/page-intro";
import { PageSection } from "@/components/page-section";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PAGE_METADATA } from "@/content/pageMetadata";

export const metadata: Metadata = { ...PAGE_METADATA.contact };

export default function Contact() {
  return (
    <PageContainer>
      <PageIntro title="Contact">
        <p>{`You can book some time in my calendar, send me an email, or if you prefer, fill in an enquiry form and I'll come back to you as soon as I can.`}</p>
      </PageIntro>
      <PageSection>
        <Card className="mx-auto mb-16 max-w-xl px-6 py-6 shadow-none">
          <CardContent className="pb-0">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <Link
                aria-label="Book some time in my calendar to catch up."
                href={env.PROJECT_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full ${buttonVariants({ variant: "secondary" })}`}
              >
                Calendar
                <CalendarPlus2 className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
              </Link>
              <Link
                aria-label="Send me an email."
                href={`mailto:${env.PROJECT_EMAIL_ADDRESS}`}
                className={`w-full ${buttonVariants({ variant: "secondary" })}`}
              >
                Email
                <MailIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <ContactForm />
      </PageSection>
    </PageContainer>
  );
}
