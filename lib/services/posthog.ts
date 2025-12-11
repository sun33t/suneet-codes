/**
 * This is the server side implementation of posthog which is analagous to using usePosthog (provided by the @/components/posthog-provider) on the client side.
 */
import { PostHog } from "posthog-node";

import { env } from "@/lib/config/env";

const PostHogClient = () => {
	const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
		host: env.NEXT_PUBLIC_POSTHOG_HOST,
		flushAt: 1,
		flushInterval: 0,
	});
	return posthogClient;
};

export default PostHogClient;
