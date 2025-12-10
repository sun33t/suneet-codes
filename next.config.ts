import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import {
	type CodeHikeConfig,
	recmaCodeHike,
	remarkCodeHike,
} from "codehike/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import { env } from "@/app/env";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

const chConfig: CodeHikeConfig = {
	components: { code: "Code" },
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [
			remarkFrontmatter,
			remarkMdxFrontmatter,
			[remarkCodeHike, chConfig],
		],
		recmaPlugins: [[recmaCodeHike, chConfig]],
		jsx: true,
	},
});

export default withContentCollections(withMDX(nextConfig));
