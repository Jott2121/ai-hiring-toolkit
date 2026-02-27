import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          AI Hiring Toolkit
        </h1>
        <p className="text-lg text-gray-600">
          Your AI Recruiting Assistant for resume screening and interview
          preparation. Upload a job description and resumes — instantly receive
          structured candidate evaluations and interview prep materials.
        </p>

        <ul className="text-sm text-gray-500 space-y-1">
          <li>✓ Resume scoring &amp; gap analysis</li>
          <li>✓ Smart job description builder</li>
          <li>✓ Interview kit generator</li>
        </ul>

        <Link
          href="/roles/new"
          className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          Create Role
        </Link>
      </div>
    </main>
  );
}