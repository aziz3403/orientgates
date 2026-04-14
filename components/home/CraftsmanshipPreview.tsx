"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";

const craftSteps = [
  {
    title: "Shell Selection",
    description:
      "Each piece of mother-of-pearl is carefully selected for its iridescence, thickness, and quality before being shaped by hand.",
    image: "/images/craft-shell.jpg",
  },
  {
    title: "Hand Carving",
    description:
      "Master artisans carve intricate geometric patterns into walnut using traditional tools passed down through generations.",
    image: "/images/craft-carving.jpg",
  },
  {
    title: "Inlay Setting",
    description:
      "Thousands of individual shell fragments are precisely cut and set into carved channels, creating mesmerizing patterns.",
    image: "/images/craft-inlay.jpg",
  },
  {
    title: "Polishing & Finishing",
    description:
      "Multiple stages of hand polishing bring out the natural luminescence of the shell and the warmth of the wood.",
    image: "/images/craft-polish.jpg",
  },
];

export default function CraftsmanshipPreview() {
  return (
    <section className="relative py-section bg-charcoal overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(184,151,47,0.3) 40px, rgba(184,151,47,0.3) 41px)",
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimateIn className="text-center mb-20">
          <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
            The Art Behind the Art
          </span>
          <h2 className="text-display font-serif text-ivory mt-4 mb-6">
            Centuries of Craft
          </h2>
          <p className="text-warm-gray max-w-2xl mx-auto text-sm leading-relaxed">
            Every piece in our collection is the result of techniques refined over
            centuries. From shell selection to final polish, the process is an
            act of devotion to beauty.
          </p>
        </AnimateIn>

        {/* Craft steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {craftSteps.map((step, i) => (
            <AnimateIn key={step.title} delay={i * 150}>
              <div className="group relative">
                {/* Step number */}
                <div className="absolute -top-3 left-6 z-10 bg-charcoal px-3">
                  <span className="text-5xl font-serif gold-text opacity-30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden luxury-border luxury-border-hover mb-6">
                  <LuxuryImage
                    src={step.image}
                    alt={step.title}
                    width={400}
                    height={533}
                    className="w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    label={step.title}
                  />
                </div>

                {/* Text */}
                <h3 className="text-lg font-serif text-ivory mb-2 group-hover:text-brass transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn className="text-center mt-16">
          <Link href="/craftsmanship" className="btn-luxury-primary">
            Discover the Craft
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
