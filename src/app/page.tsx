import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  Hotel,
  ShoppingBag,
  Stethoscope,
  Truck,
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
import { LatestPosts } from "@/components/blog";
import { Marquee } from "@/components/marquee";
import { CountUp } from "@/components/motion";
import { revealDelay } from "@/lib/motion";
import { CtaBanner, Faq, ProcessSection, ServiceCard } from "@/components/sections";
import { JsonLd } from "@/components/seo";
import { TestimonialsSection } from "@/components/testimonials";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { getAllPosts } from "@/lib/blog";
import { images } from "@/lib/images";
import { faqSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { homeFaqs, industries, services, site, stats, tools } from "@/lib/site";

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

const industryIcons = {
  factory: Factory,
  shopping: ShoppingBag,
  health: Stethoscope,
  education: GraduationCap,
  realestate: Building2,
  logistics: Truck,
  professional: Briefcase,
  hospitality: Hotel,
};

const heroWords = ["Get", "your", "business"];

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] px-3 pt-6 pb-10 sm:px-8">
      {/* Orbit rings with travelling dots */}
      <div aria-hidden className="pointer-events-none absolute -top-6 -right-6 size-56 sm:-top-10 sm:-right-10 sm:size-72">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand-400/70" />
        <div className="absolute inset-0 animate-orbit">
          <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 ring-4 ring-brand-100" />
        </div>
        <div className="absolute inset-[18%] rounded-full border border-ink-200" />
        <div className="absolute inset-[18%] animate-orbit-reverse">
          <span className="absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-ink-900 ring-4 ring-ink-100" />
        </div>
      </div>

      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-white shadow-ink-900/20 lg:aspect-[4/5] lg:rounded-[2.5rem]">
        <Image
          src={images.heroTeam.src}
          alt={images.heroTeam.alt}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
      </div>

      {/* Brand mark badge */}
      <div className="absolute bottom-2 left-0 grid size-20 place-items-center rounded-3xl bg-white shadow-xl ring-1 ring-ink-100 sm:size-24">
        <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-3xl bg-brand-400/30" />
        <Image src="/mark.png" alt="" width={360} height={360} className="relative w-3/5" />
      </div>

      {/* Floating cards */}
      <div className="absolute top-10 left-0 animate-float rounded-2xl bg-white/95 p-3 shadow-xl ring-1 ring-ink-100 backdrop-blur sm:top-14 sm:-left-2 sm:p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-white sm:size-10">
            <TrendingUp className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-ink-500">Organic traffic</p>
            <p className="font-display text-base font-bold text-ink-900 sm:text-lg">+212%</p>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-24 animate-float rounded-2xl bg-ink-900 p-3 text-white shadow-xl [animation-delay:1.5s] sm:-right-2 sm:p-4 lg:bottom-32">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-brand-400 sm:size-10">
            <Rocket className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-ink-300">App launched</p>
            <p className="font-display text-base font-bold sm:text-lg">iOS & Android</p>
          </div>
        </div>
      </div>
      <div className="absolute right-6 bottom-0 hidden animate-float rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-ink-100 [animation-delay:3s] sm:block">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <Sparkles className="size-4 text-brand-500" aria-hidden />
          18 hrs/week automated
        </p>
      </div>
    </div>
  );
}

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <div className="animate-fade-up">
              <Eyebrow>{site.descriptor}</Eyebrow>
            </div>
            <h1 className="mt-6 text-[2.6rem] leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-7xl lg:leading-[1.02]">
              {heroWords.map((word, i) => (
                <span key={word}>
                  <span className="inline-block animate-word" style={{ animationDelay: `${100 + i * 110}ms` }}>
                    {word}
                  </span>{" "}
                </span>
              ))}
              <span className="relative inline-block whitespace-nowrap">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 animate-highlight rounded-2xl bg-brand-500 [animation-delay:450ms]"
                />
                <span className="relative inline-block animate-word px-4 pb-1 text-white [animation-delay:550ms]">
                  globalised
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg text-pretty text-ink-500 [animation-delay:500ms] sm:text-xl">
              Geoloide is your growth and management partner — combining digital marketing, web &amp; app
              development and business automation to help you scale beyond borders.
            </p>
            <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:650ms]">
              <ButtonLink href="/contact" arrow>
                Start Your Project
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                Explore Services
              </ButtonLink>
            </div>
            <ul className="mt-10 flex animate-fade-up flex-wrap gap-x-6 gap-y-3 text-sm text-ink-600 [animation-delay:800ms]">
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
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={revealDelay(i)} className="flex flex-col-reverse px-4 py-10 text-center">
                <dt className="mt-2 text-sm text-ink-500">{s.label}</dt>
                <dd className="font-display text-4xl font-bold text-ink-900 sm:text-5xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Tools marquee */}
      <section aria-labelledby="tools-heading" className="bg-ink-50/60 py-10">
        <Container>
          <h2 id="tools-heading" className="text-center font-sans text-sm font-semibold tracking-wider text-ink-500 uppercase">
            Platforms &amp; technologies we work with
          </h2>
        </Container>
        <Marquee
          className="mt-6"
          items={tools}
          renderItem={(tool) => (
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 ring-1 ring-ink-100">
              <span className="size-1.5 rounded-full bg-brand-500" />
              {tool}
            </span>
          )}
        />
      </section>

      {/* Services */}
      <section className="py-20 sm:py-24">
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
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Global banner */}
      <section className="relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32">
        <Image
          src={images.globalNetwork.src}
          alt={images.globalNetwork.alt}
          fill
          placeholder="blur"
          sizes="100vw"
          className="-z-20 animate-ken-burns object-cover opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
        <Container>
          <div data-reveal="left" className="max-w-2xl">
            <Eyebrow dark>Global reach</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance text-white sm:text-5xl">
              From Delhi NCR to <span className="text-brand-400">customers worldwide</span>
            </h2>
            <p className="mt-6 text-lg text-ink-300">
              We help Indian businesses reach buyers in {stats[1].value} countries — with localised campaigns,
              multi-currency e-commerce and systems built to scale across time zones.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {site.areaServed.map((country, i) => (
                <li
                  key={country}
                  data-reveal
                  style={revealDelay(i, 60)}
                  className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white ring-1 ring-white/15 backdrop-blur"
                >
                  {country}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Plan your expansion
              </ButtonLink>
              <ButtonLink href="/about" variant="ghostLight">
                About Geoloide
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Why Geoloide"
              title="A management partner, not just a vendor"
              description="We embed with your team, understand your commercial goals and take ownership of outcomes — from the first campaign to the last line of code."
            />
            <div data-reveal="zoom" className="relative mt-10 aspect-[5/4] w-full max-w-lg">
              <div className="absolute top-0 left-0 w-[78%] overflow-hidden rounded-3xl shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={images.strategyWorkshop.src}
                    alt={images.strategyWorkshop.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 360px, 75vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-[55%] overflow-hidden rounded-3xl shadow-2xl ring-8 ring-ink-50">
                <div className="relative aspect-square">
                  <Image
                    src={images.teamDesk.src}
                    alt={images.teamDesk.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 260px, 55vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute bottom-[8%] left-[4%] animate-float rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-ink-100">
                <p className="font-display text-2xl font-bold text-brand-600">{stats[3].value}</p>
                <p className="text-xs text-ink-500">{stats[3].label}</p>
              </div>
            </div>
            <ButtonLink href="/about" variant="dark" arrow className="mt-10">
              More about us
            </ButtonLink>
          </div>
          <div className="grid content-start gap-6 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                data-reveal
                style={revealDelay(i % 2, 120)}
                className="group rounded-3xl bg-white p-7 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-200"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
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
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/40 to-white py-20 sm:py-24">
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/30 blur-3xl" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Industries"
            title="Experience across sectors"
            description="We bring proven playbooks to businesses of every size — from ambitious start-ups to established enterprises."
          />
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {industries.map((industry, i) => {
              const Icon = industryIcons[industry.icon];
              return (
                <li
                  key={industry.name}
                  data-reveal
                  style={revealDelay(i % 4, 90)}
                  className="group relative isolate overflow-hidden rounded-2xl bg-white/80 p-4 ring-1 sm:rounded-3xl ring-ink-100 backdrop-blur transition duration-500 hover:-translate-y-1.5 hover:bg-ink-900 hover:shadow-2xl hover:shadow-ink-900/20 hover:ring-ink-900 sm:p-6"
                >
                  <span
                    aria-hidden
                    className="absolute -top-16 -right-16 -z-10 size-40 scale-50 rounded-full bg-brand-500/25 opacity-0 blur-2xl transition duration-500 group-hover:scale-100 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 sm:size-12 sm:rounded-2xl ring-brand-100 transition duration-500 group-hover:rotate-6 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-400">
                      <Icon className="size-5 sm:size-6" aria-hidden />
                    </span>
                    <span className="font-display text-sm font-bold text-ink-200 transition group-hover:text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm leading-snug font-bold transition group-hover:text-white sm:mt-6 sm:text-lg">{industry.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-500 transition group-hover:text-ink-300 sm:mt-2 sm:text-sm">
                    {industry.body}
                  </p>
                  <span className="mt-4 block h-0.5 w-8 sm:mt-5 sm:w-10 rounded-full bg-brand-500 transition-all duration-500 group-hover:w-full" />
                </li>
              );
            })}
          </ul>
          <p data-reveal className="mt-10 text-center text-ink-600">
            Don&apos;t see your industry? Our playbooks adapt to any business.{" "}
            <Link href="/contact" className="group inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800">
              Let&apos;s talk
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </p>
        </Container>
      </section>

      <TestimonialsSection />

      <LatestPosts posts={posts} />

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
