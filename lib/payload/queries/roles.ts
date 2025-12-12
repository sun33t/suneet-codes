import { getPayloadClient } from "../get-payload";
import type { Role } from "../payload-types";

export type { Role as PayloadRole } from "../payload-types";

export async function getAllRoles(): Promise<Role[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "roles",
		sort: "sortOrder",
		limit: 100,
	});
	return result.docs;
}
