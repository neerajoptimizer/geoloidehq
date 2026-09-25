import type { Metadata } from "next";
import { site } from "./site";

type PageSeo = {
  /** Page title (≤ 60 chars incl. the " | Geoloide" suffix added by the root template). */
  title: string;
  /** Meta description (aim for 140–160 chars). */
  description: string;
  /** Route path starting with "/" — used for the canonical URL and og:url. */
  path: string;
  keywords?: string[];
  /** Set to render the title without the site-wide template suffix. */
  absoluteTitle?: boolean;
  /** Social share image; defaults to the site-wide generated Open Graph image. */
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle,
  image = "/opengraph-image",
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.legalName,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes "<" to prevent script injection). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema({
  type = "WebPage",
  name,
  description,
  path,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}
