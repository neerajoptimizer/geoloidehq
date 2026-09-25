"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "./ui";

/*
 * Language switcher backed by the Google Translate website widget.
 *
 * The site is authored (and indexed) in English. Choosing another language stores Google's `googtrans`
 * cookie and reloads; on load we only fetch Google's script when that cookie asks for a non-English
 * language, so English visitors — and crawlers — never download it.
 */

export const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "fr", label: "French", native: "Français" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "zh-CN", label: "Chinese", native: "中文" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ur", label: "Urdu", native: "اردو" },
] as const;

type LangCode = (typeof languages)[number]["code"];

function readLang(): LangCode {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  const code = match ? decodeURIComponent(match[1]) : "en";
  return (languages.find((l) => l.code === code)?.code ?? "en") as LangCode;
}

function writeLang(code: LangCode) {
  // Google reads the cookie from the host and, on live domains, from the parent domain too — keep both in sync.
  const parts = location.hostname.split(".");
  const scopes = ["", ...(parts.length > 1 ? [`; domain=.${parts.slice(-2).join(".")}`] : [])];
  for (const domain of scopes) {
    document.cookie =
      code === "en"
        ? `googtrans=; path=/; max-age=0${domain}`
        : `googtrans=/en/${code}; path=/; max-age=31536000${domain}`;
  }
}

declare global {
  interface Window {
    googleTranslateInit?: () => void;
    google?: { translate: { TranslateElement: new (opts: object, el: string) => unknown } };
  }
}

/*
 * Google Translate swaps text nodes for <font> wrappers, which makes React throw when it later removes
 * or inserts nodes during client-side navigation (facebook/react#11538). Make those calls tolerant.
 */
function patchDomForTranslation() {
  const proto = Node.prototype as Node & { __gtPatched?: boolean };
  if (proto.__gtPatched) return;
  proto.__gtPatched = true;
  const removeChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) {
      child.parentNode?.removeChild(child);
      return child;
    }
    return removeChild.call(this, child) as T;
  };
  const insertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return insertBefore.call(this, node, null) as T;
    return insertBefore.call(this, node, ref) as T;
  };
}

function loadTranslator() {
  if (document.getElementById("google-translate-script")) return;
  patchDomForTranslation();
  window.googleTranslateInit = () => {
    if (!window.google) return;
    new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element");
  };
  const s = document.createElement("script");
  s.id = "google-translate-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
  s.async = true;
  document.body.appendChild(s);
}

export function LanguageSwitcher({ variant = "light", className }: { variant?: "light" | "dark"; className?: string }) {
  const [lang, setLang] = useState<LangCode>("en");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = readLang();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the cookie only exists in the browser
    setLang(current);
    if (current !== "en") loadTranslator();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: LangCode) => {
    setOpen(false);
    if (code === lang) return;
    writeLang(code);
    location.reload();
  };

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div ref={ref} className={cn("notranslate relative", className)} translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}. Change language`}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium transition",
          variant === "dark"
            ? "px-2.5 py-1 text-ink-300 hover:bg-white/10 hover:text-white"
            : "h-11 px-3 text-sm text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50 hover:text-ink-900",
          open && (variant === "dark" ? "bg-white/10 text-white" : "bg-ink-50"),
        )}
      >
        <Globe className={variant === "dark" ? "size-3.5 text-brand-400" : "size-4 text-brand-600"} aria-hidden />
        <span>{current.code === "zh-CN" ? "ZH" : current.code.toUpperCase()}</span>
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <div className="absolute top-full right-0 z-[70] mt-2 w-60 whitespace-normal animate-menu-in overflow-hidden rounded-2xl bg-white text-left shadow-2xl ring-1 shadow-ink-900/15 ring-ink-100">
          <p className="border-b border-ink-100 px-4 py-2.5 text-xs font-semibold tracking-wider text-ink-400 uppercase">
            Choose language
          </p>
          <ul role="listbox" aria-label="Languages" className="max-h-80 overflow-y-auto p-1.5">
            {languages.map((l) => {
              const active = l.code === lang;
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => choose(l.code)}
                    lang={l.code}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition",
                      active ? "bg-brand-50 text-brand-800" : "text-ink-700 hover:bg-ink-50",
                    )}
                  >
                    <span className="flex flex-col items-start">
                      <span className="font-semibold">{l.native}</span>
                      {l.native !== l.label && <span className="text-xs text-ink-400">{l.label}</span>}
                    </span>
                    {active && <Check className="size-4 text-brand-600" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="border-t border-ink-100 bg-ink-50 px-4 py-2 text-[11px] leading-snug text-ink-400">
            Automatic translation by Google. The English version is the official one.
          </p>
        </div>
      )}
    </div>
  );
}
