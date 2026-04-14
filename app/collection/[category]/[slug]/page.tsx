"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct, getCategory, getProductsByCategory } from "@/lib/data";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categorySlug = params.category as string;
  const product = getProduct(slug);
  const category = getCategory(categorySlug);
  const [activeImage, setActiveImage] = useState(0);

  if (!product || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight">
        <div className="text-center">
          <h1 className="text-heading font-serif text-ivory mb-4">Piece Not Found</h1>
          <Link href="/" className="btn-luxury-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-midnight pt-32 pb-4">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-warm-gray">
            <Link href="/" className="hover:text-brass transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/collection/${categorySlug}`} className="hover:text-brass transition-colors">
              {category.title}
            </Link>
            <span>/</span>
            <span className="text-pearl/50 truncate max-w-[200px]">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="bg-midnight pb-section">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="lg:col-span-7">
              <AnimateIn>
                {/* Main image */}
                <div className="aspect-[4/3] overflow-hidden luxury-border mb-4 group cursor-zoom-in">
                  <LuxuryImage
                    src={product.images[activeImage]}
                    alt={product.title}
                    width={1200}
                    height={900}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                    label={product.title}
                    priority
                  />
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`aspect-square w-20 overflow-hidden transition-all duration-300 ${
                          activeImage === i
                            ? "border border-brass/60 opacity-100"
                            : "border border-white/10 opacity-50 hover:opacity-80"
                        }`}
                      >
                        <LuxuryImage
                          src={img}
                          alt={`${product.title} view ${i + 1}`}
                          width={160}
                          height={160}
                          className="w-full h-full"
                          label={`View ${i + 1}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </AnimateIn>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-5 lg:pt-8">
              <AnimateIn>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-brass" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-brass">
                    {category.title}
                  </span>
                </div>

                <h1 className="text-heading font-serif text-ivory mb-6">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-white/10">
                  <span className="text-2xl font-serif text-ivory">
                    {product.price || "Price on Request"}
                  </span>
                </div>

                {/* Quick details */}
                <div className="space-y-4 mb-8">
                  {[
                    { label: "Period", value: product.period },
                    { label: "Origin", value: product.origin },
                    { label: "Dimensions", value: product.dimensions },
                    { label: "Materials", value: product.materials.join(", ") },
                  ].map((detail) => (
                    <div key={detail.label} className="flex justify-between items-start gap-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-warm-gray whitespace-nowrap">
                        {detail.label}
                      </span>
                      <span className="text-sm text-ivory text-right">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-3 mb-10">
                  <Link href="/contact" className="btn-luxury-gold w-full justify-center">
                    Inquire About This Piece
                  </Link>
                  <Link href="/contact" className="btn-luxury-primary w-full justify-center">
                    Request Private Viewing
                  </Link>
                </div>

                {/* Description */}
                <div className="space-y-8 border-t border-white/10 pt-8">
                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-4">
                      Description
                    </h3>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-4">
                      Craftsmanship
                    </h3>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      {product.craftsmanship}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-4">
                      Condition
                    </h3>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      {product.condition}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-brass mb-4">
                      Provenance
                    </h3>
                    <p className="text-sm text-warm-gray leading-relaxed italic">
                      {product.provenance}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Related pieces */}
      {relatedProducts.length > 0 && (
        <section className="py-section bg-charcoal">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <AnimateIn className="mb-12">
              <span className="text-[11px] tracking-[0.35em] uppercase text-brass">
                From the Same Collection
              </span>
              <h2 className="text-heading font-serif text-ivory mt-4">
                Related Pieces
              </h2>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rp, i) => (
                <AnimateIn key={rp.id} delay={i * 100}>
                  <Link href={`/collection/${rp.category}/${rp.slug}`}>
                    <div className="group overflow-hidden luxury-border luxury-border-hover">
                      <div className="aspect-[4/3] overflow-hidden">
                        <LuxuryImage
                          src={rp.images[0]}
                          alt={rp.title}
                          width={600}
                          height={450}
                          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                          label={rp.title}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-ivory text-base mb-2 group-hover:text-brass transition-colors">
                          {rp.title}
                        </h3>
                        <p className="text-xs text-warm-gray">{rp.period}</p>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
