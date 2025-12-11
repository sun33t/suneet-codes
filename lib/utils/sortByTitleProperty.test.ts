import { describe, expect, it } from "vitest";
import { sortByTitleProperty } from "./sortByTitleProperty";

describe("sortByTitleProperty", () => {
	describe("basic sorting", () => {
		it("returns negative when first title comes before second alphabetically", () => {
			const a = { title: "Apple" };
			const b = { title: "Banana" };

			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("returns positive when first title comes after second alphabetically", () => {
			const a = { title: "Banana" };
			const b = { title: "Apple" };

			expect(sortByTitleProperty(a, b)).toBe(1);
		});

		it("returns zero when titles are equal", () => {
			const a = { title: "Apple" };
			const b = { title: "Apple" };

			expect(sortByTitleProperty(a, b)).toBe(0);
		});
	});

	describe("case insensitivity", () => {
		it("treats uppercase and lowercase as equal", () => {
			const a = { title: "apple" };
			const b = { title: "APPLE" };

			expect(sortByTitleProperty(a, b)).toBe(0);
		});

		it("sorts case-insensitively with mixed case", () => {
			const a = { title: "apple" };
			const b = { title: "Zebra" };

			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("sorts case-insensitively regardless of case order", () => {
			const a = { title: "ZEBRA" };
			const b = { title: "apple" };

			expect(sortByTitleProperty(a, b)).toBe(1);
		});
	});

	describe("integration with Array.sort", () => {
		it("sorts an array of objects alphabetically by title", () => {
			const items = [
				{ title: "Zebra", id: 1 },
				{ title: "apple", id: 2 },
				{ title: "Banana", id: 3 },
			];

			const sorted = [...items].sort(sortByTitleProperty);

			expect(sorted).toEqual([
				{ title: "apple", id: 2 },
				{ title: "Banana", id: 3 },
				{ title: "Zebra", id: 1 },
			]);
		});

		it("maintains order for items with equal titles", () => {
			const items = [
				{ title: "Apple", variant: "red" },
				{ title: "apple", variant: "green" },
			];

			const sorted = [...items].sort(sortByTitleProperty);

			// Both have same lowercase title, so order depends on sort stability
			expect(sorted[0].title.toLowerCase()).toBe("apple");
			expect(sorted[1].title.toLowerCase()).toBe("apple");
		});

		it("handles empty arrays", () => {
			const items: { title: string }[] = [];

			const sorted = [...items].sort(sortByTitleProperty);

			expect(sorted).toEqual([]);
		});

		it("handles single-item arrays", () => {
			const items = [{ title: "Only" }];

			const sorted = [...items].sort(sortByTitleProperty);

			expect(sorted).toEqual([{ title: "Only" }]);
		});
	});

	describe("edge cases", () => {
		it("handles empty string titles", () => {
			const a = { title: "" };
			const b = { title: "Apple" };

			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("handles titles with numbers", () => {
			const a = { title: "Item 1" };
			const b = { title: "Item 2" };

			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("handles titles with special characters", () => {
			const a = { title: "@mention" };
			const b = { title: "Apple" };

			// @ comes before A in ASCII/Unicode
			expect(sortByTitleProperty(a, b)).toBe(-1);
		});
	});

	describe("whitespace trimming", () => {
		it("trims leading whitespace before comparison", () => {
			const a = { title: "  Apple" };
			const b = { title: "Banana" };

			// Without trimming, "  Apple" would sort before "Banana" due to space
			// With trimming, "Apple" correctly sorts before "Banana"
			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("trims trailing whitespace before comparison", () => {
			const a = { title: "Apple  " };
			const b = { title: "Apple" };

			expect(sortByTitleProperty(a, b)).toBe(0);
		});

		it("trims both leading and trailing whitespace", () => {
			const a = { title: "  Apple  " };
			const b = { title: "Apple" };

			expect(sortByTitleProperty(a, b)).toBe(0);
		});

		it("sorts correctly when whitespace would otherwise affect order", () => {
			const items = [
				{ title: "  Zebra", id: 1 },
				{ title: "Apple  ", id: 2 },
				{ title: "  Banana  ", id: 3 },
			];

			const sorted = [...items].sort(sortByTitleProperty);

			expect(sorted).toEqual([
				{ title: "Apple  ", id: 2 },
				{ title: "  Banana  ", id: 3 },
				{ title: "  Zebra", id: 1 },
			]);
		});

		it("handles whitespace-only titles as empty strings", () => {
			const a = { title: "   " };
			const b = { title: "Apple" };

			// Whitespace-only becomes empty string after trim, sorts before "Apple"
			expect(sortByTitleProperty(a, b)).toBe(-1);
		});
	});

	describe("null and undefined handling", () => {
		it("sorts null title to the end", () => {
			const a: { title: string | null } = { title: null };
			const b: { title: string | null } = { title: "Apple" };

			expect(sortByTitleProperty(a, b)).toBe(1);
		});

		it("sorts undefined title to the end", () => {
			const a: { title: string | undefined } = { title: undefined };
			const b: { title: string | undefined } = { title: "Apple" };

			expect(sortByTitleProperty(a, b)).toBe(1);
		});

		it("sorts valid title before null", () => {
			const a: { title: string | null } = { title: "Apple" };
			const b: { title: string | null } = { title: null };

			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("sorts valid title before undefined", () => {
			const a: { title: string | undefined } = { title: "Apple" };
			const b: { title: string | undefined } = { title: undefined };

			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("treats two null titles as equal", () => {
			const a: { title: null } = { title: null };
			const b: { title: null } = { title: null };

			expect(sortByTitleProperty(a, b)).toBe(0);
		});

		it("treats two undefined titles as equal", () => {
			const a: { title: undefined } = { title: undefined };
			const b: { title: undefined } = { title: undefined };

			expect(sortByTitleProperty(a, b)).toBe(0);
		});

		it("treats null and undefined as equal", () => {
			const a: { title: string | null | undefined } = { title: null };
			const b: { title: string | null | undefined } = { title: undefined };

			expect(sortByTitleProperty(a, b)).toBe(0);
		});

		it("sorts array with null/undefined titles to the end", () => {
			const items: { title: string | null | undefined; id: number }[] = [
				{ title: null, id: 1 },
				{ title: "Banana", id: 2 },
				{ title: undefined, id: 3 },
				{ title: "Apple", id: 4 },
			];

			const sorted = [...items].sort(sortByTitleProperty);

			expect(sorted).toEqual([
				{ title: "Apple", id: 4 },
				{ title: "Banana", id: 2 },
				{ title: null, id: 1 },
				{ title: undefined, id: 3 },
			]);
		});
	});

	describe("generic type support", () => {
		it("works with objects that have additional properties", () => {
			interface FollowingEntry {
				title: string;
				href: string;
				description: string;
				cta: string;
			}

			const a: FollowingEntry = {
				title: "Syntax FM",
				href: "https://syntax.fm/",
				description: "Tasty treats for web developers.",
				cta: "Listen",
			};

			const b: FollowingEntry = {
				title: "The Changelog",
				href: "https://changelog.com/podcast",
				description: "Software's best weekly news brief.",
				cta: "Listen",
			};

			expect(sortByTitleProperty(a, b)).toBe(-1);
		});

		it("works with UsesEntry type objects", () => {
			interface UsesEntry {
				title: string;
				description: string;
				link: {
					href: string;
					label: string;
				};
			}

			const a: UsesEntry = {
				title: "VSCode",
				description: "Code editor",
				link: {
					href: "https://code.visualstudio.com/",
					label: "visualstudio.com",
				},
			};

			const b: UsesEntry = {
				title: "Docker",
				description: "Container platform",
				link: { href: "https://www.docker.com/", label: "docker.com" },
			};

			expect(sortByTitleProperty(a, b)).toBe(1);
		});
	});
});
