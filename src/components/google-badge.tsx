import { ArrowUpRight, PenLine, Star } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "./ui";

/** Official multi-colour Google "G". */
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={cn("size-4", i <= Math.round(rating) ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-ink-200 text-ink-200")}
        />
      ))}
    </span>
  );
}

/**
 * Compact "Reviewed on Google" badge linking to the Business Profile. Shows stars only when a real
 * rating is configured in site.google — never an invented one.
 */
export function GoogleBadge({ className }: { className?: string }) {
  const { profileUrl, rating, reviewCount } = site.google;
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-ink-200",
        className,
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white shadow ring-1 ring-ink-100">
        <GoogleG className="size-6" />
      </span>
      <span className="min-w-0 text-left">
        {rating ? (
          <span className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-ink-900">{rating.toFixed(1)}</span>
            <Stars rating={rating} />
          </span>
        ) : (
          <span className="block font-display font-bold text-ink-900">Find us on Google</span>
        )}
        <span className="flex items-center gap-1 text-xs text-ink-500">
          {rating && reviewCount ? `${reviewCount} Google reviews` : "Read our Google reviews"}
          <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </span>
    </a>
  );
}

/** Larger card with "Read reviews" and "Write a review" actions (Contact / Testimonials pages). */
export function GoogleReviewCard({ className, dark }: { className?: string; dark?: boolean }) {
  const { profileUrl } = site.google;
  return (
    <div
      className={cn(
        "rounded-3xl p-6 ring-1 sm:p-8",
        dark ? "bg-white/5 text-white ring-white/10" : "bg-white ring-ink-100",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white shadow ring-1 ring-ink-100">
          <GoogleG className="size-7" />
        </span>
        <div>
          <h3 className={cn("text-lg font-bold", dark && "text-white")}>Geoloide on Google</h3>
          <p className={cn("text-sm", dark ? "text-ink-300" : "text-ink-500")}>
            Our Google Business Profile — see our location, hours and client reviews.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Read our reviews <ArrowUpRight className="size-4" aria-hidden />
        </a>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ring-1 transition",
            dark ? "text-white ring-white/20 hover:bg-white/10" : "text-ink-800 ring-ink-200 hover:bg-ink-50",
          )}
        >
          <PenLine className="size-4" aria-hidden /> Write a review
        </a>
      </div>
    </div>
  );
}
