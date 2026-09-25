import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Mail, MapPin } from "lucide-react";
import { services, site } from "@/lib/site";
import { Container } from "./ui";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <Container className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${site.name} home`} className="inline-block">
              <Image src="/logo-light.png" alt={site.legalName} width={1057} height={336} className="h-14 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-400">{site.description}</p>
            <div className="mt-6 space-y-2 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="size-4 text-brand-400" aria-hidden />
                {site.email}
              </a>
              <a href={site.url} className="flex items-center gap-2 hover:text-white">
                <Globe className="size-4 text-brand-400" aria-hidden />
                www.geoloide.com
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h2 className="text-sm font-semibold text-white">Services</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="hover:text-brand-400">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Company</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-brand-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Legal</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-brand-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3">
            {site.offices.map((o) => (
              <div key={o.label}>
                <h2 className="text-sm font-semibold text-white">{o.label}</h2>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 flex gap-2 text-sm leading-relaxed hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                  <span>
                    {o.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-brand-400 group-hover:underline">
                      Get directions <ArrowUpRight className="size-3" aria-hidden />
                    </span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.descriptor} · <span className="text-brand-400">{site.tagline}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
