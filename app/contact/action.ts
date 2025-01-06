"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

import { env } from "@/app/env";
import NewEnquiryConfirmationEmail from "@/emails/NewEnquiryConfirmation";
import NewEnquiryEmail from "@/emails/NewEnquiryEmail";
import { sendResendEmail } from "@/lib/resend";
import { validateTurnstile } from "@/lib/turnstile";
import { ContactFormFieldSchema, contactFormFieldSchema } from "@/types";

type ContactFormState = {
  success: boolean;
  fields?: ContactFormFieldSchema;
  errors?: Partial<Record<keyof ContactFormFieldSchema, string[]>>;
  errorMessage?: string;
};

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
    fields![key as keyof ContactFormFieldSchema] = formData[key].toString();
  }

  const { message: turnstileMessage, success: turnstileSuccess } =
    await validateTurnstile({
      token: turnstileToken,
    });

  if (!turnstileSuccess) {
    return {
      success: false,
      fields,
      errorMessage: turnstileMessage,
    };
  }

  // with turnstil token validated, progress with server-side form validation
  const parsed = contactFormFieldSchema.safeParse(formData);

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

  const isEnquiryEmailSent = await sendResendEmail({
    from: env.RESEND_EMAIL_ADDRESS,
    to: env.PROJECT_EMAIL_ADDRESS,
    BASE_DELAY_MS: 1000,
    MAX_ATTEMPTS: 3,
    subject: "Website Enquiry",
    resend,
    Template: NewEnquiryEmail,
    data: parsedData,
  });

  if (!isEnquiryEmailSent) {
    return {
      success: false,
      fields: parsedData,
      errorMessage: "Failed to send enquiry email, please try again.",
    };
  }

  // finally send a confirmation email to the user
  const isEnquiryConfirmationEmalSent = await sendResendEmail({
    from: env.RESEND_EMAIL_ADDRESS,
    to: parsedData.email,
    BASE_DELAY_MS: 1000,
    MAX_ATTEMPTS: 3,
    subject: "Thanks for getting in touch",
    resend,
    Template: NewEnquiryConfirmationEmail,
    data: parsedData,
  });

  if (!isEnquiryConfirmationEmalSent) {
    console.error("Failed to send enquiry confirmation email.");
  }

  // If successful, revalidate and redirect
  revalidatePath("/contact");
  redirect("/thank-you");
};
