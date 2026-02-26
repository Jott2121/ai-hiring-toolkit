import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mb-8"
      >
        &larr; Back to home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: February 2026
      </p>

      <div className="space-y-8 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Service Description
          </h2>
          <p className="text-sm text-foreground/80">
            MeritForge AI provides AI-powered hiring tools including resume
            scoring, job description generation, interview kit creation, and
            candidate sourcing assistance. These tools are designed to help small
            teams make better hiring decisions more efficiently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Acceptable Use
          </h2>
          <p className="mb-3 text-sm text-foreground/80">
            By using MeritForge AI, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>
              Only upload resumes and candidate data for which you have
              authorization or consent to process.
            </li>
            <li>
              Not use the tools for discriminatory hiring practices based on
              race, gender, age, religion, disability, sexual orientation,
              national origin, or any other protected characteristic.
            </li>
            <li>
              Comply with all applicable employment laws and regulations in your
              jurisdiction, including EEOC guidelines, GDPR, and CCPA.
            </li>
            <li>
              Not attempt to reverse-engineer, scrape, or extract the underlying
              AI models or prompts.
            </li>
            <li>
              Not use the service to generate spam, misleading job postings, or
              fraudulent outreach.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            AI Output Disclaimer
          </h2>
          <p className="text-sm text-foreground/80 mb-3">
            <strong>
              MeritForge AI outputs are suggestions, not hiring decisions.
            </strong>{" "}
            All AI-generated scores, rankings, questions, and recommendations
            are intended to assist human decision-makers, not replace them.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>
              Fit scores are AI-generated estimates and should be used as one
              data point among many in your evaluation process.
            </li>
            <li>
              You are responsible for reviewing all AI outputs before acting on
              them.
            </li>
            <li>
              Final hiring decisions must always involve human judgment and
              review.
            </li>
            <li>
              AI-generated Boolean search strings and outreach templates should
              be reviewed and customized before use.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Your Content
          </h2>
          <p className="text-sm text-foreground/80">
            You retain ownership of all content you upload to MeritForge AI,
            including resumes, job descriptions, and any other materials. We do
            not claim ownership of your content. We process your content solely
            to provide the requested services and do not use it to train AI
            models or for any purpose beyond delivering results to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Free Tier &amp; Paid Plans
          </h2>
          <p className="text-sm text-foreground/80">
            MeritForge AI offers a free tier with limited usage and paid plans
            with expanded features. Free tier limits may change over time. Paid
            plan pricing and features are as displayed at the time of purchase.
            We reserve the right to modify pricing for future billing periods
            with 30 days&apos; notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Limitation of Liability
          </h2>
          <p className="text-sm text-foreground/80 mb-3">
            MeritForge AI is provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, either express or implied.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>
              We are not liable for any hiring decisions made based on AI
              outputs.
            </li>
            <li>
              We are not liable for any indirect, incidental, special, or
              consequential damages arising from your use of the service.
            </li>
            <li>
              Our total liability for any claims related to the service shall not
              exceed the amount you paid us in the 12 months preceding the
              claim, or $100, whichever is greater.
            </li>
            <li>
              We do not guarantee the accuracy, completeness, or reliability of
              AI-generated content.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Service Availability
          </h2>
          <p className="text-sm text-foreground/80">
            We strive to maintain high availability but do not guarantee
            uninterrupted service. MeritForge AI depends on third-party services
            (including AI APIs and hosting providers) that may experience
            downtime. We are not liable for service interruptions caused by
            third-party outages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Changes to These Terms
          </h2>
          <p className="text-sm text-foreground/80">
            We may update these terms from time to time. Changes will be posted
            on this page with an updated &quot;Last updated&quot; date. Continued use of
            MeritForge AI after changes are posted constitutes acceptance of the
            revised terms. For material changes, we will make reasonable efforts
            to notify users via email or in-app notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Termination
          </h2>
          <p className="text-sm text-foreground/80">
            We reserve the right to suspend or terminate access to MeritForge AI
            for violations of these terms. You may stop using the service at any
            time. Upon termination, your right to use the service ceases
            immediately.
          </p>
        </section>

        <section className="border-t border-border pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact
          </h2>
          <p className="text-sm text-foreground/80">
            {/* TODO: Replace with Jeff's actual contact email */}
            If you have questions about these terms, contact us at{" "}
            <a
              href="mailto:meritforgeai@gmail.com"
              className="text-primary hover:underline"
            >
              meritforgeai@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
