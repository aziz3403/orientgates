"use client";

import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import LuxuryImage from "@/components/ui/LuxuryImage";
import AnimateIn from "@/components/ui/AnimateIn";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  basePath?: string;
}

export default function ProductCard({ product, index = 0, basePath }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);

  // Determine the link path
  const detailPath = basePath
    ? `${basePath}/${product.slug}`
    : `/collection/${product.category}/${product.slug}`;

  return (
    <AnimateIn delay={index * 80}>
      <div
        className="group relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={detailPath}>
          <div className="relative overflow-hidden border border-white/[0.04] group-hover:border-brass/15 transition-all duration-700 ornament-corner">
            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden relative">
              <LuxuryImage
                src={product.images[0]}
                alt={product.title}
                width={600}
                height={800}
                className={`w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  hovered ? "scale-[1.06]" : "scale-100"
                }`}
                label={product.title}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.newArrival && (
                  <span className="bg-brass/90 text-midnight text-[8px] tracking-[0.3em] uppercase font-sans px-3 py-1">
                    New
                  </span>
                )}
                {product.availability === "sold" && (
                  <span className="bg-red-900/80 text-ivory text-[8px] tracking-[0.3em] uppercase font-sans px-3 py-1">
                    Sold
                  </span>
                )}
              </div>

              {/* Quick actions on hover */}
              <div
                className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500 ${
                  hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="flex-1 flex items-center justify-center bg-midnight/80 backdrop-blur-sm border border-white/10 text-ivory text-[9px] tracking-[0.2em] uppercase font-sans py-2.5 hover:border-brass/30 transition-colors">
                  View Details
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] tracking-[0.35em] uppercase text-brass/50 font-sans">
                  {product.period}
                </span>
              </div>
              <h3 className="text-[15px] font-serif text-ivory/90 leading-tight mb-1.5 line-clamp-2">
                {product.title}
              </h3>
              {product.subtitle && (
                <p className="text-[11px] text-warm-gray/70 font-sans mb-3 line-clamp-1">
                  {product.subtitle}
                </p>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <span className="text-[13px] font-serif italic text-ivory/70">
                  {product.priceDisplay}
                </span>
                <span className="text-[9px] text-warm-gray/80 font-sans">{product.origin}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Wishlist heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            wishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
          }}
          className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-midnight/70 backdrop-blur-sm border transition-all duration-500 ${
            wishlisted
              ? "border-brass/40 text-brass opacity-100 scale-100"
              : `border-white/10 text-ivory/60 hover:border-brass/30 hover:text-brass ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Add to cart button (only for purchasable items) */}
        {product.type === "purchasable" && product.availability === "available" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className={`absolute top-4 right-14 w-8 h-8 flex items-center justify-center bg-midnight/70 backdrop-blur-sm border border-white/10 text-ivory/60 hover:border-brass/30 hover:text-brass transition-all duration-500 ${
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            aria-label="Add to cart"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}

        {/* COA badge */}
        {product.certificateOfAuthenticity && (
          <div className={`absolute top-4 left-4 flex items-center gap-1.5 bg-midnight/60 backdrop-blur-sm px-2 py-1 border border-brass/20 transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#b8972f" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[7px] tracking-[0.2em] uppercase text-brass font-sans">COA</span>
          </div>
        )}
      </div>
    </AnimateIn>
  );
}
