"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import LuxuryImage from "@/components/ui/LuxuryImage";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, isOpen, setIsOpen } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-midnight/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[61] w-full max-w-[calc(100vw-2rem)] sm:max-w-md bg-midnight/98 backdrop-blur-xl border-l border-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06]">
            <div>
              <h2 className="text-lg font-serif text-ivory">Your Selection</h2>
              <p className="text-[10px] tracking-[0.3em] uppercase text-warm-gray/70 mt-1 font-sans">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-warm-gray/70 hover:text-ivory transition-colors"
              aria-label="Close cart"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-warm-gray/70 text-sm font-sans mb-6">
                  Your selection is empty
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] tracking-[0.3em] uppercase text-brass/60 hover:text-brass transition-colors font-sans"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 group">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden border border-white/[0.04]">
                      <LuxuryImage
                        src={item.product.images[0]}
                        alt={item.product.title}
                        width={160}
                        height={160}
                        className="w-full h-full"
                        label={item.product.title}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-serif text-ivory truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-[11px] text-warm-gray/70 mt-1 font-sans">
                        {item.product.priceDisplay}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-white/10 text-warm-gray/80 hover:border-brass/30 hover:text-ivory transition-all text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs text-ivory font-sans w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-white/10 text-warm-gray/80 hover:border-brass/30 hover:text-ivory transition-all text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/80 hover:text-red-400 transition-colors font-sans"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-8 py-6 border-t border-white/[0.06] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans">
                  Subtotal
                </span>
                <span className="text-lg font-serif text-ivory">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-warm-gray/80 font-sans">
                Shipping and taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="group relative flex items-center justify-center w-full bg-brass text-midnight py-4 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(184,151,47,0.15)]"
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full border border-ivory/10 text-ivory/60 py-3 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-brass/20 hover:text-ivory transition-all duration-500"
              >
                View Full Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
