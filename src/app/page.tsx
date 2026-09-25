import Image from "next/image";
import {
  BarChart3,
  CheckCircle2,
  Globe2,
  Handshake,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { CtaBanner, Faq, ProcessSection, ServiceCard, Testimonials } from "@/components/sections";
import { JsonLd } from "@/components/seo";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { faqSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { homeFaqs, industries, services, site, stats } from "@/lib/site";

const seo = {
  title: "Geoloide | Digital Marketing, Web & App Development Agency",
  description:
    "Geoloide is a Delhi NCR management partner for digital marketing, website & app development and business automation. Get your business globalised.",
  path: "/",
};

export const metadata = pageMetadata({
  ...seo,
  absoluteTitle: true,
  keywords: [
    "Geoloide",
    "Geoloide Private Limited",
    "digital marketing agency in Delhi NCR",
    "website development company in Noida",
    "app development company Delhi",
    "business process automation India",
    "management partner solutions",
    "global business growth agency",
  ],
});

const reasons = [
  {
    icon: Handshake,
    title: "One accountable partner",
    body: "Marketing, technology and operations under one roof — no juggling multiple agencies.",
  },
  {
    icon: Globe2,
    title: "Built for global growth",
    body: "Multi-market strategy, localisation and infrastructure ready for customers anywhere.",
  },
  {
    icon: BarChart3,
    title: "Measurable by default",
    body: "Every engagement has clear KPIs, live dashboards and monthly reviews.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & reliable",
    body: "Best-practice security, data ownership in your name and documented handovers.",
  },
  {
    icon: Zap,
    title: "Fast, agile delivery",
    body: "Weekly sprints and demos so you see progress early and often.",
  },
  {
    icon: Users,
    title: "Senior, dedicated team",
    body: "Strategists, designers and engineers who treat your business like their own.",
  },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-0 rounded-full border border-dashed border-brand-300/70 animate-spin-slow" />
      <div className="absolute inset-[12%] rounded-full border border-ink-200" />
      <div className="absolute inset-[26%] rounded-full bg-gradient-to-br from-brand-100 to-white shadow-2xl shadow-brand-500/20 ring-1 ring-brand-100" />
      <div className="absolute inset-[34%] grid place-items-center rounded-full bg-white shadow-xl ring-1 ring-ink-100">
        <Image src="/mark.png" alt="" width={360} height={360} className="w-3/5" />
      </div>

      {/* orbit dots */}
      <span className="absolute top-[6%] left-1/2 size-3 -translate-x-1/2 rounded-full bg-brand-500 ring-4 ring-brand-100" />
      <span className="absolute bottom-[18%] left-[8%] size-2.5 rounded-full bg-ink-900 ring-4 ring-ink-100" />
      <span className="absolute top-[40%] right-[2%] size-2.5 rounded-full bg-brand-400 ring-4 ring-brand-100" />

      {/* floating cards */}
      <div className="absolute top-[10%] -left-2 animate-float rounded-2xl bg-white p-4 shadow-xl ring-1 ring-ink-100 sm:left-0">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-500 text-white">
            <TrendingUp className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-ink-500">Organic traffic</p>
            <p className="font-display text-lg font-bold text-ink-900">+212%</p>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-[14%] animate-float rounded-2xl bg-ink-900 p-4 text-white shadow-xl [animation-delay:1.5s]">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-brand-400">
            <Rocket className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-ink-300">App launched</p>
            <p className="font-display text-lg font-bold">iOS & Android</p>
          </div>
        </div>
      </div>
      <div className="absolute top-[52%] -left-4 hidden animate-float rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-ink-100 [animation-delay:3s] sm:block">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <Sparkles className="size-4 text-brand-500" aria-hidden />
          18 hrs/week automated
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
        <Container className="relative grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <Eyebrow>{site.descriptor}</Eyebrow>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl lg:leading-[1.02]">
              Get your business{" "}
              <span className="relative inline-block whitespace-nowrap rounded-2xl bg-brand-500 px-4 pb-1 text-white">
                globalised
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-ink-500 sm:text-xl">
              Geoloide is your growth and management partner — combining digital marketing, web &amp; app
              development and business automation to help you scale beyond borders.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Start Your Project
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                Explore Services
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-600">
              {["Free strategy consultation", "Transparent pricing", "Dedicated team"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-brand-500" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-ink-100 bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-ink-100 lg:grid-cols-4 lg:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-10 text-center">
                <dt className="text-sm text-ink-500">{s.label}</dt>
                <dd className="mt-2 font-display text-4xl font-bold text-ink-900 sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Services */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Three capabilities. <span className="text-brand-600">One growth partner.</span>
              </>
            }
            description="Everything you need to attract customers, deliver exceptional digital experiences and run a leaner business."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="bg-ink-50 py-24">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40">
              <SectionHeading
                align="left"
                eyebrow="Why Geoloide"
                title="A management partner, not just a vendor"
                description="We embed with your team, understand your commercial goals and take ownership of outcomes — from the first campaign to the last line of code."
              />
              <ButtonLink href="/about" variant="dark" arrow className="mt-8">
                More about us
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-3xl bg-white p-7 ring-1 ring-ink-100">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <r.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-ink-500">{r.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ProcessSection />

      {/* Industries */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Experience across sectors"
            description="We bring proven playbooks to businesses of every size — from ambitious start-ups to established enterprises."
          />
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {industries.map((i) => (
              <li
                key={i}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-700 ring-1 ring-ink-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
              >
                {i}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section className="pt-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions businesses ask us"
            description="Everything you need to know about working with Geoloide, a digital marketing, web development and automation partner in Delhi NCR."
          />
          <div className="lg:col-span-2">
            <Faq items={homeFaqs} />
          </div>
        </Container>
      </section>

      <CtaBanner />
      <JsonLd data={[webPageSchema({ name: seo.title, description: seo.description, path: seo.path }), faqSchema(homeFaqs)]} />
    </>
  );
}
