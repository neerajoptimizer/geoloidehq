import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBanner, PageHero, ProcessSection } from "@/components/sections";
import { ButtonLink, Container, ServiceIcon } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing, website & app development, and business simplification & automation services from Geoloide.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            Everything you need to <span className="text-brand-600">grow, build and scale</span>
          </>
        }
        description="Three tightly connected capabilities, delivered by one team. Engage us for a single service or as your end-to-end growth partner."
      >
        <ButtonLink href="/contact" arrow>
          Discuss your project
        </ButtonLink>
      </PageHero>

      <section className="py-24">
        <Container className="space-y-8">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid overflow-hidden rounded-[2rem] ring-1 ring-ink-100 lg:grid-cols-5"
            >
              <div
                className={`relative flex flex-col justify-between gap-10 p-8 sm:p-12 lg:col-span-2 ${
                  i % 2 === 0 ? "bg-ink-900" : "bg-brand-500"
                }`}
              >
                <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
                  <ServiceIcon icon={s.icon} className="size-8" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold tracking-widest text-white/60 uppercase">
                    Service 0{i + 1}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white">{s.title}</h2>
                  <p className={`mt-4 ${i % 2 === 0 ? "text-ink-300" : "text-brand-50"}`}>{s.intro}</p>
                </div>
              </div>
              <div className="bg-white p-8 sm:p-12 lg:col-span-3">
                <h3 className="text-sm font-semibold tracking-wider text-ink-400 uppercase">What&apos;s included</h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {s.offerings.map((o) => (
                    <li key={o.title} className="flex gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span className="font-medium text-ink-800">{o.title}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <span key={t} className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/services/${s.slug}`}
                  className="group mt-10 inline-flex items-center gap-2 font-semibold text-brand-700"
                >
                  Learn more about {s.title.toLowerCase()}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <ProcessSection />
      <CtaBanner />
    </>
  );
}
