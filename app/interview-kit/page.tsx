"use client";

import { useState } from "react";

interface BehavioralQuestion {
  question: string;
  followUp: string;
  whatToLookFor: string;
}

interface TechnicalQuestion {
  question: string;
  context: string;
  whatToLookFor: string;
}

interface ScorecardItem {
  criteria: string;
  description: string;
  scale: Record<string, string>;
}

interface InterviewKitResult {
  behavioralQuestions: BehavioralQuestion[];
  technicalQuestions: TechnicalQuestion[];
  scorecard: ScorecardItem[];
  interviewerNotes: string;
}

type TabKey = "behavioral" | "technical" | "scorecard" | "notes";

const tabsList: { key: TabKey; label: string }[] = [
  { key: "behavioral", label: "Behavioral Questions" },
  { key: "technical", label: "Technical Questions" },
  { key: "scorecard", label: "Scorecard" },
  { key: "notes", label: "Interviewer Notes" },
];

export default function InterviewKit() {
  const [roleTitle, setRoleTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [candidateProfile, setCandidateProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InterviewKitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("behavioral");

  const handleSubmit = async () => {
    if (!roleTitle || !jobDescription) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/interview-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleTitle, jobDescription, candidateProfile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Interview Kit Generator
        </h1>
        <p className="mt-2 text-muted">
          Generate behavioral questions, technical prompts, evaluation
          scorecards, and interviewer prep notes for any role.
        </p>
      </div>

      {/* Form */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1.5">
            Role Title
          </label>
          <input
            type="text"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1.5">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description or key requirements..."
            rows={6}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1.5">
            Candidate Profile (optional)
          </label>
          <textarea
            value={candidateProfile}
            onChange={(e) => setCandidateProfile(e.target.value)}
            placeholder="Paste candidate summary or resume highlights to tailor questions to a specific candidate..."
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!roleTitle || !jobDescription || isLoading}
          className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Generating..." : "Generate Interview Kit"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="mt-3 text-muted">
            Generating interview preparation materials...
          </p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8">
          <div className="flex gap-1 mb-4 border-b border-border overflow-x-auto">
            {tabsList.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm">
            {/* Behavioral Questions */}
            {activeTab === "behavioral" && (
              <div className="divide-y divide-border">
                {result.behavioralQuestions.map((q, i) => (
                  <div key={i} className="p-5">
                    <p className="font-medium text-foreground">
                      {i + 1}. {q.question}
                    </p>
                    <div className="mt-2 ml-4 space-y-1">
                      <p className="text-sm text-muted">
                        <span className="font-medium text-foreground/70">
                          Follow-up:
                        </span>{" "}
                        {q.followUp}
                      </p>
                      <p className="text-sm text-muted">
                        <span className="font-medium text-foreground/70">
                          Look for:
                        </span>{" "}
                        {q.whatToLookFor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Questions */}
            {activeTab === "technical" && (
              <div className="divide-y divide-border">
                {result.technicalQuestions.map((q, i) => (
                  <div key={i} className="p-5">
                    <p className="font-medium text-foreground">
                      {i + 1}. {q.question}
                    </p>
                    <div className="mt-2 ml-4 space-y-1">
                      <p className="text-sm text-muted">
                        <span className="font-medium text-foreground/70">
                          Why this matters:
                        </span>{" "}
                        {q.context}
                      </p>
                      <p className="text-sm text-muted">
                        <span className="font-medium text-foreground/70">
                          Look for:
                        </span>{" "}
                        {q.whatToLookFor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Scorecard */}
            {activeTab === "scorecard" && (
              <div className="divide-y divide-border">
                {result.scorecard.map((item, i) => (
                  <div key={i} className="p-5">
                    <h4 className="font-medium text-foreground">
                      {item.criteria}
                    </h4>
                    <p className="text-sm text-muted mt-1">
                      {item.description}
                    </p>
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {Object.entries(item.scale).map(([score, desc]) => (
                        <div
                          key={score}
                          className="text-center p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="font-semibold text-foreground">
                            {score}
                          </div>
                          <div className="text-xs text-muted mt-0.5">
                            {desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Interviewer Notes */}
            {activeTab === "notes" && (
              <div className="p-6">
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {result.interviewerNotes}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
