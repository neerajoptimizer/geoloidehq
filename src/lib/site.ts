export const site = {
  name: "Geoloide",
  legalName: "Geoloide Private Limited",
  tagline: "Get your business globalised.",
  descriptor: "Management Partner Solutions",
  description:
    "Geoloide Private Limited is a management partner for growing businesses — delivering digital marketing, website & app development, and business simplification & automation that take brands global.",
  url: "https://www.geoloide.com",
  email: "contact@geoloide.com",
  whatsapp: {
    /** International format without "+" or spaces, as required by wa.me links. */
    number: "919301278780",
    display: "+91 93012 78780",
    message: "Hi Geoloide! I'd like to discuss a project.",
  },
  foundingLocation: "New Delhi, India",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
  // Official social profiles — shown in the footer and output as schema.org sameAs.
  social: [
    { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/geoloide" },
    { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/geoloidehq/" },
    { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/p/Geoloide-Pvt-Ltd-61552338420812/" },
  ],
  areaServed: ["India", "United States", "United Kingdom", "United Arab Emirates", "Australia", "Canada", "Singapore"],
  offices: [
    {
      label: "Registered Office",
      lines: ["Level 10, Plot No. 18-20, HT House", "KG Marg, New Delhi", "Delhi 110001"],
      mapQuery: "HT House, 18-20 KG Marg, New Delhi 110001",
    },
    {
      label: "Operations Office",
      lines: ["C 266, near Hindi Khabar", "C Block, Noida", "Uttar Pradesh 201301"],
      mapQuery: "C 266, C Block, near Hindi Khabar, Noida, Uttar Pradesh 201301",
    },
  ],
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export type ServiceSlug =
  | "digital-marketing"
  | "website-and-app-development"
  | "business-automation";

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  headline: string;
  intro: string;
  icon: "megaphone" | "code" | "workflow";
  seo: { title: string; description: string; keywords: string[] };
  offerings: { title: string; body: string }[];
  outcomes: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing Services",
    short:
      "Data-driven SEO, performance ads, social and content programmes that turn attention into measurable revenue.",
    headline: "Be found, be chosen, grow across borders.",
    intro:
      "We build full-funnel marketing engines — from search visibility to paid acquisition and retention — so every rupee you spend is tracked, optimised and tied to pipeline.",
    icon: "megaphone",
    seo: {
      title: "Digital Marketing Agency in Delhi NCR – SEO & Ads",
      description:
        "Results-driven digital marketing agency in Delhi & Noida. SEO, Google Ads, Meta ads, social media and content marketing that grow leads and revenue globally.",
      keywords: [
        "digital marketing agency in Delhi",
        "digital marketing company in Noida",
        "SEO services in Delhi NCR",
        "PPC management",
        "Google Ads agency",
        "social media marketing agency",
        "performance marketing",
        "international SEO",
      ],
    },
    offerings: [
      {
        title: "Search Engine Optimisation",
        body: "Technical audits, on-page optimisation, local & international SEO and authority building that compound month on month.",
      },
      {
        title: "Performance Marketing",
        body: "Google, Meta and LinkedIn campaigns engineered around CAC and ROAS, with rigorous testing and weekly optimisation.",
      },
      {
        title: "Social Media Management",
        body: "Channel strategy, content calendars, creative production and community management that build a loyal audience.",
      },
      {
        title: "Content & Brand Strategy",
        body: "Positioning, messaging and content that speaks to buyers in every market you want to win.",
      },
      {
        title: "Email & Marketing Automation",
        body: "Lifecycle journeys, lead nurturing and CRM integration that convert leads while you sleep.",
      },
      {
        title: "Analytics & Reporting",
        body: "GA4, tag management and live dashboards that show exactly what is working and what to do next.",
      },
    ],
    outcomes: [
      "Higher organic visibility in domestic and global markets",
      "Lower cost per acquisition with transparent attribution",
      "Consistent brand voice across every channel",
      "Monthly insight reports with clear next actions",
    ],
    stack: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "Search Console", "SEMrush", "HubSpot", "Mailchimp"],
    faqs: [
      {
        q: "How soon will I see results?",
        a: "Paid campaigns typically deliver qualified leads within the first 2–4 weeks. SEO is a compounding investment — most clients see meaningful movement in 3–6 months.",
      },
      {
        q: "Do you work with international markets?",
        a: "Yes. We plan and run multi-country, multi-language campaigns and local SEO for businesses expanding beyond India.",
      },
      {
        q: "Will I own my ad accounts and data?",
        a: "Always. Accounts, pixels, analytics and creative assets are set up in your name and remain yours.",
      },
    ],
  },
  {
    slug: "website-and-app-development",
    title: "Website and Apps Development",
    short:
      "High-performance websites, e-commerce stores and mobile apps designed to convert and built to scale.",
    headline: "Digital products that look sharp and work harder.",
    intro:
      "From brand websites to complex web platforms and native-quality mobile apps, our design and engineering team ships fast, secure, accessible products that your customers love to use.",
    icon: "code",
    seo: {
      title: "Website & App Development Company in Delhi NCR",
      description:
        "Custom website, e-commerce and mobile app development in Delhi & Noida. Fast, SEO-ready Next.js, React Native and Flutter builds that convert visitors.",
      keywords: [
        "website development company in Delhi",
        "web development company in Noida",
        "mobile app development company",
        "e-commerce website development",
        "Next.js development",
        "React Native app development",
        "Flutter app development",
        "UI UX design agency",
      ],
    },
    offerings: [
      {
        title: "Corporate & Brand Websites",
        body: "Conversion-focused websites with modern design, lightning-fast load times and a CMS your team can manage.",
      },
      {
        title: "E-commerce Development",
        body: "Shopify, WooCommerce and headless storefronts with secure payments, inventory sync and multi-currency support.",
      },
      {
        title: "Mobile App Development",
        body: "Cross-platform iOS and Android apps built with React Native and Flutter — one codebase, native performance.",
      },
      {
        title: "Web Applications & Portals",
        body: "Custom dashboards, customer portals and SaaS products engineered on proven, scalable architectures.",
      },
      {
        title: "UI/UX Design",
        body: "Research-led product design, wireframes, prototypes and design systems that keep experiences consistent.",
      },
      {
        title: "Maintenance & Support",
        body: "Hosting, monitoring, security patches and continuous improvement under clear SLAs.",
      },
    ],
    outcomes: [
      "Sub-second page loads and strong Core Web Vitals",
      "SEO-ready, accessible and mobile-first builds",
      "Secure, scalable cloud infrastructure",
      "A product your team can update without developers",
    ],
    stack: ["Next.js", "React", "Node.js", "React Native", "Flutter", "Shopify", "WordPress", "AWS"],
    faqs: [
      {
        q: "How long does a website take?",
        a: "A typical business website takes 3–6 weeks from kickoff to launch. Larger platforms and apps are planned in phased milestones.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes. We audit what you have, preserve your SEO equity and migrate content carefully to a faster, modern build.",
      },
      {
        q: "Do you provide support after launch?",
        a: "We offer monthly care plans covering hosting, updates, backups, security monitoring and new feature work.",
      },
    ],
  },
  {
    slug: "business-automation",
    title: "Business Simplification and Automation",
    short:
      "Streamline operations with process redesign, CRM/ERP integration and automation that removes busywork.",
    headline: "Less manual work. More momentum.",
    intro:
      "We map how your business actually runs, remove friction and automate repetitive tasks — connecting your tools so information flows and your people focus on work that matters.",
    icon: "workflow",
    seo: {
      title: "Business Process Automation & CRM Services",
      description:
        "Simplify and automate your business with process redesign, Zoho/HubSpot CRM, ERP integration, AI assistants and BI dashboards. Save hours every week.",
      keywords: [
        "business process automation services",
        "workflow automation company India",
        "CRM implementation services",
        "Zoho consultant Delhi",
        "HubSpot implementation partner",
        "ERP integration",
        "AI chatbot development",
        "Power BI dashboard services",
      ],
    },
    offerings: [
      {
        title: "Process Mapping & Redesign",
        body: "We document current workflows, identify bottlenecks and design leaner processes with clear ownership.",
      },
      {
        title: "Workflow Automation",
        body: "Automate approvals, onboarding, invoicing and reporting with tools like Zapier, Make, n8n and Power Automate.",
      },
      {
        title: "CRM & ERP Implementation",
        body: "Zoho, HubSpot, Salesforce and Odoo set up, customised and integrated around how your team sells and operates.",
      },
      {
        title: "AI-Powered Assistants",
        body: "Chatbots, document processing and AI agents that answer queries and handle routine tasks 24/7.",
      },
      {
        title: "Dashboards & Business Intelligence",
        body: "Unified reporting in Power BI or Looker Studio so leadership gets real-time visibility across the business.",
      },
      {
        title: "Systems Integration",
        body: "APIs and connectors that link accounting, sales, HR and operations tools into one reliable system.",
      },
    ],
    outcomes: [
      "Hours saved every week on repetitive tasks",
      "Fewer errors and cleaner, trusted data",
      "Faster response times for customers",
      "Operations that scale without adding headcount",
    ],
    stack: ["Zoho", "HubSpot", "Salesforce", "Odoo", "Zapier", "Make", "n8n", "Power BI"],
    faqs: [
      {
        q: "Where do we start?",
        a: "With a discovery workshop. We map your key processes, estimate time savings and prioritise quick wins before larger changes.",
      },
      {
        q: "Will automation work with our existing tools?",
        a: "In most cases, yes. We integrate with the software you already use and only recommend new tools when there is a clear return.",
      },
      {
        q: "Do you train our team?",
        a: "Every engagement includes documentation and hands-on training so your team is confident running the new systems.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const stats = [
  { value: "150+", label: "Projects delivered" },
  { value: "12+", label: "Countries served" },
  { value: "40%", label: "Avg. efficiency gain" },
  { value: "98%", label: "Client retention" },
];

export const processSteps = [
  {
    title: "Discover",
    body: "We learn your business, goals, customers and competitors through workshops and audits.",
  },
  {
    title: "Strategise",
    body: "A clear roadmap with priorities, timelines, KPIs and a transparent budget.",
  },
  {
    title: "Build & Launch",
    body: "Agile sprints, weekly demos and rigorous QA — shipped on time, without surprises.",
  },
  {
    title: "Grow & Optimise",
    body: "Continuous measurement and improvement so results keep compounding.",
  },
];

export const industries = [
  { name: "Manufacturing & Export", icon: "factory", body: "B2B websites and global lead generation for exporters." },
  { name: "Retail & E-commerce", icon: "shopping", body: "Online stores, performance ads and marketplace growth." },
  { name: "Healthcare", icon: "health", body: "Patient-friendly websites and appointment booking." },
  { name: "Education", icon: "education", body: "Admissions campaigns, portals and student engagement." },
  { name: "Real Estate", icon: "realestate", body: "Lead-focused property listings and ad campaigns." },
  { name: "Logistics", icon: "logistics", body: "Tracking, automation and operations dashboards." },
  { name: "Professional Services", icon: "professional", body: "Authority websites and steady client acquisition." },
  { name: "Hospitality", icon: "hospitality", body: "Direct bookings and social-first marketing." },
] as const;

export const homeFaqs = [
  {
    q: "What does Geoloide do?",
    a: "Geoloide Private Limited is a management partner solutions company based in New Delhi and Noida. We help businesses grow through digital marketing, website and mobile app development, and business simplification and automation.",
  },
  {
    q: "Is Geoloide a digital marketing agency in Delhi NCR?",
    a: "Yes. Our registered office is at HT House, KG Marg, New Delhi and our operations team works from Noida. We serve clients across Delhi NCR, India and international markets.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Absolutely. Helping businesses go global is our specialty — we run international SEO and ad campaigns, build multi-currency e-commerce and work across time zones.",
  },
  {
    q: "How much does a website or marketing engagement cost?",
    a: "Every business is different, so we share a transparent, itemised proposal after a free consultation. We offer fixed-price projects and flexible monthly retainers.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute consultation through our contact page or email contact@geoloide.com. We will review your goals and recommend a practical plan.",
  },
];

/** WhatsApp click-to-chat link with a pre-filled message. */
export function whatsappUrl(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
