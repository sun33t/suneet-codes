"use server";

import { validateTurnstileToken } from "next-turnstile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

import { env } from "@/app/env";
import NewEnquiryEmail from "@/emails/NewEnquiryEmail";

const contactFormSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  company: z.string().min(3).optional(),
  email: z.string().email(),
  message: z.string().min(10),
});
type ContactFormSchema = z.infer<typeof contactFormSchema>;

type ContactFormState = {
  success: boolean;
  fields?: ContactFormSchema;
  errors?: Partial<Record<keyof ContactFormSchema | "error", string[]>>;
};

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 1000; // 1 second backoff start

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

  // logic for validating the Turnstile token
  const token = payload.get("cf-turnstile-response");

  if (!token || typeof token !== "string") {
    return {
      success: false,
      errors: { error: ["No turnstile token provided"] },
    };
  }

  const result = await validateTurnstileToken({
    token,
    secretKey: env.TURNSTILE_SECRET_KEY,
  });

  if (!result.success) {
    console.log("no result");
    return {
      success: false,
      errors: { error: ["Invalid turnstile token"] },
    };
  }

  const formData = Object.fromEntries(payload);

  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields = {} as ContactFormState["fields"];

    for (const key in formData) {
      fields![key as keyof ContactFormSchema] = formData[key].toString();
    }
    console.error("server-side validation error encountered");

    return {
      success: false,
      errors,
      fields,
    };
  }

  const parsedData = parsed.data;

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
