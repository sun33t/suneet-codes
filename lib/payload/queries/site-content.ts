import { getPayloadClient } from "../get-payload";
import type { SiteContent } from "../payload-types";

export type { SiteContent as PayloadSiteContent } from "../payload-types";

export async function getSiteContent(): Promise<SiteContent> {
	const payload = await getPayloadClient();
	const result = await payload.findGlobal({
		slug: "site-content",
	});
	return result;
}
