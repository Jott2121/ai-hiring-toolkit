import Link from "next/link";

export default function BooleanSearchStringsPost() {
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
          Sourcing
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
          Boolean Search Strings for Technical Recruiters (2026 Edition)
        </h1>
        <p className="text-sm text-muted-foreground">
          Published February 2026 &bull; 5 min read
        </p>
      </header>

      {/* Body */}
      <div className="prose-custom space-y-6 text-foreground/90 leading-relaxed">
        <p>
          If you&apos;re sourcing technical candidates on LinkedIn, GitHub, or Stack Overflow, Boolean search strings are the single most powerful tool in your toolkit. They let you combine keywords with operators like <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">AND</code>, <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">OR</code>, and <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">NOT</code> to filter millions of profiles down to exactly the candidates you want.
        </p>

        <p>
          The problem? Writing good Boolean strings is tedious. Most recruiters either copy outdated strings from blog posts, use overly broad queries that return thousands of irrelevant results, or go too narrow and miss great candidates entirely. And every role needs different variants depending on how urgently you need to fill the position and how niche the requirements are.
        </p>

        <p>
          This guide gives you ready-to-copy Boolean strings for three of the most commonly sourced technical roles in 2026. For each role, you get three variants: <strong>broad</strong> (cast a wide net), <strong>targeted</strong> (balanced precision), and <strong>narrow</strong> (highly specific). Copy them directly into LinkedIn Recruiter, GitHub search, or any X-ray search engine.
        </p>

        {/* ── Software Engineer (React/Frontend) ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Software Engineer (React / Frontend)
        </h2>

        <p>
          Frontend engineering is one of the most competitive sourcing categories. These strings are tuned for React-heavy roles but include related frameworks to catch candidates who may have transferable skills.
        </p>

        <h3 className="text-lg font-semibold text-foreground">Broad</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          (&quot;frontend&quot; OR &quot;front-end&quot; OR &quot;front end&quot;) AND (&quot;react&quot; OR &quot;vue&quot; OR &quot;angular&quot;) AND (&quot;senior&quot; OR &quot;lead&quot; OR &quot;staff&quot; OR &quot;principal&quot;)
        </div>

        <h3 className="text-lg font-semibold text-foreground">Targeted</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          (&quot;senior frontend engineer&quot; OR &quot;staff frontend&quot; OR &quot;senior software engineer&quot;) AND &quot;react&quot; AND (&quot;typescript&quot; OR &quot;next.js&quot;) AND (&quot;SaaS&quot; OR &quot;B2B&quot; OR &quot;startup&quot;)
        </div>

        <h3 className="text-lg font-semibold text-foreground">Narrow</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          &quot;senior frontend engineer&quot; AND &quot;react&quot; AND &quot;typescript&quot; AND &quot;AWS&quot; AND (&quot;series A&quot; OR &quot;series B&quot; OR &quot;series C&quot;) NOT &quot;contractor&quot;
        </div>

        {/* ── Data Scientist / ML Engineer ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Data Scientist / ML Engineer
        </h2>

        <p>
          ML and data science titles vary wildly across companies. Some organizations call the same role &quot;Machine Learning Engineer,&quot; &quot;Applied Scientist,&quot; or &quot;Data Scientist II.&quot; These strings account for that variation.
        </p>

        <h3 className="text-lg font-semibold text-foreground">Broad</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          (&quot;data scientist&quot; OR &quot;machine learning engineer&quot; OR &quot;ML engineer&quot; OR &quot;applied scientist&quot;) AND (&quot;python&quot; OR &quot;pytorch&quot; OR &quot;tensorflow&quot;)
        </div>

        <h3 className="text-lg font-semibold text-foreground">Targeted</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          (&quot;senior data scientist&quot; OR &quot;senior ML engineer&quot; OR &quot;staff machine learning&quot;) AND (&quot;pytorch&quot; OR &quot;tensorflow&quot;) AND (&quot;NLP&quot; OR &quot;computer vision&quot; OR &quot;recommendation systems&quot;) AND (&quot;production&quot; OR &quot;deployment&quot; OR &quot;MLOps&quot;)
        </div>

        <h3 className="text-lg font-semibold text-foreground">Narrow</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          (&quot;senior machine learning engineer&quot; OR &quot;staff data scientist&quot;) AND &quot;pytorch&quot; AND &quot;LLM&quot; AND (&quot;fine-tuning&quot; OR &quot;RAG&quot; OR &quot;RLHF&quot;) AND (&quot;startup&quot; OR &quot;series&quot;) NOT &quot;intern&quot;
        </div>

        {/* ── Product Manager ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Product Manager
        </h2>

        <p>
          Product management sourcing is tricky because the title is used across industries with very different meanings. These strings are tuned for technical product managers at software companies.
        </p>

        <h3 className="text-lg font-semibold text-foreground">Broad</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          (&quot;product manager&quot; OR &quot;senior PM&quot; OR &quot;product lead&quot;) AND (&quot;SaaS&quot; OR &quot;software&quot; OR &quot;platform&quot; OR &quot;B2B&quot;) AND (&quot;roadmap&quot; OR &quot;strategy&quot; OR &quot;discovery&quot;)
        </div>

        <h3 className="text-lg font-semibold text-foreground">Targeted</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          (&quot;senior product manager&quot; OR &quot;group PM&quot; OR &quot;principal product manager&quot;) AND (&quot;B2B SaaS&quot; OR &quot;enterprise software&quot;) AND (&quot;0 to 1&quot; OR &quot;zero to one&quot; OR &quot;product-led growth&quot;)
        </div>

        <h3 className="text-lg font-semibold text-foreground">Narrow</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">
          &quot;senior product manager&quot; AND &quot;B2B SaaS&quot; AND (&quot;AI&quot; OR &quot;machine learning&quot; OR &quot;data platform&quot;) AND (&quot;series A&quot; OR &quot;series B&quot;) NOT (&quot;marketing&quot; OR &quot;project manager&quot;)
        </div>

        {/* ── Customization Tips ── */}
        <h2 className="text-2xl font-bold text-foreground pt-4">
          Tips for Customizing These Strings
        </h2>

        <p>
          These strings are starting points. To get the best results for your specific role, try these modifications:
        </p>

        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>
            <strong>Add location modifiers:</strong> Append <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">AND (&quot;San Francisco&quot; OR &quot;Bay Area&quot; OR &quot;remote&quot;)</code> to target specific geographies.
          </li>
          <li>
            <strong>Filter by company size:</strong> Use terms like <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">&quot;series A&quot;</code>, <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">&quot;enterprise&quot;</code>, or <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">&quot;Fortune 500&quot;</code> to match your company stage.
          </li>
          <li>
            <strong>Add industry terms:</strong> Include <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">&quot;fintech&quot;</code>, <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">&quot;healthtech&quot;</code>, or <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">&quot;defense&quot;</code> to find candidates with relevant domain experience.
          </li>
          <li>
            <strong>Use NOT to exclude noise:</strong> Common exclusions include <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">NOT (&quot;intern&quot; OR &quot;junior&quot; OR &quot;contractor&quot;)</code> for senior roles.
          </li>
          <li>
            <strong>Combine with X-ray search:</strong> Prefix any string with <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono">site:linkedin.com/in</code> in Google to search LinkedIn profiles without Recruiter access.
          </li>
        </ul>

        <p>
          The key is to start broad, evaluate the first page of results, then tighten or loosen your string based on what you see. If you&apos;re getting too many irrelevant results, move to the targeted variant. If you&apos;re not seeing enough candidates, go broader or remove a filter.
        </p>

        {/* ── CTA ── */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Want AI to generate these for you?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            The MeritForge Sourcing Assistant creates custom Boolean strings, outreach templates, and sourcing strategies from any job description. Paste your JD and get results in seconds.
          </p>
          <Link
            href="/sourcing"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Try the Sourcing Assistant &mdash; free for your first 3 searches →
          </Link>
        </div>
      </div>
    </article>
  );
}
