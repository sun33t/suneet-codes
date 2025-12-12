import { getPayloadClient } from "../get-payload";
import type { Service } from "../payload-types";

export type { Service as PayloadService } from "../payload-types";

export type ServiceCategory = "Development" | "Professional";

export async function getAllServices(): Promise<Service[]> {
	const payload = await getPayloadClient();
	const result = await payload.find({
		collection: "services",
		sort: "sortOrder",
		limit: 50,
	});
	return result.docs;
}

export async function getServicesByCategory(): Promise<
	Map<ServiceCategory, Service[]>
> {
	const allServices = await getAllServices();
	const servicesByCategory = new Map<ServiceCategory, Service[]>();

	// Initialize categories in display order
	const categories: ServiceCategory[] = ["Development", "Professional"];

	for (const category of categories) {
		servicesByCategory.set(category, []);
	}

	// Group services by category
	for (const service of allServices) {
		const category = service.category as ServiceCategory;
		const categoryServices = servicesByCategory.get(category);
		if (categoryServices) {
			categoryServices.push(service);
		}
	}

	return servicesByCategory;
}
