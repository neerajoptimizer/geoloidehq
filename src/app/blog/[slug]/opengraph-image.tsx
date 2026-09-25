import { getPost, getPostSlugs } from "@/lib/blog";
import { ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} blog article`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({ eyebrow: `Blog · ${post?.meta.category ?? ""}`, title: post?.meta.title ?? site.tagline });
}
