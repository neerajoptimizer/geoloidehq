import { CalendarCheck, ClipboardList, LineChart, MessagesSquare, Rocket, Search } from "lucide-react";
import { CtaBanner, Faq, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/seo";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { faqSchema, pageMetadata, webPageSchema } from "@/lib/seo";

const seo = {
  title: "Our Process – How We Deliver Measurable Results",
  description:
    "See how Geoloide runs projects: free consultation, discovery, strategy, agile design & build, launch and ongoing optimisation — transparent from day one.",
  path: "/process",
};

export const metadata = pageMetadata({
  ...seo,
  keywords: ["digital agency process", "web development process", "marketing strategy roadmap", "agile project delivery"],
});

const phases = [
  {
    icon: MessagesSquare,
    title: "Free consultation",
    duration: "Day 1",
    body: "A 30-minute call to understand your business, goals, challenges and timelines.",
    points: ["Goal setting", "Initial recommendations", "Fit assessment"],
  },
  {
    icon: Search,
    title: "Discovery & audit",
    duration: "Week 1–2",
    body: "Deep dive into your market, competitors, customers, digital assets and internal processes.",
    points: ["Stakeholder workshops", "Technical & marketing audits", "Process mapping"],
  },
  {
    icon: ClipboardList,
    title: "Strategy & roadmap",
    duration: "Week 2–3",
    body: "A prioritised plan with scope, milestones, KPIs and a transparent, fixed or retainer budget.",
    points: ["Channel & product strategy", "Success metrics", "Detailed proposal"],
  },
  {
    icon: CalendarCheck,
    title: "Design & build",
    duration: "Agile sprints",
    body: "Two-week sprints with demos, feedback loops and full visibility through shared project boards.",
    points: ["UX/UI design", "Development & integrations", "Campaign setup"],
  },
  {
    icon: Rocket,
    title: "Launch",
    duration: "Go-live",
    body: "Rigorous QA, performance and security checks, team training and a smooth go-live.",
    points: ["Quality assurance", "Training & documentation", "Launch support"],
  },
  {
    icon: LineChart,
    title: "Grow & optimise",
    duration: "Ongoing",
    body: "Monthly reporting, experimentation and continuous improvement to compound results.",
    points: ["Live dashboards", "A/B testing", "Quarterly strategy reviews"],
  },
];

const faqs = [
  {
    q: "How do you price your work?",
    a: "We offer fixed-price projects for well-defined scopes (like a website build) and monthly retainers for ongoing work such as marketing and support. Every proposal is itemised — no hidden fees.",
  },
  {
    q: "How will we communicate?",
    a: "You get a dedicated project manager, a shared project board, weekly status updates and a standing review call. We are available on email, phone and your preferred chat tool.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work with clients across multiple time zones and plan overlapping hours for meetings and support.",
  },
  {
    q: "What do you need from us to get started?",
    a: "A point of contact, access to relevant accounts and assets, and time for the discovery workshops. We handle the rest.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title={
          <>
            Structured, transparent, <span className="text-brand-600">built for results</span>
          </>
        }
        description="A repeatable approach refined over hundreds of projects — so you always know what's happening, what's next and how it moves your business forward."
        breadcrumbs={[{ name: "Our Process", path: seo.path }]}
      >
        <ButtonLink href="/contact" arrow>
          Book your consultation
        </ButtonLink>
      </PageHero>

      <section className="py-24">
        <Container>
          <ol className="relative mx-auto max-w-4xl space-y-8 before:absolute before:top-4 before:bottom-4 before:left-7 before:w-px before:bg-ink-200 sm:before:left-8">
            {phases.map((p, i) => (
              <li key={p.title} className="relative flex gap-6 sm:gap-8">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30 sm:size-16">
                  <p.icon className="size-6 sm:size-7" aria-hidden />
                </span>
                <div className="flex-1 rounded-3xl bg-white p-6 ring-1 ring-ink-100 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-sm font-bold text-ink-400">Step {i + 1}</span>
                    <span className="rounded-full bg-brand-50 px-3 py-0.5 text-xs font-semibold text-brand-700">
                      {p.duration}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold">{p.title}</h2>
                  <p className="mt-2 text-ink-500">{p.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="rounded-full bg-ink-50 px-3 py-1 text-sm text-ink-600">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-ink-50 py-24">
        <Container className="grid gap-12 lg:grid-cols-3">
          <SectionHeading align="left" eyebrow="FAQ" title="Working with Geoloide" />
          <div className="lg:col-span-2">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      <CtaBanner />
      <JsonLd data={[webPageSchema({ name: seo.title, description: seo.description, path: seo.path }), faqSchema(faqs)]} />
    </>
  );
}
