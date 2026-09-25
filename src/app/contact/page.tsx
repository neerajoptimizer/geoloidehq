import { ArrowRight, ArrowUpRight, CalendarCheck, Clock, FileText, Mail, MapPin, MessageSquareReply, ShieldCheck } from "lucide-react";
import { GoogleReviewCard } from "@/components/google-badge";
import { Faq } from "@/components/sections";
import { Breadcrumbs, JsonLd } from "@/components/seo";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { WhatsAppIcon } from "@/components/whatsapp";
import { revealDelay } from "@/lib/motion";
import { faqSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { site, whatsappUrl } from "@/lib/site";
import { ContactForm } from "./contact-form";

const seo = {
  title: "Contact Us – Book a Free Consultation",
  description:
    "Contact Geoloide for digital marketing, websites, apps or automation. Offices in New Delhi & Noida. WhatsApp +91 93012 78780 or email contact@geoloide.com.",
  path: "/contact",
};

export const metadata = pageMetadata({
  ...seo,
  keywords: ["contact Geoloide", "digital marketing agency near me", "web development company New Delhi", "Noida IT company contact"],
});

const quickActions = [
  {
    title: "Chat on WhatsApp",
    body: "Fastest way to reach us",
    value: site.whatsapp.display,
    href: whatsappUrl(),
    external: true,
    icon: <WhatsAppIcon className="size-6" />,
    tone: "bg-[#25D366] text-white",
  },
  {
    title: "Email us",
    body: "We reply within one business day",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    icon: <Mail className="size-6" aria-hidden />,
    tone: "bg-ink-900 text-white",
  },
  {
    title: "Book a free consultation",
    body: "30 minutes, no obligation",
    value: "Fill in the form below",
    href: "#enquiry",
    external: false,
    icon: <CalendarCheck className="size-6" aria-hidden />,
    tone: "bg-brand-500 text-white",
  },
];

const nextSteps = [
  { icon: MessageSquareReply, title: "We reply within 1 business day", body: "A real person reviews your message — no bots, no sales scripts." },
  { icon: CalendarCheck, title: "Free 30-minute consultation", body: "We discuss your goals, challenges and what success looks like." },
  { icon: FileText, title: "Clear proposal", body: "A practical plan with scope, timeline and a transparent, itemised quote." },
];

const faqs = [
  {
    q: "How quickly will you reply?",
    a: `We reply to every enquiry within one business day (${site.hours}). For anything urgent, message us on WhatsApp at ${site.whatsapp.display}.`,
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes. The first 30-minute consultation is free and comes with no obligation — we'll share honest, practical advice whether or not we end up working together.",
  },
  {
    q: "Do you work with businesses outside Delhi NCR?",
    a: "Yes. We work with clients across India and internationally, and hold meetings over video call at times that suit your time zone.",
  },
  {
    q: "What should I prepare before we talk?",
    a: "Just your goals, any links to your current website or social pages, and a rough timeline. Don't worry if you're not sure about budget or scope yet — helping you figure that out is part of the consultation.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero with quick-connect options */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-brand-300/30 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="animate-fade-up">
            <Breadcrumbs items={[{ name: "Contact Us", path: seo.path }]} />
            <Eyebrow>Contact us</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Let&apos;s get your business <span className="text-brand-600">globalised</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-ink-500 sm:text-xl">
              Tell us about your goals and we&apos;ll get back within one business day with next steps and a free
              consultation slot.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm text-ink-600 shadow-sm ring-1 ring-ink-100">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-brand-500" />
              </span>
              <Clock className="size-4 text-ink-400" aria-hidden />
              {site.hours}
            </div>
          </div>

          <ul className="grid gap-4">
            {quickActions.map((a, i) => (
              <li key={a.title} className="animate-fade-up" style={{ animationDelay: `${150 + i * 120}ms` }}>
                <a
                  href={a.href}
                  {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/10 hover:ring-brand-200"
                >
                  <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${a.tone}`}>{a.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold text-ink-900">{a.title}</span>
                    <span className="block text-sm text-ink-500">{a.body}</span>
                    <span className="mt-1 block truncate text-sm font-semibold text-brand-700">{a.value}</span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-50 text-ink-500 transition group-hover:bg-brand-500 group-hover:text-white">
                    {a.external ? <ArrowUpRight className="size-5" aria-hidden /> : <ArrowRight className="size-5" aria-hidden />}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Form + what happens next */}
      <section id="enquiry" className="scroll-mt-28 pb-20 sm:pb-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 shadow-ink-900/5 ring-ink-100 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl font-bold sm:text-3xl">Tell us about your project</h2>
            <p className="mt-2 mb-8 text-ink-500">It takes about 2 minutes. Fields marked * are required.</p>
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-[2rem] bg-ink-900 p-8 text-ink-300 sm:p-10">
              <h2 className="text-2xl font-bold text-white">What happens next?</h2>
              <ol className="relative mt-8 space-y-7 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-white/15">
                {nextSteps.map((s, i) => (
                  <li key={s.title} data-reveal style={revealDelay(i, 120)} className="relative flex gap-4">
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white ring-4 ring-ink-900">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{s.title}</p>
                      <p className="mt-1 text-sm">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm ring-1 ring-white/10">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-400" aria-hidden />
                <p>
                  <span className="font-semibold text-white">{site.legalName}</span> — registered company since{" "}
                  {site.company.incorporated.slice(0, 4)}.
                  <span className="mt-1 block font-mono text-xs text-ink-400">
                    CIN {site.company.cin} · GSTIN {site.company.gstin}
                  </span>
                </p>
              </div>
            </div>

            <GoogleReviewCard className="rounded-[2rem]" />
          </aside>
        </Container>
      </section>

      {/* Offices */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Visit us"
            title="Our offices"
            description="Meet us in person in New Delhi or Noida — please message ahead so we can make sure the right people are available."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {site.offices.map((o, i) => (
              <article
                key={o.label}
                data-reveal
                style={revealDelay(i, 120)}
                className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink-100"
              >
                <iframe
                  title={`Map of ${o.label}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`}
                  className="h-56 w-full border-0 bg-ink-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                  <div className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
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
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
                  >
                    Get directions <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Before you get in touch"
            description="Quick answers to the questions we hear most from new clients."
          />
          <div className="lg:col-span-2">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          webPageSchema({ type: "ContactPage", name: seo.title, description: seo.description, path: seo.path }),
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
