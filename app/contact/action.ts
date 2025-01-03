"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

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

  const data = parsed.data;

  try {
    // add async logic here to send the enqiry data to resend
    console.log("Successful Enquiry Sent!", data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      fields: parsed.data,
      errors: { error: ["Could not send enquiry"] },
    };
  } finally {
    revalidatePath("/contact");
  }
};
