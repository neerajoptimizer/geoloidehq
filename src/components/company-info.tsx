import { ArrowUpRight, BadgeCheck, Building2 } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "./ui";

export const companyFacts = [
  { label: "Legal name", value: site.legalName },
  { label: "Company type", value: site.company.type },
  { label: "CIN", value: site.company.cin, mono: true },
  { label: "GSTIN", value: site.company.gstin, mono: true },
  { label: "Incorporated", value: site.company.incorporatedDisplay },
  { label: "Registrar", value: site.company.roc },
  { label: "Registered office", value: site.offices[0].lines.join(", ") },
  { label: "Status", value: site.company.status },
];

/** Card listing official registration details, with a link to verify on the MCA portal. */
export function CompanyInfoCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-3xl bg-white p-6 ring-1 ring-ink-100 sm:p-8", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white">
            <Building2 className="size-6" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-bold">Company information</h3>
            <p className="flex items-center gap-1.5 text-sm text-ink-500">
              <BadgeCheck className="size-4 text-brand-500" aria-hidden />
              Registered with the Ministry of Corporate Affairs, Government of India
            </p>
          </div>
        </div>
        <a
          href={site.company.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-50 hover:text-brand-700"
        >
          Verify on MCA <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {companyFacts.map((f) => (
          <div key={f.label} className={f.label === "Registered office" ? "sm:col-span-2" : undefined}>
            <dt className="text-xs font-semibold tracking-wider text-ink-400 uppercase">{f.label}</dt>
            <dd className={cn("mt-1 text-ink-900", f.mono ? "font-mono text-sm font-semibold tracking-wide" : "font-medium")}>
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-xs text-ink-400">
        To verify, search the CIN on the MCA master data portal.
      </p>
    </div>
  );
}

/** Company details as a plain list, for policy pages (inherits the legal page prose styles). */
export function LegalCompanyDetails() {
  return (
    <ul>
      {companyFacts
        .filter((f) => f.label !== "Status")
        .map((f) => (
          <li key={f.label}>
            <strong>{f.label}:</strong> {f.value}
          </li>
        ))}
      <li>
        <strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
      </li>
      <li>
        <strong>Phone / WhatsApp:</strong> {site.whatsapp.display}
      </li>
    </ul>
  );
}
