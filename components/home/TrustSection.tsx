"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

export default function TrustSection() {
  return (
    <section className="relative py-section bg-midnight overflow-hidden">
      {/* Zellige tile pattern background */}
      <div className="absolute inset-0 pattern-zellige" />
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Editorial quote layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 mb-section">
          <div className="lg:col-span-5">
            <AnimateIn>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-12 h-px bg-brass/40" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-brass/70 font-sans">
                  Trusted Worldwide
                </span>
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-serif text-ivory leading-[1.05]">
                A Standard
                <br />
                <span className="italic text-pearl/70">of Excellence</span>
              </h2>
            </AnimateIn>
          </div>

          <div className="lg:col-span-7 flex items-end">
            <AnimateIn delay={200}>
              <blockquote className="relative">
                <div className="absolute -top-6 -left-4 text-6xl font-serif text-brass/15 leading-none">&ldquo;</div>
                <p className="text-xl lg:text-2xl font-serif text-ivory/80 leading-[1.6] italic">
                  The Orient Gates is a rare find in the world of antiques — combining
                  deep expertise with impeccable taste and a genuine passion for the
                  extraordinary objects they deal in.
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="w-8 h-px bg-brass/30" />
                  <span className="text-[11px] tracking-[0.2em] uppercase text-warm-gray/80 font-sans">
                    A Private Collector, London
                  </span>
                </footer>
              </blockquote>
            </AnimateIn>
          </div>
        </div>

        {/* Trust pillars — horizontal editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {[
            {
              number: "150+",
              label: "Years of Expertise",
              text: "Five generations of knowledge in authentication, sourcing, and master craftsmanship.",
            },
            {
              number: "1000+",
              label: "Pieces Curated",
              text: "Every object examined with scholarly rigour and restored to museum conservation standards.",
            },
            {
              number: "30+",
              label: "Countries Served",
              text: "Specialist fine art shipping and white-glove delivery to collectors worldwide.",
            },
            {
              number: "∞",
              label: "Personal Service",
              text: "Private viewings, bespoke sourcing, and dedicated advisory for every client.",
            },
          ].map((item, i) => (
            <AnimateIn key={item.label} delay={i * 100}>
              <div className="group relative p-10 lg:p-12 border border-white/[0.04] hover:border-brass/15 transition-all duration-700 h-full hover:bg-charcoal/30">
                <span className="block text-4xl lg:text-5xl font-serif gold-text leading-none mb-4 transition-transform duration-500 group-hover:translate-x-1">
                  {item.number}
                </span>
                <span className="block text-[10px] tracking-[0.3em] uppercase text-brass/60 font-sans mb-4">
                  {item.label}
                </span>
                <p className="text-[13px] text-warm-gray/80 leading-relaxed font-sans">
                  {item.text}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/designers-collectors"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-brass/80 font-sans hover:text-brass transition-colors duration-500"
          >
            <span>For Designers & Collectors</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-brass/20" />
          <Link
            href="/heritage"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-warm-gray/80 font-sans hover:text-ivory transition-colors duration-500"
          >
            <span>Our Heritage</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
