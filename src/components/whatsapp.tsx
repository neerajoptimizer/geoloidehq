"use client";

import { useEffect, useState, type SVGProps } from "react";
import { X } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import { cn } from "./ui";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/** Pill button that opens a WhatsApp chat. */
export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  variant = "solid",
  className,
}: {
  message?: string;
  label?: string;
  /** "light" = white button with green text, for use on coloured backgrounds. */
  variant?: "solid" | "light";
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
        variant === "solid"
          ? "bg-[#25D366] text-white shadow-[#25D366]/25 hover:bg-[#1ebe5a]"
          : "bg-white text-[#128C4B] shadow-ink-900/10 hover:bg-brand-50",
        className,
      )}
    >
      <WhatsAppIcon className="size-5" />
      {label}
    </a>
  );
}

const BUBBLE_KEY = "geoloide-wa-bubble-dismissed";

/** Floating click-to-chat button, bottom-right on every page, with a one-time greeting bubble. */
export function WhatsAppFloat() {
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(BUBBLE_KEY) === "1";
    } catch {
      // Storage unavailable (private mode etc.) — just show the bubble.
    }
    if (dismissed) return;
    const t = setTimeout(() => setBubble(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setBubble(false);
    try {
      sessionStorage.setItem(BUBBLE_KEY, "1");
    } catch {}
  };

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {bubble && (
        <div
          role="status"
          className="relative w-60 animate-menu-in rounded-2xl bg-white p-4 pr-9 sm:w-64 shadow-2xl ring-1 shadow-ink-900/15 ring-ink-100"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss message"
            className="absolute top-2 right-2 grid size-7 place-items-center rounded-full text-ink-400 hover:bg-ink-50 hover:text-ink-700"
          >
            <X className="size-4" />
          </button>
          <p className="font-display font-bold text-ink-900">Need help? 👋</p>
          <p className="mt-1 text-sm text-ink-600">
            Chat with our team on WhatsApp — we usually reply within minutes during business hours.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#128C4B] hover:underline"
          >
            <WhatsAppIcon className="size-4" /> Start a chat
          </a>
          <span className="absolute -bottom-1.5 right-6 size-3 rotate-45 bg-white ring-1 ring-ink-100 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        </div>
      )}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => bubble && dismiss()}
        aria-label={`Chat with Geoloide on WhatsApp (${site.whatsapp.display})`}
        className="group relative flex items-center"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
          Chat with us
        </span>
        <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition duration-300 group-hover:scale-110 group-hover:bg-[#1ebe5a]">
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
          <WhatsAppIcon className="relative size-7" />
        </span>
      </a>
    </div>
  );
}
