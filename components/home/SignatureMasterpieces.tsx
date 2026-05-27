"use client";

import Link from "next/link";
import { productUrl } from "@/lib/data";
import { useProducts, sortNewest } from "@/lib/products-client";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";

export default function SignatureMasterpieces() {
  // Fetch everything, then prefer featured. If none are marked featured (or
  // not enough), fall back to the newest pieces that actually have a photo.
  const { products, loading } = useProducts();
  const withImages = products.filter((p) => p.images && p.images.length > 0);
  const featured = withImages.filter((p) => p.featured);
  const candidates = featured.length >= 4 ? featured : [...featured, ...withImages.filter((p) => !p.featured)];
  const display = sortNewest(candidates).slice(0, 4);

  return (
    <section className="relative py-section bg-charcoal overflow-hidden">
      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.008] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 100px, rgba(184,151,47,0.5) 100px, rgba(184,151,47,0.5) 101px)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Header — editorial asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-8">
            <AnimateIn>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-px bg-brass/40" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-brass/70 font-sans">
                  Selected Works
                </span>
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-serif text-ivory leading-[1.05] tracking-[-0.02em]">
                Signature
                <br />
                <span className="italic text-pearl/70">Masterpieces</span>
              </h2>
            </AnimateIn>
          </div>
          <div className="lg:col-span-4 flex items-end justify-end">
            <AnimateIn delay={200}>
              <Link
                href="/mother-of-pearl-furniture"
                className="group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-warm-gray/80 hover:text-brass font-sans transition-colors duration-500"
              >
                <span>View All Pieces</span>
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

        {/* Masterpiece grid — editorial alternating layout */}
        {loading && display.length === 0 ? (
          <p className="text-warm-gray/60 text-sm font-sans">Loading featured pieces…</p>
        ) : display.length === 0 ? (
          <p className="text-warm-gray/60 text-sm font-sans">No pieces available yet.</p>
        ) : (
          <div className="space-y-28 lg:space-y-40">
            {display.map((product, i) => {
              const isEven = i % 2 === 0;
              return (
                <AnimateIn key={product.id}>
                  <Link href={productUrl(product)}>
                    <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
                      {/* Image */}
                      <div
                        className={`relative ${
                          isEven ? "lg:col-span-7" : "lg:col-start-6 lg:col-span-7"
                        }`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden border border-brass/[0.12] group-hover:border-brass/25 transition-all duration-700 ornament-corner">
                          <LuxuryImage
                            src={product.images[0]}
                            alt={product.title}
                            width={1000}
                            height={750}
                            className="w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                            label={product.title}
                          />
                          <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/10 transition-colors duration-700" />
                        </div>

                        {/* Period tag */}
                        {product.period && (
                          <div className="absolute -bottom-4 left-8 bg-midnight px-5 py-2 border border-brass/15">
                            <span className="text-[9px] tracking-[0.4em] uppercase text-brass/70 font-sans">
                              {product.period}
                            </span>
                          </div>
                        )}

                        {/* Index number */}
                        <div
                          className={`absolute -top-8 ${
                            isEven ? "-right-4 lg:right-8" : "-left-4 lg:left-8"
                          }`}
                        >
                          <span className="text-[48px] sm:text-[80px] lg:text-[120px] font-serif gold-text opacity-[0.06] leading-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div
                        className={`${
                          isEven
                            ? "lg:col-span-5"
                            : "lg:col-start-1 lg:col-span-5 lg:row-start-1"
                        } flex flex-col justify-center`}
                      >
                        {product.origin && (
                          <div className="flex items-center gap-3 mb-5">
                            <div className="w-6 h-px bg-brass/30" />
                            <span className="text-[9px] tracking-[0.4em] uppercase text-brass/60 font-sans">
                              {product.origin}
                            </span>
                          </div>
                        )}

                        <h3 className="text-2xl lg:text-3xl font-serif text-ivory leading-[1.1] mb-5 group-hover:text-pearl transition-colors duration-500">
                          {product.title}
                        </h3>

                        {product.description && (
                          <p className="text-[13px] text-warm-gray/80 leading-[1.8] mb-6 line-clamp-3 font-sans">
                            {product.description}
                          </p>
                        )}

                        {product.materials && product.materials.length > 0 && (
                          <div className="flex items-center gap-4 mb-8 text-[11px] text-pearl/60 font-sans">
                            {product.materials.slice(0, 3).map((m, mi) => (
                              <span key={m} className="flex items-center gap-4">
                                {mi > 0 && <span className="w-1 h-1 rounded-full bg-brass/20 -ml-2" />}
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-[15px] font-serif italic text-ivory/80">
                            {product.priceDisplay || "Price on Request"}
                          </span>
                          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-brass/60 opacity-0 group-hover:opacity-100 transition-all duration-500 font-sans">
                            View Details
                            <svg
                              width="12"
                              height="12"
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
                </AnimateIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
