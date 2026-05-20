"use client";

import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";
import { useProducts, productMatchers } from "@/lib/products-client";

export default function MotherOfPearlPage() {
  const { ref, position } = useMousePosition();
  const { products, loading } = useProducts(productMatchers.byCategoryOrSubcategory("mother-of-pearl"));

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

      {/* Collection */}
      <section id="collection" className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-16">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Available Pieces</span>
            <h2 className="text-display font-serif text-ivory mt-4">
              The Collection
            </h2>
          </AnimateIn>

          {loading && products.length === 0 ? (
            <p className="text-warm-gray/60 text-sm font-sans text-center">Loading…</p>
          ) : (
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
          )}

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
