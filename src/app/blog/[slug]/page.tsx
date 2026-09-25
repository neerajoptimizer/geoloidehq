import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronDown, Clock, RefreshCw } from "lucide-react";
import { BlogCard, CategoryBadge } from "@/components/blog";
import { CtaBanner, Faq } from "@/components/sections";
import { Breadcrumbs, JsonLd } from "@/components/seo";
import { ShareButtons } from "@/components/share-buttons";
import { TableOfContents } from "@/components/toc";
import { Container, ServiceIcon } from "@/components/ui";
import { formatDate, getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { absoluteUrl, faqSchema, ORG_ID, pageMetadata, WEBSITE_ID } from "@/lib/seo";
import { getService } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const { meta } = post;
  const base = pageMetadata({
    title: meta.seoTitle ?? meta.title,
    description: meta.description,
    path: `/blog/${slug}`,
    keywords: meta.keywords,
    image: `/blog/${slug}/opengraph-image`,
    article: {
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      section: meta.category,
      tags: meta.keywords,
      authors: [meta.author.name],
    },
  });
  return {
    ...base,
    alternates: { ...base.alternates, types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Geoloide Blog" }] } },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { meta, Content, toc, readingMinutes } = post;
  const path = `/blog/${slug}`;
  const service = getService(meta.relatedService);
  const related = (await getAllPosts()).filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    headline: meta.title,
    description: meta.description,
    image: [absoluteUrl(meta.cover.src), absoluteUrl(`${path}/opengraph-image`)],
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: { "@type": "Organization", name: meta.author.name, url: absoluteUrl("/about") },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    articleSection: meta.category,
    keywords: meta.keywords?.join(", "),
    wordCount: readingMinutes * 200,
    inLanguage: "en-IN",
  };

  return (
    <>
      {/* Article header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <Container className="relative max-w-4xl pt-12 pb-10 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: "Blog", path: "/blog" },
              { name: meta.title, path },
            ]}
          />
          <div className="animate-fade-up">
            <CategoryBadge category={meta.category} />
            <h1 className="mt-5 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">{meta.title}</h1>
            <p className="mt-5 text-lg text-pretty text-ink-500 sm:text-xl">{meta.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-white shadow ring-1 ring-ink-100">
                  <Image src="/mark.png" alt="" width={360} height={360} className="w-6" />
                </span>
                <span>
                  <span className="block font-semibold text-ink-900">{meta.author.name}</span>
                  {meta.author.role && <span className="block text-xs">{meta.author.role}</span>}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden />
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </span>
              {meta.updated && (
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw className="size-4" aria-hidden />
                  Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden />
                {readingMinutes} min read
              </span>
            </div>
          </div>
        </Container>
        <Container className="relative max-w-6xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl ring-1 shadow-ink-900/10 ring-ink-100 sm:rounded-[2rem]">
            <Image
              src={meta.cover}
              alt={meta.coverAlt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Body */}
      <Container className="max-w-6xl py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            {toc.length > 0 && (
              <details className="group mb-8 rounded-2xl bg-ink-50 p-5 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  On this page
                  <ChevronDown className="size-5 text-ink-400 transition group-open:rotate-180" aria-hidden />
                </summary>
                <ol className="mt-4 space-y-2 text-sm">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-ink-600 hover:text-brand-700">
                        {i + 1}. {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <article className="max-w-[720px] [&>p:first-child]:mt-0">
              <Content />
            </article>

            {meta.faqs && meta.faqs.length > 0 && (
              <section className="mt-16 max-w-[720px]" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="scroll-mt-32 text-2xl font-bold tracking-tight sm:text-3xl">
                  Frequently asked questions
                </h2>
                <div className="mt-6">
                  <Faq items={meta.faqs} />
                </div>
              </section>
            )}

            <div className="mt-12 max-w-[720px] border-t border-ink-100 pt-8">
              <ShareButtons url={absoluteUrl(path)} title={meta.title} />
            </div>

            <div className="mt-10 flex max-w-[720px] gap-5 rounded-3xl bg-ink-50 p-6 sm:p-8">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white shadow ring-1 ring-ink-100">
                <Image src="/mark.png" alt="" width={360} height={360} className="w-8" />
              </span>
              <div>
                <p className="text-sm text-ink-500">Written by</p>
                <p className="font-display text-lg font-bold text-ink-900">{meta.author.name}</p>
                <p className="mt-2 text-ink-600">
                  Geoloide&apos;s strategists, designers and engineers share what we learn delivering websites, marketing
                  and automation for businesses in Delhi NCR and beyond.{" "}
                  <Link href="/about" className="font-semibold text-brand-700 hover:underline">
                    About us
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-36 space-y-8">
              {toc.length > 0 && <TableOfContents items={toc} />}
              {service && (
                <Link
                  href={`/services/${service.slug}`}
                  className="group block rounded-3xl bg-ink-900 p-6 text-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-500">
                    <ServiceIcon icon={service.icon} className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold tracking-wider text-brand-400 uppercase">Our service</p>
                  <p className="mt-1 font-display text-lg leading-snug font-bold">{service.title}</p>
                  <p className="mt-2 text-sm text-ink-300">{service.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              )}
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="bg-ink-50 py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner />
      <JsonLd data={meta.faqs?.length ? [articleSchema, faqSchema(meta.faqs)] : articleSchema} />
    </>
  );
}
