"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";

const processes = [
  {
    title: "Design & Drawing",
    description: "Every piece begins with a master drawing (rasmi). Using compasses, rulers, and centuries-old mathematical principles, the artisan creates intricate geometric and floral patterns on paper that will guide every cut and placement.",
    detail: "The designs draw on the rich vocabulary of Islamic geometric art — star patterns, arabesques, and interlacing forms that have been refined over a thousand years of artistic tradition.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80&fit=crop",
  },
  {
    title: "Wood Preparation",
    description: "Only the finest aged walnut and hardwoods are selected for their grain, density, and stability. The wood is seasoned naturally over years, then carefully shaped and joined using traditional joinery methods that require no nails or screws.",
    detail: "The choice of wood is crucial — it must be stable enough to hold thousands of tiny inlay pieces securely for centuries, while being workable enough to carve the intricate channels that receive them.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80&fit=crop",
  },
  {
    title: "Shell Cutting",
    description: "Mother-of-pearl shells are hand-selected for their iridescence and quality. Using fine saws and files, artisans cut each piece of shell individually — shaping thousands of tiny fragments that will form the inlay pattern.",
    detail: "A single cabinet may require over 15,000 individual pieces of shell, each cut to precise dimensions. The artisan must account for the natural variations in shell thickness and colour to create a harmonious whole.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&fit=crop",
  },
  {
    title: "Carving & Channel Work",
    description: "Using chisels and gouges, the artisan carves precise channels into the wood surface. Each channel must be exactly the right depth and width to receive its corresponding piece of shell — a tolerance measured in fractions of a millimetre.",
    detail: "This is perhaps the most demanding stage, requiring absolute steadiness of hand and an understanding of how wood and shell will interact over time as they expand and contract with changes in temperature and humidity.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&fit=crop",
  },
  {
    title: "Inlay Setting",
    description: "Each shell fragment is set into its channel using traditional adhesives and pressed firmly into place. The artisan works section by section, building up the pattern gradually — checking alignment, fit, and visual harmony at every stage.",
    detail: "The setting process alone may take weeks or months for a major piece. Each fragment must sit perfectly flush with its neighbours and with the wood surface, creating a seamless expanse of pattern.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80&fit=crop",
  },
  {
    title: "Polishing & Finishing",
    description: "Multiple rounds of hand sanding and polishing bring the surface to a glass-like smoothness. The natural wax finish allows the mother-of-pearl to catch and refract light, creating the ethereal glow that makes these pieces so extraordinary.",
    detail: "The final polish is what transforms the piece from remarkable to magical. As light plays across the surface, each shell fragment catches it differently, creating an ever-shifting display of soft iridescence.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&fit=crop",
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
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&q=80&fit=crop"
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
      <section className="bg-charcoal">
        {processes.map((process, i) => (
          <div key={process.title} className="border-b border-white/5 last:border-b-0">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-section">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${i % 2 === 1 ? "" : ""}`}>
                {/* Image */}
                <AnimateIn direction={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden luxury-border">
                      <LuxuryImage
                        src={process.image}
                        alt={process.title}
                        width={800}
                        height={600}
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
                    <p className="text-sm text-pearl/40 leading-relaxed italic">
                      {process.detail}
                    </p>
                  </AnimateIn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Preservation section */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
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
      <section className="py-section bg-charcoal text-center">
        <div className="max-w-2xl mx-auto px-6">
          <AnimateIn>
            <h2 className="text-heading font-serif text-ivory mb-6">
              Experience the Craft
            </h2>
            <p className="text-warm-gray mb-10 leading-relaxed">
              Visit our collection to see these extraordinary techniques embodied
              in museum-quality pieces available for acquisition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collection/mother-of-pearl" className="btn-luxury-gold">
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
