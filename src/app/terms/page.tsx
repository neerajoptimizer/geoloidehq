import { LegalCompanyDetails } from "@/components/company-info";
import { LegalPage } from "@/components/legal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of geoloide.com, the website of Geoloide Private Limited, including intellectual property, liability and governing law.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms" updated="September 2026">
      <section>
        <p>
          These terms govern your use of {site.url}, operated by {site.legalName}. By using this website you agree to
          these terms.
        </p>

        <h2>About us</h2>
        <p>
          {site.legalName} is a private limited company incorporated in India under the Companies Act, 2013 and
          registered with the Registrar of Companies, Delhi.
        </p>
        <LegalCompanyDetails />

        <h2>Use of the website</h2>
        <p>
          You may use this website for lawful purposes only. You must not attempt to disrupt, damage or gain
          unauthorised access to the website or its underlying systems.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content on this website — including text, graphics, logos and design — is owned by or licensed to{" "}
          {site.legalName} and is protected by applicable intellectual property laws.
        </p>

        <h2>Services</h2>
        <p>
          Information on this website is provided for general purposes. Specific services are governed by the
          proposal, statement of work or agreement signed between you and Geoloide.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          The website is provided &quot;as is&quot;. To the fullest extent permitted by law, Geoloide is not liable
          for any indirect or consequential loss arising from your use of the website.
        </p>

        <h2>Third-party links</h2>
        <p>We are not responsible for the content or practices of third-party websites linked from this site.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India, with courts in New Delhi having exclusive jurisdiction.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
            {site.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
