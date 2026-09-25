import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="relative flex flex-col items-center py-32 text-center">
        <p className="font-display text-8xl font-bold text-brand-500">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This page went off the map</h1>
        <p className="mt-4 max-w-md text-ink-500">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on course.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
