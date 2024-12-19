import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PROJECT_CANONICAL_URL: z.string().url(),
    PROJECT_AUTHOR: z.string(),
    PROJECT_BASE_TITLE: z.string(),
  },
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
