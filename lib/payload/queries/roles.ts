import type { Role } from "@/payload-types";
import { getPayloadClient } from "../get-payload";

export type { Role as PayloadRole } from "@/payload-types";

export async function getAllRoles(): Promise<Role[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "roles",
		sort: "sortOrder",
		limit: 100,
	});
	return result.docs;
}
