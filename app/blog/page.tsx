import Link from "next/link";

const articles = [
  {
    title: "How to Write a Job Description That Actually Attracts Candidates",
    description:
      "Most JDs read like legal documents. Here\u2019s how to write one that makes people want to apply.",
    tag: "JD Writing",
    href: "#",
    status: "coming-soon" as const,
  },
  {
    title: "Boolean Search Strings for Technical Recruiters (2026 Edition)",
    description:
      "Copy-paste Boolean strings for finding software engineers, data scientists, and product managers on LinkedIn.",
    tag: "Sourcing",
    href: "/blog/boolean-search-strings-2026",
    status: "published" as const,
  },
  {
    title:
      "The Small Team Hiring Checklist: From Job Post to Offer Letter",
    description:
      "A step-by-step checklist for teams making their first few hires without a dedicated recruiter.",
    tag: "Process",
    href: "#",
    status: "coming-soon" as const,
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Hiring Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Guides, templates, and tips for small teams hiring without a
          recruiting department.
        </p>
      </div>

      {/* Article Cards */}
      <div className="grid gap-6">
        {articles.map((article) => (
          <Link
            key={article.title}
            href={article.href}
            className="group block rounded-xl border border-border bg-card p-6 hover:shadow-md hover:border-primary/20 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  {article.tag}
                </span>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              </div>
              {article.status === "coming-soon" ? (
                <span className="shrink-0 mt-1 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  Coming soon
                </span>
              ) : (
                <span className="shrink-0 mt-1 text-xs font-medium text-primary">
                  Read article →
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-sm text-muted-foreground text-center mt-12">
        More articles on the way. Building the tools comes first.
      </p>
    </div>
  );
}
