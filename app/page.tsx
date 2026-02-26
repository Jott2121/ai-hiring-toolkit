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
  ChevronRight,
  Sparkles,
  Target,
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
      "Drop in rough notes, a formal JD, or even bullet points from a hiring manager\u2019s Slack message. The AI figures out what matters.",
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
      "Get structured evaluations with clear reasoning \u2014 no black-box scores. Every recommendation explains why.",
    icon: Check,
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
  subtitle?: string;
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
    cta: "Join Pro Waitlist",
    href: "/waitlist",
    highlighted: true,
    badge: "Early Access",
    subtitle: "Lock in this price \u2014 it\u2019s going up after beta.",
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
    cta: "Request Early Access",
    href: "/waitlist",
    subtitle: "Coming Q2 2026",
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight leading-[1.1] text-foreground"
            >
              Stop Spending Friday Nights
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 bg-clip-text text-transparent">
                Ranking 47 Resumes in a Spreadsheet
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              The AI hiring toolkit built for small teams who don&apos;t have a
              recruiting department. Go from rough job notes to ranked candidates
              with interview-ready scorecards &mdash;{" "}
              <span className="font-semibold text-foreground">
                in minutes, not days.
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
                  Try Resume Scorer Free
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base rounded-xl hover:bg-blue-50/50"
                asChild
              >
                <Link href="#how-it-works">
                  See How It Works
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
                "Built by a recruiter",
                "No credit card required",
                "Fully compliant",
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
            The toolkit
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Four tools. One workflow. Zero busywork.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Each tool handles a different stage of hiring &mdash; use one at a
            time or chain them together for a full pipeline.
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

      {/* ─── See It In Action ──────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-4 text-center">See it in action</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What you&apos;ll actually get</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 — Resume Scoring Dashboard Mock */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="h-64 rounded-lg bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-left overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400">Resume Scorer — Senior Frontend Engineer</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">3 candidates</span>
                </div>
                <div className="space-y-2">
                  {/* Candidate 1 */}
                  <div className="bg-slate-700/50 rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">Alex Chen</span>
                      <span className="text-sm font-bold text-emerald-400">92%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5 mb-1.5">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">React 6yr</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Team Lead</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">No AWS exp</span>
                    </div>
                  </div>
                  {/* Candidate 2 */}
                  <div className="bg-slate-700/50 rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">Priya Patel</span>
                      <span className="text-sm font-bold text-emerald-400">85%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5 mb-1.5">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">TypeScript</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">AWS Cert</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">2yr exp only</span>
                    </div>
                  </div>
                  {/* Candidate 3 - partially visible to imply more */}
                  <div className="bg-slate-700/50 rounded-md p-2.5 opacity-60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">Jordan Rivera</span>
                      <span className="text-sm font-bold text-yellow-400">71%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5">
                      <div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '71%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg">Candidates ranked by fit score</h3>
              <p className="text-sm text-muted-foreground">Upload resumes, paste a JD, and get instant fit scores with strengths, risks, and suggested interview questions for each candidate.</p>
              <Link href="/resume-scorer" className="text-primary text-sm font-medium hover:underline inline-block">Try it free →</Link>
            </div>

            {/* Card 2 — Boolean Search Output Mock */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="h-64 rounded-lg bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-left overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400">Sourcing — Senior Frontend Engineer</span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">3 variants</span>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">Broad</span>
                    <div className="bg-slate-700/50 rounded-md p-2 mt-1">
                      <code className="text-[11px] text-slate-300 leading-relaxed">(&quot;frontend&quot; OR &quot;front-end&quot; OR &quot;front end&quot;) AND (&quot;react&quot; OR &quot;vue&quot; OR &quot;angular&quot;) AND (&quot;senior&quot; OR &quot;lead&quot; OR &quot;staff&quot;)</code>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Targeted</span>
                    <div className="bg-slate-700/50 rounded-md p-2 mt-1">
                      <code className="text-[11px] text-slate-300 leading-relaxed">(&quot;senior frontend&quot; OR &quot;staff engineer&quot;) AND &quot;react&quot; AND (&quot;typescript&quot; OR &quot;node&quot;) AND (&quot;SaaS&quot; OR &quot;B2B&quot;)</code>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">Narrow</span>
                    <div className="bg-slate-700/50 rounded-md p-2 mt-1">
                      <code className="text-[11px] text-slate-300 leading-relaxed">&quot;senior frontend engineer&quot; AND &quot;react&quot; AND &quot;typescript&quot; AND &quot;AWS&quot; AND (&quot;series A&quot; OR &quot;series B&quot;)</code>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg">AI-generated search strings</h3>
              <p className="text-sm text-muted-foreground">Get broad, targeted, and narrow Boolean strings ready for LinkedIn, GitHub, and Stack Overflow &mdash; plus personalized outreach templates.</p>
              <Link href="/sourcing" className="text-primary text-sm font-medium hover:underline inline-block">Try sourcing →</Link>
            </div>

            {/* Card 3 — Interview Kit Mock */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="h-64 rounded-lg bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-left overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400">Interview Kit — Alex Chen</span>
                  <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">8 questions</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-slate-700/50 rounded-md p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Behavioral</span>
                    </div>
                    <p className="text-xs text-slate-300">&quot;Tell me about a time you led a frontend migration. What broke, and how did you recover?&quot;</p>
                    <p className="text-[10px] text-slate-500 mt-1">Evaluates: leadership under pressure, technical depth</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-md p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Technical</span>
                    </div>
                    <p className="text-xs text-slate-300">&quot;How would you architect a real-time dashboard handling 10K concurrent WebSocket connections?&quot;</p>
                    <p className="text-[10px] text-slate-500 mt-1">Evaluates: system design, scalability thinking</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-md p-2.5 opacity-60">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">Risk Probe</span>
                    </div>
                    <p className="text-xs text-slate-300">&quot;Your resume doesn&apos;t mention cloud infrastructure. Walk me through...&quot;</p>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg">Structured interview prep</h3>
              <p className="text-sm text-muted-foreground">Behavioral and technical questions, evaluation scorecards, and interviewer prep notes &mdash; customized to the role and candidate.</p>
              <Link href="/interview-kit" className="text-primary text-sm font-medium hover:underline inline-block">Build a kit →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────── */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
              { icon: Target, value: "4 tools", label: "1 workflow" },
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
                    {plan.subtitle && (
                      <p className="mt-2 text-xs font-medium text-primary">
                        {plan.subtitle}
                      </p>
                    )}
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

      {/* ─── Built by a Recruiter ──────────────────────── */}
      <section id="founder" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">Why MeritForge exists</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Built by a Recruiter Who Got Tired of the Busywork</h2>
          {/* TODO: Replace with actual headshot - use next/image with /public/jeff-headshot.jpg */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-primary">J</span>
          </div>
          <div className="text-lg text-muted-foreground space-y-4 text-left max-w-2xl mx-auto">
            <p>
              I&apos;m Jeff &mdash; a Talent Acquisition Manager who&apos;s screened thousands of candidates for roles at one of the largest defense contractors in the world.
            </p>
            <p>
              I built MeritForge because I kept watching small teams drown in the same manual processes that big companies solve with $100K/year ATS platforms. Writing JDs from scratch. Copy-pasting Boolean strings from three-year-old blog posts. Printing resumes to rank them by hand.
            </p>
            <p>
              Every tool in this kit solves a problem I&apos;ve personally hit &mdash; and it&apos;s designed for teams that need to hire well without a dedicated recruiting department.
            </p>
          </div>
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4 mt-6 mb-8 max-w-2xl mx-auto text-left">
            <p className="text-base italic text-muted-foreground">
              &quot;I built every feature in this toolkit because I needed it myself. No focus groups &mdash; just years of doing this job and knowing what wastes time.&quot;
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>10+ years in talent acquisition</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>MBA candidate, W.P. Carey School of Business</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Thousands of candidates screened</span>
            </div>
          </div>
        </div>
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
              Your next hire shouldn&apos;t take 40 hours of busywork
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Start with the free Resume Scorer &mdash; no account required, no
              credit card, no sales call.
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
                  Score Your First Resume
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
                AI hiring tools built by a recruiter, for teams without a
                recruiting department.
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
              {/* TODO: Replace mailto below with Jeff's actual contact email */}
              <ul className="space-y-2.5">
                {[
                  { label: "About", href: "/#founder" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "mailto:meritforgeai@gmail.com" },
                ].map((link) => (
                  <li key={link.label}>
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
                Legal
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
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
