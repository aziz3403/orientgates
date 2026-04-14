"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";

export default function HeritageStory() {
  return (
    <section className="relative py-section bg-midnight overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(184,151,47,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(44,24,16,0.3) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <AnimateIn direction="left">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden luxury-border">
                <LuxuryImage
                  src="/images/heritage-workshop.jpg"
                  alt="Traditional craftsman workshop"
                  width={800}
                  height={1067}
                  className="w-full h-full"
                  label="Heritage Workshop"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-8 -right-4 lg:right-8 bg-charcoal border border-brass/20 px-8 py-6 backdrop-blur-sm">
                <span className="block text-4xl font-serif gold-text">150+</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-warm-gray mt-1 block">
                  Years of Heritage
                </span>
              </div>
            </div>
          </AnimateIn>

          {/* Text side */}
          <div>
            <AnimateIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-brass" />
                <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
                  Our Heritage
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={100}>
              <h2 className="text-display font-serif text-ivory mb-8">
                A Family Tradition
                <br />
                <span className="italic text-pearl/80">Since 1870</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={200}>
              <p className="text-warm-gray leading-relaxed mb-6">
                For over 150 years, The Orient Gates has been a guardian of rare
                antiques and the finest mother-of-pearl craftsmanship. Our story
                begins in the ancient workshops of Damascus, where master artisans
                transformed precious materials into objects of enduring beauty.
              </p>
            </AnimateIn>

            <AnimateIn delay={300}>
              <p className="text-warm-gray leading-relaxed mb-10">
                Today, we continue this legacy — sourcing museum-quality pieces
                from across the Islamic world and Europe, preserving the art of
                shell inlay, and connecting collectors worldwide with objects that
                carry the weight of history and the brilliance of handmade artistry.
              </p>
            </AnimateIn>

            <AnimateIn delay={400}>
              <div className="flex flex-wrap gap-12 mb-10">
                {[
                  { number: "5", label: "Generations" },
                  { number: "1000+", label: "Pieces Curated" },
                  { number: "30+", label: "Countries Served" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="block text-2xl font-serif gold-text">
                      {stat.number}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={500}>
              <Link href="/heritage" className="btn-luxury-primary">
                Discover Our Story
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                </svg>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
