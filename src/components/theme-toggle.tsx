"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "./ui";

type Theme = "light" | "system" | "dark";

const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "dark", label: "Dark theme", Icon: Moon },
];

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function apply(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && media().matches);
  document.documentElement.classList.toggle("dark", dark);
}

function readTheme(): Theme {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

/** Light / System / Dark switch. The initial class is set by an inline script in the root layout. */
export function ThemeToggle({ variant = "dark", className }: { variant?: "light" | "dark"; className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the stored choice only exists in the browser
    setTheme(readTheme());
  }, []);

  // Follow the operating system while "System" is selected.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = media();
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const choose = (value: Theme) => {
    setTheme(value);
    apply(value);
    try {
      if (value === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", value);
    } catch {}
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full p-0.5",
        variant === "dark" ? "bg-white/5 ring-1 ring-white/10" : "bg-ink-50 ring-1 ring-ink-100",
        className,
      )}
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => choose(value)}
            className={cn(
              "grid place-items-center rounded-full transition",
              variant === "dark" ? "size-7" : "size-9",
              active
                ? variant === "dark"
                  ? "bg-white/15 text-white shadow-sm"
                  : "bg-brand-500 text-white shadow-sm"
                : variant === "dark"
                  ? "text-ink-400 hover:text-white"
                  : "text-ink-500 hover:text-ink-900",
            )}
          >
            <Icon className={variant === "dark" ? "size-3.5" : "size-4"} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
