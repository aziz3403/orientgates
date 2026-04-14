"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";
import { getProductsByCategory } from "@/lib/data";

export default function MotherOfPearlPage() {
  const { ref, position } = useMousePosition();
  const products = getProductsByCategory("mother-of-pearl");

  return (
    <>
      {/* Cinematic Hero */}
      <section
        ref={ref}
        className="relative h-screen min-h-[700px] max-h-[1200px] flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(1.08) translate(${(position.x - 0.5) * -12}px, ${(position.y - 0.5) * -12}px)`,
          }}
        >
          <LuxuryImage
            src="/images/mother-of-pearl-hero.jpg"
            alt="Mother-of-Pearl Masterpiece"
            width={1920}
            height={1080}
            className="w-full h-full"
            label="Mother-of-Pearl"
            priority
          />
        </div>

        {/* Rich layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/50 to-midnight/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/30" />

        {/* Interactive pearl shimmer */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(800px circle at ${position.x * 100}% ${position.y * 100}%, rgba(232,224,212,0.08), transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 pearl-gradient opacity-30" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-brass" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
                The Signature Collection
              </span>
            </div>

            <h1 className="text-display-xl font-serif text-ivory mb-8">
              Mother-of-Pearl
            </h1>

            <p className="text-xl text-pearl/70 max-w-xl leading-relaxed mb-12">
              Where light meets shell, where mathematics meets devotion, where
              centuries of tradition are embodied in every luminous surface.
              This is the art that defines The Orient Gates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#collection" className="btn-luxury-gold">
                View the Collection
              </Link>
              <Link href="/craftsmanship" className="btn-luxury-primary">
                Discover the Craft
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent" />
      </section>

      {/* Story section */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateIn>
              <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
                The Art of Light
              </span>
              <h2 className="text-display font-serif text-ivory mt-4 mb-8">
                A Tradition Born<br />
                <span className="italic text-pearl/80">in Damascus</span>
              </h2>
              <p className="text-warm-gray leading-relaxed mb-6">
                For centuries, the workshops of Damascus have been the epicentre
                of mother-of-pearl craftsmanship. Using techniques passed from
                master to apprentice over generations, artisans transform ordinary
                shells into extraordinary works of art — furniture that glows with
                an inner light and changes with every shift of illumination.
              </p>
              <p className="text-warm-gray leading-relaxed mb-6">
                Each piece in our mother-of-pearl collection represents hundreds
                of hours of painstaking handwork. Thousands of individually cut
                shell fragments are set into hand-carved channels in fine walnut,
                creating intricate geometric patterns that draw on centuries of
                Islamic mathematical art.
              </p>
              <p className="text-warm-gray leading-relaxed">
                The result is furniture that transcends mere function — these are
                pieces that command attention, inspire contemplation, and become
                the centrepiece of any room they inhabit.
              </p>
            </AnimateIn>

            <AnimateIn direction="right">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden luxury-border">
                  <LuxuryImage
                    src="/images/mop-detail-1.jpg"
                    alt="Mother-of-pearl detail"
                    width={800}
                    height={1067}
                    className="w-full h-full"
                    label="Shell Detail"
                  />
                </div>
                {/* Floating detail */}
                <div className="absolute -bottom-6 -left-6 lg:left-auto lg:-right-6 bg-charcoal p-6 border border-brass/20 max-w-[240px]">
                  <span className="block text-3xl font-serif gold-text">15,000+</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mt-1 block">
                    Individual shell pieces in a single cabinet
                  </span>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Process highlights */}
      <section className="py-section bg-charcoal">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-16">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">The Process</span>
            <h2 className="text-heading font-serif text-ivory mt-4">
              From Shell to Masterpiece
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Shell",
                description: "Mother-of-pearl shells are harvested from the waters of the Red Sea and Persian Gulf. Each is selected for its exceptional iridescence, thickness, and luminous quality.",
                image: "/images/mop-process-1.jpg",
              },
              {
                title: "The Pattern",
                description: "Drawing on centuries of Islamic geometric art, master draughtsmen create patterns of breathtaking complexity — mathematical perfection rendered in organic material.",
                image: "/images/mop-process-2.jpg",
              },
              {
                title: "The Light",
                description: "When complete, the surface comes alive. As light shifts across thousands of shell fragments, each catches and refracts it differently, creating an ever-changing luminescence.",
                image: "/images/mop-process-3.jpg",
              },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 150}>
                <div className="group">
                  <div className="aspect-square overflow-hidden luxury-border luxury-border-hover mb-6">
                    <LuxuryImage
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={600}
                      className="w-full h-full transition-transform duration-[1200ms] group-hover:scale-105"
                      label={item.title}
                    />
                  </div>
                  <h3 className="text-xl font-serif text-ivory mb-3 group-hover:text-brass transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-16">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Available Pieces</span>
            <h2 className="text-display font-serif text-ivory mt-4">
              The Collection
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <AnimateIn key={product.id} delay={i * 100}>
                <Link href={`/collection/mother-of-pearl/${product.slug}`}>
                  <div className="group relative overflow-hidden luxury-border luxury-border-hover">
                    <div className="aspect-[4/3] overflow-hidden">
                      <LuxuryImage
                        src={product.images[0]}
                        alt={product.title}
                        width={800}
                        height={600}
                        className="w-full h-full transition-transform duration-[1200ms] group-hover:scale-105"
                        label={product.title}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-brass block mb-2">
                        {product.period}
                      </span>
                      <h3 className="text-xl font-serif text-ivory mb-2 group-hover:text-pearl transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-warm-gray">{product.origin}</span>
                        <span className="text-sm font-serif italic text-ivory">
                          {product.price || "Price on Request"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn className="text-center mt-16">
            <Link href="/contact" className="btn-luxury-gold">
              Inquire About Mother-of-Pearl
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
