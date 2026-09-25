import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { formatDate, type PostSummary } from "@/lib/blog-shared";
import { revealDelay } from "@/lib/motion";
import { ButtonLink, Container, SectionHeading, cn } from "./ui";

function PostMetaLine({ post, light }: { post: PostSummary; light?: boolean }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-sm", light ? "text-ink-300" : "text-ink-500")}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-4" aria-hidden />
        <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-4" aria-hidden />
        {post.readingMinutes} min read
      </span>
    </p>
  );
}

export function CategoryBadge({ category, light }: { category: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        light ? "bg-ink-900/75 text-white ring-1 ring-white/20 backdrop-blur" : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
      )}
    >
      {category}
    </span>
  );
}

export function BlogCard({ post, index = 0, headingLevel = "h3" }: { post: PostSummary; index?: number; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article
      data-reveal
      style={revealDelay(index % 3, 110)}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink-900/10 hover:ring-brand-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.meta.cover}
          alt={post.meta.coverAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={post.meta.category} light />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <PostMetaLine post={post} />
        <Heading className="mt-3 text-xl leading-snug font-bold text-balance">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-700">
            {post.meta.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 flex-1 text-ink-500">{post.meta.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}

export function FeaturedPost({ post }: { post: PostSummary }) {
  return (
    <article
      data-reveal
      className="group relative grid overflow-hidden rounded-[2rem] bg-ink-900 ring-1 ring-ink-900 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
        <Image
          src={post.meta.cover}
          alt={post.meta.coverAlt}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">Latest</span>
          <CategoryBadge category={post.meta.category} light />
        </div>
        <h2 className="mt-5 text-2xl leading-tight font-bold text-balance text-white sm:text-4xl">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-300">
            {post.meta.title}
          </Link>
        </h2>
        <p className="mt-4 text-lg text-ink-300">{post.meta.description}</p>
        <div className="mt-6">
          <PostMetaLine post={post} light />
        </div>
        <span className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-400">
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}

/** Home / service page section listing recent articles. */
export function LatestPosts({
  posts,
  title = "Latest insights",
  description = "Practical advice on websites, marketing and automation from the Geoloide team.",
}: {
  posts: PostSummary[];
  title?: string;
  description?: string;
}) {
  if (!posts.length) return null;
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading align="left" eyebrow="Blog" title={title} description={description} />
          <ButtonLink href="/blog" variant="outline" arrow className="shrink-0">
            View all articles
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <BlogCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
