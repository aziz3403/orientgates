"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import NacreBackdrop from "@/components/ui/NacreBackdrop";
import { useMousePosition } from "@/lib/hooks";

const processes = [
  {
    title: "Design & Drawing",
    description: "Every piece begins with a master drawing — the rasmi. Using brass compasses, straight-edges, and centuries-old mathematical principles, the artisan composes the intricate geometric pattern on paper that will guide every cut, every channel, every placement that follows.",
    detail: "The designs draw on the rich vocabulary of Islamic geometric art — six-, eight-, and twelve-pointed star polygons, arabesques, and interlacing forms — refined across more than a thousand years of Levantine and wider Islamic tradition.",
    image: "/images/craft-process/01-design-drawing.jpg",
  },
  {
    title: "Wood Preparation",
    description: "Only properly aged walnut is selected for its grain, density, and stability. The wood is seasoned naturally over years, then shaped and joined using traditional mortise-and-tenon joinery — no nails, no screws.",
    detail: "Stability is everything. The substrate must hold thousands of tiny inlay pieces securely for centuries, while remaining workable enough to take the razor-thin channels that will receive them.",
    image: "/images/craft-process/02-wood-preparation.jpg",
  },
  {
    title: "Shell Cutting",
    description: "Mother-of-pearl shells from the Red Sea and Persian Gulf are hand-selected for their iridescence, thickness, and structural integrity. Using a jeweller's bow saw, the artisan cuts each fragment by eye — shaping thousands of pieces that will form the pattern.",
    detail: "A single cabinet may require over 15,000 individual pieces of shell, each cut to fit a specific cell. The artisan accounts for variations in shell thickness and colour to keep the finished surface harmonious.",
    image: "/images/craft-process/03-shell-cutting.jpg",
  },
  {
    title: "Carving & Channel Work",
    description: "Using fine chisels and gouges, the artisan incises precise channels into the walnut. Each channel must be exactly the right depth and width to receive its corresponding piece of shell — a tolerance measured in fractions of a millimetre.",
    detail: "This is perhaps the most demanding stage. It requires absolute steadiness of hand and an intuitive understanding of how wood and shell will move together over decades as they expand and contract with the seasons.",
    image: "/images/craft-process/04-carving-channels.jpg",
  },
  {
    title: "Silver Wire Lining",
    description: "Thin silver wire is drawn through small jewellery pliers and bent, by hand, into the carved channels — defining the outline of every cell in the geometric pattern before any shell is set. This is what distinguishes the Damascene tradition from European marquetry.",
    detail: "The metal threads do two things at once: they lock the design's structure into the wood, and they catch light at angles the pearl cannot. The finished surface has two distinct kinds of shimmer playing against the dark walnut.",
    image: "/images/craft-process/05-silver-wire-lining.jpg",
  },
  {
    title: "Inlay Setting",
    description: "Each shell fragment is fitted into its silver-bordered cell with tweezers and a fine push tool, set with a traditional adhesive, and pressed flush with the surface. The artisan works section by section, checking alignment and visual harmony at every stage.",
    detail: "Setting alone may take weeks or months for a major piece. Every fragment must sit perfectly level with its neighbours and with the wood, creating a single seamless expanse of pattern.",
    image: "/images/craft-process/06-inlay-setting.jpg",
  },
  {
    title: "Polishing & Finishing",
    description: "Successive rounds of hand sanding — from coarse to mirror-smooth — bring the surface to a glass-like finish. A natural wax dressing allows the mother-of-pearl to catch and refract light, producing the ethereal iridescence the work is known for.",
    detail: "The final polish is what transforms the piece from remarkable to alive. As light moves across the surface, each shell fragment, each silver thread, each grain in the walnut catches it differently — a slow, ever-shifting display.",
    image: "/images/craft-process/07-polishing-finishing.jpg",
  },
];

export default function CraftsmanshipPage() {
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
            src="/images/craftsmanship-hero.jpg"
            alt="Master craftsman at work"
            width={1920}
            height={1080}
            className="w-full h-full"
            label="Master Craftsmanship"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/30" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-brass" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">The Art Behind the Art</span>
          </div>
          <h1 className="text-display-xl font-serif text-ivory mb-6">
            Craftsmanship
          </h1>
          <p className="text-lg text-pearl/70 max-w-xl leading-relaxed">
            Understanding the extraordinary skill, patience, and devotion that
            transforms raw materials into objects of enduring beauty.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-section bg-midnight">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <AnimateIn>
            <p className="text-xl font-serif text-ivory leading-relaxed mb-8">
              &ldquo;The true value of a handmade object lies not only in the beauty
              of the finished piece, but in the centuries of knowledge embodied in
              every cut, every join, every polished surface.&rdquo;
            </p>
            <div className="luxury-divider-short mx-auto" />
          </AnimateIn>
        </div>
      </section>

      {/* Process steps */}
      <section className="relative bg-charcoal overflow-hidden">
        <NacreBackdrop />

        <div className="relative">
          {processes.map((process, i) => (
            <div key={process.title} className="border-b border-white/5 last:border-b-0">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-section">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${i % 2 === 1 ? "" : ""}`}>
                  {/* Image */}
                  <AnimateIn direction={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative">
                      <div className="aspect-[3/4] overflow-hidden luxury-border max-w-[480px] mx-auto lg:mx-0">
                        <LuxuryImage
                          src={process.image}
                          alt={process.title}
                          width={900}
                          height={1200}
                          className="w-full h-full"
                          label={process.title}
                        />
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-6 -left-3 lg:left-8">
                        <span className="text-7xl font-serif gold-text opacity-20">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </AnimateIn>

                  {/* Text */}
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <AnimateIn>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-brass" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-brass">
                          Step {i + 1}
                        </span>
                      </div>
                      <h2 className="text-heading font-serif text-ivory mb-6">
                        {process.title}
                      </h2>
                      <p className="text-warm-gray leading-relaxed mb-6">
                        {process.description}
                      </p>
                      <p className="text-sm text-pearl/70 leading-relaxed italic">
                        {process.detail}
                      </p>
                    </AnimateIn>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preservation section */}
      <section className="relative py-section bg-midnight overflow-hidden">
        <NacreBackdrop opacity={28} />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-16">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
              Beyond Creation
            </span>
            <h2 className="text-display font-serif text-ivory mt-4 mb-6">
              Preservation & Restoration
            </h2>
            <p className="text-warm-gray max-w-2xl mx-auto leading-relaxed">
              Our expertise extends beyond new craftsmanship to the sensitive
              restoration and preservation of antique pieces. Using traditional
              techniques and materials, we bring treasured objects back to their
              original splendour while respecting their age and history.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Conservation", description: "Stabilising and protecting pieces using museum-standard techniques that arrest deterioration without altering the original character." },
              { title: "Restoration", description: "Sensitive repair using traditional materials and methods, matching original techniques to achieve seamless integration with surviving elements." },
              { title: "Authentication", description: "Scholarly examination of construction, materials, and provenance to establish authenticity, period, and origin with confidence." },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 100}>
                <div className="p-10 luxury-border luxury-border-hover text-center group hover:bg-charcoal transition-colors duration-700">
                  <h3 className="text-lg font-serif text-ivory mb-4 group-hover:text-brass transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">{item.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-section bg-charcoal text-center overflow-hidden">
        <NacreBackdrop />
        <div className="relative max-w-2xl mx-auto px-6">
          <AnimateIn>
            <h2 className="text-heading font-serif text-ivory mb-6">
              Experience the Craft
            </h2>
            <p className="text-warm-gray mb-10 leading-relaxed">
              Visit our collection to see these extraordinary techniques embodied
              in museum-quality pieces available for acquisition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mother-of-pearl-furniture" className="btn-luxury-gold">
                Explore Mother-of-Pearl
              </Link>
              <Link href="/contact" className="btn-luxury-primary">
                Arrange a Viewing
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
