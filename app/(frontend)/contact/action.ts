"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { env } from "@/lib/config/env";
import { sendResendEmail } from "@/lib/services/email/resend";
import NewEnquiryConfirmationEmail from "@/lib/services/email/templates/NewEnquiryConfirmation";
import NewEnquiryEmail from "@/lib/services/email/templates/NewEnquiryEmail";
import { validateTurnstile } from "@/lib/services/turnstile";
import { type ContactFormFieldSchema, contactFormFieldSchema } from "@/types";

type ContactFormState = {
	success: boolean;
	fields?: Partial<ContactFormFieldSchema>;
	errors?: Partial<Record<keyof ContactFormFieldSchema, string[]>>;
	errorMessage?: string;
};

export const createEnquiry = async (
	_prevState: ContactFormState,
	payload: FormData,
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
	const formFieldKeys: (keyof ContactFormFieldSchema)[] = [
		"firstname",
		"lastname",
		"company",
		"email",
		"reason",
		"message",
	];
	const fields: Partial<ContactFormFieldSchema> = {};

	for (const key of formFieldKeys) {
		if (key in formData) {
			fields[key] = formData[key].toString();
		}
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

	// with turnstile token validated, progress with server-side form validation
	const parsed = contactFormFieldSchema.safeParse(formData);

	// if validation fails, return form state and associated field errors.
	if (!parsed.success) {
		const errors = parsed.error.flatten().fieldErrors;
		console.error("server-side validation error encountered");

		return {
			success: false,
			errors,
			fields,
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
	const isEnquiryConfirmationEmailSent = await sendResendEmail({
		from: env.RESEND_EMAIL_ADDRESS,
		to: parsedData.email,
		BASE_DELAY_MS: 1000,
		MAX_ATTEMPTS: 3,
		subject: "Thanks for getting in touch",
		resend,
		Template: NewEnquiryConfirmationEmail,
		data: parsedData,
	});

	if (!isEnquiryConfirmationEmailSent) {
		console.error("Failed to send enquiry confirmation email.");
	}

	// If successful, revalidate and redirect
	revalidatePath("/contact");
	redirect("/thank-you");
};
