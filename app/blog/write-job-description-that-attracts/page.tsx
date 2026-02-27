import Link from "next/link";

export default function WriteJobDescriptionPost() {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mb-8"
      >
        ← Back to Hiring Resources
      </Link>

      {/* Header */}
      <header className="mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          JD Writing
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
          How to Write a Job Description That Actually Attracts Candidates
        </h1>
        <p className="text-sm text-muted-foreground">
          Published February 2026 &bull; 6 min read
        </p>
      </header>

      {/* Body */}
      <div className="prose-custom space-y-6 text-foreground/90 leading-relaxed">
        <p>
          Your job description is the first impression candidates have of your company. Yet most JDs read like legal documents written by a committee of lawyers and HR managers. They&apos;re bloated with jargon, demand fifteen requirements, and bury the actually interesting stuff so deep that candidates stop reading.
        </p>

        <p>
          Then you scratch your head wondering why you&apos;re only getting a handful of mediocre applications.
        </p>

        <p>
          The problem isn&apos;t that you need a longer JD. It&apos;s that you&apos;re writing for HR instead of writing for candidates. Here&apos;s how to fix it.
        </p>

        {/* ── Why Most JDs Fail ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Why Most Job Descriptions Fail
        </h2>

        <p>
          Before we talk about what works, let&apos;s be honest about what&apos;s broken:
        </p>

        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            <strong>They read like legal documents.</strong> Wall of text, no breathing room, fifteen different sections that could be condensed into three.
          </li>
          <li>
            <strong>They list 20 requirements when you only care about 3&ndash;5.</strong> Strong candidates skip over JDs where they can&apos;t find &quot;must have&quot; from &quot;nice to have.&quot;
          </li>
          <li>
            <strong>They bury the good stuff.</strong> The interesting parts of your role &mdash; the mission, the team, the impact &mdash; get lost in a sea of corporate jargon and checkbox requirements.
          </li>
          <li>
            <strong>They talk about the job, not about the candidate.</strong> You focus on what the role requires instead of what the role offers.
          </li>
          <li>
            <strong>They&apos;re too long.</strong> The sweet spot is 600&ndash;700 words. After that, you&apos;re losing candidates.
          </li>
        </ul>

        {/* ── The Fix: Lead with What They Get ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          The Fix: Lead with What Your Candidate Gets
        </h2>

        <p>
          Great job descriptions flip the script. Instead of starting with &quot;We need someone who...&quot; they start with &quot;Here&apos;s what you&apos;ll build / learn / own.&quot;
        </p>

        <p>
          This isn&apos;t marketing spin. It&apos;s clarity. A strong candidate doesn&apos;t want to hear your laundry list of requirements. They want to know: What will I actually do? What will I learn? Who will I work with? How much will I grow?
        </p>

        {/* ── The Structure That Works ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          The Structure That Works
        </h2>

        <p>
          Follow this five-part structure and you&apos;ll cut your word count in half while attracting better candidates:
        </p>

        <h3 className="text-lg font-semibold text-foreground">1. Hook (1&ndash;2 sentences)</h3>
        <p>
          Lead with the role&apos;s core mission and impact. What will this person own or build? Why does it matter?
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-3 text-sm leading-relaxed">
          <p className="font-mono text-foreground">
            We&apos;re looking for a Senior Backend Engineer to design and scale the payment systems that power our platform. You&apos;ll own our transaction pipeline from end to end&mdash;architecture, reliability, and growth.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-foreground">2. What You&apos;ll Do (3&ndash;4 bullet points)</h3>
        <p>
          List the actual day-to-day work. Skip the jargon. Be specific and honest about what the role entails.
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-3 text-sm leading-relaxed">
          <p className="font-mono text-foreground">
            &bull; Design and maintain our payment processing pipeline (Go, PostgreSQL, Kafka)<br/>
            &bull; Collaborate with product and infra teams to scale systems handling millions of transactions per day<br/>
            &bull; Mentor junior engineers and conduct code reviews<br/>
            &bull; Diagnose and fix production issues in a 24/7 environment
          </p>
        </div>

        <h3 className="text-lg font-semibold text-foreground">3. What You&apos;ll Need (3&ndash;5 core requirements)</h3>
        <p>
          This is where candidates decide if they&apos;re a fit. Be ruthless about what you actually need. If you don&apos;t care about the skill, don&apos;t list it.
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-3 text-sm leading-relaxed">
          <p className="font-mono text-foreground">
            &bull; 5+ years backend software engineering experience<br/>
            &bull; Strong systems design and database fundamentals<br/>
            &bull; Experience with at least one statically-typed language (Go, Java, Rust)<br/>
            &bull; You&apos;ve debugged production incidents and learned from them
          </p>
        </div>

        <h3 className="text-lg font-semibold text-foreground">4. What We Offer (benefits + culture + growth)</h3>
        <p>
          This is your chance to sell. What makes your company different? What will the candidate learn? What&apos;s the comp/benefits? Be specific.
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-3 text-sm leading-relaxed">
          <p className="font-mono text-foreground">
            &bull; $250k&ndash;$320k salary + equity, health/dental/401k<br/>
            &bull; Work with cutting-edge payment infrastructure (you&apos;ll ship real systems that matter)<br/>
            &bull; Fully remote, flexible hours<br/>
            &bull; Learning budget + conference support
          </p>
        </div>

        <h3 className="text-lg font-semibold text-foreground">5. How to Apply</h3>
        <p>
          Keep it simple. One sentence with your CTA.
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-3 text-sm leading-relaxed">
          <p className="font-mono text-foreground">
            Interested? Send us a short note about a backend system you&apos;re proud of and we&apos;ll take it from there.
          </p>
        </div>

        {/* ── Before and After Example ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Before and After: Software Engineer Example
        </h2>

        <h3 className="text-lg font-semibold text-foreground">The Bad JD (What Not To Do)</h3>
        <div className="bg-red-50 rounded-lg px-4 py-3 text-sm leading-relaxed border border-red-200">
          <p className="font-semibold text-red-900 mb-2">Senior Software Engineer</p>
          <p className="text-red-900 mb-2">
            Company Overview: We are a rapidly growing B2B SaaS platform serving the enterprise market. Founded in 2020, we have raised Series B funding and are expanding our engineering team to support our ambitious roadmap.
          </p>
          <p className="text-red-900 mb-2">
            Responsibilities: Design and implement software solutions. Participate in code reviews. Debug production systems. Mentor junior team members. Contribute to architectural discussions. Maintain code quality and best practices. Participate in on-call rotation. Collaborate with cross-functional teams including product, design, and operations.
          </p>
          <p className="text-red-900 mb-2">
            Requirements: Bachelor&apos;s degree in Computer Science or related field. 5+ years software engineering experience. Proficiency in Python, Java, or Go. Strong knowledge of relational and non-relational databases. Experience with microservices architecture. Understanding of RESTful APIs. AWS or GCP experience. Experience with Docker and Kubernetes. Git version control. Experience with CI/CD pipelines. Agile/Scrum methodology. Problem-solving skills. Communication skills. Team player. Passion for technology. Willingness to learn new technologies.
          </p>
          <p className="text-red-900">
            Bonus: Experience with machine learning. Experience with GraphQL. Experience with serverless architecture. Open source contributions.
          </p>
        </div>

        <p className="text-sm text-red-700 font-semibold mt-2">
          What&apos;s wrong: Wall of text, 15+ requirements listed equally, drowns in jargon, doesn&apos;t tell you what the person will actually do or why it matters.
        </p>

        <h3 className="text-lg font-semibold text-foreground mt-6">The Good JD (What To Do)</h3>
        <div className="bg-green-50 rounded-lg px-4 py-3 text-sm leading-relaxed border border-green-200">
          <p className="font-semibold text-green-900 mb-2">Senior Software Engineer</p>
          <p className="text-green-900 mb-2">
            Build the data infrastructure that powers our core product. We process billions of customer transactions daily, and our platform needs to be fast, reliable, and scalable. You&apos;ll own the entire data pipeline&mdash;from collection to storage to retrieval&mdash;and work with our product team to unlock new analytics capabilities.
          </p>
          <p className="text-green-900 mb-2">
            <strong>What you&apos;ll do:</strong>
          </p>
          <p className="text-green-900 mb-2">
            &bull; Design and maintain our data processing systems (Python, PostgreSQL, Kafka)<br/>
            &bull; Optimize query performance and debug production data pipelines<br/>
            &bull; Mentor 2&ndash;3 junior engineers and lead design reviews<br/>
            &bull; Ship 2&ndash;3 major features per quarter
          </p>
          <p className="text-green-900 mb-2">
            <strong>What we need:</strong>
          </p>
          <p className="text-green-900 mb-2">
            &bull; 5+ years building backend systems at scale<br/>
            &bull; Strong database and systems design fundamentals<br/>
            &bull; Deep experience with Python or Go<br/>
            &bull; Comfort in a 24/7 on-call environment
          </p>
          <p className="text-green-900">
            <strong>What we offer:</strong> $220k&ndash;$300k + equity, health/dental/401k, fully remote, learning budget.
          </p>
        </div>

        <p className="text-sm text-green-700 font-semibold mt-2">
          What&apos;s right: Clear mission upfront, 4 concrete responsibilities, 4 essential requirements, concrete comp and benefits, 600 words.
        </p>

        {/* ── Final Tips ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Three Final Tips
        </h2>

        <p>
          <strong>1. Write for your actual candidate, not HR.</strong> If you&apos;re hiring a backend engineer, imagine one of your best current engineers reading it. Would they find it compelling? Would they think it&apos;s a good fit? If not, rewrite.
        </p>

        <p>
          <strong>2. Keep it under 700 words.</strong> Long JDs get skimmed. If you need more than that to explain the role, you probably need to cut something.
        </p>

        <p>
          <strong>3. Be honest about what the role actually is.</strong> If there&apos;s on-call, say so. If there&apos;s heavy mentoring, say so. If the team is dysfunctional, fix that instead of hiding it in a JD. Transparency attracts better candidates.
        </p>

        {/* ── CTA ── */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Need help writing your JD?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            The MeritForge JD Builder uses AI to transform your role description into a compelling, candidate-friendly job posting. Paste a rough outline and get a polished JD in minutes.
          </p>
          <Link
            href="/jd-builder"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Try the JD Builder &mdash; free for your first 3 JDs →
          </Link>
        </div>
      </div>
    </article>
  );
}
