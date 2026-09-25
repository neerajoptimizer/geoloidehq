import type { Metadata } from "next";
import { BookOpen, Briefcase, Clock, Coffee, Globe2, MapPin, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/sections";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Geoloide and help businesses go global. Explore open roles in marketing, design, engineering and operations.",
};

const perks = [
  { icon: TrendingUp, title: "Fast growth", body: "Own meaningful work early and grow with a scaling company." },
  { icon: BookOpen, title: "Learning budget", body: "Courses, certifications and conferences to sharpen your craft." },
  { icon: Globe2, title: "Global clients", body: "Work on projects for businesses across industries and countries." },
  { icon: Coffee, title: "Great culture", body: "Collaborative, respectful and fun — with flexible working options." },
];

const roles = [
  { title: "Performance Marketing Specialist", team: "Digital Marketing", type: "Full-time", location: "Noida" },
  { title: "SEO Executive", team: "Digital Marketing", type: "Full-time", location: "Noida" },
  { title: "Full-Stack Developer (Next.js / Node.js)", team: "Engineering", type: "Full-time", location: "Noida / Hybrid" },
  { title: "UI/UX Designer", team: "Design", type: "Full-time", location: "Noida" },
  { title: "Automation Consultant (Zoho / HubSpot)", team: "Business Automation", type: "Full-time", location: "Noida / Hybrid" },
  { title: "Business Development Executive", team: "Sales", type: "Full-time", location: "New Delhi" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build your career, <span className="text-brand-600">go global with us</span>
          </>
        }
        description="We're a team of marketers, designers, engineers and consultants helping businesses grow beyond borders. If you love solving real problems, you'll fit right in."
      >
        <ButtonLink href="#open-roles" arrow>
          View open roles
        </ButtonLink>
      </PageHero>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Why join us" title="A place to do your best work" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <div key={p.title} className="rounded-3xl bg-ink-50 p-8">
                <p.icon className="size-8 text-brand-600" aria-hidden />
                <h3 className="mt-6 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-ink-500">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="open-roles" className="scroll-mt-32 bg-ink-50 py-24">
        <Container className="max-w-5xl">
          <SectionHeading eyebrow="Open roles" title="Current opportunities" />
          <ul className="mt-12 space-y-4">
            {roles.map((r) => (
              <li
                key={r.title}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-ink-100 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="size-4" aria-hidden />
                      {r.team}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" aria-hidden />
                      {r.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" aria-hidden />
                      {r.location}
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Apply now
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-ink-500">
            Don&apos;t see the right role? Send your CV to{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 hover:underline">
              {site.email}
            </a>{" "}
            — we&apos;re always looking for great people.
          </p>
        </Container>
      </section>
    </>
  );
}
