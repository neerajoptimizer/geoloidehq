import { CtaBanner, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/seo";
import { FeaturedTestimonial, TestimonialSummary } from "@/components/testimonials";
import { TestimonialsBrowser } from "@/components/testimonials-browser";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { featuredTestimonials, testimonialCategories, testimonials } from "@/lib/testimonials";

const seo = {
  title: "Client Testimonials – Web, Marketing & Software",
  description:
    "Read what clients say about Geoloide's website development, digital marketing and custom software — real reviews from businesses in Delhi NCR and across India.",
  path: "/testimonials",
};

export const metadata = pageMetadata({
  ...seo,
  keywords: [
    "Geoloide reviews",
    "Geoloide testimonials",
    "website development company in Delhi reviews",
    "digital marketing agency reviews",
    "custom software development testimonials",
  ],
});

const reviews = testimonials.filter((t) => !t.featured);
const reviewCategories = testimonialCategories.filter((c) => reviews.some((t) => t.categories.includes(c)));

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client stories"
        title={
          <>
            Real results, in our <span className="text-brand-600">clients&apos; own words</span>
          </>
        }
        description="From fintech platforms to laundry management software and high-converting business websites — here's what founders and business owners say about working with Geoloide."
        breadcrumbs={[{ name: "Testimonials", path: seo.path }]}
      >
        <ButtonLink href="/contact" arrow>
          Start your project
        </ButtonLink>
        <ButtonLink href="#all-reviews" variant="outline">
          Read all reviews
        </ButtonLink>
      </PageHero>

      <section className="pb-20 sm:pb-24">
        <Container>
          <TestimonialSummary className="mx-auto max-w-md" />
          <div className="mt-16">
            <SectionHeading
              eyebrow="Featured projects"
              title="Client projects we're proud of"
              description="Custom platforms built around how each business really works."
            />
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredTestimonials.map((t, i) => (
              <FeaturedTestimonial key={t.name} t={t} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section id="all-reviews" className="scroll-mt-32 bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Reviews"
            title="What our clients say"
            description="Filter by service to find stories most relevant to your project."
          />
          <div className="mt-10">
            <TestimonialsBrowser items={reviews} categories={reviewCategories} />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Ready to be our next success story?"
        description="Book a free 30-minute consultation and see why businesses trust Geoloide with their website, marketing and software."
      />
      <JsonLd data={webPageSchema({ name: seo.title, description: seo.description, path: seo.path })} />
    </>
  );
}
