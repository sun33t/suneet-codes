import { getPayloadClient } from "../get-payload";
import type { Use } from "../payload-types";

export type { Use as PayloadUse } from "../payload-types";

export type UsesCategory =
	| "Hardware"
	| "Development"
	| "Design"
	| "Productivity";

export async function getAllUses(): Promise<Use[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "uses",
		sort: "sortOrder",
		limit: 200,
	});
	return result.docs;
}

export async function getUsesByCategory(): Promise<Map<UsesCategory, Use[]>> {
	const allUses = await getAllUses();
	const usesByCategory = new Map<UsesCategory, Use[]>();

	// Initialize categories in display order
	const categories: UsesCategory[] = [
		"Hardware",
		"Development",
		"Design",
		"Productivity",
	];

	for (const category of categories) {
		usesByCategory.set(category, []);
	}

	// Group uses by category
	for (const use of allUses) {
		const category = use.category as UsesCategory;
		const categoryUses = usesByCategory.get(category);
		if (categoryUses) {
			categoryUses.push(use);
		}
	}

	return usesByCategory;
}
