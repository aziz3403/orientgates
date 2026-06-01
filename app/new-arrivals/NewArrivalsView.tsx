"use client";

import { useProducts, productMatchers, sortNewest } from "@/lib/products-client";
import AnimateIn from "@/components/ui/AnimateIn";
import ProductCard from "@/components/ProductCard";

export default function NewArrivalsPage() {
  const { products, loading } = useProducts(productMatchers.newArrival);
  const sorted = sortNewest(products);

  return (
    <>
      <section className="pt-36 pb-12 bg-midnight">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <AnimateIn>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-px bg-brass/40" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-brass/60 font-sans">
                Recently Added
              </span>
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif text-ivory leading-[1.05]">
              New Arrivals
            </h1>
            <p className="text-[14px] text-warm-gray/80 max-w-lg mt-6 leading-[1.8] font-sans">
              The latest additions to our collection — freshly sourced pieces
              now available for acquisition or private inquiry.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-section bg-charcoal">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          {loading ? (
            <p className="text-warm-gray/60 text-sm font-sans">Loading…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {sorted.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
