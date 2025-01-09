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
