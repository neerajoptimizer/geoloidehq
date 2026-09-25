import { Compass, Eye, Gem, HeartHandshake, Lightbulb, MapPin, Target } from "lucide-react";
import { CtaBanner, PageHero } from "@/components/sections";
import Image from "next/image";
import { CountUp } from "@/components/motion";
import { revealDelay } from "@/lib/motion";
import { JsonLd } from "@/components/seo";
import { images } from "@/lib/images";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site, stats } from "@/lib/site";

const seo = {
  title: "About Us – Management Partner Solutions in Delhi",
  description:
    "Meet Geoloide, a New Delhi & Noida management partner uniting digital marketing, web & app development and automation to help businesses go global.",
  path: "/about",
};

export const metadata = pageMetadata({
  ...seo,
  keywords: ["about Geoloide", "Geoloide Private Limited", "management partner solutions Delhi", "business growth partner India"],
});

const values = [
  { icon: Target, title: "Outcome-obsessed", body: "We measure success by your growth, not by deliverables shipped." },
  { icon: HeartHandshake, title: "Partnership first", body: "Honest advice, open communication and long-term relationships." },
  { icon: Lightbulb, title: "Curious & inventive", body: "We keep learning so our clients stay ahead of change." },
  { icon: Gem, title: "Craft & quality", body: "Thoughtful design and clean engineering in everything we build." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Geoloide"
        title={
          <>
            We help businesses <span className="text-brand-600">grow without borders</span>
          </>
        }
        description={`${site.legalName} is a management partner solutions company headquartered in New Delhi. We unite marketing, technology and operations expertise to help ambitious businesses compete — and win — globally.`}
        breadcrumbs={[{ name: "About Us", path: seo.path }]}
        image={images.teamMeeting}
      >
        <ButtonLink href="/contact" arrow>
          Work with us
        </ButtonLink>
        <ButtonLink href="/services" variant="outline">
          Our services
        </ButtonLink>
      </PageHero>

      <section className="py-24">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Built to simplify growth"
              description="Geoloide was founded on a simple observation: growing businesses were juggling separate agencies for marketing, websites and IT — and losing time, money and momentum in the gaps between them."
            />
            <div className="mt-6 space-y-4 text-ink-500">
              <p>
                We set out to be the single partner that connects the dots. Today our team of strategists,
                marketers, designers and engineers works alongside founders and leadership teams to build
                demand, launch digital products and streamline the operations behind them.
              </p>
              <p>
                Whether you are entering a new market, modernising a legacy business or scaling a start-up,
                our mission is the same: <strong className="text-ink-900">get your business globalised.</strong>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal="zoom"
                style={revealDelay(i)}
                className={
                  i % 3 === 0
                    ? "rounded-3xl bg-brand-500 p-8 text-white"
                    : "rounded-3xl bg-ink-50 p-8 ring-1 ring-ink-100"
                }
              >
                <p className={`font-display text-4xl font-bold ${i % 3 === 0 ? "text-white" : "text-ink-900"}`}>
                  <CountUp value={s.value} />
                </p>
                <p className={`mt-2 text-sm ${i % 3 === 0 ? "text-brand-50" : "text-ink-500"}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-ink-950 py-20 sm:py-28">
        <Image
          src={images.indiaGate.src}
          alt={images.indiaGate.alt}
          fill
          placeholder="blur"
          sizes="100vw"
          className="-z-20 animate-ken-burns object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/80 via-ink-950/70 to-ink-950/90" />
        <Container>
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wider text-brand-400 uppercase">Rooted in New Delhi</p>
            <h2 className="mt-3 text-3xl font-bold text-balance text-white sm:text-4xl">
              Building globally competitive businesses from the heart of India
            </h2>
          </div>
        </Container>
        <Container className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Our Mission",
              body: "To give every ambitious business access to world-class marketing, technology and operational expertise through one trusted partner.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              body: "To be India's most trusted management partner for businesses expanding into global markets.",
            },
            {
              icon: Target,
              title: "Our Promise",
              body: "Transparent work, measurable results and a team that takes ownership of your goals as if they were our own.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              data-reveal
              style={revealDelay(i, 120)}
              className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/15 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <item.icon className="size-8 text-brand-400" aria-hidden />
              <h3 className="mt-6 text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-ink-300">{item.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Our values" title="What guides our work" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                data-reveal
                style={revealDelay(i, 100)}
                className="group rounded-3xl p-8 text-center ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-200"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                  <v.icon className="size-7" aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-ink-500">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-50 py-24">
        <Container>
          <SectionHeading eyebrow="Where to find us" title="Our offices" />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {site.offices.map((o) => (
              <div key={o.label} data-reveal className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink-100">
                <iframe
                  title={`Map of ${o.label}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`}
                  className="h-64 w-full border-0 grayscale-[30%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex gap-4 p-8">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white">
                    <MapPin className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{o.label}</h3>
                    <address className="mt-1 text-ink-500 not-italic">
                      {o.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
      <JsonLd data={webPageSchema({ type: "AboutPage", name: seo.title, description: seo.description, path: seo.path })} />
    </>
  );
}
