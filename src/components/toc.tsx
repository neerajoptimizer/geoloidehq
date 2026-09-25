"use client";

import { useEffect, useState } from "react";
import { cn } from "./ui";

/** "On this page" navigation that highlights the section currently being read. */
export function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px" },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold tracking-wider text-ink-400 uppercase">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-ink-100">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition",
                active === item.id
                  ? "border-brand-500 font-semibold text-brand-700"
                  : "border-transparent text-ink-500 hover:border-ink-300 hover:text-ink-900",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
