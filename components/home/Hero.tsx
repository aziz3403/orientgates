"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMousePosition } from "@/lib/hooks";
import LuxuryImage from "@/components/ui/LuxuryImage";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { ref: mouseRef, position } = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={mouseRef}
      className="relative h-screen min-h-[700px] max-h-[1200px] flex items-center overflow-hidden"
    >
      {/* Background image with parallax mouse effect */}
      <div
        className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
        style={{
          transform: `scale(1.05) translate(${(position.x - 0.5) * -10}px, ${(position.y - 0.5) * -10}px)`,
        }}
      >
        <LuxuryImage
          src="/images/hero-main.jpg"
          alt="Luxury antique mother-of-pearl furniture"
          width={1920}
          height={1080}
          className="w-full h-full"
          label="The Orient Gates"
          priority
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/60 to-midnight/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />

      {/* Pearl shimmer effect */}
      <div className="absolute inset-0 pearl-gradient opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
          {/* Overline */}
          <div
            className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="w-12 h-px bg-brass" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
              Est. 1870 &mdash; A Family Legacy
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-display-xl font-serif text-ivory mb-8 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            A Legacy of{" "}
            <span className="italic text-pearl">Craftsmanship</span>
            <br />
            in Rare Antiques
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg lg:text-xl text-pearl/70 max-w-xl leading-relaxed mb-12 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            Over 150 years of heritage in handcrafted mother-of-pearl furniture,
            Islamic antiques, and museum-quality collector pieces.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <Link href="/collection/mother-of-pearl" className="btn-luxury-gold">
              Explore Mother-of-Pearl
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-luxury-primary">
              Private Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent" />

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1500ms" }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-warm-gray">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-brass/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
