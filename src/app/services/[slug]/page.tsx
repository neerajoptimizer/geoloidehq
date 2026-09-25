import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaBanner, Faq, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/seo";
import { ButtonLink, Container, SectionHeading, ServiceIcon } from "@/components/ui";
import { absoluteUrl, faqSchema, ORG_ID, pageMetadata, webPageSchema } from "@/lib/seo";
import { getService, services, site } from "@/lib/site";

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
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.seo.description,
    url: absoluteUrl(path),
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
      >
        <ButtonLink href="/contact" arrow>
          Get a free proposal
        </ButtonLink>
        <ButtonLink href="/services" variant="outline">
          All services
        </ButtonLink>
      </PageHero>

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="What we offer"
            title={`${service.title}, end to end`}
            description="Pick a single capability or combine them into a complete programme tailored to your goals."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o, i) => (
              <div
                key={o.title}
                className="group rounded-3xl p-8 ring-1 ring-ink-100 transition hover:bg-brand-50/50 hover:ring-brand-200"
              >
                <span className="font-display text-sm font-bold text-brand-600">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{o.title}</h3>
                <p className="mt-3 text-ink-500">{o.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-900 py-24">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              dark
              align="left"
              eyebrow="Outcomes"
              title="What you can expect"
              description="Clear goals, honest reporting and results you can see in your numbers."
            />
            <ul className="mt-10 space-y-4">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-lg text-white">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand-400" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-white/5 p-8 ring-1 ring-white/10 sm:p-10">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand-500 text-white">
                <ServiceIcon icon={service.icon} className="size-7" />
              </span>
              <h3 className="text-xl font-bold text-white">Tools & platforms we use</h3>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {service.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-xl bg-white/5 px-3 py-4 text-center text-sm font-medium text-ink-200 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

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
                className="group flex items-center gap-6 rounded-3xl p-6 ring-1 ring-ink-100 transition hover:ring-brand-200 hover:shadow-lg"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink-900 text-white transition group-hover:bg-brand-500">
                  <ServiceIcon icon={s.icon} className="size-7" />
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
