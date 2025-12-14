import { getPayloadClient } from "../get-payload";
import type { SiteConfig } from "../payload-types";

export type { SiteConfig as PayloadSiteConfig } from "../payload-types";

export async function getSiteConfig(): Promise<SiteConfig> {
	const payload = await getPayloadClient();
	const result = await payload.findGlobal({
		slug: "site-config",
	});
	return result;
}
