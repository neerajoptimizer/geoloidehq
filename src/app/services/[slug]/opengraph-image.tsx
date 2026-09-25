import { ogSize, renderOgImage } from "@/lib/og";
import { getService, services, site } from "@/lib/site";

export const alt = `${site.legalName} services`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({ eyebrow: service?.title ?? "Services", title: service?.headline ?? site.tagline });
}
