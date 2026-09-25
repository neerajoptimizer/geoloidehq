"use client";

import { useState } from "react";
import type { Testimonial, TestimonialCategory } from "@/lib/testimonials";
import { TestimonialCard } from "./testimonials";
import { cn } from "./ui";

/** Filterable masonry of client reviews. All reviews are server-rendered, so every quote is crawlable. */
export function TestimonialsBrowser({
  items,
  categories,
}: {
  items: Testimonial[];
  categories: TestimonialCategory[];
}) {
  const [active, setActive] = useState<TestimonialCategory | "All">("All");
  const filters = ["All", ...categories] as const;
  const visible = active === "All" ? items : items.filter((t) => t.categories.includes(active));
  const count = (f: (typeof filters)[number]) =>
    f === "All" ? items.length : items.filter((t) => t.categories.includes(f)).length;

  return (
    <div>
      <div role="group" aria-label="Filter client stories by service" className="flex flex-wrap justify-center gap-2">
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
                : "bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-brand-300 hover:text-brand-700",
            )}
          >
            {f} <span className={cn("ml-1", active === f ? "text-brand-300" : "text-ink-400")}>{count(f)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} client {visible.length === 1 ? "story" : "stories"}
      </p>
      <div className="mt-10 gap-6 md:columns-2 lg:columns-3">
        {visible.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} className="mb-6 break-inside-avoid" />
        ))}
      </div>
    </div>
  );
}
