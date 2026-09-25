import Link from "next/link";
import { ArrowRight, Code2, Megaphone, Workflow, type LucideProps } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import type { Service } from "@/lib/site";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase",
        dark ? "bg-white/10 text-brand-300 ring-1 ring-white/15" : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
      )}
    >
      <span className="size-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div data-reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          dark && "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg text-pretty", dark ? "text-ink-300" : "text-ink-500")}>{description}</p>
      )}
    </div>
  );
}

const buttonStyles = {
  primary:
    "bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600 focus-visible:outline-brand-500",
  dark: "bg-ink-900 text-white hover:bg-ink-800 focus-visible:outline-ink-900",
  outline: "bg-white text-ink-900 ring-1 ring-ink-200 hover:ring-ink-300 hover:bg-ink-50 focus-visible:outline-ink-900",
  ghostLight: "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15 focus-visible:outline-white",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  arrow,
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2",
        // Light "shine" that sweeps across the button on hover.
        "before:absolute before:inset-y-0 before:-left-1/2 before:-z-10 before:w-1/2 before:-skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-[300%]",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </Link>
  );
}

const serviceIcons = { megaphone: Megaphone, code: Code2, workflow: Workflow };

export function ServiceIcon({ icon, ...props }: { icon: Service["icon"] } & LucideProps) {
  const Icon = serviceIcons[icon];
  return <Icon aria-hidden {...props} />;
}
