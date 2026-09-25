import type { ServiceSlug } from "./site";

export type TestimonialCategory = "Website Development" | "Digital Marketing" | "Software Development";

export type Testimonial = {
  name: string;
  /** Company or project the client represents, when shared. */
  company?: string;
  role?: string;
  categories: TestimonialCategory[];
  /** Short headline — always an exact phrase taken from the client's own quote. */
  headline: string;
  quote: string;
  /** What was delivered (from the client's description) — shown on featured case-study cards. */
  delivered?: string[];
  featured?: boolean;
};

// Real client testimonials supplied by Geoloide. Keep headlines verbatim excerpts of each quote.
export const testimonials: Testimonial[] = [
  {
    name: "Lokesh",
    company: "Easy Pip",
    categories: ["Website Development"],
    headline: "The result exceeded our expectations",
    quote:
      "Geoloide developed the website for Easy Pip, our financial system platform, and the result exceeded our expectations. The site is secure, fast, and user-friendly, with a clean, professional design that builds trust with users, which is crucial for any fintech or financial services website. The team understood our requirements clearly, delivered on time, and provided excellent post-launch support. Highly recommended for secure, scalable website development.",
    delivered: ["Secure fintech website", "Fast, user-friendly experience", "Post-launch support"],
    featured: true,
  },
  {
    name: "Sanjay Gupta",
    company: "Laundry Lounge",
    categories: ["Software Development"],
    headline: "It has completely transformed how we operate",
    quote:
      "Geoloide developed the Laundry Lounge software for our laundry business, and it has completely transformed how we operate. Order booking, pickup and delivery tracking, billing, and customer management now run smoothly on one system, saving us hours of manual work every day. The team understood our workflow perfectly and delivered a user-friendly, scalable laundry management software. Their post-launch support has been excellent. Highly recommended for custom software development.",
    delivered: ["Order booking", "Pickup & delivery tracking", "Billing & customer management"],
    featured: true,
  },
  {
    name: "Ruchira Sharma",
    company: "Zenyth Media House",
    role: "Founder",
    categories: ["Website Development"],
    headline: "They're my go-to white-label website development partner",
    quote:
      "As an agency owner, I only work with partners I can trust with my clients. Geoloide's web development team consistently delivers high-quality WordPress and Shopify websites with responsive design, smooth UX, and on-time handovers. They're my go-to white-label website development partner.",
  },
  {
    name: "Rohit Prajapati",
    categories: ["Digital Marketing"],
    headline: "Real, measurable ROI from our marketing spend",
    quote:
      "Geoloide completely changed our digital marketing game. Their Meta Ads and Google Ads campaigns brought us quality leads at a lower cost per lead, and the social media management kept our brand active and engaging. We finally have real, measurable ROI from our marketing spend.",
  },
  {
    name: "Ravikant Sharma",
    categories: ["Website Development", "Digital Marketing"],
    headline: "A true end-to-end digital growth partner",
    quote:
      "Geoloide handled both our website development and digital marketing, which made everything seamless. The new website converts well, and their performance marketing campaigns keep the leads flowing. A true end-to-end digital growth partner.",
  },
  {
    name: "Aman Bajaj",
    categories: ["Website Development"],
    headline: "We started getting more enquiries within weeks",
    quote:
      "Our old website was slow and outdated. Geoloide redesigned it with a fresh look, responsive layout, and better navigation, and we started getting more enquiries within weeks. A dependable web development agency for growing businesses.",
  },
  {
    name: "Priyadarshini",
    categories: ["Website Development"],
    headline: "Fast, mobile-friendly, and SEO-optimized",
    quote:
      "Geoloide built our website from scratch, and the result is fast, mobile-friendly, and SEO-optimized. The team understood our brand and delivered a clean, professional design well within the timeline. If you're looking for a reliable website development company in Delhi, Geoloide is the one.",
  },
  {
    name: "Vipul",
    categories: ["Website Development"],
    headline: "We needed a modern, conversion-focused business website, and Geoloide nailed it",
    quote:
      "We needed a modern, conversion-focused business website, and Geoloide nailed it. The site loads quickly, looks great on mobile, and is easy for us to update. Excellent communication and post-launch support. Highly recommended for custom website design and development.",
  },
  {
    name: "Shaik Arif",
    categories: ["Website Development"],
    headline: "Affordable, transparent, and very responsive team",
    quote:
      "Geoloide delivered a professional website that truly represents our business online. From UI/UX design to SEO-friendly structure and speed optimization, everything was handled perfectly. Affordable, transparent, and very responsive team.",
  },
  {
    name: "Afia",
    categories: ["Website Development"],
    headline: "Best website design agency I've worked with",
    quote:
      "I had a clear vision but no technical knowledge, and Geoloide turned it into a beautiful, user-friendly website. They explained every step, made revisions patiently, and launched on time. Best website design agency I've worked with.",
  },
  {
    name: "Yogendra",
    categories: ["Website Development"],
    headline: "Very satisfied with their web development services",
    quote:
      "Geoloide designed and developed our website with great attention to detail. It's secure, fast-loading, and optimized for Google search. The whole process was smooth, from planning to launch. Very satisfied with their web development services.",
  },
];

export const testimonialCategories: TestimonialCategory[] = [
  "Website Development",
  "Digital Marketing",
  "Software Development",
];

/** Which client stories are most relevant on each service page. */
const serviceCategories: Record<ServiceSlug, TestimonialCategory[]> = {
  "digital-marketing": ["Digital Marketing"],
  "website-and-app-development": ["Website Development", "Software Development"],
  "business-automation": ["Software Development"],
};

export function testimonialsForService(slug: ServiceSlug, limit = 3) {
  const wanted = serviceCategories[slug];
  return testimonials.filter((t) => t.categories.some((c) => wanted.includes(c))).slice(0, limit);
}

export const featuredTestimonials = testimonials.filter((t) => t.featured);

/** Attribution line, e.g. "Founder, Zenyth Media House" or "Easy Pip". */
export function attribution(t: Testimonial) {
  return [t.role, t.company].filter(Boolean).join(", ") || `${t.categories[0]} client`;
}
