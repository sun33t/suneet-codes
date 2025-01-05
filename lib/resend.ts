import { type JSX } from "react";
import { type Resend } from "resend";

type Data = {
  message: string;
  firstname: string;
  lastname: string;
  email: string;
  company?: string | undefined;
};

type SendResendEmail = {
  MAX_ATTEMPTS: number;
  BASE_DELAY_MS: number;
  resend: Resend;
  Template: (props: Data) => JSX.Element;
  from: string;
  to: string;
  subject: string;
  data: Data;
};

export const sendResendEmail = async ({
  MAX_ATTEMPTS,
  BASE_DELAY_MS,
  resend,
  from,
  to,
  subject,
  data,
  Template,
}: SendResendEmail) => {
  let attempt = 0;

  while (attempt < MAX_ATTEMPTS) {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      react: Template({ ...data }),
    });
    if (!error) {
      return true;
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
      console.error(error?.message || "Unknown error");
      return false;
    }
  }
  return false;
};
