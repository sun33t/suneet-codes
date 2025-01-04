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
  errors?: Partial<Record<keyof ContactFormSchema, string[]>>;
  errorMessage?: string;
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
      errorMessage: "invalid form data",
    };
  }

  // retrieve token from Turnstile widget
  const turnstileToken = payload.get("cf-turnstile-response");

  // convert FormData to object
  const formData = Object.fromEntries(payload);

  // create object of form fields to pass back to client as form state.
  const fields = {} as ContactFormState["fields"];

  for (const key in formData) {
    fields![key as keyof ContactFormSchema] = formData[key].toString();
  }

  // if no turnstile token, return an error along with form state
  if (!turnstileToken || typeof turnstileToken !== "string") {
    console.error("No turnstile token provided");
    return {
      success: false,
      fields,
      errorMessage: "Cloudflare Turnstile token missing",
    };
  }

  // validate turnstile token with cloudflare
  const turnstileResponse = await validateTurnstileToken({
    token: turnstileToken,
    secretKey: env.TURNSTILE_SECRET_KEY,
  });

  // if turnstile validation fails, return an error along with form state
  if (!turnstileResponse.success) {
    console.error(
      "Turnstile submission error: ",
      turnstileResponse.error_codes
    );

    return {
      success: false,
      fields,
      errorMessage: "Turnstile validation failed.",
    };
  }

  // with turnstil token validated, progress with server-side form validation
  const parsed = contactFormSchema.safeParse(formData);

  // if validation fails, return form state and associated field errors.
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    console.error("server-side validation error encountered");

    return {
      success: false,
      errors,
      fields,
      errorMessage: "Please check all fields are valid and try again",
    };
  }

  // with server-side validation passing, send new enquiry email
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
        errorMessage: "Could not send enquiry after multiple retries",
      };
    }
  }

  // Should never reach here due to return/redirect logic above
  return {
    success: false,
    fields: parsedData,
    errorMessage: "Unexpected error",
  };
};
