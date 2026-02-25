"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "sourcing-consent-accepted";

interface ConsentGateProps {
  children: React.ReactNode;
}

export default function ConsentGate({ children }: ConsentGateProps) {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);

  // Read consent from localStorage on mount
  useEffect(() => {
    setHasConsented(localStorage.getItem(CONSENT_KEY) === "true");
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setHasConsented(true);
  };

  // Loading state (avoid flash of consent gate on returning users)
  if (hasConsented === null) {
    return null;
  }

  if (hasConsented) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Before You Begin
        </h2>
        <p className="text-muted-foreground mb-4">
          The Sourcing Assistant helps you generate search strategies, craft
          outreach messages, and evaluate public profile data. Please review the
          following before proceeding:
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5 shrink-0">&#8226;</span>
              <span>
                <strong>No scraping or unauthorized data collection.</strong>{" "}
                This tool does not access any platform APIs on your behalf or
                scrape any websites.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5 shrink-0">&#8226;</span>
              <span>
                <strong>Session-only data.</strong> No candidate information is
                stored beyond your current browser session. We do not persist
                profiles, messages, or analysis results.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5 shrink-0">&#8226;</span>
              <span>
                <strong>Your responsibility.</strong> You must comply with
                LinkedIn&apos;s User Agreement, GitHub terms, GDPR, CCPA, EEOC
                guidelines, CAN-SPAM Act, EU AI Act, and all applicable laws
                when using generated content.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5 shrink-0">&#8226;</span>
              <span>
                <strong>Always obtain consent.</strong> Before contacting
                candidates, ensure you have a lawful basis for outreach under
                applicable privacy regulations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5 shrink-0">&#8226;</span>
              <span>
                <strong>We never train on your data.</strong> Your inputs are
                processed in real-time and discarded after generating results.
              </span>
            </li>
          </ul>
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
          />
          <span className="text-sm text-foreground">
            I understand and agree to use this tool responsibly and in compliance
            with all applicable platform terms of service and privacy laws.
          </span>
        </label>

        <button
          onClick={handleAccept}
          disabled={!checked}
          className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Sourcing Assistant
        </button>
      </div>
    </div>
  );
}
