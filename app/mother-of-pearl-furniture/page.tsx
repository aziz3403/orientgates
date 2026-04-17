"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { getCategory, getChildCategories, getProductsByCategory } from "@/lib/data";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import ProductCard from "@/components/ProductCard";
import Logo from "@/components/Logo";
import { useMousePosition } from "@/lib/hooks";

export default function MotherOfPearlFurniturePage() {
  const category = getCategory("mother-of-pearl-furniture")!;
  const subcategories = getChildCategories("mother-of-pearl-furniture");
  const products = getProductsByCategory("mother-of-pearl-furniture");
  const { ref, position } = useMousePosition();

  return (
    <>
      {/* Cinematic Hero */}
      <section
        ref={ref}
        className="relative h-[85vh] min-h-[600px] max-h-[1000px] flex items-center overflow-hidden bg-midnight"
      >
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(1.08) translate(${(position.x - 0.5) * -12}px, ${(position.y - 0.5) * -12}px)`,
          }}
        >
          <LuxuryImage
            src={category.image}
            alt={category.title}
            width={1920}
            height={1080}
            className="w-full h-full"
            label="Mother of Pearl Furniture"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/50 to-midnight/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/30" />

        {/* Interactive shimmer */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(800px circle at ${position.x * 100}% ${position.y * 100}%, rgba(232,224,212,0.06), transparent 50%)`,
          }}
        />

        {/* Watermark */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-[0.02]">
          <Logo size={600} />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-px bg-brass" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-brass/80 font-sans">
                The Signature Collection
              </span>
            </div>

            <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-serif text-ivory leading-[1.05] mb-8">
              Mother of Pearl
              <br />
              <span className="italic gold-text">Furniture</span>
            </h1>

            <p className="text-[15px] text-pearl/75 max-w-lg leading-[1.8] font-sans mb-12">
              Where light meets shell, where mathematics meets devotion. Each piece
              represents centuries of Levantine artistry embodied in luminous surfaces
              of extraordinary beauty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#collection"
                className="group relative inline-flex items-center gap-3 bg-brass text-midnight px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.2)] transition-all duration-500"
              >
                <span className="relative z-10">View Collection</span>
                <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              <Link
                href="/craftsmanship"
                className="inline-flex items-center gap-3 border border-ivory/15 text-ivory/70 px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans hover:border-brass/30 hover:text-ivory transition-all duration-500"
              >
                Discover the Craft
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-midnight to-transparent" />
      </section>

      {/* Storytelling */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: "The Shell", text: "Each fragment is harvested from shells found in the Red Sea and Persian Gulf, prized for their extraordinary iridescence." },
              { title: "The Pattern", text: "Geometric patterns drawn from centuries of Islamic mathematical art — infinite in complexity, perfectly balanced in symmetry." },
              { title: "The Light", text: "As light moves across the surface, each shell fragment catches and refracts it, creating an ever-changing display of luminescence." },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 150}>
                <div className="text-center p-10 border border-white/[0.04] hover:border-brass/15 transition-all duration-700 group hover:bg-charcoal/30">
                  <span className="text-4xl font-serif gold-text opacity-30 block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-serif text-ivory mb-3 group-hover:text-brass transition-colors">{item.title}</h3>
                  <p className="text-[13px] text-warm-gray/80 leading-relaxed font-sans">{item.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Subcategory Navigation */}
      <section className="py-section bg-charcoal">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <AnimateIn className="mb-16">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-px bg-brass/30" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans">
                Browse by Type
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-serif text-ivory leading-[1.1]">
              Explore the Collection
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {subcategories.map((sub, i) => (
              <AnimateIn key={sub.slug} delay={i * 80}>
                <Link href={`/mother-of-pearl-furniture/${sub.slug}`}>
                  <div className="group relative aspect-[4/3] overflow-hidden border border-white/[0.04] hover:border-brass/15 transition-all duration-700">
                    <LuxuryImage
                      src={sub.image}
                      alt={sub.title}
                      width={400}
                      height={300}
                      className="w-full h-full transition-transform duration-[1200ms] group-hover:scale-105"
                      label={sub.title}
                    />
                    <div className="absolute inset-0 bg-midnight/50 group-hover:bg-midnight/30 transition-colors duration-700" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <h3 className="text-sm lg:text-base font-serif text-ivory tracking-wide group-hover:text-brass transition-colors">
                        {sub.title}
                      </h3>
                      <span className="text-[8px] tracking-[0.3em] uppercase text-warm-gray/70 mt-1 font-sans">
                        {sub.subtitle}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* All products */}
      <section id="collection" className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <AnimateIn className="mb-14">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans">
                  All Pieces
                </span>
                <h2 className="text-3xl font-serif text-ivory mt-3">
                  The Full Collection
                </h2>
              </div>
              <p className="text-[12px] text-warm-gray/70 font-sans">
                {products.length} pieces
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                basePath="/collection/mother-of-pearl-furniture"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
