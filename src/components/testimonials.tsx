import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Quote } from "lucide-react";
import { revealDelay } from "@/lib/motion";
import { attribution, testimonials, type Testimonial } from "@/lib/testimonials";
import { Marquee } from "./marquee";
import { ButtonLink, Container, SectionHeading, cn } from "./ui";

const avatarTones = [
  "bg-brand-100 text-brand-800",
  "bg-ink-900 text-white",
  "bg-brand-500 text-white",
  "bg-ink-100 text-ink-800",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ name, index, className }: { name: string; index: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full font-display text-base font-bold",
        avatarTones[index % avatarTones.length],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

function CategoryChips({ t, dark }: { t: Testimonial; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {t.categories.map((c) => (
        <li
          key={c}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            dark ? "bg-white/10 text-brand-300 ring-1 ring-white/15" : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
          )}
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

export function TestimonialCard({ t, index, className }: { t: Testimonial; index: number; className?: string }) {
  return (
    <figure
      data-reveal
      style={revealDelay(index % 3, 110)}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5 hover:ring-brand-200",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <CategoryChips t={t} />
        <Quote className="size-6 shrink-0 text-brand-200 transition group-hover:text-brand-500" aria-hidden />
      </div>
      <p className="mt-4 font-display text-lg leading-snug font-bold text-ink-900">“{t.headline}”</p>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
        <Avatar name={t.name} index={index} className="size-10 text-sm" />
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 font-semibold text-ink-900">
            {t.name}
            <BadgeCheck className="size-4 text-brand-500" aria-label="Geoloide client" />
          </span>
          <span className="block text-sm text-ink-500">{attribution(t)}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function FeaturedTestimonial({ t, index }: { t: Testimonial; index: number }) {
  return (
    <figure
      data-reveal
      style={revealDelay(index, 140)}
      className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-ink-900 p-6 text-white sm:p-8"
    >
      <div className="bg-grid-light pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-24 -right-24 -z-10 size-72 rounded-full border-[36px] border-brand-500/15" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="inline-flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white">
            <Building2 className="size-6" aria-hidden />
          </span>
          <span>
            <span className="block font-display text-xl font-bold">{t.company}</span>
            <span className="block text-xs tracking-wider text-ink-400 uppercase">Client project</span>
          </span>
        </span>
        <CategoryChips t={t} dark />
      </div>
      <Quote className="mt-6 size-7 text-brand-400" aria-hidden />
      <p className="mt-3 font-display text-xl leading-snug font-bold text-balance sm:text-2xl">“{t.headline}”</p>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-300">
        <p>{t.quote}</p>
      </blockquote>
      {t.delivered && (
        <div className="mt-6">
          <p className="text-xs font-semibold tracking-wider text-ink-400 uppercase">What we delivered</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {t.delivered.map((d) => (
              <li key={d} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/15">
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <Avatar name={t.name} index={2} className="size-10 text-sm" />
        <span>
          <span className="flex items-center gap-1.5 font-semibold">
            {t.name}
            <BadgeCheck className="size-4 text-brand-400" aria-label="Geoloide client" />
          </span>
          <span className="block text-sm text-ink-400">{attribution(t)}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Trust strip summarising the reviews — every figure is derived from the real testimonial data. */
export function TestimonialSummary({ className }: { className?: string }) {
  const categories = new Set(testimonials.flatMap((t) => t.categories));
  return (
    <dl
      data-reveal
      className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-100 ring-1 ring-ink-100", className)}
    >
      {[
        { label: "Client stories", value: testimonials.length },
        { label: "Service areas reviewed", value: categories.size },
      ].map((item) => (
        <div key={item.label} className="flex flex-col-reverse bg-white px-4 py-4 text-center">
          <dt className="mt-0.5 text-xs text-ink-500 sm:text-sm">{item.label}</dt>
          <dd className="font-display text-2xl font-bold text-ink-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Small review card used in scrolling rows and service pages. Full quote stays in the DOM (clamped visually). */
export function CompactTestimonialCard({
  t,
  index,
  className,
  clamp = true,
}: {
  t: Testimonial;
  index: number;
  className?: string;
  clamp?: boolean;
}) {
  const dark = t.featured;
  return (
    <figure
      className={cn(
        "flex w-[300px] flex-col rounded-2xl p-5 ring-1 transition duration-300 hover:-translate-y-1 sm:w-[360px] sm:p-6",
        dark
          ? "bg-ink-900 text-white ring-ink-900 hover:shadow-xl hover:shadow-ink-900/20"
          : "bg-white ring-ink-100 hover:shadow-xl hover:shadow-ink-900/5 hover:ring-brand-200",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "truncate rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
            dark ? "bg-white/10 text-brand-300" : "bg-brand-50 text-brand-700",
          )}
        >
          {t.company ? `${t.company} · ${t.categories[0]}` : t.categories.join(" + ")}
        </span>
        <Quote className={cn("size-5 shrink-0", dark ? "text-brand-400" : "text-brand-300")} aria-hidden />
      </div>
      <p className={cn("mt-4 font-display text-base leading-snug font-bold", dark ? "text-white" : "text-ink-900")}>
        “{t.headline}”
      </p>
      <blockquote className={cn("mt-2 flex-1 text-sm leading-relaxed", dark ? "text-ink-300" : "text-ink-600")}>
        <p className={cn(clamp && "line-clamp-4")}>{t.quote}</p>
      </blockquote>
      <figcaption className={cn("mt-5 flex items-center gap-3 border-t pt-4", dark ? "border-white/10" : "border-ink-100")}>
        <Avatar name={t.name} index={dark ? 2 : index} className="size-9 text-sm" />
        <span className="min-w-0">
          <span className={cn("flex items-center gap-1 text-sm font-semibold", dark ? "text-white" : "text-ink-900")}>
            <span className="truncate">{t.name}</span>
            <BadgeCheck className={cn("size-3.5 shrink-0", dark ? "text-brand-400" : "text-brand-500")} aria-label="Geoloide client" />
          </span>
          <span className={cn("block truncate text-xs", dark ? "text-ink-400" : "text-ink-500")}>{attribution(t)}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Home page section: one auto-scrolling row of compact reviews (pauses on hover). */
export function TestimonialsSection() {
  return (
    <section className="overflow-hidden bg-ink-50 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Client stories"
            title="Trusted by growing businesses"
            description="Here's what founders and business owners say about working with Geoloide."
          />
          <TestimonialSummary className="w-full max-w-xs shrink-0" />
        </div>
      </Container>
      <Marquee
        className="mt-12"
        items={testimonials}
        duration={110}
        stretch
        getKey={(t) => t.name}
        renderItem={(t) => <CompactTestimonialCard t={t} index={testimonials.indexOf(t)} />}
      />
      <div className="mt-12 text-center">
        <ButtonLink href="/testimonials" variant="dark" arrow>
          Read all {testimonials.length} client stories
        </ButtonLink>
      </div>
    </section>
  );
}

/** Service page section: reviews relevant to that service. */
export function ServiceTestimonials({ items, serviceTitle }: { items: Testimonial[]; serviceTitle: string }) {
  if (!items.length) return null;
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title={`What clients say about our ${serviceTitle.toLowerCase()}`}
        />
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {items.map((t, i) => (
            <div key={t.name} data-reveal style={revealDelay(i, 110)} className="flex">
              <CompactTestimonialCard t={t} index={i} clamp={false} className="w-full max-w-[380px]" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
          >
            See all client stories
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
