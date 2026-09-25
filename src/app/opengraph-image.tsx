import { ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.descriptor,
    title: "Digital Marketing, Web & App Development and Business Automation",
  });
}
