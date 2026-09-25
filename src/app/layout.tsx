import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RevealObserver } from "@/components/motion";
import { JsonLd } from "@/components/seo";
import { WhatsAppFloat } from "@/components/whatsapp";
import { absoluteUrl, ORG_ID, WEBSITE_ID } from "@/lib/seo";
import { services, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | Digital Marketing, Web & Automation`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Business Services",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.legalName,
    url: "/",
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#1db954",
  colorScheme: "light",
};

const offices = [
  {
    id: "registered-office",
    mapQuery: site.offices[0].mapQuery,
    name: `${site.legalName} — Registered Office`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 10, Plot No. 18-20, HT House, KG Marg, Connaught Place",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
  },
  {
    id: "operations-office",
    mapQuery: site.offices[1].mapQuery,
    name: `${site.legalName} — Operations Office`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C 266, near Hindi Khabar, C Block",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.legalName,
      legalName: site.legalName,
      alternateName: site.name,
      url: site.url,
      foundingDate: site.company.incorporated,
      taxID: site.company.gstin,
      identifier: [
        { "@type": "PropertyValue", propertyID: "CIN", value: site.company.cin },
        { "@type": "PropertyValue", propertyID: "GSTIN", value: site.company.gstin },
      ],
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 1057, height: 336 },
      image: absoluteUrl("/opengraph-image"),
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      telephone: site.whatsapp.display,
      foundingLocation: site.foundingLocation,
      address: offices[0].address,
      areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
      knowsAbout: services.flatMap((s) => [s.title, ...s.offerings.map((o) => o.title)]),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.whatsapp.display,
        availableLanguage: ["English", "Hindi"],
        areaServed: "Worldwide",
      },
      department: offices.map((o) => ({ "@id": `${site.url}/#${o.id}` })),
      sameAs: [...site.social.map((s) => s.href), site.google.knowledgeGraphUrl],
    },
    ...offices.map((o) => ({
      "@type": "ProfessionalService",
      "@id": `${site.url}/#${o.id}`,
      name: o.name,
      url: site.url,
      image: absoluteUrl("/logo.png"),
      email: site.email,
      telephone: site.whatsapp.display,
      address: o.address,
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
      parentOrganization: { "@id": ORG_ID },
    })),
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: site.url,
      name: site.legalName,
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs; falls back to fully visible content if it never boots. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3000)",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-brand-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={structuredData} />
        <RevealObserver />
        <div id="google_translate_element" hidden />
        <Analytics />
      </body>
    </html>
  );
}
