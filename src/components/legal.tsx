import type { ReactNode } from "react";
import { Breadcrumbs } from "./seo";
import { Container } from "./ui";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/70 to-white">
        <Container className="max-w-3xl py-20">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 text-ink-500">Last updated: {updated}</p>
        </Container>
      </section>
      <Container className="max-w-3xl pb-24">
        <div className="space-y-8 text-ink-600 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_a]:font-semibold [&_ul_a]:text-brand-700 [&_strong]:text-ink-900">
          {children}
        </div>
      </Container>
    </>
  );
}
