import {
  siClaude,
  siFigma,
  siFlutter,
  siGoogleads,
  siGoogleanalytics,
  siGooglegemini,
  siGooglesearchconsole,
  siGoogletagmanager,
  siHubspot,
  siJavascript,
  siMailchimp,
  siMake,
  siMeta,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOdoo,
  siPhp,
  siRazorpay,
  siReact,
  siSemrush,
  siShopify,
  siTypescript,
  siWoocommerce,
  siWordpress,
  siZapier,
  siZoho,
} from "simple-icons";

export type TechCategory = "marketing" | "development" | "commerce" | "automation" | "ai";

export const techCategories: { id: TechCategory; label: string }[] = [
  { id: "marketing", label: "Marketing & Analytics" },
  { id: "development", label: "Development" },
  { id: "commerce", label: "E-commerce & CMS" },
  { id: "automation", label: "CRM & Automation" },
  { id: "ai", label: "AI" },
];

export type Tech = {
  name: string;
  category: TechCategory;
  /** Brand colour (hex without #). */
  hex: string;
  /** SVG path (24×24) from Simple Icons (CC0). Omitted → lettered badge. */
  path?: string;
  /** Badge text when there is no logo. */
  badge?: string;
  /** Wide wordmark logos render larger inside the tile. */
  wide?: boolean;
};

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const icon = (i: { hex: string; path: string }) => ({ hex: i.hex, path: i.path });

// Names match the `stack` entries in site.ts so service pages can show the same logos.
export const techStack: Tech[] = [
  { name: "Google Ads", category: "marketing", ...icon(siGoogleads) },
  { name: "Meta Ads", category: "marketing", ...icon(siMeta) },
  { name: "LinkedIn Ads", category: "marketing", hex: "0A66C2", path: LINKEDIN_PATH },
  { name: "GA4", category: "marketing", ...icon(siGoogleanalytics) },
  { name: "Search Console", category: "marketing", ...icon(siGooglesearchconsole) },
  { name: "Tag Manager", category: "marketing", ...icon(siGoogletagmanager) },
  { name: "SEMrush", category: "marketing", ...icon(siSemrush) },
  { name: "Mailchimp", category: "marketing", ...icon(siMailchimp) },

  { name: "Next.js", category: "development", ...icon(siNextdotjs) },
  { name: "React", category: "development", ...icon(siReact) },
  { name: "React Native", category: "development", ...icon(siReact) },
  { name: "Node.js", category: "development", ...icon(siNodedotjs) },
  { name: "Flutter", category: "development", ...icon(siFlutter) },
  { name: "JavaScript", category: "development", ...icon(siJavascript) },
  { name: "TypeScript", category: "development", ...icon(siTypescript) },
  { name: "PHP", category: "development", ...icon(siPhp) , wide: true },
  { name: "MySQL", category: "development", ...icon(siMysql) , wide: true },
  { name: "Figma", category: "development", ...icon(siFigma) },

  { name: "Shopify", category: "commerce", ...icon(siShopify) },
  { name: "WordPress", category: "commerce", ...icon(siWordpress) },
  { name: "WooCommerce", category: "commerce", ...icon(siWoocommerce) , wide: true },
  { name: "Razorpay", category: "commerce", ...icon(siRazorpay) },
  { name: "AWS", category: "commerce", hex: "FF9900", badge: "AWS" },

  { name: "Zoho", category: "automation", ...icon(siZoho) , wide: true },
  { name: "HubSpot", category: "automation", ...icon(siHubspot) },
  { name: "Salesforce", category: "automation", hex: "00A1E0", badge: "SF" },
  { name: "Odoo", category: "automation", ...icon(siOdoo) , wide: true },
  { name: "Zapier", category: "automation", ...icon(siZapier) , wide: true },
  { name: "Make", category: "automation", ...icon(siMake) },
  { name: "n8n", category: "automation", ...icon(siN8n) },
  { name: "Power BI", category: "automation", hex: "F2C811", badge: "BI" },

  { name: "ChatGPT", category: "ai", hex: "10A37F", badge: "GPT" },
  { name: "Claude", category: "ai", ...icon(siClaude) },
  { name: "Gemini", category: "ai", ...icon(siGooglegemini) },
];

/** Shown first in the collapsed "All" view — one highlight from each area, then everything else. */
const highlights = ["Google Ads", "Next.js", "Shopify", "HubSpot", "Meta Ads", "React", "WordPress", "Zoho"];

export const techShowcase: Tech[] = [
  ...highlights.map((n) => techStack.find((t) => t.name === n)!),
  ...techStack.filter((t) => !highlights.includes(t.name)),
];

export function getTech(name: string) {
  return techStack.find((t) => t.name === name);
}

/** Relative luminance (0–1) of a hex colour. */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** True for very dark brand colours (e.g. black) that vanish on dark backgrounds. */
export function isDarkColor(hex: string) {
  return luminance(hex) < 0.15;
}

/** True for light brand colours (e.g. yellow) that need a dark glyph on a solid tile to stay legible. */
export function isLightColor(hex: string) {
  return luminance(hex) > 0.6;
}
