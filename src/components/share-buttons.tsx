"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "./ui";

const networks = [
  { name: "LinkedIn", href: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { name: "WhatsApp", href: (u: string, t: string) => `https://wa.me/?text=${t}%20${u}` },
  { name: "X", href: (u: string, t: string) => `https://x.com/intent/post?url=${u}&text=${t}` },
  { name: "Facebook", href: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
];

export function ShareButtons({ url, title, className }: { url: string; title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn =
    "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold ring-1 ring-ink-200 transition hover:bg-brand-500 hover:text-white hover:ring-brand-500";
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="mr-1 text-sm font-semibold text-ink-900">Share:</span>
      {networks.map((n) => (
        <a key={n.name} href={n.href(u, t)} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Share on ${n.name}`}>
          {n.name}
        </a>
      ))}
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            // Clipboard unavailable (e.g. insecure context) — ignore.
          }
        }}
      >
        {copied ? <Check className="mr-1.5 size-4" aria-hidden /> : <Link2 className="mr-1.5 size-4" aria-hidden />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
