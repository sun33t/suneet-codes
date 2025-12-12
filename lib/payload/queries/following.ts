import { getPayloadClient } from "../get-payload";
import type { Following } from "../payload-types";

export type { Following as PayloadFollowing } from "../payload-types";

export type FollowingCategory = "Newsletters + Blogs" | "Podcasts" | "YouTube";

export async function getAllFollowing(): Promise<Following[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "following",
		sort: "title",
		limit: 200,
	});
	return result.docs;
}

export async function getFollowingByCategory(): Promise<
	Map<FollowingCategory, Following[]>
> {
	const allFollowing = await getAllFollowing();
	const followingByCategory = new Map<FollowingCategory, Following[]>();

	// Initialize categories in display order
	const categories: FollowingCategory[] = [
		"Newsletters + Blogs",
		"Podcasts",
		"YouTube",
	];

	for (const category of categories) {
		followingByCategory.set(category, []);
	}

	// Group following by category
	for (const entry of allFollowing) {
		const category = entry.category as FollowingCategory;
		const categoryFollowing = followingByCategory.get(category);
		if (categoryFollowing) {
			categoryFollowing.push(entry);
		}
	}

	return followingByCategory;
}
