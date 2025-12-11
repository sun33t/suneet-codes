import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import {
	DateStringSchema,
	formatDateRelativeToCurrentYear,
} from "./formatDateRelativeToCurrentYear";

const REFERENCE_DATE = new Date("2025-06-15");

describe("formatDateRelativeToCurrentYear", () => {
	describe("dates in the current year", () => {
		it("formats date as 'MMM D' (e.g., 'Jan 15')", () => {
			const result = formatDateRelativeToCurrentYear(
				"2025-01-15",
				REFERENCE_DATE,
			);
			expect(result).toBe("Jan 15");
		});

		it("handles single-digit days", () => {
			const result = formatDateRelativeToCurrentYear(
				"2025-03-05",
				REFERENCE_DATE,
			);
			expect(result).toBe("Mar 5");
		});

		it("handles December dates", () => {
			const result = formatDateRelativeToCurrentYear(
				"2025-12-31",
				REFERENCE_DATE,
			);
			expect(result).toBe("Dec 31");
		});

		it("handles January 1st", () => {
			const result = formatDateRelativeToCurrentYear(
				"2025-01-01",
				REFERENCE_DATE,
			);
			expect(result).toBe("Jan 1");
		});
	});

	describe("dates in other years", () => {
		it("formats past year date as 'D MMM YY' (e.g., '15 Jan 24')", () => {
			const result = formatDateRelativeToCurrentYear(
				"2024-01-15",
				REFERENCE_DATE,
			);
			expect(result).toBe("15 Jan 24");
		});

		it("formats future year date with 2-digit year", () => {
			const result = formatDateRelativeToCurrentYear(
				"2026-06-20",
				REFERENCE_DATE,
			);
			expect(result).toBe("20 Jun 26");
		});

		it("handles single-digit days in other years", () => {
			const result = formatDateRelativeToCurrentYear(
				"2023-03-05",
				REFERENCE_DATE,
			);
			expect(result).toBe("5 Mar 23");
		});

		it("handles dates from decades ago", () => {
			const result = formatDateRelativeToCurrentYear(
				"2010-07-04",
				REFERENCE_DATE,
			);
			expect(result).toBe("4 Jul 10");
		});

		it("handles dates from early 2000s", () => {
			const result = formatDateRelativeToCurrentYear(
				"2001-09-11",
				REFERENCE_DATE,
			);
			expect(result).toBe("11 Sept 01");
		});
	});

	describe("various date string formats", () => {
		it("handles ISO date string format", () => {
			const result = formatDateRelativeToCurrentYear(
				"2024-06-15",
				REFERENCE_DATE,
			);
			expect(result).toBe("15 Jun 24");
		});

		it("handles ISO datetime string format", () => {
			const result = formatDateRelativeToCurrentYear(
				"2024-06-15T10:30:00",
				REFERENCE_DATE,
			);
			expect(result).toBe("15 Jun 24");
		});

		it("handles long date format", () => {
			const result = formatDateRelativeToCurrentYear(
				"June 15, 2024",
				REFERENCE_DATE,
			);
			// Non-ISO formats are parsed in local time, result may vary by timezone
			expect(result).toMatch(/^\d{1,2} Jun 24$/);
		});

		it("handles short date format", () => {
			const result = formatDateRelativeToCurrentYear(
				"6/15/2024",
				REFERENCE_DATE,
			);
			// Non-ISO formats are parsed in local time, result may vary by timezone
			expect(result).toMatch(/^\d{1,2} Jun 24$/);
		});
	});

	describe("edge cases and invalid inputs", () => {
		it("throws ZodError for empty string", () => {
			expect(() => formatDateRelativeToCurrentYear("", REFERENCE_DATE)).toThrow(
				ZodError,
			);
		});

		it("throws ZodError for malformed date string", () => {
			expect(() =>
				formatDateRelativeToCurrentYear("not-a-date", REFERENCE_DATE),
			).toThrow(ZodError);
		});

		it("throws ZodError for gibberish input", () => {
			expect(() =>
				formatDateRelativeToCurrentYear("abc123xyz", REFERENCE_DATE),
			).toThrow(ZodError);
		});

		it("handles date at year boundary (Dec 31 to Jan 1)", () => {
			// Dec 31 of current year
			expect(
				formatDateRelativeToCurrentYear("2025-12-31", REFERENCE_DATE),
			).toBe("Dec 31");
			// Jan 1 of next year
			expect(
				formatDateRelativeToCurrentYear("2026-01-01", REFERENCE_DATE),
			).toBe("1 Jan 26");
		});
	});

	describe("DateStringSchema", () => {
		it("provides helpful message for empty string", () => {
			const result = DateStringSchema.safeParse("");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					"Date string cannot be empty",
				);
			}
		});

		it("provides helpful message for invalid date", () => {
			const result = DateStringSchema.safeParse("not-a-date");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].message).toBe(
					'Invalid date string: "not-a-date"',
				);
			}
		});

		it("transforms valid date string to Date object", () => {
			const result = DateStringSchema.safeParse("2024-06-15");
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toBeInstanceOf(Date);
				expect(result.data.getUTCFullYear()).toBe(2024);
				expect(result.data.getUTCMonth()).toBe(5); // June is 5 (0-indexed)
				expect(result.data.getUTCDate()).toBe(15);
			}
		});
	});

	describe("timezone considerations", () => {
		it("handles UTC timezone suffix", () => {
			const result = formatDateRelativeToCurrentYear(
				"2024-06-15T00:00:00Z",
				REFERENCE_DATE,
			);
			// Note: Result may vary based on local timezone
			expect(result).toMatch(/^\d{1,2} Jun 24$/);
		});
	});

	describe("referenceDate parameter", () => {
		it("uses current date when referenceDate is not provided", () => {
			// This test verifies the default behavior without mocking
			const currentYear = new Date().getFullYear();
			const result = formatDateRelativeToCurrentYear(`${currentYear}-06-15`);
			expect(result).toBe("Jun 15");
		});

		it("determines current year from referenceDate", () => {
			// Same date appears differently based on reference year
			const in2024 = formatDateRelativeToCurrentYear(
				"2024-03-15",
				new Date("2024-01-01"),
			);
			const in2025 = formatDateRelativeToCurrentYear(
				"2024-03-15",
				new Date("2025-01-01"),
			);

			expect(in2024).toBe("Mar 15"); // Current year format
			expect(in2025).toBe("15 Mar 24"); // Other year format
		});
	});
});
