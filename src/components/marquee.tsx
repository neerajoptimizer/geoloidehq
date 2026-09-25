import type { ReactNode } from "react";
import { cn } from "./ui";

/** Infinitely scrolling row. Items are rendered twice; the duplicate is hidden from assistive tech. */
export function Marquee({
  items,
  reverse,
  className,
  renderItem,
}: {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
  renderItem: (item: string) => ReactNode;
}) {
  return (
    <div
      className={cn(
        "marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "marquee-track flex w-max shrink-0",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-4 pr-4">
            {items.map((item) => (
              <li key={item} className="shrink-0">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
