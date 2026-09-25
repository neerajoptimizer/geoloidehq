import type { CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { getTech, isDarkColor, isLightColor, techCategories, techShowcase, techStack, type Tech } from "@/lib/tech";
import { Container, SectionHeading, cn } from "./ui";

/** Brand logo tile. Light brand colours get a solid tile with a dark glyph for contrast. */
export function TechLogo({ tech, onDark, className }: { tech: Tech; onDark?: boolean; className?: string }) {
  const light = isLightColor(tech.hex);
  const color = `#${tech.hex}`;
  // Near-black logos switch to white on dark backgrounds so they stay visible.
  const glyph = light ? "#231e23" : onDark && isDarkColor(tech.hex) ? "#ffffff" : color;
  const bg = light ? color : onDark && isDarkColor(tech.hex) ? "rgb(255 255 255 / 0.12)" : `${color}14`;
  return (
    <span
      aria-hidden
      className={cn("grid shrink-0 place-items-center rounded-xl", className)}
      style={{ backgroundColor: bg, color: glyph }}
    >
      {tech.path ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className={tech.wide ? "size-[80%]" : "size-[55%]"}>
          <path d={tech.path} />
        </svg>
      ) : (
        <span className="font-display text-[0.7em] font-extrabold tracking-tight">{tech.badge}</span>
      )}
    </span>
  );
}

/** Small logo + name chip, used for per-service tool lists. Falls back to a plain chip for unknown tools. */
export function TechChip({ name, dark }: { name: string; dark?: boolean }) {
  const tech = getTech(name);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-medium ring-1 transition",
        dark ? "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10" : "bg-white text-ink-700 ring-ink-100",
        !tech && "pl-4",
      )}
    >
      {tech && <TechLogo tech={tech} onDark={dark} className="size-7 rounded-full text-sm" />}
      {name}
    </span>
  );
}

/**
 * "Platforms & technologies" section with CSS-only category tabs (radio inputs + :has()),
 * so every tool is server-rendered and crawlable, and filtering needs no JavaScript.
 */
export function TechStackSection() {
  const tabs = [{ id: "all", label: "All" }, ...techCategories];
  return (
    <section className="tech-stack relative overflow-hidden bg-ink-50/70 py-20 sm:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Tools & technology"
          title="Platforms & technologies we work with"
          description={`${techStack.length}+ trusted platforms across marketing, development, commerce, automation and AI — chosen to fit your business, not the other way round.`}
        />

        <fieldset className="mt-10">
          <legend className="sr-only">Filter technologies by category</legend>
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((t, i) => (
              <label key={t.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="tech-filter"
                  value={t.id}
                  defaultChecked={i === 0}
                  className="peer sr-only"
                  data-tech-tab={t.id}
                />
                <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-ink-200 transition peer-checked:bg-ink-900 peer-checked:text-white peer-checked:ring-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 hover:ring-brand-300 sm:px-5 sm:py-2.5">
                  {t.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <ul className="mt-10 grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {techShowcase.map((tech, i) => (
            <li
              key={tech.name}
              data-tech-cat={tech.category}
              // Collapsed "All" view shows one row: 6 tiles (phone/desktop) or 8 (tablet, 4 columns).
              data-tech-extra={i >= 8 ? "all" : i >= 6 ? "wide" : undefined}
              style={{ "--brand": `#${tech.hex}` } as CSSProperties}
              className="group relative flex flex-col items-center gap-2.5 rounded-2xl bg-white px-2 py-4 text-center ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_var(--brand)] hover:ring-[var(--brand)] sm:rounded-3xl sm:py-6"
            >
              <TechLogo tech={tech} className="size-11 text-base transition duration-300 group-hover:scale-110 sm:size-14 sm:text-lg" />
              <span className="text-[11px] leading-tight font-semibold text-ink-800 sm:text-sm">{tech.name}</span>
            </li>
          ))}
        </ul>

        <div className="tech-more-toggle mt-10 flex justify-center">
          <label className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ink-900/20 transition hover:-translate-y-0.5 hover:bg-brand-600 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500">
            <input type="checkbox" className="peer sr-only" data-tech-more aria-label="Show all technologies" />
            <span className="peer-checked:hidden">View all {techStack.length} tools</span>
            <span className="hidden peer-checked:inline">Show less</span>
            <ChevronDown className="size-4 transition-transform peer-checked:rotate-180" aria-hidden />
          </label>
        </div>
      </Container>
    </section>
  );
}
