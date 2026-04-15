"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";

const milestones = [
  { year: "1870", title: "The Beginning", description: "The Orient Gates is founded in Damascus, rooted in generations of artisan heritage and a deep reverence for craftsmanship." },
  { year: "1920", title: "Expanding Horizons", description: "The family begins collecting and trading European antiques alongside the Levantine tradition, bridging East and West." },
  { year: "1960", title: "A New Generation", description: "The third generation takes the helm, establishing relationships with international collectors and institutions." },
  { year: "1985", title: "The Gallery", description: "A dedicated showroom opens, presenting museum-quality pieces to a growing community of discerning collectors." },
  { year: "2010", title: "Global Reach", description: "The Orient Gates expands its services globally, offering private sourcing, advisory, and white-glove delivery worldwide." },
  { year: "Today", title: "A Living Legacy", description: "Five generations later, the family continues its mission: preserving extraordinary objects and connecting them with those who will treasure them." },
];

export default function HeritagePage() {
  const { ref, position } = useMousePosition();

  return (
    <>
      {/* Hero */}
      <section
        ref={ref}
        className="relative h-[75vh] min-h-[500px] flex items-end overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(1.05) translate(${(position.x - 0.5) * -8}px, ${(position.y - 0.5) * -8}px)`,
          }}
        >
          <LuxuryImage
            src="/images/heritage-hero.jpg"
            alt="Heritage workshop"
            width={1920}
            height={1080}
            className="w-full h-full"
            label="The Orient Gates Heritage"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/30" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-brass" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Our Heritage</span>
          </div>
          <h1 className="text-display-xl font-serif text-ivory mb-6">
            A Legacy Written<br />
            <span className="italic text-pearl/80">in Artistry</span>
          </h1>
          <p className="text-lg text-pearl/70 max-w-xl leading-relaxed">
            Over 150 years of preserving the world&apos;s most extraordinary antiques
            and the art of mother-of-pearl craftsmanship.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <AnimateIn>
              <div className="aspect-[3/4] overflow-hidden luxury-border">
                <LuxuryImage
                  src="/images/heritage-family.jpg"
                  alt="Family legacy"
                  width={800}
                  height={1067}
                  className="w-full h-full"
                  label="Family Legacy"
                />
              </div>
            </AnimateIn>

            <div className="flex flex-col justify-center">
              <AnimateIn>
                <h2 className="text-display font-serif text-ivory mb-8">
                  The Story of<br />The Orient Gates
                </h2>
              </AnimateIn>

              <AnimateIn delay={100}>
                <p className="text-warm-gray leading-relaxed mb-6">
                  The story of The Orient Gates begins in the ancient city of Damascus,
                  where for centuries, master artisans transformed wood, shell, and
                  precious metals into objects of transcendent beauty. Our family has
                  been part of this tradition for over 150 years — first as craftsmen,
                  then as collectors, and now as custodians of a remarkable legacy.
                </p>
              </AnimateIn>

              <AnimateIn delay={200}>
                <p className="text-warm-gray leading-relaxed mb-6">
                  Through five generations, we have preserved not just objects, but
                  the knowledge, technique, and reverence that went into creating them.
                  We have watched as many of the great workshops have closed, as
                  traditions have faded, and as the world has moved ever faster. Yet
                  we remain committed to the belief that some things are worth slowing
                  down for.
                </p>
              </AnimateIn>

              <AnimateIn delay={300}>
                <p className="text-warm-gray leading-relaxed">
                  Today, The Orient Gates serves collectors, interior designers,
                  galleries, and institutions worldwide. Every piece we offer has been
                  chosen with the same discerning eye that has guided our family for
                  over a century — because we believe that truly extraordinary objects
                  deserve to be found by those who will treasure them.
                </p>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-section bg-charcoal">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-20">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Our Journey</span>
            <h2 className="text-display font-serif text-ivory mt-4">Through the Years</h2>
          </AnimateIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-brass/20" />

            <div className="space-y-16">
              {milestones.map((milestone, i) => (
                <AnimateIn key={milestone.year} delay={i * 100}>
                  <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 ${i % 2 === 0 ? "" : "lg:direction-rtl"}`}>
                    {/* Dot */}
                    <div className="absolute left-8 lg:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-brass bg-charcoal z-10" />

                    <div className={`pl-20 lg:pl-0 ${i % 2 === 0 ? "lg:pr-20 lg:text-right" : "lg:col-start-2 lg:pl-20"}`}>
                      <span className="text-3xl font-serif gold-text">{milestone.year}</span>
                      <h3 className="text-xl font-serif text-ivory mt-2 mb-3">{milestone.title}</h3>
                      <p className="text-sm text-warm-gray leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-16">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">What We Stand For</span>
            <h2 className="text-heading font-serif text-ivory mt-4">Our Principles</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { title: "Authenticity", description: "Every piece we offer is examined with scholarly rigor. We stake our reputation on the authenticity and quality of every object in our collection." },
              { title: "Preservation", description: "We are custodians of cultural heritage. Our conservation practices honour the original artistry while ensuring these treasures endure for future generations." },
              { title: "Discretion", description: "We understand the nature of collecting at this level. Every inquiry is handled with absolute confidentiality and personal attention." },
            ].map((value, i) => (
              <AnimateIn key={value.title} delay={i * 100}>
                <div className="bg-midnight p-12 text-center group hover:bg-charcoal transition-colors duration-700">
                  <h3 className="text-xl font-serif text-ivory mb-4">{value.title}</h3>
                  <p className="text-sm text-warm-gray leading-relaxed">{value.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
