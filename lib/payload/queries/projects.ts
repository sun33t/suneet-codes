import { getPayloadClient } from "../get-payload";
import type { Project } from "../payload-types";

export type { Project as PayloadProject } from "../payload-types";

export async function getAllProjects(): Promise<Project[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "projects",
		sort: "sortOrder",
		limit: 100,
	});
	return result.docs;
}
