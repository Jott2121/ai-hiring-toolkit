"use client";

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-amber-600 text-lg mt-0.5 shrink-0">
          &#9888;
        </span>
        <div className="flex-1">
          <p className="text-sm text-amber-800 font-medium mb-1">
            Important Legal Notice
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">
            This tool generates suggestions only. You are solely responsible for
            complying with LinkedIn&apos;s User Agreement, GitHub terms, GDPR,
            CCPA, EEOC, CAN-SPAM, and all applicable laws. We do not scrape
            data, store candidate information beyond your current session, or
            train on your inputs. Always obtain consent before contacting
            candidates.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
              &#128274; Session-only data
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
              &#128683; We never train on your data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
