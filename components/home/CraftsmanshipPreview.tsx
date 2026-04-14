"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";

const craftSteps = [
  {
    title: "Shell Selection",
    description:
      "Each fragment of mother-of-pearl is carefully selected for its iridescence, thickness, and quality.",
    image: "/images/craft-shell.jpg",
  },
  {
    title: "Hand Carving",
    description:
      "Master artisans carve intricate geometric patterns into walnut using traditional tools.",
    image: "/images/craft-carving.jpg",
  },
  {
    title: "Inlay Setting",
    description:
      "Thousands of individual shell fragments are precisely cut and set into carved channels.",
    image: "/images/craft-inlay.jpg",
  },
  {
    title: "Polishing",
    description:
      "Multiple stages of hand polishing reveal the natural luminescence of the shell.",
    image: "/images/craft-polish.jpg",
  },
];

export default function CraftsmanshipPreview() {
  return (
    <section className="relative py-section bg-charcoal overflow-hidden">
      <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 lg:mb-28">
          <div className="lg:col-span-6">
            <AnimateIn>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-px bg-brass/40" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-brass/70 font-sans">
                  The Art Behind the Art
                </span>
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-serif text-ivory leading-[0.95]">
                Centuries
                <br />
                <span className="italic text-pearl/40">of Craft</span>
              </h2>
            </AnimateIn>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <AnimateIn delay={200}>
              <p className="text-[14px] text-warm-gray/50 leading-[1.9] font-sans max-w-md">
                Every piece is the result of techniques refined over centuries. From shell
                selection to final polish, the process is an act of devotion to beauty.
              </p>
            </AnimateIn>
          </div>
        </div>

        {/* Craft steps — editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {craftSteps.map((step, i) => (
            <AnimateIn key={step.title} delay={200 + i * 120}>
              <div className="group relative">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden border border-white/[0.04] group-hover:border-brass/15 transition-all duration-700 mb-8">
                  <LuxuryImage
                    src={step.image}
                    alt={step.title}
                    width={400}
                    height={533}
                    className="w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    label={step.title}
                  />
                  {/* Step number overlay */}
                  <div className="absolute top-6 left-6">
                    <span className="text-[60px] font-serif gold-text opacity-20 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-lg font-serif text-ivory mb-3 group-hover:text-brass transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-[13px] text-warm-gray/50 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn className="mt-20 text-center">
          <Link
            href="/craftsmanship"
            className="group inline-flex items-center gap-3 border border-ivory/15 text-ivory/70 px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans transition-all duration-500 hover:border-brass/30 hover:text-ivory"
          >
            <span>Discover the Craft</span>
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
