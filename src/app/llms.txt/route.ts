import { getAllPosts } from "@/lib/blog";
import { services, site } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt — a concise, machine-readable summary of the site for AI search engines and assistants.
export async function GET() {
  const posts = await getAllPosts();
  const body = `# ${site.legalName}

> ${site.description}

${site.descriptor} · ${site.tagline}

## Services
${services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.short}`).join("\n")}

## Company
- [About](${site.url}/about): Story, mission, values and offices
- [Our Process](${site.url}/process): How projects are delivered
- [Testimonials](${site.url}/testimonials): Client reviews, incl. Easy Pip (fintech website) and Laundry Lounge (laundry management software)
- [Careers](${site.url}/careers): Open roles in Noida and New Delhi
- [Contact](${site.url}/contact): Free consultation and enquiries

## Blog
${posts.map((p) => `- [${p.meta.title}](${site.url}/blog/${p.slug}): ${p.meta.description}`).join("\n")}

## Contact
- Email: ${site.email}
${site.offices.map((o) => `- ${o.label}: ${o.lines.join(", ")}`).join("\n")}
- Hours: ${site.hours}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
