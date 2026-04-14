"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist";
import { products } from "@/lib/data";
import AnimateIn from "@/components/ui/AnimateIn";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <section className="pt-36 pb-section bg-midnight min-h-screen">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        <AnimateIn>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-px bg-brass/40" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-brass/60 font-sans">Saved Pieces</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif text-ivory mb-2">Your Wishlist</h1>
          <p className="text-[12px] text-warm-gray/70 font-sans mb-12">
            {wishlistProducts.length} saved {wishlistProducts.length === 1 ? "piece" : "pieces"}
          </p>
        </AnimateIn>

        {wishlistProducts.length === 0 ? (
          <AnimateIn>
            <div className="text-center py-24 border border-white/[0.04]">
              <p className="text-warm-gray/70 font-sans mb-8">You haven&apos;t saved any pieces yet</p>
              <Link
                href="/mother-of-pearl-furniture"
                className="inline-flex items-center gap-3 border border-ivory/15 text-ivory/70 px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-brass/30 transition-all"
              >
                Explore the Collection
              </Link>
            </div>
          </AnimateIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
