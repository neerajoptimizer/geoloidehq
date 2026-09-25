"use server";

import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("company_website")) return { status: "success", message: "Thanks! We'll be in touch shortly." };

  const field = (key: string) => String(formData.get(key) ?? "").trim().slice(0, 2000);
  const data = {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    company: field("company"),
    service: field("service"),
    budget: field("budget"),
    message: field("message"),
  };

  const errors: ContactState["errors"] = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "error", message: "Please fix the highlighted fields.", errors, values: data };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No mail provider configured (e.g. local development): log the enquiry instead.
    console.info("[contact] New enquiry", data);
    return { status: "success", message: "Thanks! Your message has been received. We'll reply within one business day." };
  }

  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `Geoloide Website <noreply@geoloide.com>`,
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      reply_to: data.email,
      subject: `New enquiry from ${data.name}${data.service ? ` — ${data.service}` : ""}`,
      html: `<table>${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Failed to send email", res.status, await res.text());
    return {
      status: "error",
      message: `Sorry, something went wrong. Please email us directly at ${site.email}.`,
      values: data,
    };
  }

  return { status: "success", message: "Thanks! Your message has been received. We'll reply within one business day." };
}
