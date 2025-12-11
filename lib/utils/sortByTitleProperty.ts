/**
 * Compares two objects based on their 'title' property and returns a value that determines the order.
 *
 * @param a The first object to compare.
 * @param b The second object to compare.
 *
 * @returns A negative value if 'a.title' comes before 'b.title', zero if they are equal, and a positive value if 'a.title' comes after 'b.title'.
 * Objects with missing, null, or undefined titles are sorted to the end.
 *
 * @template T - The type of the objects being compared. Must extend an object with a 'title' property of type string, or null/undefined.
 *
 * @remarks
 * - The comparison is case-insensitive.
 * - Leading and trailing whitespace is trimmed before comparison.
 * - Objects with null, undefined, or missing title properties are sorted to the end.
 *
 * @example
 * const items = [
 *   { title: 'Zebra', id: 1 },
 *   { title: 'apple', id: 2 }
 * ];
 * items.sort(sortByTitleProperty);
 * Result: [{ title: 'apple', id: 2 }, { title: 'Zebra', id: 1 }]
 */
export function sortByTitleProperty<
	T extends { title: string | null | undefined },
>(a: T, b: T) {
	const titleA = a.title;
	const titleB = b.title;

	// Handle null/undefined - sort them to the end
	if (titleA == null && titleB == null) return 0;
	if (titleA == null) return 1;
	if (titleB == null) return -1;

	const normalizedA = titleA.trim().toLowerCase();
	const normalizedB = titleB.trim().toLowerCase();

	if (normalizedA < normalizedB) {
		return -1;
	}

	if (normalizedA > normalizedB) {
		return 1;
	}

	return 0;
}
