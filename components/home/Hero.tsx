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
            loaded ? "opacity-30 scale-105" : "opacity-0 scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full">
        <div className="max-w-3xl">
          {/* Overline */}
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
            <span className="text-[10px] tracking-[0.35em] uppercase text-brass/70 font-sans">
              Est. 1870
            </span>
          </div>

          {/* Headline — one powerful statement */}
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

          {/* Single CTA — confidence is one choice, not two */}
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

      {/* Scroll indicator — desktop only, minimal */}
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
