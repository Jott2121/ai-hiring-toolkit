"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Role {
  id: string;
  title: string;
  description: string;
}

const ACCEPTED = ".pdf,.doc,.docx";

export default function UploadResumesPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = useState<Role | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`role-${id}`);
    if (raw) setRole(JSON.parse(raw) as Role);
  }, [id]);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;

    const next = [...files];
    for (let i = 0; i < incoming.length; i++) {
      const f = incoming[i];
      // de-dupe by name+size
      if (!next.some((x) => x.name === f.name && x.size === f.size)) {
        next.push(f);
      }
    }
    setFiles(next);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (!role) return;
    if (files.length === 0) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // clear prior results for this id
      sessionStorage.removeItem(`results-${id}`);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleTitle: role.title,
          jd: role.description,
          resumes: files.map((f) => ({ filename: f.name })),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Analyze failed (${response.status}): ${text}`);
      }

      const data = await response.json();

      // ✅ the Results page will read THIS
      sessionStorage.setItem(`results-${id}`, JSON.stringify(data));

      router.push(`/roles/${id}/results`);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong calling /api/analyze");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!role) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Role not found. Please start from the beginning.
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Resumes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Role: <span className="font-medium text-gray-700">{role.title}</span>
          </p>
        </div>

        {/* Drop zone */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-lg border-2 border-dashed border-gray-300 p-10 text-center hover:border-gray-400 transition-colors"
        >
          <p className="text-sm text-gray-600">
            Click to select resumes (PDF, DOC, DOCX)
          </p>
          <p className="mt-1 text-xs text-gray-400">You can select multiple files</p>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* File list */}
        {files.length > 0 && (
          <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${f.size}`}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span className="truncate text-gray-700">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-4 text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          disabled={files.length === 0 || isAnalyzing}
          onClick={handleAnalyze}
          className="w-full rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAnalyzing
            ? "Analyzing…"
            : `Analyze ${files.length} Resume${files.length !== 1 ? "s" : ""} →`}
        </button>
      </div>
    </main>
  );
}