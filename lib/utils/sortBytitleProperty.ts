/**
 * Compares two objects based on their 'title' property and returns a value that determines the order.
 *
 * @param a The first object to compare.
 * @param b The second object to compare.
 *
 * @returns A negative value if 'a.title' comes before 'b.title', zero if they are equal, and a positive value if 'a.title' comes after 'b.title'.
 *
 * @template T - The type of the objects being compared. Must extend an object with a 'title' property of type string.
 */
export function sortByTitleProperty<T extends { title: string }>(a: T, b: T) {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  }

  if (titleA > titleB) {
    return 1;
  }

  return 0;
}
