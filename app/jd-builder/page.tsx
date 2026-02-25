"use client";

import { useState } from "react";

interface JDResult {
  jobDescription: string;
  linkedinPost: string;
  candidateSummary: string;
  booleanSearch: string;
}

const tabs = [
  { key: "jobDescription" as const, label: "Job Description" },
  { key: "linkedinPost" as const, label: "LinkedIn Post" },
  { key: "candidateSummary" as const, label: "Candidate Summary" },
  { key: "booleanSearch" as const, label: "Boolean Search" },
];

export default function JDBuilder() {
  const [roleTitle, setRoleTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<JDResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<keyof JDResult>("jobDescription");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!notes) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/jd-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleTitle, notes }),
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Smart JD Builder
        </h1>
        <p className="mt-2 text-muted">
          Paste rough hiring notes and get a polished job description, LinkedIn
          post, candidate summary, and boolean search string.
        </p>
      </div>

      {/* Form */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1.5">
            Role Title (optional)
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
            Hiring Manager Notes / Intake Information
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={`Paste your hiring manager notes, intake call notes, or rough job requirements here...\n\nExample:\n- Need a senior backend engineer\n- Must know Python and AWS\n- Team of 5, reports to VP Eng\n- Remote OK, prefer EST timezone\n- Building data pipeline for ML team`}
            rows={10}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!notes || isLoading}
          className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Generating..." : "Generate Job Description"}
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
            Generating polished recruiting materials...
          </p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8">
          <div className="flex gap-1 mb-4 border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
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

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {result[activeTab]}
            </div>
            <button
              onClick={() => copyToClipboard(result[activeTab])}
              className="mt-4 text-sm text-primary hover:text-primary-hover font-medium"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
