"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import Logo from "@/components/Logo";
import { useRef, useState, useEffect } from "react";

export default function InquiryCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = sectionRef.current;
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-section overflow-hidden bg-midnight"
    >
      {/* Islamic star pattern */}
      <div className="absolute inset-0 pattern-stars" />
      {/* Animated background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(800px ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(44,24,16,0.4), transparent 60%)`,
        }}
      />

      {/* Geometric accent */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg, transparent, transparent 80px, rgba(184,151,47,0.4) 80px, rgba(184,151,47,0.4) 81px), repeating-linear-gradient(-60deg, transparent, transparent 80px, rgba(184,151,47,0.4) 80px, rgba(184,151,47,0.4) 81px)",
          }}
        />
      </div>

      {/* Centered logo watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
        <Logo size={500} />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <AnimateIn>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-brass/30 to-transparent mx-auto mb-10" />
        </AnimateIn>

        <AnimateIn delay={100}>
          <span className="text-[10px] tracking-[0.35em] uppercase text-brass/60 font-sans">
            Private Inquiry
          </span>
        </AnimateIn>

        <AnimateIn delay={200}>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-serif text-ivory mt-6 mb-8 leading-[1.1]">
            Acquire Something
            <br />
            <span className="italic text-pearl/70">Extraordinary</span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={300}>
          <p className="text-[14px] text-warm-gray/80 max-w-md mx-auto mb-14 leading-[1.9] font-sans">
            Whether you seek a masterpiece, wish to explore our collection
            privately, or require bespoke sourcing — our specialists are at
            your service.
          </p>
        </AnimateIn>

        <AnimateIn delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 bg-brass text-midnight px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(184,151,47,0.2)]"
            >
              <span className="relative z-10">Request Private Viewing</span>
              <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 border border-ivory/15 text-ivory/70 px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans transition-all duration-500 hover:border-brass/30 hover:text-ivory"
            >
              Speak With Our Team
            </Link>
          </div>
        </AnimateIn>

        <AnimateIn delay={500}>
          <div className="flex justify-center items-center gap-10 mt-14 text-[9px] tracking-[0.3em] uppercase text-warm-gray/80 font-sans">
            <span className="hover:text-brass transition-colors duration-500 cursor-pointer">
              WhatsApp
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="hover:text-brass transition-colors duration-500 cursor-pointer">
              Instagram
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="hover:text-brass transition-colors duration-500 cursor-pointer">
              Email
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
