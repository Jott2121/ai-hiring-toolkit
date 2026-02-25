"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileSearch,
  FileText,
  MessageSquare,
  Search,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Clock,
  Users,
  Star,
  ChevronRight,
  Sparkles,
  Target,
  BarChart3,
  Globe,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// ─── Animation Variants ──────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

// ─── Data ────────────────────────────────────────────────

const features = [
  {
    icon: FileSearch,
    title: "Resume Scoring Engine",
    bullets: [
      "Instant fit scores with strengths & risks",
      "Batch-process 50+ candidates at once",
      "Tailored interview questions per resume",
    ],
    href: "/resume-scorer",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    borderAccent: "group-hover:border-emerald-200",
  },
  {
    icon: FileText,
    title: "Smart JD Builder",
    bullets: [
      "Turn rough notes into polished JDs",
      "Auto-generate LinkedIn posts & summaries",
      "Boolean search strings included",
    ],
    href: "/jd-builder",
    color: "text-blue-600",
    bg: "bg-blue-50",
    borderAccent: "group-hover:border-blue-200",
  },
  {
    icon: MessageSquare,
    title: "Interview Kit Generator",
    bullets: [
      "Behavioral & technical question banks",
      "Evaluation scorecards & rubrics",
      "Interviewer prep notes by role",
    ],
    href: "/interview-kit",
    color: "text-violet-600",
    bg: "bg-violet-50",
    borderAccent: "group-hover:border-violet-200",
  },
  {
    icon: Search,
    title: "Sourcing Assistant",
    bullets: [
      "AI Boolean search generator",
      "Personalized outreach builder",
      "Public profile fit analyzer",
      "7-day sourcing strategy plans",
    ],
    href: "/sourcing",
    color: "text-amber-600",
    bg: "bg-amber-50",
    borderAccent: "group-hover:border-amber-200",
    isNew: true,
  },
];

const steps = [
  {
    number: "01",
    title: "Paste your job description",
    description:
      "Drop in rough notes or a polished JD. Our AI understands both and extracts what matters.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Choose your tools",
    description:
      "Score resumes, generate interview kits, build outreach messages, or run all four at once.",
    icon: Target,
  },
  {
    number: "03",
    title: "Hire with confidence",
    description:
      "Get structured, bias-aware evaluations and compliance-ready documentation in minutes.",
    icon: Check,
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

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
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
  },
  {
    name: "Pro",
    monthlyPrice: 39,
    annualPrice: 31,
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
    monthlyPrice: 99,
    annualPrice: 79,
    description: "For growing teams with shared workflows",
    features: [
      "Everything in Pro",
      "5 team members included",
      "Shared JD library",
      "Team analytics dashboard",
      "Custom evaluation rubrics",
      "SSO & audit log",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    href: "/resume-scorer",
  },
];

const productVisuals = [
  {
    title: "Resume Ranking Dashboard",
    description:
      "See candidates ranked by fit score with detailed breakdowns of strengths, risks, and interview focus areas.",
    icon: BarChart3,
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    accent: "bg-emerald-500",
  },
  {
    title: "Boolean Search Output",
    description:
      "AI-generated search strings ready for LinkedIn, GitHub, and more — with broad, targeted, and narrow variants.",
    icon: Globe,
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    accent: "bg-blue-500",
  },
  {
    title: "Interview Kit Builder",
    description:
      "Structured behavioral and technical questions, scorecards, and interviewer prep notes in one view.",
    icon: Monitor,
    gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
    accent: "bg-violet-500",
  },
];

const complianceBadges = [
  "100% legal sourcing",
  "No scraping",
  "GDPR / CCPA compliant",
  "EEOC guidelines",
  "We never train on your data",
];

// ─── Component ───────────────────────────────────────────

export default function Home() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="-mx-4 -mt-8 sm:-mx-6 lg:-mx-8">
      {/* ─── Hero Section ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-400/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 sm:pb-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Pill badge */}
            <motion.div variants={fadeUp}>
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium gap-2 mb-8 border-blue-100 bg-blue-50/60 text-blue-700"
              >
                <Sparkles className="size-3.5" />
                Now with AI-Powered Legal Sourcing
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight leading-[1.06] text-foreground"
            >
              Build Better Teams
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 bg-clip-text text-transparent">
                Faster
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              The complete AI hiring toolkit for small teams. Build JDs &rarr;
              Source legally &rarr; Screen &amp; rank &rarr; Interview ready.{" "}
              <span className="font-semibold text-foreground">
                Save 15+ hours per hire.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link href="/resume-scorer">
                  Get Started Free
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base rounded-xl hover:bg-blue-50/50"
                asChild
              >
                <Link href="/sourcing">
                  Start Sourcing Now
                  <ChevronRight className="size-4 ml-1" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
            >
              {[
                "No credit card",
                "Fully compliant",
                "Used by recruiters at 50+ startups",
              ].map((text) => (
                <span key={text} className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Features Section ─────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
            Everything you need in one elegant toolkit
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From job description to offer letter &mdash; four AI tools designed
            for recruiters who move fast.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.href} variants={fadeUp}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                >
                  <Link href={feature.href} className="group block">
                    <Card
                      className={`relative h-full p-0 border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${feature.borderAccent}`}
                    >
                      <CardContent className="p-7">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`inline-flex items-center justify-center size-11 rounded-lg ${feature.bg}`}
                          >
                            <Icon className={`size-5 ${feature.color}`} />
                          </div>
                          {feature.isNew && (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-xs font-semibold">
                              New
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {feature.title}
                        </h3>

                        <ul className="space-y-2 mb-5">
                          {feature.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <Check className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          Get started
                          <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── Product Visuals ──────────────────────────── */}
      <section className="border-y border-border/50 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
            >
              See it in action
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              See MeritForgeAI in action
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {productVisuals.map((visual) => {
              const Icon = visual.icon;
              return (
                <motion.div key={visual.title} variants={fadeUp}>
                  <Card className="overflow-hidden p-0 shadow-sm hover:shadow-md transition-shadow">
                    <div
                      className={`relative h-52 bg-gradient-to-br ${visual.gradient} flex items-center justify-center border-b border-border/30`}
                    >
                      <div className="size-16 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center border border-border/30">
                        <Icon className="size-8 text-slate-500" />
                      </div>
                      <div
                        className={`absolute top-4 right-4 size-2 rounded-full ${visual.accent}`}
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground text-sm">
                        {visual.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {visual.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-px border-t-2 border-dashed border-border/60" />
                )}

                <div className="relative inline-flex items-center justify-center size-20 rounded-2xl bg-blue-50/80 border border-blue-100/60 mb-6">
                  <span className="absolute -top-2 -right-2 size-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                    {step.number}
                  </span>
                  <Icon className="size-8 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── Stats Bar ────────────────────────────────── */}
      <section className="border-y border-border/50 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Clock, value: "15+ hrs", label: "Saved per hire" },
              { icon: Users, value: "50+", label: "Startup teams" },
              { icon: Zap, value: "<30s", label: "Average analysis" },
              {
                icon: Shield,
                value: "100%",
                label: "Compliance focused",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center size-10 rounded-lg bg-blue-50/80 border border-blue-100/40 mb-3">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Pricing Section ──────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-muted-foreground"
          >
            No hidden fees. Cancel anytime.
          </motion.p>

          {/* Annual toggle */}
          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-3 text-sm"
          >
            <span
              className={
                annual
                  ? "text-muted-foreground"
                  : "font-medium text-foreground"
              }
            >
              Monthly
            </span>
            <Switch checked={annual} onCheckedChange={setAnnual} />
            <span
              className={
                annual
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }
            >
              Annual
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-emerald-50 text-emerald-700 border-emerald-100"
              >
                Save 20%
              </Badge>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6 items-start"
        >
          {pricingPlans.map((plan) => (
            <motion.div key={plan.name} variants={fadeUp}>
              <Card
                className={`relative p-0 transition-all ${
                  plan.highlighted
                    ? "border-primary shadow-lg shadow-primary/10 md:scale-[1.03]"
                    : "shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary px-3 text-xs shadow-sm">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-7">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground tracking-tight">
                        ${annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {plan.monthlyPrice === 0
                          ? "/forever"
                          : annual
                            ? "/mo, billed yearly"
                            : "/month"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <Separator className="mb-6" />

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        <Check className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className={`w-full rounded-lg ${
                      plan.highlighted
                        ? "shadow-md shadow-primary/20"
                        : ""
                    }`}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Compliance & Trust Bar ───────────────────── */}
      <section className="border-y border-border/50 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Shield className="size-4 text-emerald-500" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t.author} variants={fadeUp}>
              <Card className="h-full p-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-sm flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-5 border-t border-border/50">
                    <p className="font-semibold text-foreground text-sm">
                      {t.author}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Final CTA ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-blue-50/70" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
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
              className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Join recruiters saving 15+ hours per hire with AI-powered
              screening, sourcing, and interview prep.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link href="/resume-scorer">
                  Get Started Free
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base rounded-xl hover:bg-white/80"
                asChild
              >
                <Link href="/sourcing">
                  Try Sourcing Assistant
                  <ChevronRight className="size-4 ml-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <p className="font-bold text-foreground text-lg tracking-tight">
                MeritForge
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                AI-powered hiring tools built for recruiters who move fast and
                hire right.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-4">
                Product
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "Resume Scorer", href: "/resume-scorer" },
                  { label: "JD Builder", href: "/jd-builder" },
                  { label: "Interview Kit", href: "/interview-kit" },
                  { label: "Sourcing", href: "/sourcing" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-4">
                Company
              </p>
              <ul className="space-y-2.5">
                {["About", "Blog", "Careers", "Contact"].map((label) => (
                  <li key={label}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-4">
                Legal
              </p>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (label) => (
                    <li key={label}>
                      <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        {label}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MeritForge AI. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with care in the USA. We never train on your candidate
              data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
