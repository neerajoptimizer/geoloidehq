import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaBanner, Faq, PageHero } from "@/components/sections";
import { revealDelay } from "@/lib/motion";
import { JsonLd } from "@/components/seo";
import { ServiceTestimonials } from "@/components/testimonials";
import { ButtonLink, Container, SectionHeading, ServiceIcon } from "@/components/ui";
import { serviceImages } from "@/lib/images";
import { absoluteUrl, faqSchema, ORG_ID, pageMetadata, webPageSchema } from "@/lib/seo";
import { getService, services, site } from "@/lib/site";
import { testimonialsForService } from "@/lib/testimonials";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    ...service.seo,
    path: `/services/${service.slug}`,
    image: `/services/${service.slug}/opengraph-image`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const path = `/services/${service.slug}`;
  const img = serviceImages[service.slug];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.seo.description,
    url: absoluteUrl(path),
    image: absoluteUrl(img.hero.src.src),
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.offerings.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.title, description: o.body },
      })),
    },
  };

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.headline}
        description={service.intro}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ]}
        image={img.hero}
      >
        <ButtonLink href="/contact" arrow>
          Get a free proposal
        </ButtonLink>
        <ButtonLink href="/services" variant="outline">
          All services
        </ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we offer"
            title={`${service.title}, end to end`}
            description="Pick a single capability or combine them into a complete programme tailored to your goals."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {service.offerings.map((o, i) => (
              <div
                key={o.title}
                data-reveal
                style={revealDelay(i % 3, 110)}
                className="group relative overflow-hidden rounded-3xl p-8 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:bg-brand-50/50 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-200"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 group-hover:scale-x-100" />
                <span className="font-display text-sm font-bold text-brand-600">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{o.title}</h3>
                <p className="mt-3 text-ink-500">{o.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-ink-900 py-20 sm:py-24">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div data-reveal="left" className="relative pb-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <Image
                src={img.detail.src}
                alt={img.detail.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute right-4 bottom-0 left-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-2xl sm:right-auto sm:-left-4 sm:w-80 sm:p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
                <ServiceIcon icon={service.icon} className="size-6" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{service.title}</p>
                <p className="text-sm text-ink-500">Strategy · Execution · Reporting</p>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              dark
              align="left"
              eyebrow="Outcomes"
              title="What you can expect"
              description="Clear goals, honest reporting and results you can see in your numbers."
            />
            <ul className="mt-10 space-y-4">
              {service.outcomes.map((o, i) => (
                <li key={o} data-reveal style={revealDelay(i)} className="flex gap-3 text-lg text-white">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand-400" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
            <h3 className="mt-12 text-sm font-semibold tracking-wider text-ink-400 uppercase">Tools &amp; platforms we use</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.stack.map((t, i) => (
                <li
                  key={t}
                  data-reveal
                  style={revealDelay(i, 50)}
                  className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-ink-200 ring-1 ring-white/10 transition hover:bg-brand-500 hover:text-white hover:ring-brand-500"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ServiceTestimonials items={testimonialsForService(service.slug)} serviceTitle={service.title} />

      <section className="bg-ink-50 py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Common questions"
            description={
              <>
                Can&apos;t find your answer?{" "}
                <Link href="/contact" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
                  Talk to us
                </Link>
                .
              </>
            }
          />
          <div className="lg:col-span-2">
            <Faq items={service.faqs} />
          </div>
        </Container>
      </section>

      <section className="pt-24">
        <Container>
          <h2 className="text-2xl font-bold">Explore other services</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-reveal
                className="group flex items-center gap-4 rounded-3xl p-4 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-200 sm:gap-6 sm:p-5"
              >
                <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24">
                  <Image
                    src={serviceImages[s.slug].card.src}
                    alt={serviceImages[s.slug].card.alt}
                    fill
                    placeholder="blur"
                    sizes="96px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-bold text-ink-900">{s.title}</span>
                  <span className="mt-1 line-clamp-1 block text-sm text-ink-500">{s.short}</span>
                </span>
                <ArrowRight className="size-5 text-ink-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner title={`Let's talk about ${service.title.toLowerCase()}`} />
      <JsonLd
        data={[
          webPageSchema({ name: service.seo.title, description: service.seo.description, path }),
          serviceSchema,
          faqSchema(service.faqs),
        ]}
      />
    </>
  );
}
