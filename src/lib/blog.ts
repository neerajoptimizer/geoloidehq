import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import type { ComponentType } from "react";
import type { PostMeta, PostSummary } from "./blog-shared";

// Server-only: reads article files from disk. Client components import from ./blog-shared instead.
export * from "./blog-shared";

export type Post = PostSummary & {
  Content: ComponentType;
  toc: { id: string; text: string }[];
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getPostSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readSource(slug: string) {
  return fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
}

/** Article body without the import/export preamble. */
function bodyOf(source: string) {
  return source.replace(/^(import|export)[\s\S]*?(?:;\s*$|^\};\s*$)/gm, "");
}

function readingMinutes(source: string) {
  const words = bodyOf(source)
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** H2 headings, with ids generated exactly like rehype-slug (github-slugger) so TOC links match. */
function tableOfContents(source: string) {
  const slugger = new GithubSlugger();
  return [...bodyOf(source).matchAll(/^## (.+)$/gm)].map(([, raw]) => {
    const text = raw.replace(/[*_`]/g, "").trim();
    return { id: slugger.slug(text), text };
  });
}

export async function getPost(slug: string): Promise<Post | undefined> {
  if (!getPostSlugs().includes(slug)) return undefined;
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as { default: ComponentType; meta: PostMeta };
  const source = readSource(slug);
  return {
    slug,
    meta: mod.meta,
    Content: mod.default,
    readingMinutes: readingMinutes(source),
    toc: tableOfContents(source),
  };
}

/** All posts, newest first. */
export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await Promise.all(getPostSlugs().map((slug) => getPost(slug)));
  return posts
    .filter((p): p is Post => Boolean(p))
    .map(({ slug, meta, readingMinutes }) => ({ slug, meta, readingMinutes }))
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}
