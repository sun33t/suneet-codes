/* eslint-disable n/no-process-env */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PROJECT_DOMAIN: z.string(),
    PROJECT_GITHUB_URL: z.string().url(),
    PROJECT_LINKEDIN_URL: z.string().url(),
    PROJECT_NOTION_URL: z.string().url(),
    PROJECT_AUTHOR: z.string(),
    PROJECT_AUTHOR_LOCATION: z.string(),
    PROJECT_BASE_TITLE: z.string(),
    PROJECT_BASE_DESCRIPTION: z.string(),
    PROJECT_CALENDAR_URL: z.string().url(),
    PROJECT_EMAIL_ADDRESS: z.string().email(),
    RESEND_EMAIL_ADDRESS: z.string().email(),
    RESEND_API_KEY: z.string(),
    /** The production URL of the Vercel project - https://vercel.com/docs/projects/environment-variables/system-environment-variables */
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
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});
