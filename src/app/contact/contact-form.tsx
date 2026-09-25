"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/components/ui";
import { services } from "@/lib/site";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-xl border-0 bg-ink-50 px-4 py-3 text-ink-900 ring-1 ring-ink-100 transition placeholder:text-ink-400 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none";

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-50 p-12 text-center ring-1 ring-brand-100">
        <CheckCircle2 className="size-14 text-brand-500" aria-hidden />
        <h3 className="mt-6 text-2xl font-bold">Message sent</h3>
        <p className="mt-2 max-w-sm text-ink-600" role="status">
          {state.message}
        </p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values ?? {};

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="hidden" aria-hidden>
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" error={err.name} required>
          <input
            id="name"
            defaultValue={v.name}
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
            className={cn(inputClass, err.name && "ring-red-300")}
          />
        </Field>
        <Field label="Work email" name="email" error={err.email} required>
          <input
            id="email"
            defaultValue={v.email}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
            className={cn(inputClass, err.email && "ring-red-300")}
          />
        </Field>
        <Field label="Phone" name="phone">
          <input id="phone" name="phone" defaultValue={v.phone} type="tel" autoComplete="tel" placeholder="+91" className={inputClass} />
        </Field>
        <Field label="Company" name="company">
          <input
            id="company"
            defaultValue={v.company}
            name="company"
            autoComplete="organization"
            placeholder="Company name"
            className={inputClass}
          />
        </Field>
        <Field label="Service of interest" name="service">
          <select id="service" name="service" className={inputClass} defaultValue={v.service ?? ""}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Multiple / Not sure yet</option>
          </select>
        </Field>
        <Field label="Estimated budget" name="budget">
          <select id="budget" name="budget" className={inputClass} defaultValue={v.budget ?? ""}>
            <option value="">Select a range</option>
            <option>Under ₹1 Lakh</option>
            <option>₹1 – 5 Lakh</option>
            <option>₹5 – 15 Lakh</option>
            <option>₹15 Lakh+</option>
          </select>
        </Field>
      </div>

      <Field label="How can we help?" name="message" error={err.message} required>
        <textarea
          id="message"
            defaultValue={v.message}
          name="message"
          rows={5}
          placeholder="Tell us about your business, goals and timeline…"
          required
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
          className={cn(inputClass, "resize-y", err.message && "ring-red-300")}
        />
      </Field>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 disabled:opacity-70 sm:w-auto"
      >
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {pending ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-ink-400">
        By submitting, you agree to our privacy policy. We never share your details.
      </p>
    </form>
  );
}
