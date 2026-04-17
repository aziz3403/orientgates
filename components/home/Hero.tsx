"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[700px] flex items-center bg-midnight overflow-hidden">
      {/* Damascus Room background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-1.jpg"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ${
            loaded ? "opacity-60 scale-105" : "opacity-0 scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/20" />
      </div>

      {/* Islamic geometric overlay — mashrabiya lattice */}
      <div className="absolute inset-0 pattern-mashrabiya opacity-70" />

      {/* Ornamental corner frames */}
      {/* Top-left carved corner ornament */}
      <div className={`absolute top-4 left-4 lg:top-10 lg:left-10 w-28 h-28 lg:w-44 lg:h-44 transition-all duration-[2500ms] ${loaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1800ms" }}>
        <svg viewBox="0 0 120 120" fill="none">
          <path d="M0 50 L0 0 L50 0" stroke="rgba(184,151,47,0.35)" strokeWidth="0.8" />
          <path d="M0 35 L0 0 L35 0" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" />
          {/* Palmette at corner */}
          <path d="M4 4 C10 -2 18 -2 22 4" stroke="rgba(184,151,47,0.25)" strokeWidth="0.5" />
          <path d="M4 4 C-2 10 -2 18 4 22" stroke="rgba(184,151,47,0.25)" strokeWidth="0.5" />
          <path d="M8 8 C12 4 16 4 20 8" stroke="rgba(184,151,47,0.15)" strokeWidth="0.4" />
          <path d="M8 8 C4 12 4 16 8 20" stroke="rgba(184,151,47,0.15)" strokeWidth="0.4" />
          {/* Star at intersection */}
          <path d="M3 3L5 7L1 5L5 5L3 1L5 5L9 3L7 5Z" stroke="rgba(184,151,47,0.3)" strokeWidth="0.4" />
          <circle cx="5" cy="5" r="1" fill="rgba(184,151,47,0.3)" />
          {/* Decorative dots along arms */}
          <circle cx="18" cy="0" r="0.8" fill="rgba(184,151,47,0.2)" />
          <circle cx="30" cy="0" r="0.8" fill="rgba(184,151,47,0.15)" />
          <circle cx="42" cy="0" r="0.8" fill="rgba(184,151,47,0.1)" />
          <circle cx="0" cy="18" r="0.8" fill="rgba(184,151,47,0.2)" />
          <circle cx="0" cy="30" r="0.8" fill="rgba(184,151,47,0.15)" />
          <circle cx="0" cy="42" r="0.8" fill="rgba(184,151,47,0.1)" />
        </svg>
      </div>
      {/* Bottom-right carved corner ornament */}
      <div className={`absolute bottom-4 right-4 lg:bottom-10 lg:right-10 w-28 h-28 lg:w-44 lg:h-44 rotate-180 transition-all duration-[2500ms] ${loaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "2000ms" }}>
        <svg viewBox="0 0 120 120" fill="none">
          <path d="M0 50 L0 0 L50 0" stroke="rgba(184,151,47,0.35)" strokeWidth="0.8" />
          <path d="M0 35 L0 0 L35 0" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" />
          <path d="M4 4 C10 -2 18 -2 22 4" stroke="rgba(184,151,47,0.25)" strokeWidth="0.5" />
          <path d="M4 4 C-2 10 -2 18 4 22" stroke="rgba(184,151,47,0.25)" strokeWidth="0.5" />
          <path d="M8 8 C12 4 16 4 20 8" stroke="rgba(184,151,47,0.15)" strokeWidth="0.4" />
          <path d="M8 8 C4 12 4 16 8 20" stroke="rgba(184,151,47,0.15)" strokeWidth="0.4" />
          <path d="M3 3L5 7L1 5L5 5L3 1L5 5L9 3L7 5Z" stroke="rgba(184,151,47,0.3)" strokeWidth="0.4" />
          <circle cx="5" cy="5" r="1" fill="rgba(184,151,47,0.3)" />
          <circle cx="18" cy="0" r="0.8" fill="rgba(184,151,47,0.2)" />
          <circle cx="30" cy="0" r="0.8" fill="rgba(184,151,47,0.15)" />
          <circle cx="42" cy="0" r="0.8" fill="rgba(184,151,47,0.1)" />
          <circle cx="0" cy="18" r="0.8" fill="rgba(184,151,47,0.2)" />
          <circle cx="0" cy="30" r="0.8" fill="rgba(184,151,47,0.15)" />
          <circle cx="0" cy="42" r="0.8" fill="rgba(184,151,47,0.1)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full">
        <div className="max-w-3xl">
          {/* Overline with geometric diamond */}
          <div
            className={`flex items-center gap-4 mb-12 transition-all duration-1200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div
              className={`h-px bg-brass/60 transition-all duration-1200 ${
                loaded ? "w-12" : "w-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            />
            <svg width="8" height="8" viewBox="0 0 8 8" className="flex-shrink-0">
              <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" stroke="rgba(184,151,47,0.5)" strokeWidth="0.5" fill="none" />
            </svg>
            <span className="text-[10px] tracking-[0.35em] uppercase text-brass/70 font-sans">
              Est. 1870
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-[clamp(2.8rem,7vw,6.5rem)] font-serif text-ivory/95 leading-[1.08] tracking-[-0.02em] transition-all duration-[1600ms] ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            Rare Antiques &amp;
            <br />
            Mother-of-Pearl
            <br />
            <span className="text-ivory/40">Masterpieces</span>
          </h1>

          {/* Body */}
          <div
            className={`mt-10 lg:mt-14 transition-all duration-1200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <p className="text-[15px] lg:text-[17px] text-warm-gray/70 max-w-md leading-[1.9] font-sans">
              Five generations of expertise in handcrafted furniture,
              Islamic antiques, and museum-quality collector pieces.
            </p>
          </div>

          {/* CTA */}
          <div
            className={`mt-12 lg:mt-16 transition-all duration-1200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "1600ms" }}
          >
            <Link
              href="/mother-of-pearl"
              className="group inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-ivory/70 font-sans transition-all duration-500 hover:text-ivory"
            >
              <span>Explore the Collection</span>
              <div className="w-8 h-px bg-brass/50 transition-all duration-500 group-hover:w-14 group-hover:bg-brass/80" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "2500ms" }}
      >
        <div className="w-px h-10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-brass/40 to-transparent animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
