"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="pt-36 pb-section bg-midnight min-h-screen">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-serif text-ivory mb-4">Checkout</h1>
          <p className="text-warm-gray/70 font-sans mb-8">Your cart is empty.</p>
          <Link href="/" className="text-brass text-sm font-sans hover:underline">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-section bg-midnight min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <AnimateIn>
          <h1 className="text-3xl lg:text-4xl font-serif text-ivory mb-12">Checkout</h1>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <AnimateIn>
              <form className="space-y-8">
                <div>
                  <h2 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">First Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans" />
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">Last Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">Email</label>
                      <input type="email" className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans" />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">Phone</label>
                      <input type="tel" className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">Address</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">City</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans" />
                      </div>
                      <div>
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">Country</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-4">
                    Additional Notes
                  </h2>
                  <textarea
                    rows={3}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory focus:border-brass outline-none transition-colors text-base font-sans resize-none"
                    placeholder="Special delivery instructions, preferred contact time..."
                  />
                </div>

                <p className="text-[11px] text-warm-gray/80 font-sans leading-relaxed">
                  White-glove delivery and specialist fine art shipping available worldwide.
                  A member of our team will contact you to arrange delivery details and confirm your order.
                </p>

                <button
                  type="submit"
                  className="group relative flex items-center justify-center w-full bg-brass text-midnight py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500"
                >
                  <span className="relative z-10">Place Order &mdash; ${totalPrice.toLocaleString()}</span>
                  <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              </form>
            </AnimateIn>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <AnimateIn delay={200}>
              <div className="border border-white/[0.06] p-6 sm:p-8 lg:sticky lg:top-28">
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">
                  Your Order
                </h3>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-serif text-ivory">{item.product.title}</p>
                        <p className="text-[11px] text-warm-gray/80 font-sans">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm text-ivory/70 font-sans">
                        {item.product.price
                          ? `$${(item.product.price * item.quantity).toLocaleString()}`
                          : "Inquiry"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-sans text-warm-gray/80">Total</span>
                    <span className="text-lg font-serif text-ivory">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
