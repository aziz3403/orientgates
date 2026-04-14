"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct, getCategory, getProductsByCategory } from "@/lib/data";
import { useCart } from "@/lib/cart";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categorySlug = params.category as string;
  const product = getProduct(slug);
  const category = getCategory(categorySlug);
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-ivory mb-4">Piece Not Found</h1>
          <Link href="/" className="text-brass text-sm font-sans hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const catDisplay = category || getCategory(product.category);
  const relatedProducts = getProductsByCategory(product.subcategory || product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-midnight pt-36 pb-6">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-warm-gray/40 font-sans flex-wrap">
            <Link href="/" className="hover:text-brass transition-colors">Home</Link>
            <span className="text-white/10">/</span>
            {catDisplay && (
              <>
                <Link href={`/${catDisplay.slug}`} className="hover:text-brass transition-colors">
                  {catDisplay.title}
                </Link>
                <span className="text-white/10">/</span>
              </>
            )}
            <span className="text-pearl/30 truncate max-w-[200px]">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="bg-midnight pb-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Image Gallery */}
            <div className="lg:col-span-7">
              <AnimateIn>
                <div className="aspect-[4/3] overflow-hidden border border-white/[0.04] cursor-zoom-in relative group">
                  <LuxuryImage
                    src={product.images[activeImage]}
                    alt={product.title}
                    width={1200}
                    height={900}
                    className="w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    label={product.title}
                    priority
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3 mt-4">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`aspect-square w-20 overflow-hidden transition-all duration-500 ${
                          activeImage === i ? "border border-brass/40 opacity-100" : "border border-white/[0.04] opacity-40 hover:opacity-70"
                        }`}
                      >
                        <LuxuryImage src={img} alt={`View ${i + 1}`} width={160} height={160} className="w-full h-full" label={`${i + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </AnimateIn>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 lg:pt-4">
              <AnimateIn>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-brass/30" />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-brass/60 font-sans">
                    {catDisplay?.title}
                  </span>
                </div>

                <h1 className="text-3xl lg:text-[2.5rem] font-serif text-ivory leading-[1.1] mb-3">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-[14px] text-warm-gray/50 italic font-sans mb-8">{product.subtitle}</p>
                )}

                {/* Price + availability */}
                <div className="mb-10 pb-10 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-2xl font-serif text-ivory/90 italic">{product.priceDisplay}</span>
                  <span className={`text-[9px] tracking-[0.3em] uppercase font-sans px-3 py-1 ${
                    product.availability === "available" ? "text-emerald-400/70 border border-emerald-400/20" :
                    product.availability === "sold" ? "text-red-400/70 border border-red-400/20" :
                    "text-amber-400/70 border border-amber-400/20"
                  }`}>
                    {product.availability}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-5 mb-10">
                  {[
                    { label: "Period", value: product.period },
                    { label: "Origin", value: product.origin },
                    { label: "Dimensions", value: product.dimensions },
                    { label: "Materials", value: product.materials.join(", ") },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between items-start gap-6">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-warm-gray/40 whitespace-nowrap font-sans pt-0.5">{d.label}</span>
                      <span className="text-[13px] text-ivory/70 text-right leading-snug font-sans">{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-3 mb-12">
                  {product.type === "purchasable" && product.availability === "available" ? (
                    <button
                      onClick={() => addItem(product)}
                      className="group relative flex items-center justify-center gap-3 bg-brass text-midnight w-full px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500"
                    >
                      <span className="relative z-10">Add to Cart &mdash; {product.priceDisplay}</span>
                      <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                  ) : (
                    <Link
                      href="/contact"
                      className="group relative flex items-center justify-center gap-3 bg-brass text-midnight w-full px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500"
                    >
                      <span className="relative z-10">Inquire About This Piece</span>
                      <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full border border-ivory/10 text-ivory/60 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-brass/20 hover:text-ivory/80 transition-all duration-500"
                  >
                    Request Private Viewing
                  </Link>
                </div>

                {/* Shipping info */}
                {product.shipping && (
                  <p className="text-[11px] text-warm-gray/30 font-sans mb-10 flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mt-0.5 flex-shrink-0 text-brass/40">
                      <rect x="1" y="6" width="15" height="12" rx="1" /><path d="M16 10h4l3 3v5h-7V10z" /><circle cx="5.5" cy="18" r="2" /><circle cx="18.5" cy="18" r="2" />
                    </svg>
                    {product.shipping}
                  </p>
                )}

                {/* Detailed sections */}
                <div className="space-y-10 border-t border-white/[0.06] pt-10">
                  {[
                    { label: "Description", text: product.description },
                    { label: "Craftsmanship", text: product.craftsmanship },
                    { label: "Condition", text: product.condition },
                    { label: "Provenance", text: product.provenance, italic: true },
                  ].map((s) => (
                    <div key={s.label}>
                      <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">{s.label}</h3>
                      <p className={`text-[13px] text-warm-gray/60 leading-[1.8] font-sans ${s.italic ? "italic text-ivory/50" : ""}`}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Related pieces */}
      {relatedProducts.length > 0 && (
        <section className="py-section bg-charcoal border-t border-white/[0.04]">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <AnimateIn className="mb-14">
              <span className="text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans">From the Same Collection</span>
              <h2 className="text-3xl font-serif text-ivory mt-3">Related Pieces</h2>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rp, i) => (
                <ProductCard key={rp.id} product={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
