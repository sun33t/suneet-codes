import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

import "@/app/env";

const nextConfig: NextConfig = {};

export default withContentCollections(nextConfig);
