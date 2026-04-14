"use client";

import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";

export default function SignatureMasterpieces() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="relative py-section bg-charcoal">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimateIn className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
                Selected Works
              </span>
              <h2 className="text-display font-serif text-ivory mt-4">
                Signature Masterpieces
              </h2>
            </div>
            <Link
              href="/collection/mother-of-pearl"
              className="text-[11px] tracking-[0.2em] uppercase text-warm-gray hover:text-brass transition-colors duration-300 flex items-center gap-2"
            >
              View All Pieces
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
          </div>
        </AnimateIn>

        {/* Masterpiece grid - asymmetric editorial layout */}
        <div className="space-y-20">
          {featured.map((product, i) => (
            <AnimateIn key={product.id} delay={i * 100}>
              <Link href={`/collection/${product.category}/${product.slug}`}>
                <div
                  className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                    i % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${
                      i % 2 === 1 ? "lg:col-start-6 lg:col-span-7" : "lg:col-span-7"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden luxury-border luxury-border-hover">
                      <LuxuryImage
                        src={product.images[0]}
                        alt={product.title}
                        width={1000}
                        height={750}
                        className="w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        label={product.title}
                      />
                    </div>
                    {/* Floating label */}
                    <div className="absolute top-6 left-6 bg-midnight/80 backdrop-blur-sm px-4 py-2 border border-brass/20">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-brass">
                        {product.period}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div
                    className={`${
                      i % 2 === 1 ? "lg:col-start-1 lg:col-span-5 lg:row-start-1" : "lg:col-span-5"
                    } flex flex-col justify-center`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-px bg-brass" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-brass">
                        {product.origin}
                      </span>
                    </div>

                    <h3 className="text-heading font-serif text-ivory mb-4 group-hover:text-pearl transition-colors duration-300">
                      {product.title}
                    </h3>

                    <p className="text-sm text-warm-gray leading-relaxed mb-6 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-6 mb-6 text-[11px] tracking-[0.1em] text-pearl/50">
                      <span>{product.materials.slice(0, 2).join(" · ")}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ivory font-serif italic">
                        {product.price || "Price on Request"}
                      </span>
                      <span className="text-[11px] tracking-[0.2em] uppercase text-brass opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                        View Details
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="transition-transform duration-500 group-hover:translate-x-1"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Divider */}
              {i < featured.length - 1 && (
                <div className="luxury-divider mt-20" />
              )}
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
