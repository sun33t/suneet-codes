import { validateTurnstileToken } from "next-turnstile";

import { env } from "@/lib/config/env";

export const validateTurnstile = async ({
	token,
	sandbox,
}: {
	token: FormDataEntryValue | null;
	sandbox?: boolean;
}) => {
	if (!token || typeof token !== "string") {
		console.error("No turnstile token provided");
		return { success: false, message: "Cloudflare Turnstile token missing" };
	}

	const turnstileResponse = await validateTurnstileToken({
		token,
		secretKey: env.TURNSTILE_SECRET_KEY,
		sandbox,
	});

	if (!turnstileResponse.success) {
		console.error(
			"Turnstile submission error: ",
			turnstileResponse.error_codes,
		);

		return {
			success: false,
			message: "Turnstile validation failed.",
		};
	}

	return {
		message: "Turnstile token validated successfully.",
		success: true,
	};
};
