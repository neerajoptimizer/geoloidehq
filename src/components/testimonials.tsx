import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Quote } from "lucide-react";
import { revealDelay } from "@/lib/motion";
import { attribution, featuredTestimonials, testimonials, type Testimonial } from "@/lib/testimonials";
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
        "group relative flex flex-col rounded-3xl bg-white p-7 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5 hover:ring-brand-200 sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <CategoryChips t={t} />
        <Quote className="size-8 shrink-0 text-brand-200 transition group-hover:text-brand-500" aria-hidden />
      </div>
      <p className="mt-6 font-display text-xl leading-snug font-bold text-ink-900">“{t.headline}”</p>
      <blockquote className="mt-4 flex-1 text-ink-600">
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-ink-100 pt-6">
        <Avatar name={t.name} index={index} />
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
      className="relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white sm:p-10"
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
      <Quote className="mt-8 size-10 text-brand-400" aria-hidden />
      <p className="mt-4 font-display text-2xl leading-snug font-bold text-balance sm:text-3xl">“{t.headline}”</p>
      <blockquote className="mt-5 flex-1 text-ink-300">
        <p>{t.quote}</p>
      </blockquote>
      {t.delivered && (
        <div className="mt-8">
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
      <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
        <Avatar name={t.name} index={2} />
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
  const companies = testimonials.filter((t) => t.company).map((t) => t.company as string);
  const categories = new Set(testimonials.flatMap((t) => t.categories));
  return (
    <dl
      data-reveal
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink-100 ring-1 ring-ink-100 sm:grid-cols-3",
        className,
      )}
    >
      {[
        { label: "Client stories", value: String(testimonials.length) },
        { label: "Service areas reviewed", value: String(categories.size) },
        { label: "Named businesses", value: companies.join(" · "), small: true },
      ].map((item) => (
        <div key={item.label} className="flex flex-col-reverse justify-center bg-white px-6 py-5 text-center">
          <dt className="mt-1 text-sm text-ink-500">{item.label}</dt>
          <dd className={cn("font-display font-bold text-ink-900", item.small ? "text-base leading-snug" : "text-2xl")}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Home page section: featured client projects plus a selection of reviews. */
export function TestimonialsSection() {
  const others = testimonials.filter((t) => !t.featured).slice(0, 3);
  return (
    <section className="bg-ink-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="Trusted by growing businesses"
          description="Don't just take our word for it — here's what founders and business owners say about working with Geoloide."
        />
        <TestimonialSummary className="mx-auto mt-10 max-w-4xl" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featuredTestimonials.map((t, i) => (
            <FeaturedTestimonial key={t.name} t={t} index={i} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/testimonials" variant="dark" arrow>
            Read all {testimonials.length} client stories
          </ButtonLink>
        </div>
      </Container>
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
        <div className={cn("mt-12 grid gap-6", items.length > 1 && "lg:grid-cols-2", items.length > 2 && "xl:grid-cols-3")}>
          {items.map((t, i) =>
            t.featured && items.length < 3 ? (
              <FeaturedTestimonial key={t.name} t={t} index={i} />
            ) : (
              <TestimonialCard key={t.name} t={t} index={i} />
            ),
          )}
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
