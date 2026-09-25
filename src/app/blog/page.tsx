import { FeaturedPost } from "@/components/blog";
import { BlogBrowser } from "@/components/blog-browser";
import { CtaBanner, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/seo";
import { Container, SectionHeading } from "@/components/ui";
import { blogCategories, getAllPosts } from "@/lib/blog";
import { absoluteUrl, ORG_ID, pageMetadata, webPageSchema } from "@/lib/seo";

const seo = {
  title: "Blog – Web, Marketing & Automation Insights",
  description:
    "Practical guides on website development, digital marketing, Google & Meta ads and business automation from the Geoloide team in Delhi NCR.",
  path: "/blog",
};

const base = pageMetadata({
  ...seo,
  keywords: ["Geoloide blog", "digital marketing blog India", "website development tips", "business automation guide"],
});

export const metadata = {
  ...base,
  alternates: { ...base.alternates, types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Geoloide Blog" }] } },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [latest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Geoloide blog"
        title={
          <>
            Insights to help your business <span className="text-brand-600">grow globally</span>
          </>
        }
        description="Practical, no-fluff advice on websites, digital marketing and automation — written by the team that builds and runs them every day."
        breadcrumbs={[{ name: "Blog", path: seo.path }]}
      />

      <section className="pb-20 sm:pb-24">
        <Container>
          {latest && <FeaturedPost post={latest} />}
          <div className="mt-20">
            <SectionHeading align="left" eyebrow="All articles" title="Browse by topic" />
            <div className="mt-8">
              <BlogBrowser posts={posts} categories={blogCategories} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Have a question about growing your business?"
        description="Book a free 30-minute consultation — we'll share practical advice for your website, marketing or operations."
      />
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", name: seo.title, description: seo.description, path: seo.path }),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${absoluteUrl(seo.path)}#blog`,
            name: "Geoloide Blog",
            url: absoluteUrl(seo.path),
            publisher: { "@id": ORG_ID },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.meta.title,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.meta.date,
              image: absoluteUrl(p.meta.cover.src),
            })),
          },
        ]}
      />
    </>
  );
}
