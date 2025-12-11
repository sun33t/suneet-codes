import { env } from "@/app/env";

export const baseUrl =
	env.VERCEL_PROJECT_PRODUCTION_URL !== undefined
		? new URL(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`)
		: new URL(`http://localhost:${env.PORT || 3000}`);
