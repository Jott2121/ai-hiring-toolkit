"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRolePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const id = crypto.randomUUID();
    const role = { id, title: title.trim(), description: description.trim() };

    sessionStorage.setItem(`role-${id}`, JSON.stringify(role));
sessionStorage.setItem(`role:${id}:title`, title.trim());
sessionStorage.setItem(`role:${id}:jd`, description.trim());
    router.push(`/roles/${id}/upload`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Role</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter the role details. You&apos;ll upload resumes in the next step.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              id="description"
              required
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the full job description or hiring manager notes here…"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Continue → Upload Resumes
          </button>
        </form>
      </div>
    </main>
  );
}