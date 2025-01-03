"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

import { env } from "@/app/env";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(env.RESEND_API_KEY);

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

  const { error: resendError } = await resend.emails.send({
    from: env.RESEND_EMAIL_ADDRESS,
    to: env.PROJECT_EMAIL_ADDRESS,
    subject: "Website Enquiry",
    react: EmailTemplate({ ...parsedData }),
  });

  if (resendError) {
    console.error(resendError.message);
    return {
      success: false,
      fields: parsedData,
      errors: { error: ["Could not send enquiry"] },
    };
  }

  revalidatePath("/contact");
  redirect("/thank-you");
};
