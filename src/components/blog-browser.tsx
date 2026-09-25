"use client";

import { useState } from "react";
import type { BlogCategory, PostSummary } from "@/lib/blog-shared";
import { BlogCard } from "./blog";
import { cn } from "./ui";

/** Topic filter for the blog listing. Every post is server-rendered; filtering only hides cards. */
export function BlogBrowser({ posts, categories }: { posts: PostSummary[]; categories: readonly BlogCategory[] }) {
  const [active, setActive] = useState<BlogCategory | "All">("All");
  const filters = ["All", ...categories] as const;
  const visible = active === "All" ? posts : posts.filter((p) => p.meta.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition",
              active === f
                ? "bg-ink-900 text-white shadow-lg shadow-ink-900/20"
                : "bg-white text-ink-700 ring-1 ring-ink-200 hover:text-brand-700 hover:ring-brand-300",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <BlogCard key={p.slug} post={p} index={i} headingLevel="h2" />
        ))}
      </div>
      {!visible.length && <p className="mt-10 text-ink-500">No articles in this topic yet — check back soon.</p>}
    </div>
  );
}
