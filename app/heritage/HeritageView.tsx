"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";

const generations = [
  {
    era: "Late 19th c.",
    name: "Muhammad Harb",
    epithet: "Abou Sobhi Al-Tinawi",
    description:
      "Our great-grandfather. A folk painter and master of reverse-glass painting in the old city, known across the Arab world by his artist name Abou Sobhi Al-Tinawi. His Antar and Abla cycles travelled from the old souqs into the collections of the Louvre, Paris — and most recently surfaced again in Sotheby's A Love Letter to Beirut: Arts and Culture 1960s–2020s (2024).",
  },
  {
    era: "Early–Mid 20th c.",
    name: "Tawfik Harb",
    epithet: "The founder",
    description:
      "Our grandfather formalised the family practice into The Orient Gates. Operating from the family workshop in the old quarter, he carried the household of artists into a house of collectors and dealers — buying, restoring, and placing the rarest pieces of the Levantine tradition.",
  },
  {
    era: "Late 20th c.",
    name: "Fawaz Harb",
    epithet: "The bridge",
    description:
      "Our father opened the house to the world. He brought European antiques alongside the Levantine tradition, built relationships with Sotheby's and major collectors abroad, and shipped the first pieces beyond the region.",
  },
  {
    era: "Today",
    name: "Aziz Harb",
    epithet: "The fourth generation",
    description:
      "I (Aziz) carry the work now — same eye, same hands, same patience — with showrooms by appointment in Beirut, Rome, and Brooklyn.",
  },
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
            Four Generations<br />
            <span className="italic text-pearl/80">of the Harb Family</span>
          </h1>
          <p className="text-lg text-pearl/70 max-w-xl leading-relaxed">
            A Levantine family of artists and collectors — from the painter
            Abou Sobhi Al-Tinawi to the house we carry today.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <AnimateIn>
              <div className="space-y-6">
                <div className="aspect-[3/2] overflow-hidden luxury-border">
                  <LuxuryImage
                    src="/images/abou-sobhi-portrait.jpg"
                    alt="Muhammad Harb (Abou Sobhi Al-Tinawi) painting at his desk"
                    width={800}
                    height={533}
                    className="w-full h-full"
                    label="Abou Sobhi Al-Tinawi"
                  />
                </div>
                <p className="text-[11px] text-warm-gray/60 italic font-sans leading-relaxed">
                  Muhammad Harb — known by his artist name Abou Sobhi
                  Al-Tinawi — at work in his studio. An Antar and Abla painting
                  visible at the lower-left of the desk.
                </p>
              </div>
            </AnimateIn>

            <div className="flex flex-col justify-center">
              <AnimateIn>
                <h2 className="text-display font-serif text-ivory mb-8">
                  Born inside<br />
                  <span className="italic text-pearl/80">a museum</span>
                </h2>
              </AnimateIn>

              <AnimateIn delay={100}>
                <p className="text-warm-gray leading-relaxed mb-6">
                  The Orient Gates begins with a single artist. In the
                  late-19th-century Levant, our great-grandfather Muhammad Harb — better known by
                  his artist name <span className="text-ivory/85">Abou Sobhi Al-Tinawi</span> —
                  painted the folk legends of the Arab world on glass and paper.
                  His Antar and Abla cycles travelled from the old souqs to
                  the Louvre in Paris, and resurfaced again in Sotheby&apos;s sale
                  <em> A Love Letter to Beirut: Arts and Culture 1960s–2020s</em> in 2024.
                </p>
              </AnimateIn>

              <AnimateIn delay={200}>
                <p className="text-warm-gray leading-relaxed mb-6">
                  Four generations later, the same family still carries the same
                  eye. We grew up inside one of the historic courtyard houses
                  of the old city — homes celebrated for their carved wood,
                  coloured glass, and mother-of-pearl inlay. Living inside what
                  is effectively a museum shaped everything we make and
                  everything we choose.
                </p>
              </AnimateIn>

              <AnimateIn delay={300}>
                <p className="text-warm-gray leading-relaxed">
                  My grandfather Tawfik built the practice into a house. My father
                  Fawaz brought it abroad. I — Aziz — carry it now, with showrooms
                  by appointment in Beirut, Rome, and Brooklyn. The
                  pieces we present have been chosen with the same eye that
                  guided four generations before us.
                </p>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Four generations timeline */}
      <section className="py-section bg-charcoal">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-20">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Our Lineage</span>
            <h2 className="text-display font-serif text-ivory mt-4">Four Generations</h2>
          </AnimateIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-brass/20" />

            <div className="space-y-16">
              {generations.map((g, i) => (
                <AnimateIn key={g.name} delay={i * 100}>
                  <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8`}>
                    {/* Dot */}
                    <div className="absolute left-8 lg:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-brass bg-charcoal z-10" />

                    <div className={`pl-20 lg:pl-0 ${i % 2 === 0 ? "lg:pr-20 lg:text-right" : "lg:col-start-2 lg:pl-20"}`}>
                      <span className="text-[12px] tracking-[0.3em] uppercase text-brass/70 font-sans">{g.era}</span>
                      <h3 className="text-2xl font-serif text-ivory mt-3">{g.name}</h3>
                      <p className="text-[13px] italic text-pearl/60 font-sans mt-1 mb-4">{g.epithet}</p>
                      <p className="text-sm text-warm-gray leading-relaxed">{g.description}</p>
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
              { title: "Authenticity", description: "Every piece we offer is examined with scholarly rigor. We stake our family name on the authenticity of each object." },
              { title: "Preservation", description: "We are custodians of cultural heritage. Our conservation honours the original artistry while ensuring these treasures endure." },
              { title: "Discretion", description: "Every inquiry is handled with absolute confidentiality and the personal attention of the family directly." },
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
