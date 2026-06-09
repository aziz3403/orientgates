"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center bg-midnight">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-32 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-brass/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans">
            Something went wrong
          </span>
          <div className="w-12 h-px bg-brass/40" />
        </div>
        <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-serif text-ivory leading-[1.1] mb-6">
          A momentary interruption
        </h1>
        <p className="text-[14px] text-warm-gray/80 font-sans leading-[1.85] max-w-xl mx-auto mb-12">
          Our apologies — the page could not be displayed. Please try again,
          or reach us directly and we will assist you personally.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] tracking-[0.3em] uppercase font-sans">
          <button
            type="button"
            onClick={reset}
            className="text-brass hover:text-brass-light transition-colors"
          >
            Try Again
          </button>
          <Link href="/" className="text-warm-gray/70 hover:text-ivory transition-colors">
            Home
          </Link>
          <Link href="/contact" className="text-warm-gray/70 hover:text-ivory transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
