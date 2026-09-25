import { Clock, Globe, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections";
import { GoogleReviewCard } from "@/components/google-badge";
import { JsonLd } from "@/components/seo";
import { Container } from "@/components/ui";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { WhatsAppButton, WhatsAppIcon } from "@/components/whatsapp";
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

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s get your business <span className="text-brand-600">globalised</span>
          </>
        }
        description="Tell us about your goals and we'll get back within one business day with next steps and a free consultation slot."
        breadcrumbs={[{ name: "Contact Us", path: seo.path }]}
      >
        <WhatsAppButton label={`WhatsApp ${site.whatsapp.display}`} />
      </PageHero>

      <section className="pb-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 shadow-ink-900/5 ring-ink-100 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 mb-8 text-ink-500">Fields marked * are required.</p>
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-[2rem] bg-ink-900 p-8 text-ink-300 sm:p-10">
              <h2 className="text-2xl font-bold text-white">Contact details</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
                    <Mail className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-ink-400">Email</p>
                    <a href={`mailto:${site.email}`} className="font-semibold text-white hover:text-brand-400">
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-400">
                    <Globe className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-ink-400">Website</p>
                    <a href={site.url} className="font-semibold text-white hover:text-brand-400">
                      www.geoloide.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-ink-400">WhatsApp</p>
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-brand-400"
                    >
                      {site.whatsapp.display}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-400">
                    <Clock className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-ink-400">Business hours</p>
                    <p className="font-semibold text-white">{site.hours}</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8 border-t border-white/10 pt-6 text-sm">
                <p className="font-semibold text-white">{site.legalName}</p>
                <p className="mt-1 text-ink-400">
                  CIN: <span className="font-mono text-ink-200">{site.company.cin}</span>
                </p>
                <p className="text-ink-400">
                  GSTIN: <span className="font-mono text-ink-200">{site.company.gstin}</span>
                </p>
              </div>
            </div>

            <GoogleReviewCard className="rounded-[2rem]" />

            {site.offices.map((o) => (
              <div key={o.label} className="overflow-hidden rounded-[2rem] ring-1 ring-ink-100">
                <div className="flex gap-4 p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">{o.label}</h3>
                    <address className="mt-1 text-sm text-ink-500 not-italic">
                      {o.lines.join(", ")}
                    </address>
                  </div>
                </div>
                <iframe
                  title={`Map of ${o.label}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`}
                  className="h-48 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ))}
          </aside>
        </Container>
      </section>
      <JsonLd data={webPageSchema({ type: "ContactPage", name: seo.title, description: seo.description, path: seo.path })} />
    </>
  );
}
