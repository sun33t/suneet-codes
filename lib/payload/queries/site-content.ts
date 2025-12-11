import type { SiteContent } from "@/payload-types";
import { getPayloadClient } from "../get-payload";

export type { SiteContent as PayloadSiteContent } from "@/payload-types";

export async function getSiteContent(): Promise<SiteContent> {
	const payload = await getPayloadClient();
	const result = await payload.findGlobal({
		slug: "site-content",
	});
	return result;
}
