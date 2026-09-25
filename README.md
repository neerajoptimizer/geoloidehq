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

## Brand

- Green `#1DB954` (`brand-500`), Ink `#231E23` (`ink-900`)
- Logos in `public/`: `logo.png` (light backgrounds), `logo-light.png` (dark backgrounds), `mark.png` (icon)
- Fonts: Outfit (headings), Inter (body)

## Deploy

Deploy to [Vercel](https://vercel.com) or any Node.js host (`npm run build && npm start`).
