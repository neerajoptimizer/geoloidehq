import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

// Bump when page content meaningfully changes so crawlers re-fetch.
const lastModified = new Date("2026-09-25");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9, changeFrequency: "monthly" as const })),
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/process", priority: 0.7, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
