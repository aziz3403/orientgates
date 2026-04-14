"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import { useMousePosition } from "@/lib/hooks";

export default function InquiryCTA() {
  const { ref, position } = useMousePosition();

  return (
    <section
      ref={ref}
      className="relative py-section overflow-hidden"
      style={{
        background: `radial-gradient(800px circle at ${position.x * 100}% ${position.y * 100}%, rgba(44,24,16,0.5), rgba(10,10,10,1) 70%)`,
      }}
    >
      {/* Pearl shimmer */}
      <div className="absolute inset-0 pearl-shimmer opacity-30" />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <div className="flex justify-center mb-8">
              <div className="luxury-divider-short" />
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
              Private Inquiry
            </span>
          </AnimateIn>

          <AnimateIn delay={200}>
            <h2 className="text-display font-serif text-ivory mt-6 mb-8">
              Acquire Something
              <br />
              <span className="italic">Extraordinary</span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={300}>
            <p className="text-warm-gray max-w-lg mx-auto mb-12 leading-relaxed">
              Whether you seek a specific masterpiece, wish to explore our
              collection privately, or require bespoke sourcing — our specialists
              are at your service.
            </p>
          </AnimateIn>

          <AnimateIn delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-luxury-gold">
                Request Private Viewing
              </Link>
              <Link href="/contact" className="btn-luxury-primary">
                Speak With Our Team
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={500}>
            <div className="flex justify-center items-center gap-8 mt-12 text-[10px] tracking-[0.2em] uppercase text-warm-gray">
              <span className="hover:text-brass transition-colors cursor-pointer">WhatsApp</span>
              <span className="w-1 h-1 rounded-full bg-brass/30" />
              <span className="hover:text-brass transition-colors cursor-pointer">Instagram</span>
              <span className="w-1 h-1 rounded-full bg-brass/30" />
              <span className="hover:text-brass transition-colors cursor-pointer">Email</span>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
