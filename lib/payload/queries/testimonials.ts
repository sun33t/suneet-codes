import { getPayloadClient } from "../get-payload";
import type { Testimonial } from "../payload-types";

export type { Testimonial as PayloadTestimonial } from "../payload-types";

export async function getAllTestimonials(): Promise<Testimonial[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "testimonials",
		sort: "-date",
		limit: 100,
	});
	return result.docs;
}
