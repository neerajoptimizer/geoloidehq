import type { ReactNode } from "react";
import { cn } from "./ui";

/**
 * Infinitely scrolling row that pauses on hover. Items are rendered twice for a seamless loop; the
 * duplicate is hidden from assistive tech. With reduced motion it becomes a manually scrollable row.
 */
export function Marquee<T>({
  items,
  reverse,
  className,
  duration = 40,
  stretch,
  getKey = (item) => String(item),
  renderItem,
}: {
  items: readonly T[];
  reverse?: boolean;
  className?: string;
  /** Seconds for one full loop — longer for wide items so text stays readable. */
  duration?: number;
  /** Make all items in the row equal height (for cards). */
  stretch?: boolean;
  getKey?: (item: T) => string;
  renderItem: (item: T) => ReactNode;
}) {
  return (
    <div
      className={cn(
        "marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <div
        className={cn("marquee-track flex w-max shrink-0", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className={cn("flex shrink-0 gap-4 pr-4", stretch ? "items-stretch" : "items-center")}
          >
            {items.map((item) => (
              <li key={getKey(item)} className={cn("shrink-0", stretch && "flex")}>
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
