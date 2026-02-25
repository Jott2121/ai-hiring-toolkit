"use client";

import { useState, useRef, useCallback } from "react";

interface FileInfo {
  file: File;
  name: string;
}

interface EvaluationCriteria {
  criteria: string;
  assessment: string;
  rating: "strong" | "moderate" | "weak";
}

interface CandidateResult {
  candidateName: string;
  fitScore: number;
  strengths: string[];
  risks: string[];
  interviewFocus: string[];
  suggestedQuestions: string[];
  evaluationRubric: EvaluationCriteria[];
  error?: string;
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ResumeScorer() {
  const [roleTitle, setRoleTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CandidateResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList) => {
    const accepted = Array.from(newFiles).filter(
      (f) =>
        f.type === "application/pdf" ||
        f.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => `${f.name}-${f.file.size}`));
      const unique = accepted.filter(
        (f) => !existing.has(`${f.name}-${f.size}`)
      );
      return [...prev, ...unique.map((f) => ({ file: f, name: f.name }))];
    });
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!roleTitle || !jobDescription || files.length === 0) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const resumes = await Promise.all(
        files.map(async ({ file, name }) => ({
          name,
          type: file.type,
          content: await toBase64(file),
        }))
      );

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleTitle, jobDescription, resumes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Resume Scoring Engine
        </h1>
        <p className="mt-2 text-muted">
          Upload a job description and resumes to instantly receive structured
          candidate evaluations.
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
            placeholder="Paste the full job description here..."
            rows={8}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1.5">Resumes</label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-primary bg-primary-light"
                : "border-border hover:border-primary/50 hover:bg-primary-light/50"
            }`}
          >
            <p className="text-muted">
              Drop PDF or DOCX files here, or{" "}
              <span className="text-primary font-medium">browse</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
          {files.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {files.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-sm"
                >
                  {f.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="hover:text-primary-hover font-bold"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            !roleTitle || !jobDescription || files.length === 0 || isLoading
          }
          className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Analyzing..." : "Analyze Candidates"}
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
            Analyzing resumes against job requirements...
          </p>
        </div>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Candidate Results</h2>
          <div className="space-y-6">
            {results.map((candidate, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-6 shadow-sm"
              >
                {candidate.error && !candidate.fitScore ? (
                  <div className="text-red-600">{candidate.error}</div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        {candidate.candidateName}
                      </h3>
                      <span
                        className={`text-2xl font-bold ${scoreTextColor(candidate.fitScore)}`}
                      >
                        {candidate.fitScore}/100
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                      <div
                        className={`h-2 rounded-full ${scoreColor(candidate.fitScore)} transition-all`}
                        style={{ width: `${candidate.fitScore}%` }}
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

                    {candidate.evaluationRubric &&
                      candidate.evaluationRubric.length > 0 && (
                        <div>
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
                                {candidate.evaluationRubric.map((r, j) => (
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
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
