"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

const trustPoints = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="16" cy="16" r="14" />
        <path d="M16 8v8l5 3" />
      </svg>
    ),
    title: "150+ Years of Expertise",
    description:
      "Five generations of knowledge in antiques, authentication, and craftsmanship. Our expertise is your assurance of quality.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M16 2l4 8 8 1-6 5 2 8-8-4-8 4 2-8-6-5 8-1z" />
      </svg>
    ),
    title: "Museum-Quality Standards",
    description:
      "Every piece is examined, authenticated, and when necessary, restored to the highest conservation standards.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="4" y="8" width="24" height="18" rx="2" />
        <path d="M4 14h24M10 20h4" />
      </svg>
    ),
    title: "Worldwide Delivery",
    description:
      "Specialist fine art shipping and white-glove delivery to collectors and designers in over 30 countries.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="16" cy="12" r="6" />
        <path d="M8 28c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
    title: "Personal Service",
    description:
      "Private viewings, bespoke sourcing, and dedicated advisory for collectors, designers, and institutions.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-section bg-midnight">
      {/* Subtle border top */}
      <div className="luxury-divider" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-section">
        {/* Header */}
        <AnimateIn className="text-center mb-20">
          <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
            Why Collectors Trust Us
          </span>
          <h2 className="text-heading font-serif text-ivory mt-4 mb-6">
            A Standard of Excellence
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto text-sm leading-relaxed">
            Trusted by interior designers, private collectors, galleries, and
            hospitality projects worldwide.
          </p>
        </AnimateIn>

        {/* Trust grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {trustPoints.map((point, i) => (
            <AnimateIn key={point.title} delay={i * 100}>
              <div className="bg-midnight p-10 lg:p-12 group hover:bg-charcoal transition-colors duration-700 h-full">
                <div className="text-brass mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                  {point.icon}
                </div>
                <h3 className="text-base font-serif text-ivory mb-3">
                  {point.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {point.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn className="text-center mt-16">
          <Link href="/designers-collectors" className="btn-luxury-primary">
            For Designers & Collectors
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
