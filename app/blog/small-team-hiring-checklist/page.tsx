import Link from "next/link";

export default function SmallTeamHiringChecklistPost() {
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
          Process
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
          The Small Team Hiring Checklist: From Job Post to Offer Letter
        </h1>
        <p className="text-sm text-muted-foreground">
          Published February 2026 &bull; 8 min read
        </p>
      </header>

      {/* Body */}
      <div className="prose-custom space-y-6 text-foreground/90 leading-relaxed">
        <p>
          You&apos;re hiring your first engineer. Or your first salesperson. Maybe your third person overall. You don&apos;t have an HR department. You don&apos;t have a recruiting process. You just have a job opening and no idea how to fill it without messing it up.
        </p>

        <p>
          This checklist walks you through the entire process from job description to offer letter. It&apos;s designed for small teams that can&apos;t afford recruiting firms or dedicated recruiters, but still want to hire thoughtfully and consistently.
        </p>

        {/* ── Phase 1: Before You Post ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Phase 1: Before You Post (1&ndash;2 weeks)
        </h2>

        <p>
          Most teams skip this. Don&apos;t. Clarity here saves weeks of bad applications later.
        </p>

        <h3 className="text-lg font-semibold text-foreground">Define the Role</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Write down what this person will actually do on day 1, week 1, and month 1.
          </li>
          <li>
            Who will they report to? Who will they work closely with?
          </li>
          <li>
            What problem do they solve that you&apos;re currently struggling with?
          </li>
          <li>
            Is this a backfill (replacing someone) or a new role? Does that change the seniority?
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Set the Compensation Range</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Research market rates for your role, location, and company stage (use Levels.fyi, Blind, Salary.com, or recruiting firm reports).
          </li>
          <li>
            Decide on salary, equity, and benefits. Write it down now before you talk to candidates.
          </li>
          <li>
            Include this range in your job posting. Transparency attracts better candidates and saves time.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Pick Your 3&ndash;5 Must-Haves</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            What three skills or experiences are non-negotiable? If someone doesn&apos;t have these, you should pass.
          </li>
          <li>
            Everything else is &quot;nice to have&quot; or &quot;willing to learn.&quot;
          </li>
          <li>
            Example: For a junior backend engineer, maybe it&apos;s (1) Python or Go experience, (2) shipped code to production, (3) willingness to learn your tech stack. That&apos;s it.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Write Your Job Description</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Follow the structure from our JD Writing guide: Hook → What they&apos;ll do → What they&apos;ll need → What you offer → How to apply.
          </li>
          <li>
            Keep it 600&ndash;700 words.
          </li>
          <li>
            Include your comp range.
          </li>
        </ul>

        {/* ── Phase 2: Sourcing ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Phase 2: Sourcing (Ongoing, 2&ndash;3 weeks)
        </h2>

        <p>
          Posting a JD and waiting isn&apos;t enough. You need to actively source candidates.
        </p>

        <h3 className="text-lg font-semibold text-foreground">Free Posting Sites</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            <strong>LinkedIn:</strong> Post under your company page (free tier gets 100 impressions/month). Link to your full job posting on your website.
          </li>
          <li>
            <strong>HackerNews &quot;Who&apos;s Hiring&quot;:</strong> Monthly thread, free, good for technical roles. Post on the day it goes live to get visibility.
          </li>
          <li>
            <strong>Reddit:</strong> r/forhire, r/jobs, industry subreddits. Free but moderated.
          </li>
          <li>
            <strong>Community Slack / Discord:</strong> Post in your industry&apos;s Slack communities, Discord servers, or Google Groups.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Paid Posting Sites</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            <strong>LinkedIn Jobs:</strong> $200&ndash;$500/month per posting. Worth it for critical roles.
          </li>
          <li>
            <strong>AngelList (for startups):</strong> $99&ndash;$500 per posting. Good for early-stage companies.
          </li>
          <li>
            <strong>Blind, levels.fyi, or domain-specific job boards:</strong> $300&ndash;$1,000 per posting. Targeted audiences.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Proactive Outreach</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            <strong>LinkedIn search:</strong> Use Boolean search operators (see our Boolean Search guide) to find candidates who match your must-haves. Send 5&ndash;10 personalized messages per day.
          </li>
          <li>
            <strong>GitHub / Stack Overflow:</strong> For engineers, search by language/project. Leave a comment or send a message.
          </li>
          <li>
            <strong>Employee referrals:</strong> Offer $500&ndash;$2,000 bounty for hires. Ask your team to refer people they know.
          </li>
          <li>
            <strong>Alumni networks:</strong> Post in university alumni groups or industry associations.
          </li>
        </ul>

        {/* ── Phase 3: Screening ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Phase 3: Screening (1&ndash;2 weeks)
        </h2>

        <h3 className="text-lg font-semibold text-foreground">Resume Review in Batches</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Set a dedicated time (e.g., Tuesday &amp; Thursday mornings) to review resumes. Don&apos;t do it one-off throughout the week.
          </li>
          <li>
            Score each resume on your 3&ndash;5 must-haves: Green (has it), Yellow (partial/unclear), Red (doesn&apos;t have it).
          </li>
          <li>
            Interview all Greens and select Yellows. Pass on Reds.
          </li>
          <li>
            Build a spreadsheet to track candidates: Name, role, source, resume score, phone screen date, interview date, offer status.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Phone Screen (15&ndash;20 minutes)</h3>
        <p>
          Goal: Confirm they have the must-haves and are genuinely interested in the role.
        </p>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            <strong>Open:</strong> &quot;Thanks for chatting. Tell me about a project you&apos;re proud of.&quot;
          </li>
          <li>
            <strong>Probe the must-haves:</strong> &quot;You mentioned Python experience. Walk me through the biggest project you built in Python.&quot;
          </li>
          <li>
            <strong>Check motivation:</strong> &quot;Why are you interested in this role?&quot; &quot;What are you looking for in your next position?&quot;
          </li>
          <li>
            <strong>Close:</strong> &quot;We&apos;re still in early screening, but if we move forward, here&apos;s the next step...&quot;
          </li>
          <li>
            <strong>Score:</strong> After the call, rate them: 1 (pass), 2 (maybe, need to see more), 3 (strong, move to interview).
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Scoring Tip</h3>
        <p>
          Use a simple rubric: Must-haves? (0&ndash;5 points) + Communication? (0&ndash;3 points) + Motivation? (0&ndash;2 points). Threshold for interview: 8+ points.
        </p>

        {/* ── Phase 4: Interviewing ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Phase 4: Interviewing (1&ndash;2 weeks)
        </h2>

        <h3 className="text-lg font-semibold text-foreground">Typical Structure: 2&ndash;3 Rounds</h3>

        <h3 className="text-lg font-semibold text-foreground">Round 1: Hiring Manager Screen (45 min)</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Lead by the person they&apos;d report to. Go deeper on work experience.
          </li>
          <li>
            Ask behavioral questions: &quot;Tell me about a time you disagreed with a decision. How did you handle it?&quot;
          </li>
          <li>
            Assess culture fit, communication, and ability to learn.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Round 2: Skills Interview (1 hour)</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Lead by someone on the team who has the skills they need.
          </li>
          <li>
            For engineers: A coding problem or architecture question. For PMs: A case study. For salespeople: A sales roleplay.
          </li>
          <li>
            Focus on problem-solving approach, not perfect answers.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Round 3: Leadership / Team Fit (30 min, optional for junior roles)</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Lead by the CEO or a senior person.
          </li>
          <li>
            Evaluate judgment, ambition, how they think about the company&apos;s mission.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Create a Scorecard for Each Interview</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 text-sm leading-relaxed font-mono">
          <p>
            Interviewer: [Name]<br/>
            Candidate: [Name]<br/>
            <br/>
            Dimension 1: Technical Skills (0&ndash;5)<br/>
            Dimension 2: Communication (0&ndash;5)<br/>
            Dimension 3: Culture Fit (0&ndash;5)<br/>
            <br/>
            Overall: [Score] &mdash; [Strong Hire / Hire / Maybe / Pass]<br/>
            <br/>
            Key feedback: [2&ndash;3 sentences]
          </p>
        </div>

        <h3 className="text-lg font-semibold text-foreground">Debrief</h3>
        <p>
          After all rounds, get the team in a room for 30 minutes. Share scorecards. Discuss. Decide: Strong Hire, Hire, Maybe, or Pass. If there&apos;s disagreement, dig into it. Don&apos;t hire unless you&apos;re at least 80% confident.
        </p>

        {/* ── Phase 5: Closing ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Phase 5: Closing (3&ndash;5 days)
        </h2>

        <h3 className="text-lg font-semibold text-foreground">Reference Checks</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Call 2&ndash;3 references (preferably managers or close collaborators).
          </li>
          <li>
            Ask: &quot;What was your working relationship?&quot; &quot;What are their biggest strengths?&quot; &quot;Any gaps?&quot; &quot;Would you hire them again?&quot;
          </li>
          <li>
            If someone is a strong hire but references are mediocre, dig deeper before moving forward.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Compensation Negotiation</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            You set a range upfront. If they counter, make a decision: match it, split the difference, or hold firm.
          </li>
          <li>
            Negotiate salary, equity, and benefits together (not one at a time).
          </li>
          <li>
            Aim for a mutual &quot;yes.&quot; If you can&apos;t align, pass and move on.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Offer Letter</h3>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            Include: title, start date, base salary, equity details (# of shares, vesting schedule), benefits, reporting structure.
          </li>
          <li>
            Make it a formal document, not an email.
          </li>
          <li>
            Have a lawyer review if you can afford it. Don&apos;t guess on employment law.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Onboarding Plan</h3>
        <p>
          Before they start, write down their first week. Who will they meet? What will they set up? What&apos;s their first task? Send it to them before day 1. It shows you&apos;re organized and makes their transition smoother.
        </p>

        {/* ── Speed Matters ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          One Final Thing: Speed Matters
        </h2>

        <p>
          The best candidates have multiple offers. Move fast. Your entire hiring process should take 2&ndash;3 weeks from first contact to offer, not 2&ndash;3 months. Slow hiring loses good people.
        </p>

        <p>
          Set a schedule upfront and stick to it. Batch your screening and interviews. Make decisions quickly. The better you are at this, the better candidates you&apos;ll attract.
        </p>

        {/* ── CTA ── */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Want a template for this process?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Download the MeritForge Hiring Checklist. It includes resume scorecards, interview questions, scoring rubrics, and a candidate tracking spreadsheet. Designed for small teams.
          </p>
          <Link
            href="/resume-scorer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Try the MeritForge Toolkit &mdash; free →
          </Link>
        </div>
      </div>
    </article>
  );
}
