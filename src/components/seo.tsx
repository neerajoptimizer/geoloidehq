import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
          <li>
            <Link href="/" className="hover:text-brand-700">
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 text-ink-300" aria-hidden />
              {i === items.length - 1 ? (
                <span aria-current="page" className="font-medium text-ink-700">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-brand-700">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
