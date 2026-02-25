import Link from "next/link";

const features = [
  {
    title: "Resume Scoring Engine",
    description:
      "Upload a job description and resumes to instantly receive candidate fit scores, strengths, risks, and tailored interview questions.",
    href: "/resume-scorer",
    cta: "Score Resumes",
  },
  {
    title: "Smart JD Builder",
    description:
      "Paste rough hiring notes and get a polished job description, LinkedIn post, candidate summary, and boolean search string.",
    href: "/jd-builder",
    cta: "Build a JD",
  },
  {
    title: "Interview Kit Generator",
    description:
      "Generate behavioral questions, technical prompts, evaluation scorecards, and interviewer prep notes for any role.",
    href: "/interview-kit",
    cta: "Create Interview Kit",
  },
  {
    title: "Sourcing Assistant",
    description:
      "Generate Boolean search strings, build sourcing strategies, craft personalized outreach messages, and analyze public profiles.",
    href: "/sourcing",
    cta: "Start Sourcing",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          Screen resumes and prepare interviews
          <br />
          <span className="text-primary">in minutes, not hours.</span>
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          Your AI recruiting assistant. Upload a job description and resumes to
          get structured candidate evaluations and interview preparation
          materials instantly.
        </p>
        <div className="mt-8">
          <Link
            href="/resume-scorer"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {feature.description}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">
              {feature.cta} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
