import { LegalCompanyDetails } from "@/components/company-info";
import { LegalPage } from "@/components/legal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Geoloide Private Limited collects, uses and protects personal information submitted through geoloide.com, and your rights under Indian data protection law.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="September 2026">
      <section>
        <p>
          {site.legalName} (&quot;Geoloide&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy. This policy
          explains what information we collect through {site.url}, how we use it and the choices you have.
        </p>

        <h2>Who we are</h2>
        <p>
          This website is operated by {site.legalName}, which is the Data Fiduciary responsible for your personal data
          under the Digital Personal Data Protection Act, 2023.
        </p>
        <LegalCompanyDetails />

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information you provide</strong> — such as your name, email, phone number, company and message
            when you submit our contact form or apply for a job.
          </li>
          <li>
            <strong>Usage data</strong> — such as pages visited, browser type and approximate location, collected
            through cookies and analytics tools.
          </li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To respond to enquiries and provide our services.</li>
          <li>To improve our website, content and user experience.</li>
          <li>To send relevant updates, where you have agreed to receive them.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. We may share it with trusted service providers (for example,
          hosting, email and analytics providers) who process data on our behalf under confidentiality obligations,
          or where required by law.
        </p>

        <h2>Data retention & security</h2>
        <p>
          We keep personal information only as long as necessary for the purposes above and use reasonable technical
          and organisational measures to protect it.
        </p>

        <h2>Your rights</h2>
        <p>
          Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you may request access
          to, correction of or deletion of your personal data, and withdraw consent at any time.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions or requests, email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
            {site.email}
          </a>{" "}
          or write to us at {site.legalName}, {site.offices[0].lines.join(", ")} (CIN: {site.company.cin}).
        </p>
      </section>
    </LegalPage>
  );
}
