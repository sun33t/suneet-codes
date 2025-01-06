import { type Article } from "content-collections";
import { z } from "zod";

export type Page =
  | "about"
  | "articles"
  | "projects"
  | "following"
  | "uses"
  | "contact"
  | "thank-you";
export type PageTitle = Record<"title", Page>;

export type SearchParams = Promise<{
  category: Article["categories"]["0"] | Article["categories"] | undefined;
}>;

export const contactFormFieldSchema = z.object({
  firstname: z
    .string({
      required_error: "firstname is required",
      invalid_type_error: "firstname must be a string",
    })
    .min(3)
    .regex(/^[a-zA-Z]+$/, {
      message: "Alphabetic characters only",
    }),
  lastname: z
    .string({
      required_error: "lastname is required",
      invalid_type_error: "lastname must be a string",
    })
    .min(3)
    .regex(/^[a-zA-Z]+$/, {
      message: "Alphabetic characters only",
    }),
  company: z.string().min(3).optional(),
  email: z.string().email(),
  message: z.string().optional(),
  reason: z.string(),
});
export type ContactFormFieldSchema = z.infer<typeof contactFormFieldSchema>;
