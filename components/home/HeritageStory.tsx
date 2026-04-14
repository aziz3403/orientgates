"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import Logo from "@/components/Logo";

export default function HeritageStory() {
  return (
    <section className="relative py-section bg-midnight overflow-hidden">
      {/* Background watermark */}
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 opacity-[0.015]">
        <Logo size={600} />
      </div>

      <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-28 items-center">
          {/* Image side */}
          <AnimateIn direction="left" className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden border border-white/[0.04]">
                <LuxuryImage
                  src="/images/heritage-workshop.jpg"
                  alt="Traditional craftsman workshop"
                  width={800}
                  height={1067}
                  className="w-full h-full"
                  label="Heritage Workshop"
                />
              </div>
              {/* Floating stat card */}
              <div className="relative sm:absolute mt-4 sm:mt-0 sm:-bottom-10 sm:-right-4 lg:right-[-30px] bg-midnight border border-brass/15 px-8 py-7 inline-block">
                <span className="block text-5xl font-serif gold-text leading-none">150+</span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-warm-gray/80 mt-2 block font-sans">
                  Years of Heritage
                </span>
              </div>
            </div>
          </AnimateIn>

          {/* Text side */}
          <div className="lg:col-span-7">
            <AnimateIn>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-px bg-brass/40" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-brass/70 font-sans">
                  Our Heritage
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={100}>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-serif text-ivory leading-[1.05] mb-10">
                A Family Tradition
                <br />
                <span className="italic text-pearl/70">Since 1870</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={200}>
              <p className="text-[14px] text-warm-gray/80 leading-[1.9] mb-6 font-sans max-w-xl">
                For over 150 years, The Orient Gates has been a guardian of rare
                antiques and the finest mother-of-pearl craftsmanship. Our story
                begins in the ancient workshops of Damascus, where master artisans
                transformed precious materials into objects of enduring beauty.
              </p>
            </AnimateIn>

            <AnimateIn delay={300}>
              <p className="text-[14px] text-warm-gray/80 leading-[1.9] mb-14 font-sans max-w-xl">
                Today, we continue this legacy — sourcing museum-quality pieces
                from across the Islamic world and Europe, preserving the art of
                shell inlay, and connecting collectors worldwide with objects that
                carry the weight of history.
              </p>
            </AnimateIn>

            <AnimateIn delay={400}>
              <div className="flex gap-8 sm:gap-16 mb-14">
                {[
                  { number: "5", label: "Generations" },
                  { number: "1000+", label: "Pieces Curated" },
                  { number: "30+", label: "Countries" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="block text-3xl font-serif gold-text leading-none">
                      {stat.number}
                    </span>
                    <span className="text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 mt-2 block font-sans">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={500}>
              <Link
                href="/heritage"
                className="group inline-flex items-center gap-3 border border-ivory/15 text-ivory/70 px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans transition-all duration-500 hover:border-brass/30 hover:text-ivory"
              >
                <span>Discover Our Story</span>
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
        </div>
      </div>
    </section>
  );
}
