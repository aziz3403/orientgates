"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategory, getProductsByCategory, categories } from "@/lib/data";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMousePosition } from "@/lib/hooks";
import { useState } from "react";

function ProductCard({ product, index }: { product: any; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimateIn delay={index * 80}>
      <Link href={`/collection/${product.category}/${product.slug}`}>
        <div
          className="group relative overflow-hidden luxury-border luxury-border-hover"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden">
            <LuxuryImage
              src={product.images[0]}
              alt={product.title}
              width={600}
              height={800}
              className={`w-full h-full transition-transform duration-[1200ms] ease-out ${
                hovered ? "scale-105" : "scale-100"
              }`}
              label={product.title}
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] tracking-[0.3em] uppercase text-brass">
                {product.period}
              </span>
            </div>
            <h3 className="text-lg font-serif text-ivory mb-2 group-hover:text-pearl transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-gray">{product.origin}</span>
              <span className="text-sm font-serif italic text-ivory">
                {product.price || "Price on Request"}
              </span>
            </div>

            {/* Hover reveal */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <p className="text-xs text-pearl/50 line-clamp-2 mb-3">
                {product.description}
              </p>
              <span className="text-[10px] tracking-[0.2em] uppercase text-brass flex items-center gap-2">
                View Details
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </AnimateIn>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategory(slug);
  const products = getProductsByCategory(slug);
  const { ref, position } = useMousePosition();
  const isMotherOfPearl = slug === "mother-of-pearl";

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight">
        <div className="text-center">
          <h1 className="text-heading font-serif text-ivory mb-4">Collection Not Found</h1>
          <Link href="/" className="btn-luxury-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        ref={ref}
        className={`relative ${isMotherOfPearl ? "h-[85vh] min-h-[600px]" : "h-[70vh] min-h-[500px]"} flex items-end overflow-hidden`}
      >
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(1.05) translate(${(position.x - 0.5) * -8}px, ${(position.y - 0.5) * -8}px)`,
          }}
        >
          <LuxuryImage
            src={category.image}
            alt={category.title}
            width={1920}
            height={1080}
            className="w-full h-full"
            label={category.title}
            priority
          />
        </div>

        <div className={`absolute inset-0 bg-gradient-to-t ${category.accent} opacity-40`} />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-midnight/20" />

        {/* Mother-of-pearl shimmer */}
        {isMotherOfPearl && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, rgba(232,224,212,0.15), transparent 50%)`,
            }}
          />
        )}

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-16 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-[10px] tracking-[0.2em] uppercase text-warm-gray">
            <Link href="/" className="hover:text-brass transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ivory">Collection</span>
            <span>/</span>
            <span className="text-brass">{category.title}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-brass" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
              {category.subtitle}
            </span>
          </div>

          <h1 className={`font-serif text-ivory mb-6 ${isMotherOfPearl ? "text-display-xl" : "text-display"}`}>
            {category.title}
          </h1>

          <p className="text-pearl/70 max-w-2xl text-lg leading-relaxed">
            {category.heroDescription}
          </p>
        </div>
      </section>

      {/* Mother-of-Pearl special storytelling section */}
      {isMotherOfPearl && (
        <section className="py-section bg-midnight">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                {
                  title: "The Shell",
                  description: "Each fragment of mother-of-pearl is harvested from shells found in the waters of the Red Sea and Persian Gulf, prized for their extraordinary iridescence.",
                },
                {
                  title: "The Pattern",
                  description: "Geometric patterns are drawn from centuries of Islamic mathematical art — infinite in their complexity, perfectly balanced in their symmetry.",
                },
                {
                  title: "The Light",
                  description: "As light moves across the surface, the shell catches and refracts it, creating an ever-changing display of soft luminescence unique to each piece.",
                },
              ].map((item, i) => (
                <AnimateIn key={item.title} delay={i * 150}>
                  <div className="text-center p-8 luxury-border luxury-border-hover">
                    <h3 className="text-xl font-serif text-ivory mb-4">{item.title}</h3>
                    <p className="text-sm text-warm-gray leading-relaxed">{item.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Collection Grid */}
      <section className="py-section bg-charcoal">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {/* Info bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <p className="text-sm text-warm-gray">
              Showing {products.length} piece{products.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.15em] uppercase text-warm-gray">
              <span className="text-brass">All</span>
              <span className="cursor-pointer hover:text-ivory transition-colors">Featured</span>
              <span className="cursor-pointer hover:text-ivory transition-colors">Recent</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* No products fallback */}
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-warm-gray mb-6">New pieces are being added to this collection.</p>
              <Link href="/contact" className="btn-luxury-primary">Inquire About Available Pieces</Link>
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="py-section bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimateIn className="text-center mb-12">
            <span className="text-[11px] tracking-[0.35em] uppercase text-brass">Continue Exploring</span>
            <h2 className="text-heading font-serif text-ivory mt-4">Other Collections</h2>
          </AnimateIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories
              .filter((c) => c.slug !== slug)
              .map((cat, i) => (
                <AnimateIn key={cat.slug} delay={i * 100}>
                  <Link href={`/collection/${cat.slug}`}>
                    <div className="group relative aspect-[4/3] overflow-hidden luxury-border luxury-border-hover">
                      <LuxuryImage
                        src={cat.image}
                        alt={cat.title}
                        width={400}
                        height={300}
                        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                        label={cat.title}
                      />
                      <div className="absolute inset-0 bg-midnight/60 group-hover:bg-midnight/40 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-serif text-ivory tracking-wider">{cat.title}</span>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
