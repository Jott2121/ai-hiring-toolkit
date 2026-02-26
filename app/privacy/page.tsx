import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mb-8"
      >
        &larr; Back to home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: February 2026
      </p>

      <div className="space-y-8 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            What We Collect
          </h2>
          <p className="mb-3">
            MeritForge AI collects the following data when you use our tools:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>
              <strong>Resumes and job descriptions</strong> you upload or paste
              into our tools for AI processing.
            </li>
            <li>
              <strong>Email addresses</strong> submitted through our waitlist
              signup form.
            </li>
            <li>
              <strong>Plan preference</strong> (Pro or Team) selected during
              waitlist signup.
            </li>
            <li>
              <strong>Basic usage analytics</strong> such as page views and
              feature usage to improve the product.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            How We Use Your Data
          </h2>
          <p className="mb-3">
            Your data is used solely to provide the services you request:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>
              Resumes and job descriptions are sent to AI APIs for processing
              (scoring, matching, question generation) and are not used for any
              other purpose.
            </li>
            <li>
              Waitlist emails are used only to notify you about product launches
              and early-access availability.
            </li>
            <li>
              We never sell, rent, or share your personal data with third parties
              for marketing purposes.
            </li>
            <li>
              We do not use your resume data or job descriptions to train AI
              models.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Data Retention
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>
              <strong>Resumes and job descriptions</strong> are processed in
              real-time and are not permanently stored on our servers. Data is
              held in memory during processing and discarded after results are
              returned.
            </li>
            <li>
              <strong>Waitlist emails</strong> are retained until you
              unsubscribe or request deletion.
            </li>
            <li>
              <strong>Analytics data</strong> is aggregated and anonymized. No
              personally identifiable information is retained in analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Third-Party Services
          </h2>
          <p className="mb-3">
            We use the following third-party services to operate MeritForge AI:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>
              <strong>Anthropic API</strong> &mdash; Powers our AI features
              (resume scoring, JD generation, interview kit creation, sourcing).
              Data sent to Anthropic is subject to their{" "}
              <a
                href="https://www.anthropic.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                privacy policy
              </a>
              . Anthropic does not train on API inputs.
            </li>
            <li>
              <strong>Vercel</strong> &mdash; Hosts our application and handles
              server-side processing.
            </li>
            <li>
              <strong>Formspree</strong> &mdash; Processes waitlist form
              submissions.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Cookies
          </h2>
          <p className="text-sm text-foreground/80">
            MeritForge AI uses minimal cookies. We do not use advertising or
            tracking cookies. If we implement analytics in the future, we will
            use privacy-respecting, cookieless analytics where possible. No
            third-party advertising cookies are ever placed on our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Your Rights
          </h2>
          <p className="mb-3 text-sm text-foreground/80">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80">
            <li>Request a copy of any personal data we hold about you.</li>
            <li>
              Request deletion of your data (including waitlist email removal).
            </li>
            <li>Opt out of any future communications.</li>
          </ul>
          <p className="mt-3 text-sm text-foreground/80">
            {/* TODO: Replace with Jeff's actual contact email */}
            To exercise any of these rights, email us at{" "}
            <a
              href="mailto:meritforgeai@gmail.com"
              className="text-primary hover:underline"
            >
              meritforgeai@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            GDPR &amp; CCPA Compliance
          </h2>
          <p className="text-sm text-foreground/80">
            We are committed to complying with GDPR and CCPA requirements. We do
            not sell personal information. If you are a resident of the EU or
            California and wish to exercise your data rights, please contact us
            at the email above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Changes to This Policy
          </h2>
          <p className="text-sm text-foreground/80">
            We may update this privacy policy from time to time. Changes will be
            posted on this page with an updated &quot;Last updated&quot; date. Continued
            use of MeritForge AI after changes constitutes acceptance of the
            revised policy.
          </p>
        </section>

        <section className="border-t border-border pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact
          </h2>
          <p className="text-sm text-foreground/80">
            {/* TODO: Replace with Jeff's actual contact email */}
            If you have questions about this privacy policy, contact us at{" "}
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
