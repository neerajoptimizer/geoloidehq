import type { MDXComponents } from "mdx/types";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

/** Optimised in-article image with caption. Usage: <Figure src={img} alt="…" caption="…" /> */
function Figure({ src, alt, caption }: { src: StaticImageData; alt: string; caption?: string }) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl ring-1 ring-ink-100">
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 720px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-ink-500">{caption}</figcaption>}
    </figure>
  );
}

/** Highlighted tip box. Usage: <Callout title="Quick tip">…</Callout> */
function Callout({ title = "Quick tip", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-6">
      <p className="flex items-center gap-2 font-display font-bold text-brand-800">
        <Lightbulb className="size-5" aria-hidden />
        {title}
      </p>
      <div className="mt-2 text-ink-700 [&>p]:mt-2 [&>p:first-child]:mt-0">{children}</div>
    </aside>
  );
}

/** Inline call to action linking to a service or the contact page. */
function ArticleCta({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  return (
    <aside className="my-10 flex flex-col gap-4 rounded-2xl bg-ink-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <p className="font-display text-xl font-bold text-white">{title}</p>
        <div className="mt-1 text-ink-300">{children}</div>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        Talk to us <ArrowRight className="size-4" aria-hidden />
      </Link>
    </aside>
  );
}

function A({ href = "", children, ...props }: ComponentProps<"a">) {
  const cls = "font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 scroll-mt-32 text-2xl font-bold tracking-tight sm:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-10 scroll-mt-32 text-xl font-bold" {...props} />,
  p: (props) => <p className="mt-5 text-lg leading-relaxed text-ink-700" {...props} />,
  ul: (props) => <ul className="mt-5 space-y-2 pl-6 text-lg text-ink-700 marker:text-brand-500 [list-style:disc]" {...props} />,
  ol: (props) => <ol className="mt-5 space-y-2 pl-6 text-lg text-ink-700 marker:font-bold marker:text-brand-600 [list-style:decimal]" {...props} />,
  li: (props) => <li className="pl-1 leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink-900" {...props} />,
  a: A,
  blockquote: (props) => (
    <blockquote className="my-8 border-l-4 border-ink-200 pl-6 text-xl text-ink-600 italic" {...props} />
  ),
  hr: () => <hr className="my-12 border-ink-100" />,
  table: (props) => (
    <div className="my-8">
      <div className="overflow-x-auto rounded-2xl ring-1 ring-ink-100">
        <table className="w-full min-w-[560px] text-left text-sm" {...props} />
      </div>
      <p className="mt-2 text-xs text-ink-400 sm:hidden">Swipe the table to see more →</p>
    </div>
  ),
  thead: (props) => <thead className="bg-ink-50 font-display text-ink-900" {...props} />,
  th: (props) => <th className="px-4 py-3 font-semibold" {...props} />,
  td: (props) => <td className="border-t border-ink-100 px-4 py-3 align-top text-ink-700" {...props} />,
  Figure,
  Callout,
  ArticleCta,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
