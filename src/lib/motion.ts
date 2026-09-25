import type { CSSProperties } from "react";

/** Inline style that staggers a [data-reveal] element by its index in a list. */
export function revealDelay(index: number, step = 90): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}
