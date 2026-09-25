import type { MetadataRoute } from "next";
import { images, serviceImages } from "@/lib/images";
import { absoluteUrl } from "@/lib/seo";
import { services, site } from "@/lib/site";

// Bump when page content meaningfully changes so crawlers re-fetch.
const lastModified = new Date("2026-09-25");

export default function sitemap(): MetadataRoute.Sitemap {
  const img = (...list: { src: { src: string } }[]) => list.map((i) => absoluteUrl(i.src.src));
  const pages: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
    images?: string[];
  }[] = [
    {
      path: "",
      priority: 1,
      changeFrequency: "weekly",
      images: img(images.heroTeam, images.globalNetwork, images.strategyWorkshop, images.teamDesk),
    },
    {
      path: "/services",
      priority: 0.9,
      changeFrequency: "monthly",
      images: img(images.strategyWorkshop, ...services.map((s) => serviceImages[s.slug].card)),
    },
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
      images: img(serviceImages[s.slug].hero, serviceImages[s.slug].detail),
    })),
    { path: "/about", priority: 0.8, changeFrequency: "monthly", images: img(images.teamMeeting, images.indiaGate) },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/testimonials", priority: 0.8, changeFrequency: "monthly" },
    { path: "/process", priority: 0.7, changeFrequency: "monthly", images: img(images.teamPresentation) },
    { path: "/careers", priority: 0.6, changeFrequency: "weekly", images: img(images.teamTogether) },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    ...(p.images && { images: p.images }),
  }));
}
