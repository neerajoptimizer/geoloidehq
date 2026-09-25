import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/process", "/careers", "/contact", "/privacy-policy", "/terms"];
  return [
    ...paths.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, priority: 0.8 })),
  ];
}
