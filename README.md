# Geoloide — Company Website

Marketing website for **Geoloide Private Limited** — *Get your business globalised.*
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home: hero, stats, services, why us, process, industries, testimonials, CTA |
| `/about` | Story, mission/vision, values, offices with maps |
| `/services` | Overview of all services |
| `/services/digital-marketing` | Digital Marketing Services |
| `/services/website-and-app-development` | Website and Apps Development |
| `/services/business-automation` | Business Simplification and Automation |
| `/process` | Engagement process and FAQ |
| `/careers` | Culture and open roles |
| `/contact` | Contact form (Server Action), details and maps |
| `/privacy-policy`, `/terms` | Legal pages |

Also included: sticky header with services mega-menu and mobile menu, footer, custom 404,
`sitemap.xml`, `robots.txt`, Open Graph metadata and Organization JSON-LD.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Editing content

All company details, navigation, services, stats and testimonials live in
[`src/lib/site.ts`](src/lib/site.ts). Update that file to change copy across the site.

> The stats, testimonials and job openings are placeholder content — replace them with real data before launch.

## Contact form email

The contact form works out of the box and logs enquiries to the server console. To deliver
enquiries by email via [Resend](https://resend.com), set these environment variables:

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=contact@geoloide.com          # optional, defaults to contact@geoloide.com
CONTACT_FROM_EMAIL="Geoloide <noreply@geoloide.com>"  # must be a verified sender domain
```

## SEO

Every page is built for search out of the box:

- **Unique, keyword-targeted titles (≤ 60 chars) and meta descriptions (≤ 160 chars)** via the
  `pageMetadata()` helper in [`src/lib/seo.ts`](src/lib/seo.ts); service SEO copy lives in `services[].seo`.
- **Canonical URLs**, Open Graph and Twitter cards on every page, plus branded, auto-generated
  1200×630 share images (`opengraph-image.tsx` — site-wide and one per service).
- **Structured data (JSON-LD):** Organization, ProfessionalService (both offices, hours), WebSite,
  WebPage/AboutPage/ContactPage/CollectionPage, BreadcrumbList, Service + OfferCatalog, ItemList and FAQPage.
- **Visible breadcrumbs**, one `<h1>` per page, semantic headings, alt text on all images.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `llms.txt` (for AI search), app icons.
- 308 redirects from `geoloide.com` → `www.geoloide.com` and common legacy URLs (`/about-us`, `/contact-us`…),
  security headers, and a 404 page marked `noindex`.
- Fully static pages, `next/font` and `next/image` for strong Core Web Vitals.

### SEO environment variables (optional)

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxx   # Google Search Console HTML-tag verification code
NEXT_PUBLIC_BING_SITE_VERIFICATION=xxxx     # Bing Webmaster Tools verification code
NEXT_PUBLIC_GA_ID=G-XXXXXXX                 # Google Analytics 4 measurement ID
```

### Launch checklist

1. Deploy to `https://www.geoloide.com` and point `geoloide.com` to the same deployment (it redirects to www).
2. Verify the site in **Google Search Console** and **Bing Webmaster Tools**, then submit `https://www.geoloide.com/sitemap.xml`.
3. Create/claim a **Google Business Profile** for both offices using the exact same name, address and email as the site.
4. Keep social profile links in `site.social` in `src/lib/site.ts` up to date (footer icons + schema.org `sameAs`).
5. Replace placeholder stats, testimonials and roles with real data; add case studies and blog content over time.
6. Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

## Images & animations

- **Images** live in `src/assets/images` and are registered with alt text in
  [`src/lib/images.ts`](src/lib/images.ts). They are stock photos (Unsplash licence — free for commercial use,
  no attribution required). To swap one, replace the file (keep the name) or point the entry at a new file.
  Next.js serves them as responsive AVIF/WebP with blur-up placeholders; they are also listed in the image sitemap.
- **Scroll reveal:** add `data-reveal` (optionally `="left" | "right" | "zoom"`) to any element, and
  `style={revealDelay(i)}` from `src/lib/motion.ts` to stagger lists. Content stays in the HTML for SEO and
  is shown immediately if JavaScript is off or the visitor prefers reduced motion.
- Other effects: `CountUp`, `ScrollProgress`, `ScrollLine` (`src/components/motion.tsx`) and `Marquee`
  (`src/components/marquee.tsx`); keyframes are defined in `src/app/globals.css`.

## Brand

- Green `#1DB954` (`brand-500`), Ink `#231E23` (`ink-900`)
- Logos in `public/`: `logo.png` (light backgrounds), `logo-light.png` (dark backgrounds), `mark.png` (icon)
- Fonts: Outfit (headings), Inter (body)

## Deploy

Deploy to [Vercel](https://vercel.com) or any Node.js host (`npm run build && npm start`).
