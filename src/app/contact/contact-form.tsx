"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CheckCircle2, Loader2, Lock, Send } from "lucide-react";
import { cn } from "@/components/ui";
import { WhatsAppButton } from "@/components/whatsapp";
import { services } from "@/lib/site";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-xl border-0 bg-ink-50 px-4 py-3 text-ink-900 ring-1 ring-ink-100 transition placeholder:text-ink-400 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none";

const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];
const contactOptions = ["Email", "WhatsApp", "Phone call"];

function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-brand-600"> *</span>}
        {hint && <span className="ml-1 font-normal text-ink-400">{hint}</span>}
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

/** Radio group rendered as selectable chips. */
function ChipGroup({
  legend,
  name,
  options,
  defaultValue,
}: {
  legend: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink-800">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} defaultChecked={defaultValue === o} className="peer sr-only" />
            <span className="inline-flex rounded-full bg-ink-50 px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-100 transition peer-checked:bg-brand-500 peer-checked:text-white peer-checked:ring-brand-500 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 hover:ring-brand-300">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-brand-50 p-8 text-center ring-1 ring-brand-100 sm:p-12">
        <span className="grid size-16 place-items-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Thank you — message received!</h3>
        <p className="mt-2 max-w-md text-ink-600" role="status">
          {state.message}
        </p>
        <ol className="mt-8 w-full max-w-sm space-y-3 text-left text-sm">
          {["We review your requirements", "We reply with next steps and a free consultation slot", "You get a clear, itemised proposal"].map(
            (step, i) => (
              <li key={step} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-brand-100">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-500 font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ),
          )}
        </ol>
        <p className="mt-8 text-sm text-ink-500">Need a faster answer?</p>
        <WhatsAppButton className="mt-3" label="Chat with us on WhatsApp" />
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

      <ChipGroup legend="What can we help you with?" name="service" options={serviceOptions} defaultValue={v.service} />

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
        <Field label="Phone / WhatsApp" name="phone" hint="(optional)">
          <input id="phone" name="phone" defaultValue={v.phone} type="tel" autoComplete="tel" placeholder="+91" className={inputClass} />
        </Field>
        <Field label="Company" name="company" hint="(optional)">
          <input
            id="company"
            defaultValue={v.company}
            name="company"
            autoComplete="organization"
            placeholder="Company name"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Tell us about your project" name="message" error={err.message} required>
        <textarea
          id="message"
          defaultValue={v.message}
          name="message"
          rows={5}
          placeholder="Your business, goals, timeline and anything else we should know…"
          required
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
          className={cn(inputClass, "resize-y", err.message && "ring-red-300")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Estimated budget" name="budget" hint="(optional)">
          <select id="budget" name="budget" className={inputClass} defaultValue={v.budget ?? ""}>
            <option value="">Select a range</option>
            <option>Under ₹1 Lakh</option>
            <option>₹1 – 5 Lakh</option>
            <option>₹5 – 15 Lakh</option>
            <option>₹15 Lakh+</option>
            <option>Not sure yet</option>
          </select>
        </Field>
        <ChipGroup
          legend="How should we contact you?"
          name="preferred_contact"
          options={contactOptions}
          defaultValue={v.preferredContact || "Email"}
        />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs text-ink-500">
          <Lock className="mt-0.5 size-3.5 shrink-0 text-brand-600" aria-hidden />
          <span>
            Your details are safe with us and never shared. See our{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-700 hover:underline">
              privacy policy
            </Link>
            .
          </span>
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:opacity-70"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
