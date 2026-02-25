"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/resume-scorer", label: "Resume Scorer" },
  { href: "/jd-builder", label: "JD Builder" },
  { href: "/interview-kit", label: "Interview Kit" },
  { href: "/sourcing", label: "Sourcing" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link href="/" className="font-semibold text-foreground text-lg">
          AI Hiring Toolkit
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-primary-light text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
