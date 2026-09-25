import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBanner, PageHero, ProcessSection } from "@/components/sections";
import { JsonLd } from "@/components/seo";
import { images, serviceImages } from "@/lib/images";
import { ButtonLink, Container, ServiceIcon } from "@/components/ui";
import { absoluteUrl, pageMetadata, webPageSchema } from "@/lib/seo";
import { services } from "@/lib/site";

const seo = {
  title: "Our Services – Marketing, Web & Automation",
  description:
    "Explore Geoloide's services: digital marketing & SEO, website and mobile app development, and business automation for companies in Delhi NCR and worldwide.",
  path: "/services",
};

export const metadata = pageMetadata({
  ...seo,
  keywords: [
    "digital marketing services",
    "website and app development services",
    "business automation services",
    "IT and marketing services Delhi NCR",
  ],
});

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
        breadcrumbs={[{ name: "Services", path: seo.path }]}
        image={images.strategyWorkshop}
      >
        <ButtonLink href="/contact" arrow>
          Discuss your project
        </ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container className="space-y-8">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              data-reveal
              className="group grid scroll-mt-32 overflow-hidden rounded-[2rem] ring-1 ring-ink-100 transition duration-500 hover:shadow-2xl hover:shadow-ink-900/10 lg:grid-cols-5"
            >
              <div
                className={`relative isolate flex flex-col justify-between gap-10 overflow-hidden p-8 sm:p-12 lg:col-span-2 ${
                  i % 2 === 0 ? "bg-ink-900" : "bg-brand-600"
                }`}
              >
                <Image
                  src={serviceImages[s.slug].card.src}
                  alt={serviceImages[s.slug].card.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 -z-10 ${
                    i % 2 === 0
                      ? "bg-gradient-to-t from-ink-900 via-ink-900/85 to-ink-900/60"
                      : "bg-gradient-to-t from-brand-700 via-brand-600/90 to-brand-600/70"
                  }`}
                />
                <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur">
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
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", name: seo.title, description: seo.description, path: seo.path }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}`),
            })),
          },
        ]}
      />
    </>
  );
}
