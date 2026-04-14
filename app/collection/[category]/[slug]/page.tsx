"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct, getCategory, getProductsByCategory, getProductSKU } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-3">
      <button onClick={copyLink} className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-warm-gray/40 hover:text-ivory transition-colors font-sans">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        {copied ? "Copied" : "Share Link"}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} — The Orient Gates\n${typeof window !== "undefined" ? window.location.href : ""}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-warm-gray/40 hover:text-ivory transition-colors font-sans"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
        WhatsApp
      </a>
    </div>
  );
}

function GuaranteeSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.06] mt-10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b8972f" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-[10px] tracking-[0.3em] uppercase text-brass/70 font-sans">Our Guarantee</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M3 4.5l3 3 3-3" stroke="#8a8178" strokeWidth="1" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-6 space-y-4 border-t border-white/[0.04] pt-5">
          {[
            { title: "Authentication Guarantee", text: "Every piece sold by The Orient Gates is guaranteed authentic. If any item is proven not as described within 14 days of receipt, we offer a full unconditional refund." },
            { title: "Condition Accuracy", text: "Our condition reports are prepared by specialists with decades of experience. We stand behind every assessment and welcome independent verification." },
            { title: "White-Glove Shipping", text: "All pieces are professionally packed by specialist fine art handlers, fully insured at declared value, and delivered with white-glove service to your door." },
            { title: "Secure Payment", text: "We accept bank transfer, credit card, and can arrange financing for qualifying purchases. All transactions are handled with complete security and discretion." },
          ].map((item) => (
            <div key={item.title}>
              <h4 className="text-[11px] text-ivory/80 font-sans mb-1">{item.title}</h4>
              <p className="text-[11px] text-warm-gray/40 leading-relaxed font-sans">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categorySlug = params.category as string;
  const product = getProduct(slug);
  const category = getCategory(categorySlug);
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Track recently viewed
  useEffect(() => {
    if (!product) return;
    try {
      const viewed = JSON.parse(localStorage.getItem("orient-gates-recently-viewed") || "[]");
      const filtered = viewed.filter((id: string) => id !== product.id);
      filtered.unshift(product.id);
      localStorage.setItem("orient-gates-recently-viewed", JSON.stringify(filtered.slice(0, 10)));
    } catch {}
  }, [product]);

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
  const sku = getProductSKU(product);
  const wishlisted = isInWishlist(product.id);
  const relatedProducts = getProductsByCategory(product.subcategory || product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku,
    image: product.images,
    brand: { "@type": "Brand", name: "The Orient Gates" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price || undefined,
      availability: product.availability === "available"
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      seller: { "@type": "Organization", name: "The Orient Gates" },
    },
    material: product.materials.join(", "),
    countryOfOrigin: product.origin,
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[70] bg-midnight/95 backdrop-blur-xl flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-6 right-6 text-ivory/50 hover:text-ivory z-10" onClick={() => setLightboxOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 6l12 12M18 6l-12 12" /></svg>
          </button>
          <img
            src={product.images[activeImage]}
            alt={product.title}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {product.images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                  className={`w-2 h-2 rounded-full transition-colors ${activeImage === i ? "bg-brass" : "bg-white/20"}`} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-midnight pt-36 pb-6">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-warm-gray/40 font-sans flex-wrap">
            <Link href="/" className="hover:text-brass transition-colors">Home</Link>
            <span className="text-white/10">/</span>
            {catDisplay && (
              <>
                <Link href={`/${catDisplay.slug}`} className="hover:text-brass transition-colors">{catDisplay.title}</Link>
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
                <div
                  className="aspect-[4/3] overflow-hidden border border-white/[0.04] cursor-zoom-in relative group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <LuxuryImage
                    src={product.images[activeImage]}
                    alt={product.title}
                    width={1200}
                    height={900}
                    className="w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    label={product.title}
                    priority
                  />
                  <div className="absolute bottom-4 right-4 bg-midnight/60 backdrop-blur-sm px-3 py-1.5 text-[8px] tracking-[0.2em] uppercase text-ivory/40 font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to enlarge
                  </div>
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3 mt-4">
                    {product.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)}
                        className={`aspect-square w-20 overflow-hidden transition-all duration-500 ${activeImage === i ? "border border-brass/40 opacity-100" : "border border-white/[0.04] opacity-40 hover:opacity-70"}`}
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
                {/* Category + SKU */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-brass/30" />
                    <span className="text-[9px] tracking-[0.4em] uppercase text-brass/60 font-sans">{catDisplay?.title}</span>
                  </div>
                  <span className="text-[9px] tracking-[0.15em] text-warm-gray/45 font-mono">{sku}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-[2.5rem] font-serif text-ivory leading-[1.1] mb-3">{product.title}</h1>
                {product.subtitle && <p className="text-[14px] text-warm-gray/50 italic font-sans mb-6">{product.subtitle}</p>}

                {/* COA + Wishlist + Share row */}
                <div className="flex items-center gap-4 mb-8">
                  {product.certificateOfAuthenticity && (
                    <div className="flex items-center gap-1.5 bg-brass/[0.08] border border-brass/20 px-3 py-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b8972f" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="text-[8px] tracking-[0.25em] uppercase text-brass font-sans">Certificate of Authenticity</span>
                    </div>
                  )}
                  <button
                    onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all duration-300 ${wishlisted ? "border-brass/30 text-brass" : "border-white/10 text-warm-gray/40 hover:text-ivory hover:border-white/20"}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="text-[8px] tracking-[0.2em] uppercase font-sans">{wishlisted ? "Saved" : "Save"}</span>
                  </button>
                </div>

                {/* Price + availability */}
                <div className="mb-10 pb-10 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-2xl font-serif text-ivory/90 italic">{product.priceDisplay}</span>
                  <span className={`text-[9px] tracking-[0.3em] uppercase font-sans px-3 py-1 ${
                    product.availability === "available" ? "text-emerald-400/70 border border-emerald-400/20" :
                    product.availability === "sold" ? "text-red-400/70 border border-red-400/20" :
                    "text-amber-400/70 border border-amber-400/20"
                  }`}>{product.availability}</span>
                </div>

                {/* Details grid */}
                <div className="space-y-5 mb-10">
                  {[
                    { label: "Period", value: product.period },
                    { label: "Origin", value: product.origin },
                    { label: "Dimensions", value: product.dimensions },
                    { label: "Materials", value: product.materials.join(", ") },
                    ...(product.weight ? [{ label: "Weight", value: product.weight }] : []),
                    ...(product.insuranceValuation ? [{ label: "Insurance Value", value: `$${product.insuranceValuation.toLocaleString()}` }] : []),
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between items-start gap-6">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-warm-gray/40 whitespace-nowrap font-sans pt-0.5">{d.label}</span>
                      <span className="text-[13px] text-ivory/70 text-right leading-snug font-sans">{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-3 mb-8">
                  {product.type === "purchasable" && product.availability === "available" ? (
                    <button onClick={() => addItem(product)}
                      className="group relative flex items-center justify-center gap-3 bg-brass text-midnight w-full px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500"
                    >
                      <span className="relative z-10">Add to Cart &mdash; {product.priceDisplay}</span>
                      <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                  ) : (
                    <Link href="/contact"
                      className="group relative flex items-center justify-center gap-3 bg-brass text-midnight w-full px-10 py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500"
                    >
                      <span className="relative z-10">Inquire About This Piece</span>
                      <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </Link>
                  )}
                  <Link href="/contact"
                    className="flex items-center justify-center w-full border border-ivory/10 text-ivory/60 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-brass/20 hover:text-ivory/80 transition-all duration-500"
                  >
                    Request Condition Report
                  </Link>
                </div>

                {/* Share */}
                <div className="mb-10 pb-10 border-b border-white/[0.06]">
                  <ShareButtons title={product.title} />
                </div>

                {/* ── Detailed Sections ── */}
                <div className="space-y-10">
                  {/* Description */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Description</h3>
                    <p className="text-[13px] text-warm-gray/60 leading-[1.8] font-sans">{product.description}</p>
                  </div>

                  {/* Craftsmanship */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Craftsmanship</h3>
                    <p className="text-[13px] text-warm-gray/60 leading-[1.8] font-sans">{product.craftsmanship}</p>
                  </div>

                  {/* Condition */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Condition</h3>
                    <p className="text-[13px] text-warm-gray/60 leading-[1.8] font-sans">{product.condition}</p>
                    {product.restorationHistory && (
                      <div className="mt-4 p-4 border border-white/[0.04] bg-white/[0.01]">
                        <h4 className="text-[9px] tracking-[0.3em] uppercase text-warm-gray/50 font-sans mb-2">Restoration History</h4>
                        <p className="text-[12px] text-warm-gray/50 leading-relaxed font-sans">{product.restorationHistory}</p>
                      </div>
                    )}
                  </div>

                  {/* Provenance */}
                  <div>
                    <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Provenance</h3>
                    <p className="text-[13px] text-ivory/50 leading-[1.8] font-sans italic">{product.provenance}</p>
                  </div>

                  {/* Auction History */}
                  {product.auctionHistory && product.auctionHistory.length > 0 && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Auction History</h3>
                      <div className="space-y-3">
                        {product.auctionHistory.map((record, i) => (
                          <div key={i} className="flex items-start justify-between p-4 border border-white/[0.04] bg-white/[0.01]">
                            <div>
                              <span className="text-[13px] text-ivory/70 font-sans">{record.house}</span>
                              {record.lot && <span className="text-[11px] text-warm-gray/40 font-sans ml-2">— {record.lot}</span>}
                            </div>
                            <div className="text-right">
                              <span className="text-[12px] text-warm-gray/50 font-sans">{record.date}</span>
                              {record.salePrice && <span className="block text-[12px] text-ivory/60 font-sans">{record.salePrice}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expert Appraisal */}
                  {product.expertAppraisal && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Expert Appraisal</h3>
                      <blockquote className="p-5 border-l-2 border-brass/30 bg-white/[0.01]">
                        <p className="text-[13px] text-ivory/60 leading-[1.8] font-sans italic">{product.expertAppraisal}</p>
                      </blockquote>
                    </div>
                  )}

                  {/* Exhibition History */}
                  {product.exhibitionHistory && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Exhibition History</h3>
                      <p className="text-[12px] text-warm-gray/50 leading-relaxed font-sans">{product.exhibitionHistory}</p>
                    </div>
                  )}

                  {/* Literature References */}
                  {product.literatureReferences && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Literature</h3>
                      <p className="text-[12px] text-warm-gray/50 leading-relaxed font-sans italic">{product.literatureReferences}</p>
                    </div>
                  )}

                  {/* Comparable Sales */}
                  {product.comparableSales && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Comparable Sales</h3>
                      <p className="text-[12px] text-warm-gray/50 leading-relaxed font-sans">{product.comparableSales}</p>
                    </div>
                  )}

                  {/* Shipping & Insurance */}
                  {(product.shipping || product.insurance) && (
                    <div>
                      <h3 className="text-[9px] tracking-[0.4em] uppercase text-brass/50 mb-4 font-sans">Shipping & Insurance</h3>
                      {product.shipping && <p className="text-[12px] text-warm-gray/50 leading-relaxed font-sans mb-2">{product.shipping}</p>}
                      {product.insurance && <p className="text-[12px] text-warm-gray/50 leading-relaxed font-sans">{product.insurance}</p>}
                    </div>
                  )}
                </div>

                {/* Guarantee */}
                <GuaranteeSection />
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
