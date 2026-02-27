"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Role {
  id: string;
  title: string;
  description: string;
}

type AnalyzeResult = {
  roleTitle: string;
  jdLength: number;
  count: number;
  results: Array<{
    candidateName: string;
    fitScore: number;
    strengths: string[];
    risks: string[];
    interviewFocus: string[];
    suggestedQuestions: string[];
  }>;
  note?: string;
};

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();

  const [role, setRole] = useState<Role | null>(null);
  const [data, setData] = useState<AnalyzeResult | null>(null);

  useEffect(() => {
    const rawRole = sessionStorage.getItem(`role-${id}`);
    if (rawRole) setRole(JSON.parse(rawRole) as Role);

    // ✅ THIS is what Upload page saves
    const rawResults = sessionStorage.getItem(`results-${id}`);
    if (rawResults) setData(JSON.parse(rawResults) as AnalyzeResult);
  }, [id]);

  if (!role) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Role not found. Please start from the beginning.
      </main>
    );
  }

  const candidates = data?.results ?? [];

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Results</h1>
          <p className="mt-1 text-sm text-gray-500">
            Role: <span className="font-medium text-gray-700">{role.title}</span>
          </p>
          {data?.note && <p className="mt-2 text-xs text-gray-400">{data.note}</p>}
        </div>

        {!data && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
            No analysis found for this role yet.
            <div className="mt-3">
              <Link
                href={`/roles/${id}/upload`}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Go upload resumes
              </Link>
            </div>
          </div>
        )}

        {data && candidates.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
            Analysis ran, but no candidate results were returned.
          </div>
        )}

        {candidates.length > 0 && (
          <div className="space-y-4">
            {candidates.map((c, idx) => (
              <div key={`${c.candidateName}-${idx}`} className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{c.candidateName}</div>
                    <div className="mt-1 text-sm text-gray-500">Fit score: {c.fitScore}</div>
                  </div>
                  <div className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                    {c.fitScore}/100
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Strengths</div>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {c.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900">Risks</div>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {c.risks.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-900">Interview focus</div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {c.interviewFocus.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-900">Suggested questions</div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {c.suggestedQuestions.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}