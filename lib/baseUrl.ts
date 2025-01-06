import { env } from "@/app/env";

export const baseUrl =
  env.VERCEL_PROJECT_PRODUCTION_URL !== undefined
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${env.PORT || 3000}`;
