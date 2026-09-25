"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, MapPin, Menu, X } from "lucide-react";
import { mainNav, services, site, whatsappUrl } from "@/lib/site";
import { ScrollProgress } from "./motion";
import { ButtonLink, Container, ServiceIcon, cn } from "./ui";
import { WhatsAppButton, WhatsAppIcon } from "./whatsapp";

// Brand-green underline that slides in on hover and stays on the active page.
const navUnderline =
  "relative after:absolute after:inset-x-3 xl:after:inset-x-4 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-500 after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink-900 text-xs text-ink-300 md:block">
        <Container className="flex h-9 items-center justify-between">
          <p className="hidden lg:block">
            {site.descriptor} · <span className="text-brand-400">{site.tagline}</span>
          </p>
          <div className="flex w-full items-center justify-center gap-6 whitespace-nowrap lg:w-auto lg:justify-end">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <WhatsAppIcon className="size-3.5 text-[#25D366]" />
              {site.whatsapp.display}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="size-3.5" aria-hidden />
              {site.email}
            </a>
            <span className="hidden items-center gap-1.5 lg:inline-flex">
              <MapPin className="size-3.5" aria-hidden />
              New Delhi · Noida
            </span>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "relative border-b transition-colors duration-300",
          scrolled || open
            ? "border-ink-100 bg-white/90 shadow-sm backdrop-blur-lg"
            : "border-transparent bg-white/70 backdrop-blur",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Image
              src="/logo.png"
              alt={site.legalName}
              width={1057}
              height={336}
              className={cn("w-auto transition-all duration-300", scrolled ? "h-10" : "h-11 sm:h-12")}
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.href === "/services" ? (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition xl:px-4",
                        navUnderline,
                        isActive(item.href) ? "text-brand-700 after:scale-x-100" : "text-ink-700 hover:text-ink-900",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                        aria-hidden
                      />
                    </Link>
                    <div className="invisible absolute top-full left-1/2 w-[26rem] -translate-x-1/2 pt-3 translate-y-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl bg-white p-3 shadow-2xl ring-1 shadow-ink-900/10 ring-ink-100">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex gap-4 rounded-xl p-3 transition hover:bg-brand-50"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-500 text-white">
                              <ServiceIcon icon={s.icon} className="size-5" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-ink-900">{s.title}</span>
                              <span className="mt-0.5 line-clamp-2 block text-xs text-ink-500">{s.short}</span>
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="mt-1 block rounded-xl bg-ink-50 px-4 py-2.5 text-center text-xs font-semibold text-ink-700 hover:bg-ink-100"
                        >
                          View all services →
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition xl:px-4",
                        navUnderline,
                        isActive(item.href) ? "text-brand-700 after:scale-x-100" : "text-ink-700 hover:text-ink-900",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block lg:hidden xl:block">
              <ButtonLink href="/contact" arrow>
                Get a Free Consultation
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full text-ink-900 ring-1 ring-ink-200 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
        <ScrollProgress />
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-18 bottom-0 animate-menu-in overflow-y-auto border-t border-ink-100 bg-white md:top-27 lg:hidden"
        >
          <Container className="py-6">
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-semibold",
                        isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-900 hover:bg-ink-50",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.href === "/services" && (
                      <ul className="mt-1 ml-4 space-y-1 border-l border-ink-100 pl-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-ink-50"
                            >
                              <ServiceIcon icon={s.icon} className="size-4 text-brand-600" />
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 space-y-3 border-t border-ink-100 pt-6">
              <ButtonLink href="/contact" className="w-full" arrow>
                Get a Free Consultation
              </ButtonLink>
              <WhatsAppButton className="w-full" />
              <a
                href={`mailto:${site.email}`}
                className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-ink-600"
              >
                <Mail className="size-4" aria-hidden />
                {site.email}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
