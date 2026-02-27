"use client";

import { useState } from "react";
import DisclaimerBanner from "@/app/components/DisclaimerBanner";
import ConsentGate from "@/app/components/ConsentGate";
import CopyButton from "@/app/components/CopyButton";

// ─── Types ───────────────────────────────────────────────

type FeatureTab = "boolean" | "strategy" | "outreach" | "analyze";

interface BooleanVariant {
  query: string;
  estimatedVolume: string;
  bestFor: string;
}
interface BooleanResult {
  broad: BooleanVariant;
  targeted: BooleanVariant;
  narrow: BooleanVariant;
  searchTips: string[];
}

interface StrategyPhase {
  days: string;
  theme: string;
  activities: string[];
  platforms: string[];
  targetVolume: string;
}
interface StrategyResult {
  dailyPlan: StrategyPhase[];
  communities: string[];
  searchSynonyms: { titles: string[]; skills: string[] };
  cadence: {
    initialOutreach: string;
    followUp1: string;
    followUp2: string;
    finalTouch: string;
  };
  biasMitigation: string[];
  metrics: {
    responseRateBenchmark: string;
    pipelineTarget: string;
    timeToFill: string;
  };
}

interface OutreachMessage {
  channel: string;
  subject: string | null;
  body: string;
  characterCount: number;
  abTestNote: string;
}
interface OutreachResult {
  messages: OutreachMessage[];
  personalizationPoints: string[];
  complianceNotes: { canSpam: string; gdpr: string; optOut: string };
  screeningQuestions: string[];
}

interface EvalCriteria {
  criteria: string;
  assessment: string;
  rating: "strong" | "moderate" | "weak";
}
interface ProfileResult {
  candidateName: string;
  fitScore: number;
  strengths: string[];
  risks: string[];
  interviewFocus: string[];
  suggestedQuestions: string[];
  evaluationRubric: EvalCriteria[];
  dataCaveats: string[];
  error?: string;
}

// ─── Tab config ──────────────────────────────────────────

const featureTabs: { key: FeatureTab; label: string }[] = [
  { key: "boolean", label: "Boolean Search" },
  { key: "strategy", label: "Strategy" },
  { key: "outreach", label: "Outreach" },
  { key: "analyze", label: "Profile Fit" },
];

// ─── Helpers ─────────────────────────────────────────────

function buildSearchUrl(platform: string, query: string): string {
  const q = encodeURIComponent(query);
  switch (platform) {
    case "linkedin":
      return `https://www.linkedin.com/search/results/people/?keywords=${q}`;
    case "google":
      return `https://www.google.com/search?q=${encodeURIComponent("site:linkedin.com/in/ " + query)}`;
    case "indeed":
      return `https://www.indeed.com/q-${q}-jobs.html`;
    case "github":
      return `https://github.com/search?q=${q}&type=users`;
    default:
      return "#";
  }
}

const scoreColor = (score: number) => {
  if (score >= 71) return "bg-emerald-500";
  if (score >= 41) return "bg-amber-500";
  return "bg-red-500";
};

const scoreTextColor = (score: number) => {
  if (score >= 71) return "text-emerald-700";
  if (score >= 41) return "text-amber-700";
  return "text-red-700";
};

// ─── Main Component ──────────────────────────────────────

export default function SourcingAssistant() {
  const [activeTab, setActiveTab] = useState<FeatureTab>("boolean");

  // Boolean Search state
  const [boolJd, setBoolJd] = useState("");
  const [boolLocation, setBoolLocation] = useState("");
  const [boolExperience, setBoolExperience] = useState("");
  const [boolResult, setBoolResult] = useState<BooleanResult | null>(null);
  const [boolLoading, setBoolLoading] = useState(false);
  const [boolError, setBoolError] = useState<string | null>(null);

  // Strategy state
  const [stratJd, setStratJd] = useState("");
  const [stratSize, setStratSize] = useState("");
  const [stratIndustry, setStratIndustry] = useState("");
  const [stratResult, setStratResult] = useState<StrategyResult | null>(null);
  const [stratLoading, setStratLoading] = useState(false);
  const [stratError, setStratError] = useState<string | null>(null);

  // Outreach state
  const [outProfile, setOutProfile] = useState("");
  const [outJd, setOutJd] = useState("");
  const [outResult, setOutResult] = useState<OutreachResult | null>(null);
  const [outLoading, setOutLoading] = useState(false);
  const [outError, setOutError] = useState<string | null>(null);

  // Analyze state
  const [analyzeJd, setAnalyzeJd] = useState("");
  const [analyzeText, setAnalyzeText] = useState("");
  const [analyzeResults, setAnalyzeResults] = useState<ProfileResult[] | null>(null);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  // ─── Handlers ────────────────────────────────────────

  const handleBooleanSubmit = async () => {
    if (!boolJd) return;
    setBoolLoading(true);
    setBoolError(null);
    setBoolResult(null);
    try {
      const res = await fetch("/api/sourcing/boolean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: boolJd,
          location: boolLocation || undefined,
          experienceLevel: boolExperience || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setBoolResult(data.result);
    } catch (err) {
      setBoolError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setBoolLoading(false);
    }
  };

  const handleStrategySubmit = async () => {
    if (!stratJd) return;
    setStratLoading(true);
    setStratError(null);
    setStratResult(null);
    try {
      const res = await fetch("/api/sourcing/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: stratJd,
          companySize: stratSize || undefined,
          industry: stratIndustry || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setStratResult(data.result);
    } catch (err) {
      setStratError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setStratLoading(false);
    }
  };

  const handleOutreachSubmit = async () => {
    if (!outProfile || !outJd) return;
    setOutLoading(true);
    setOutError(null);
    setOutResult(null);
    try {
      const res = await fetch("/api/sourcing/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileText: outProfile,
          jobDescription: outJd,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutResult(data.result);
    } catch (err) {
      setOutError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setOutLoading(false);
    }
  };

  const handleAnalyzeSubmit = async () => {
    if (!analyzeJd || !analyzeText) return;
    setAnalyzeLoading(true);
    setAnalyzeError(null);
    setAnalyzeResults(null);
    try {
      // Split on --- delimiter for batch mode
      const blocks = analyzeText
        .split(/^---$/m)
        .map((b) => b.trim())
        .filter(Boolean);
      const profiles = blocks.map((text, i) => ({
        name: `Profile ${i + 1}`,
        text,
      }));
      const res = await fetch("/api/sourcing/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: analyzeJd, profiles }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setAnalyzeResults(data.results);
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setAnalyzeLoading(false);
    }
  };

  // ─── Shared sub-components ───────────────────────────

  const renderError = (error: string | null) =>
    error ? (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    ) : null;

  const renderLoading = (loading: boolean, text: string) =>
    loading ? (
      <div className="mt-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="mt-3 text-muted-foreground">{text}</p>
      </div>
    ) : null;

  // ─── Render ──────────────────────────────────────────

  return (
    <ConsentGate>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Sourcing Assistant
          </h1>
          <p className="mt-2 text-muted-foreground">
            Generate Boolean searches, build sourcing strategies, craft outreach
            messages, and analyze public profiles — all legally compliant.
          </p>
        </div>

        <DisclaimerBanner />

        {/* Feature Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          {featureTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Boolean Search Tab ─────────────────────── */}
        {activeTab === "boolean" && (
          <div>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5">
                  Job Description
                </label>
                <textarea
                  value={boolJd}
                  onChange={(e) => setBoolJd(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    value={boolLocation}
                    onChange={(e) => setBoolLocation(e.target.value)}
                    placeholder="e.g. San Francisco, Remote, EMEA"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Experience Level (optional)
                  </label>
                  <select
                    value={boolExperience}
                    onChange={(e) => setBoolExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">Any level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleBooleanSubmit}
                disabled={!boolJd || boolLoading}
                className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {boolLoading ? "Generating..." : "Generate Boolean Searches"}
              </button>
            </div>

            {renderError(boolError)}
            {renderLoading(boolLoading, "Generating Boolean search strings...")}

            {boolResult && (
              <div className="mt-8 space-y-4">
                {(
                  [
                    { key: "broad" as const, label: "Broad", color: "emerald" },
                    { key: "targeted" as const, label: "Targeted", color: "blue" },
                    { key: "narrow" as const, label: "Narrow", color: "purple" },
                  ] as const
                ).map(({ key, label, color }) => {
                  const variant = boolResult[key];
                  return (
                    <div
                      key={key}
                      className="bg-card rounded-xl border border-border p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">
                            {label}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium bg-${color}-100 text-${color}-700`}
                          >
                            {variant.estimatedVolume} volume
                          </span>
                        </div>
                        <CopyButton text={variant.query} />
                      </div>
                      <pre className="bg-gray-50 border border-border rounded-lg p-3 text-sm text-foreground/90 whitespace-pre-wrap break-words font-mono">
                        {variant.query}
                      </pre>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {variant.bestFor}
                      </p>
                    </div>
                  );
                })}

                {/* Platform Search Links */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-3">
                    Quick Search Links
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Opens the Targeted query on each platform. You can paste
                    other variants manually.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { platform: "linkedin", label: "LinkedIn" },
                      { platform: "google", label: "Google X-Ray" },
                      { platform: "indeed", label: "Indeed" },
                      { platform: "github", label: "GitHub Users" },
                    ].map(({ platform, label }) => (
                      <a
                        key={platform}
                        href={buildSearchUrl(
                          platform,
                          boolResult.targeted.query
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-light text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        {label} &rarr;
                      </a>
                    ))}
                  </div>
                </div>

                {/* Search Tips */}
                {boolResult.searchTips?.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h4 className="font-medium text-foreground mb-2">
                      Search Tips
                    </h4>
                    <ul className="space-y-1">
                      {boolResult.searchTips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground/80 flex items-start gap-2"
                        >
                          <span className="text-indigo-500 mt-0.5 shrink-0">
                            &#8227;
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── Strategy Tab ───────────────────────────── */}
        {activeTab === "strategy" && (
          <div>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5">
                  Job Description
                </label>
                <textarea
                  value={stratJd}
                  onChange={(e) => setStratJd(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Company Size (optional)
                  </label>
                  <select
                    value={stratSize}
                    onChange={(e) => setStratSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">Any size</option>
                    <option value="startup">Startup (1-50)</option>
                    <option value="mid-market">Mid-Market (51-500)</option>
                    <option value="enterprise">Enterprise (500+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Industry (optional)
                  </label>
                  <input
                    type="text"
                    value={stratIndustry}
                    onChange={(e) => setStratIndustry(e.target.value)}
                    placeholder="e.g. FinTech, Healthcare, SaaS"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
              </div>

              <button
                onClick={handleStrategySubmit}
                disabled={!stratJd || stratLoading}
                className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {stratLoading ? "Generating..." : "Generate Sourcing Strategy"}
              </button>
            </div>

            {renderError(stratError)}
            {renderLoading(stratLoading, "Building your sourcing plan...")}

            {stratResult && (
              <div className="mt-8 space-y-4">
                {/* Metrics summary */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-3">
                    Key Metrics
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        {stratResult.metrics.responseRateBenchmark}
                      </p>
                      <p className="text-xs text-muted-foreground">Response Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        {stratResult.metrics.pipelineTarget}
                      </p>
                      <p className="text-xs text-muted-foreground">Pipeline Target</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        {stratResult.metrics.timeToFill}
                      </p>
                      <p className="text-xs text-muted-foreground">Time to Fill</p>
                    </div>
                  </div>
                </div>

                {/* Daily plan */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-4">
                    14-Day Sourcing Plan
                  </h3>
                  <div className="space-y-4">
                    {stratResult.dailyPlan.map((phase, i) => (
                      <div
                        key={i}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">
                            Days {phase.days}: {phase.theme}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {phase.targetVolume}/day
                          </span>
                        </div>
                        <ul className="space-y-1 mb-2">
                          {phase.activities.map((a, j) => (
                            <li
                              key={j}
                              className="text-sm text-foreground/80 flex items-start gap-2"
                            >
                              <span className="text-primary mt-0.5 shrink-0">
                                &#8226;
                              </span>
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1">
                          {phase.platforms.map((p, j) => (
                            <span
                              key={j}
                              className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synonyms */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-3">
                    Search Synonyms
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Alternative Titles
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {stratResult.searchSynonyms.titles.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 rounded text-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Related Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {stratResult.searchSynonyms.skills.map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 rounded text-sm"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cadence + Communities + Bias */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-3">
                      Outreach Cadence
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Initial:</span>{" "}
                        <span className="text-foreground/80">
                          {stratResult.cadence.initialOutreach}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Follow-up 1:</span>{" "}
                        <span className="text-foreground/80">
                          {stratResult.cadence.followUp1}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Follow-up 2:</span>{" "}
                        <span className="text-foreground/80">
                          {stratResult.cadence.followUp2}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Final:</span>{" "}
                        <span className="text-foreground/80">
                          {stratResult.cadence.finalTouch}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-3">
                      Communities
                    </h3>
                    <ul className="space-y-1">
                      {stratResult.communities.map((c, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground/80 flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5 shrink-0">
                            &#8226;
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-3">
                    Bias Mitigation Tips
                  </h3>
                  <ul className="space-y-1">
                    {stratResult.biasMitigation.map((tip, i) => (
                      <li
                        key={i}
                        className="text-sm text-foreground/80 flex items-start gap-2"
                      >
                        <span className="text-emerald-500 mt-0.5 shrink-0">
                          +
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Outreach Tab ───────────────────────────── */}
        {activeTab === "outreach" && (
          <div>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5">
                  Job Description
                </label>
                <textarea
                  value={outJd}
                  onChange={(e) => setOutJd(e.target.value)}
                  placeholder="Paste the job description..."
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5">
                  Candidate Public Profile
                </label>
                <textarea
                  value={outProfile}
                  onChange={(e) => setOutProfile(e.target.value)}
                  placeholder="Paste the candidate's public LinkedIn or GitHub profile text here..."
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Copy/paste public profile content only. Do not use scrapers or
                  automated tools.
                </p>
              </div>

              <button
                onClick={handleOutreachSubmit}
                disabled={!outProfile || !outJd || outLoading}
                className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {outLoading ? "Generating..." : "Generate Outreach Messages"}
              </button>
            </div>

            {renderError(outError)}
            {renderLoading(outLoading, "Crafting personalized messages...")}

            {outResult && (
              <div className="mt-8 space-y-4">
                {/* Messages */}
                {outResult.messages.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {msg.channel}
                        </h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-muted-foreground rounded text-xs">
                          {msg.characterCount} chars
                        </span>
                      </div>
                      <CopyButton text={msg.body} />
                    </div>
                    {msg.subject && (
                      <p className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium">Subject:</span>{" "}
                        {msg.subject}
                      </p>
                    )}
                    <div className="bg-gray-50 border border-border rounded-lg p-4 text-sm text-foreground/90 whitespace-pre-wrap">
                      {msg.body}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      <span className="font-medium">A/B Test:</span>{" "}
                      {msg.abTestNote}
                    </p>
                  </div>
                ))}

                {/* Personalization points */}
                {outResult.personalizationPoints?.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-2">
                      Personalization Points Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {outResult.personalizationPoints.map((p, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Screening questions */}
                {outResult.screeningQuestions?.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-2">
                      Screening Questions
                    </h3>
                    <ol className="space-y-1 list-decimal list-inside">
                      {outResult.screeningQuestions.map((q, i) => (
                        <li key={i} className="text-sm text-foreground/80">
                          {q}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Compliance */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">
                    Compliance Reminders
                  </h3>
                  <div className="space-y-2 text-sm text-amber-700">
                    <p>
                      <span className="font-medium">CAN-SPAM:</span>{" "}
                      {outResult.complianceNotes.canSpam}
                    </p>
                    <p>
                      <span className="font-medium">GDPR:</span>{" "}
                      {outResult.complianceNotes.gdpr}
                    </p>
                    <p>
                      <span className="font-medium">Opt-Out Language:</span>{" "}
                      {outResult.complianceNotes.optOut}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Profile Fit Analyzer Tab ───────────────── */}
        {activeTab === "analyze" && (
          <div>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5">
                  Job Description
                </label>
                <textarea
                  value={analyzeJd}
                  onChange={(e) => setAnalyzeJd(e.target.value)}
                  placeholder="Paste the job description..."
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1.5">
                  Public Profile Text
                </label>
                <textarea
                  value={analyzeText}
                  onChange={(e) => setAnalyzeText(e.target.value)}
                  placeholder={`Paste a candidate's public profile text here...\n\nFor multiple candidates, separate each profile with --- on its own line:\n\nProfile 1 text here...\n---\nProfile 2 text here...`}
                  rows={8}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste public profile content only. Separate multiple profiles
                  with --- on its own line.
                </p>
              </div>

              <button
                onClick={handleAnalyzeSubmit}
                disabled={!analyzeJd || !analyzeText || analyzeLoading}
                className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {analyzeLoading ? "Analyzing..." : "Analyze Profiles"}
              </button>
            </div>

            {renderError(analyzeError)}
            {renderLoading(analyzeLoading, "Analyzing profiles against job requirements...")}

            {analyzeResults && analyzeResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Profile Rankings
                </h2>
                <div className="space-y-6">
                  {[...analyzeResults]
                    .filter((r) => !r.error || r.fitScore > 0)
                    .sort((a, b) => b.fitScore - a.fitScore)
                    .map((candidate, i) => (
                      <div
                        key={i}
                        className="bg-card rounded-xl border border-border p-6 shadow-sm"
                      >
                        {candidate.error && !candidate.fitScore ? (
                          <div className="text-red-600">{candidate.error}</div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span
                                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                    i === 0
                                      ? "bg-amber-100 text-amber-700"
                                      : i === 1
                                        ? "bg-gray-200 text-gray-700"
                                        : i === 2
                                          ? "bg-orange-100 text-orange-700"
                                          : "bg-gray-100 text-muted-foreground"
                                  }`}
                                >
                                  {i + 1}
                                </span>
                                <h3 className="text-lg font-semibold">
                                  {candidate.candidateName}
                                </h3>
                              </div>
                              <span
                                className={`text-2xl font-bold ${scoreTextColor(candidate.fitScore)}`}
                              >
                                {candidate.fitScore}/100
                              </span>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                              <div
                                className={`h-2 rounded-full ${scoreColor(candidate.fitScore)} transition-all`}
                                style={{
                                  width: `${candidate.fitScore}%`,
                                }}
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h4 className="font-medium text-emerald-700 mb-2">
                                  Strengths
                                </h4>
                                <ul className="space-y-1">
                                  {candidate.strengths.map((s, j) => (
                                    <li
                                      key={j}
                                      className="text-sm text-foreground/80 flex items-start gap-2"
                                    >
                                      <span className="text-emerald-500 mt-0.5 shrink-0">
                                        +
                                      </span>
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-amber-700 mb-2">
                                  Risks & Gaps
                                </h4>
                                <ul className="space-y-1">
                                  {candidate.risks.map((r, j) => (
                                    <li
                                      key={j}
                                      className="text-sm text-foreground/80 flex items-start gap-2"
                                    >
                                      <span className="text-amber-500 mt-0.5 shrink-0">
                                        -
                                      </span>
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-medium mb-2">
                                Interview Focus Areas
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {candidate.interviewFocus.map((f, j) => (
                                  <span
                                    key={j}
                                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-medium mb-2">
                                Suggested Interview Questions
                              </h4>
                              <ol className="space-y-2 list-decimal list-inside">
                                {candidate.suggestedQuestions.map((q, j) => (
                                  <li
                                    key={j}
                                    className="text-sm text-foreground/80"
                                  >
                                    {q}
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {candidate.evaluationRubric?.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">
                                  Evaluation Rubric
                                </h4>
                                <div className="border border-border rounded-lg overflow-hidden">
                                  <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-2 text-left font-medium">
                                          Criteria
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium">
                                          Assessment
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium">
                                          Rating
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {candidate.evaluationRubric.map(
                                        (r, j) => (
                                          <tr
                                            key={j}
                                            className="border-t border-border"
                                          >
                                            <td className="px-4 py-2 font-medium">
                                              {r.criteria}
                                            </td>
                                            <td className="px-4 py-2 text-foreground/70">
                                              {r.assessment}
                                            </td>
                                            <td className="px-4 py-2">
                                              <span
                                                className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                                  r.rating === "strong"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : r.rating === "moderate"
                                                      ? "bg-amber-100 text-amber-700"
                                                      : "bg-red-100 text-red-700"
                                                }`}
                                              >
                                                {r.rating}
                                              </span>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Data caveats */}
                            {candidate.dataCaveats?.length > 0 && (
                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                <p className="text-xs font-medium text-amber-800 mb-1">
                                  Data Limitations
                                </p>
                                <ul className="space-y-0.5">
                                  {candidate.dataCaveats.map((c, j) => (
                                    <li
                                      key={j}
                                      className="text-xs text-amber-700"
                                    >
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}

                  {/* Error results */}
                  {analyzeResults.filter((r) => r.error && !r.fitScore)
                    .length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Failed to analyze
                      </h3>
                      {analyzeResults
                        .filter((r) => r.error && !r.fitScore)
                        .map((r, i) => (
                          <div
                            key={i}
                            className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-2"
                          >
                            {r.candidateName}: {r.error}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ConsentGate>
  );
}
