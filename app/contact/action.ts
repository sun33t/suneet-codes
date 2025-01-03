"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

import { env } from "@/app/env";
import NewEnquiryEmail from "@/emails/NewEnquiryEmail";

type ContactFormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

const contactFormSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  company: z.string().min(3).optional(),
  email: z.string().email(),
  message: z.string().min(10),
});

export const createEnquiry = async (
  prevState: ContactFormState,
  payload: FormData
): Promise<ContactFormState> => {
  const resend = new Resend(env.RESEND_API_KEY);

  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { error: ["Invalid form data"] },
    };
  }
  const formData = Object.fromEntries(payload);

  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: ContactFormState["fields"] = {};

    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    console.error("server-side validation error encountered");

    return {
      success: false,
      errors,
      fields,
    };
  }

  const parsedData = parsed.data;

  const MAX_ATTEMPTS = 3;
  const BASE_DELAY_MS = 1000; // 1 second backoff start
  let attempt = 0;

  while (attempt < MAX_ATTEMPTS) {
    const { error: resendError } = await resend.emails.send({
      from: env.RESEND_EMAIL_ADDRESS,
      to: env.PROJECT_EMAIL_ADDRESS,
      subject: "Website Enquiry",
      react: NewEnquiryEmail({ ...parsedData }),
    });

    if (!resendError) {
      // If successful, revalidate and redirect
      revalidatePath("/contact");
      redirect("/thank-you");
    }

    attempt++;

    if (attempt < MAX_ATTEMPTS) {
      // Exponential backoff delay
      const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
      console.error(
        `Retry attempt ${attempt} failed. Retrying in ${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    } else {
      // All attempts failed
      console.error(resendError?.message || "Unknown error");
      return {
        success: false,
        fields: parsedData,
        errors: { error: ["Could not send enquiry after multiple retries"] },
      };
    }
  }

  // Should never reach here due to return/redirect logic above
  return {
    success: false,
    fields: parsedData,
    errors: { error: ["Unexpected error"] },
  };
};
