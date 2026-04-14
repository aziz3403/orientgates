"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[750px] flex items-center overflow-hidden bg-midnight"
    >
      {/* Layered background with parallax */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 luxury-gradient" />

        {/* Animated radial glow following mouse */}
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{
            opacity: loaded ? 0.6 : 0,
            background: `radial-gradient(1200px ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(44,24,16,0.5) 0%, transparent 60%)`,
          }}
        />

        {/* Pearl shimmer layer */}
        <div
          className="absolute inset-0 transition-opacity duration-[3000ms]"
          style={{
            opacity: loaded ? 0.15 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(232,224,212,0.12) 0%, transparent 50%)`,
          }}
        />

        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 80px, rgba(184,151,47,0.4) 80px, rgba(184,151,47,0.4) 81px),
              repeating-linear-gradient(-60deg, transparent, transparent 80px, rgba(184,151,47,0.4) 80px, rgba(184,151,47,0.4) 81px)`,
          }}
        />
      </div>

      {/* Horizontal decorative lines */}
      <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brass/[0.06] to-transparent" />
      <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brass/[0.06] to-transparent" />

      {/* Large decorative logo watermark */}
      <div
        className={`absolute right-[-5%] top-1/2 -translate-y-1/2 transition-all duration-[3000ms] ${
          loaded ? "opacity-[0.03] translate-x-0" : "opacity-0 translate-x-20"
        }`}
      >
        <Logo size={800} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-16 w-full">
        <div className="max-w-4xl">
          {/* Overline with animated line */}
          <div
            className={`flex items-center gap-5 mb-10 transition-all duration-1200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div
              className={`h-px bg-brass transition-all duration-1200 ${
                loaded ? "w-16" : "w-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            />
            <span className="text-[10px] tracking-[0.35em] uppercase text-brass/80 font-sans">
              A Family Legacy Since 1870
            </span>
          </div>

          {/* Main headline — single cohesive statement */}
          <h1
            className={`text-[clamp(2.5rem,7.5vw,7rem)] font-serif text-ivory/90 leading-[1.15] tracking-[-0.02em] transition-all duration-[1400ms] ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            Rare Antiques &amp;
            <br />
            <span className="italic text-brass/80">Mother-of-Pearl</span>
            <br />
            <span className="text-ivory/50">Masterpieces</span>
          </h1>

          {/* Subtitle */}
          <div
            className={`mt-8 lg:mt-12 transition-all duration-1200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1400ms" }}
          >
            <p className="text-[14px] lg:text-[17px] text-pearl/75 max-w-lg leading-[1.8] font-sans">
              Five generations of expertise in handcrafted mother-of-pearl furniture,
              Islamic antiques, and museum-quality collector pieces for
              the world&apos;s most discerning collectors.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 lg:mt-14 transition-all duration-1200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1800ms" }}
          >
            <Link
              href="/mother-of-pearl"
              className="group inline-flex items-center justify-center gap-3 border border-brass/50 text-ivory/90 px-8 sm:px-10 py-4 sm:py-5 text-[11px] tracking-[0.25em] uppercase font-sans transition-all duration-500 hover:border-brass/80 hover:text-ivory"
            >
              <span>Explore the Collection</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 border border-ivory/10 text-ivory/60 px-8 sm:px-10 py-4 sm:py-5 text-[11px] tracking-[0.25em] uppercase font-sans transition-all duration-500 hover:border-ivory/25 hover:text-ivory/80"
            >
              <span>Private Inquiry</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient + scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-midnight to-transparent" />

      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4 transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "2500ms" }}
      >
        <span className="text-[8px] tracking-[0.35em] uppercase text-warm-gray/50 font-sans">
          Scroll
        </span>
        <div className="relative w-px h-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brass/50 to-transparent animate-scroll-down" />
        </div>
      </div>

      {/* Side accent */}
      <div
        className={`absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 transition-all duration-[2000ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "2000ms" }}
      >
        <div className="hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-brass/20 to-transparent" />
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-warm-gray/75 font-sans"
            style={{ writingMode: "vertical-rl" }}
          >
            Since 1870
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-brass/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
