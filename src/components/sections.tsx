import Link from "next/link";
import { ArrowRight, ChevronDown, Quote } from "lucide-react";
import type { ReactNode } from "react";
import { processSteps, testimonials, type Service } from "@/lib/site";
import { ButtonLink, Container, Eyebrow, SectionHeading, ServiceIcon } from "./ui";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-brand-300/30 blur-3xl" />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-ink-500 sm:text-xl">{description}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/10 hover:ring-brand-200"
    >
      <span className="absolute top-6 right-8 font-display text-6xl font-bold text-ink-50 transition group-hover:text-brand-50">
        0{index + 1}
      </span>
      <span className="relative grid size-14 place-items-center rounded-2xl bg-ink-900 text-white transition group-hover:bg-brand-500">
        <ServiceIcon icon={service.icon} className="size-7" />
      </span>
      <h3 className="relative mt-8 text-xl font-bold">{service.title}</h3>
      <p className="relative mt-3 flex-1 text-ink-500">{service.short}</p>
      <ul className="relative mt-6 space-y-2 text-sm text-ink-600">
        {service.offerings.slice(0, 3).map((o) => (
          <li key={o.title} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand-500" />
            {o.title}
          </li>
        ))}
      </ul>
      <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
        Explore service
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

export function ProcessSection({ dark = true }: { dark?: boolean }) {
  return (
    <section className={dark ? "relative overflow-hidden bg-ink-900 py-24" : "py-24"}>
      {dark && <div className="bg-grid-light pointer-events-none absolute inset-0" />}
      <Container className="relative">
        <SectionHeading
          dark={dark}
          eyebrow="How we work"
          title="A proven path from idea to impact"
          description="Clear milestones, transparent communication and measurable outcomes at every stage."
        />
        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className={
                dark
                  ? "relative rounded-3xl bg-white/5 p-8 ring-1 ring-white/10"
                  : "relative rounded-3xl bg-ink-50 p-8 ring-1 ring-ink-100"
              }
            >
              <span className="grid size-12 place-items-center rounded-full bg-brand-500 font-display text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className={`mt-6 text-xl font-bold ${dark ? "text-white" : ""}`}>{step.title}</h3>
              <p className={`mt-3 ${dark ? "text-ink-300" : "text-ink-500"}`}>{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-ink-50 py-24">
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="Trusted by ambitious businesses"
          description="Partnerships built on outcomes, not outputs."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-ink-100">
              <Quote className="size-8 text-brand-500" aria-hidden />
              <blockquote className="mt-6 flex-1 text-lg text-ink-700">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-ink-100 pt-6">
                <span className="grid size-11 place-items-center rounded-full bg-brand-100 font-display font-bold text-brand-700">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block font-semibold text-ink-900">{t.name}</span>
                  <span className="block text-sm text-ink-500">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink-100 rounded-3xl bg-white ring-1 ring-ink-100">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown className="size-5 shrink-0 text-ink-400 transition group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-3 text-ink-500">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBanner({
  title = "Ready to take your business global?",
  description = "Book a free 30-minute consultation. We'll review your goals and share a practical growth plan — no obligation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-500 px-6 py-16 text-center sm:px-16 lg:py-20">
          <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full border-[40px] border-white/10" />
          <div className="pointer-events-none absolute -right-20 -bottom-32 size-96 rounded-full border-[48px] border-ink-900/10" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-brand-50">{description}</p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="dark" arrow>
              Book a Free Consultation
            </ButtonLink>
            <ButtonLink href="/services" variant="ghostLight">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
