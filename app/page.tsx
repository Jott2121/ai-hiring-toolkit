"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileSearch,
  FileText,
  MessageSquare,
  Search,
  ArrowRight,
  Play,
  Check,
  Shield,
  Zap,
  Clock,
  Users,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// ─── Animation Variants ──────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Data ────────────────────────────────────────────────

const features = [
  {
    icon: FileSearch,
    title: "Resume Scoring Engine",
    description:
      "Upload resumes and get instant fit scores, strengths, risks, and tailored interview questions. Batch-process 50+ candidates in one click.",
    href: "/resume-scorer",
    cta: "Score Resumes",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: FileText,
    title: "Smart JD Builder",
    description:
      "Turn rough hiring notes into polished job descriptions, LinkedIn posts, candidate summaries, and boolean search strings instantly.",
    href: "/jd-builder",
    cta: "Build a JD",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: MessageSquare,
    title: "Interview Kit Generator",
    description:
      "Generate behavioral questions, technical prompts, evaluation scorecards, and interviewer prep notes calibrated to any role.",
    href: "/interview-kit",
    cta: "Create Interview Kit",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Search,
    title: "Sourcing Assistant",
    description:
      "AI Boolean search generator, personalized outreach builder, public profile analyzer, and 14-day sourcing strategy. 100% legal.",
    href: "/sourcing",
    cta: "Start Sourcing",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const steps = [
  {
    number: "01",
    title: "Paste your job description",
    description:
      "Drop in rough notes or a polished JD. Our AI understands both and extracts what matters.",
  },
  {
    number: "02",
    title: "Choose your tools",
    description:
      "Score resumes, generate interview kits, build outreach messages, or run all four at once.",
  },
  {
    number: "03",
    title: "Hire with confidence",
    description:
      "Get structured, bias-aware evaluations and compliance-ready documentation in minutes.",
  },
];

const testimonials = [
  {
    quote:
      "Cut our screening time from 3 hours to 20 minutes. The resume scorer alone paid for itself in the first week.",
    author: "Sarah K.",
    role: "Head of Talent, Series A Startup",
    rating: 5,
  },
  {
    quote:
      "The sourcing assistant generates better Boolean strings than recruiters with 10 years of experience. Game changer.",
    author: "Marcus L.",
    role: "Technical Recruiter",
    rating: 5,
  },
  {
    quote:
      "Finally an AI tool that takes compliance seriously. The disclaimers and consent gates give me confidence to recommend it.",
    author: "Priya R.",
    role: "HR Director, Mid-Market SaaS",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individual recruiters exploring AI tools",
    features: [
      "5 resume scores per month",
      "3 JD generations per month",
      "2 interview kits per month",
      "Basic Boolean search",
      "Community support",
    ],
    cta: "Get Started Free",
    href: "/resume-scorer",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "For recruiters who hire every week",
    features: [
      "Unlimited resume scoring",
      "Unlimited JD generation",
      "Unlimited interview kits",
      "Full Sourcing Assistant",
      "Outreach message builder",
      "Profile fit analyzer",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    href: "/resume-scorer",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "For growing teams with shared workflows",
    features: [
      "Everything in Pro",
      "5 team members",
      "Shared JD library",
      "Team analytics dashboard",
      "Custom evaluation rubrics",
      "SSO & audit log",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    href: "/resume-scorer",
    highlighted: false,
  },
];

const complianceBadges = [
  "100% legal sourcing",
  "No scraping",
  "GDPR compliant",
  "CCPA compliant",
  "EEOC guidelines",
  "We never train on your data",
];

// ─── Component ───────────────────────────────────────────

export default function Home() {
  return (
    <div className="-mx-4 -mt-8 sm:-mx-6 lg:-mx-8">
      {/* ─── Hero Section ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-light/50 via-background to-background" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Now with AI-Powered Legal Sourcing
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]"
            >
              The Complete AI Hiring
              <br />
              Toolkit for{" "}
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Small Teams
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
            >
              Build JDs. Source legally. Screen & rank. Interview ready.
              <br className="hidden sm:block" />
              <span className="font-medium text-foreground/80">
                Save 15+ hours per hire.
              </span>
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/resume-scorer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-foreground border border-border hover:bg-card transition-colors">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <Play className="w-4 h-4 text-primary ml-0.5" />
                </span>
                Watch 47s Demo
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted"
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                Fully compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                Trusted by 50+ startups
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Features Section ─────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Everything you need
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Four powerful tools. One workflow.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-muted max-w-2xl mx-auto"
          >
            From job description to offer letter, MeritForge covers every step
            of your hiring process with AI that actually understands recruiting.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.href} variants={fadeUp}>
                <Link
                  href={feature.href}
                  className="group block bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} mb-5`}
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">
                    {feature.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {feature.cta}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── How It Works ─────────────────────────────── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
            >
              Simple by design
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              Three steps to better hiring
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-12"
          >
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 mb-6">
                  <span className="text-2xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: Clock, value: "15+ hrs", label: "Saved per hire" },
            { icon: Users, value: "50+", label: "Startup teams" },
            { icon: Zap, value: "<30s", label: "Average analysis" },
            { icon: Shield, value: "100%", label: "Compliance focused" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── Testimonials ─────────────────────────────── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
            >
              Loved by recruiters
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              What our users say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.author}
                variants={fadeUp}
                className="bg-background rounded-2xl border border-border p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Pricing Section ──────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Simple pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Start free. Scale when ready.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-muted"
          >
            No hidden fees. Cancel anytime.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-8 items-start"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                  {plan.badge}
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted text-sm">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-3 px-4 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25"
                    : "bg-background border border-border text-foreground hover:border-primary/30"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Compliance & Trust Bar ───────────────────── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {complianceBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Shield className="w-4 h-4 text-emerald-500" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA Section ────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-light/30 to-primary-light/50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
            >
              Ready to hire smarter?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg text-muted max-w-xl mx-auto"
            >
              Join recruiters saving 15+ hours per hire with AI-powered
              screening, sourcing, and interview prep.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/resume-scorer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/sourcing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-foreground border border-border hover:bg-card transition-colors"
              >
                Try Sourcing Assistant
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <p className="font-semibold text-foreground text-lg">
                MeritForge
              </p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                AI-powered hiring tools built for recruiters who move fast and
                hire right.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-3">
                Product
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Resume Scorer", href: "/resume-scorer" },
                  { label: "JD Builder", href: "/jd-builder" },
                  { label: "Interview Kit", href: "/interview-kit" },
                  { label: "Sourcing", href: "/sourcing" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-3">
                Company
              </p>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((label) => (
                  <li key={label}>
                    <span className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-3">
                Legal
              </p>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (label) => (
                    <li key={label}>
                      <span className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer">
                        {label}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} MeritForge AI. All rights
              reserved.
            </p>
            <p className="text-xs text-muted">
              Built with care in the USA. We never train on your candidate data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
