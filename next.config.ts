import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import { env } from "@/lib/config/env";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: env.NEXT_PUBLIC_CLOUDINARY_HOSTNAME,
				pathname: `/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
			},
		],
	},
};

export default withPayload(nextConfig);
