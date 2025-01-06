import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PROJECT_CANONICAL_URL: z.string().url(),
    PROJECT_GITHUB_URL: z.string().url(),
    PROJECT_LINKEDIN_URL: z.string().url(),
    PROJECT_AUTHOR: z.string(),
    PROJECT_AUTHOR_LOCATION: z.string(),
    PROJECT_BASE_TITLE: z.string(),
    PROJECT_BASE_DESCRIPTION: z.string(),
    PROJECT_CALENDAR_URL: z.string().url(),
    PROJECT_EMAIL_ADDRESS: z.string().email(),
    RESEND_EMAIL_ADDRESS: z.string().email(),
    RESEND_API_KEY: z.string(),
    VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
    PORT: z.string().optional(),
    TURNSTILE_SECRET_KEY: z.string(),
    NODE_ENV: z.union([
      z.literal("development"),
      z.literal("production"),
      z.literal("test"),
    ]),
  },
  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  },

  experimental__runtimeEnv: {
    // eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
});
