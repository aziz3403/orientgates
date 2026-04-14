"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <section className="pt-36 pb-section bg-midnight min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <AnimateIn>
          <h1 className="text-3xl lg:text-4xl font-serif text-ivory mb-2">Your Selection</h1>
          <p className="text-[12px] text-warm-gray/40 font-sans mb-12">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </AnimateIn>

        {items.length === 0 ? (
          <AnimateIn>
            <div className="text-center py-24 border border-white/[0.04]">
              <p className="text-warm-gray/40 font-sans mb-8">Your selection is empty</p>
              <Link
                href="/mother-of-pearl-furniture"
                className="inline-flex items-center gap-3 border border-ivory/15 text-ivory/70 px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-brass/30 transition-all"
              >
                Explore the Collection
              </Link>
            </div>
          </AnimateIn>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Items */}
            <div className="lg:col-span-8">
              <div className="border-t border-white/[0.06]">
                {items.map((item, i) => (
                  <AnimateIn key={item.product.id} delay={i * 80}>
                    <div className="flex gap-6 py-8 border-b border-white/[0.06]">
                      <Link
                        href={`/collection/${item.product.category}/${item.product.slug}`}
                        className="w-28 h-28 flex-shrink-0 overflow-hidden border border-white/[0.04]"
                      >
                        <LuxuryImage
                          src={item.product.images[0]}
                          alt={item.product.title}
                          width={224}
                          height={224}
                          className="w-full h-full"
                          label={item.product.title}
                        />
                      </Link>
                      <div className="flex-1">
                        <h3 className="text-base font-serif text-ivory mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-[11px] text-warm-gray/40 font-sans mb-1">
                          {item.product.origin} &bull; {item.product.period}
                        </p>
                        <p className="text-sm font-serif italic text-ivory/80 mb-4">
                          {item.product.priceDisplay}
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center border border-white/10 text-warm-gray/50 hover:border-brass/30 text-xs transition-all"
                            >
                              -
                            </button>
                            <span className="text-sm text-ivory font-sans w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center border border-white/10 text-warm-gray/50 hover:border-brass/30 text-xs transition-all"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-[10px] tracking-[0.2em] uppercase text-warm-gray/30 hover:text-red-400 transition-colors font-sans"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <AnimateIn delay={200}>
                <div className="border border-white/[0.06] p-8 sticky top-28">
                  <h3 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-8 pb-8 border-b border-white/[0.06]">
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-warm-gray/50">Subtotal</span>
                      <span className="text-ivory">${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-warm-gray/50">Shipping</span>
                      <span className="text-ivory/60 italic">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <span className="text-sm font-sans text-ivory">Total</span>
                    <span className="text-xl font-serif text-ivory">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="group relative flex items-center justify-center w-full bg-brass text-midnight py-4 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full mt-3 text-[10px] tracking-[0.2em] uppercase text-warm-gray/30 hover:text-warm-gray/60 transition-colors font-sans py-2"
                  >
                    Clear Selection
                  </button>
                </div>
              </AnimateIn>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
