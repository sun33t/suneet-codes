import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { DateStringSchema, formatDate } from "./formatDate";

describe("formatDate", () => {
	describe("valid date strings", () => {
		it("formats date as 'D Month YYYY' (e.g., '15 January 2024')", () => {
			expect(formatDate("2024-01-15")).toBe("15 January 2024");
		});

		it("handles single-digit days", () => {
			expect(formatDate("2024-03-05")).toBe("5 March 2024");
		});

		it("handles December dates", () => {
			expect(formatDate("2023-12-25")).toBe("25 December 2023");
		});

		it("handles January 1st", () => {
			expect(formatDate("2024-01-01")).toBe("1 January 2024");
		});

		it("handles leap year date", () => {
			expect(formatDate("2024-02-29")).toBe("29 February 2024");
		});
	});

	describe("different years", () => {
		it("formats dates from 2020s", () => {
			expect(formatDate("2025-06-15")).toBe("15 June 2025");
		});

		it("formats dates from 2010s", () => {
			expect(formatDate("2015-07-04")).toBe("4 July 2015");
		});

		it("formats dates from early 2000s", () => {
			expect(formatDate("2001-09-11")).toBe("11 September 2001");
		});
	});

	describe("edge cases", () => {
		it("handles year boundary (Dec 31)", () => {
			expect(formatDate("2024-12-31")).toBe("31 December 2024");
		});

		it("handles year boundary (Jan 1)", () => {
			expect(formatDate("2025-01-01")).toBe("1 January 2025");
		});

		it("handles end of February in non-leap year", () => {
			expect(formatDate("2023-02-28")).toBe("28 February 2023");
		});
	});

	describe("timezone consistency", () => {
		it("produces consistent results regardless of local timezone", () => {
			// The function appends T00:00:00Z to force UTC interpretation
			// This ensures "2024-06-15" always means June 15, not June 14 or 16
			// depending on timezone
			const result = formatDate("2024-06-15");
			expect(result).toBe("15 June 2024");
		});
	});

	describe("ISO 8601 format (Payload CMS)", () => {
		it("handles ISO 8601 format with Z timezone", () => {
			expect(formatDate("2024-01-15T00:00:00.000Z")).toBe("15 January 2024");
		});

		it("handles ISO 8601 format without milliseconds", () => {
			expect(formatDate("2024-03-05T12:30:00Z")).toBe("5 March 2024");
		});

		it("handles ISO 8601 format with timezone offset", () => {
			expect(formatDate("2023-12-25T00:00:00+00:00")).toBe("25 December 2023");
		});

		it("extracts date correctly regardless of time component", () => {
			expect(formatDate("2024-06-15T23:59:59.999Z")).toBe("15 June 2024");
		});
	});

	describe("invalid inputs", () => {
		it("throws ZodError for empty string", () => {
			expect(() => formatDate("")).toThrow(ZodError);
		});

		it("throws ZodError for non-YYYY-MM-DD format", () => {
			expect(() => formatDate("January 15, 2024")).toThrow(ZodError);
		});

		it("throws ZodError for malformed date string", () => {
			expect(() => formatDate("not-a-date")).toThrow(ZodError);
		});

		it("throws ZodError for invalid date values", () => {
			expect(() => formatDate("2024-13-01")).toThrow(ZodError);
		});

		it("throws ZodError for Feb 29 in non-leap year", () => {
			expect(() => formatDate("2023-02-29")).toThrow(ZodError);
		});
	});
});

describe("DateStringSchema", () => {
	it("rejects empty string", () => {
		const result = DateStringSchema.safeParse("");
		expect(result.success).toBe(false);
	});

	it("rejects wrong format", () => {
		const result = DateStringSchema.safeParse("06/15/2024");
		expect(result.success).toBe(false);
	});

	it("rejects invalid calendar date", () => {
		const result = DateStringSchema.safeParse("2024-13-01");
		expect(result.success).toBe(false);
	});

	it("rejects Feb 29 on non-leap year", () => {
		const result = DateStringSchema.safeParse("2023-02-29");
		expect(result.success).toBe(false);
	});

	it("accepts Feb 29 on leap year", () => {
		const result = DateStringSchema.safeParse("2024-02-29");
		expect(result.success).toBe(true);
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

	it("transforms ISO 8601 string to Date object", () => {
		const result = DateStringSchema.safeParse("2024-06-15T12:30:00.000Z");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBeInstanceOf(Date);
			expect(result.data.getUTCFullYear()).toBe(2024);
			expect(result.data.getUTCMonth()).toBe(5); // June is 5 (0-indexed)
			expect(result.data.getUTCDate()).toBe(15);
		}
	});
});
