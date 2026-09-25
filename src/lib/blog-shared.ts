import type { StaticImageData } from "next/image";
import type { ServiceSlug } from "./site";

// Blog types and helpers that are safe to use in client components (no filesystem access).

export const blogCategories = ["Web Development", "Digital Marketing", "Business Automation"] as const;
export type BlogCategory = (typeof blogCategories)[number];

/** Shape of the `meta` export at the top of every src/content/blog/*.mdx article. */
export type PostMeta = {
  title: string;
  /** Search-result title (≤ 50 chars so " | Geoloide" still fits in 60). Defaults to `title`. */
  seoTitle?: string;
  /** Meta description and card summary (aim for 140–160 chars). */
  description: string;
  category: BlogCategory;
  /** ISO dates, e.g. "2026-09-24". */
  date: string;
  updated?: string;
  author: { name: string; role?: string };
  cover: StaticImageData;
  coverAlt: string;
  keywords?: string[];
  relatedService: ServiceSlug;
  faqs?: { q: string; a: string }[];
};

export type PostSummary = {
  slug: string;
  meta: PostMeta;
  readingMinutes: number;
};

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
