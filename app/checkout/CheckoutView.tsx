"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import AnimateIn from "@/components/ui/AnimateIn";

const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const STRIPE_CONFIGURED = STRIPE_PK.length > 0;

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToStripe = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          customerEmail: email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not start checkout.");
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe didn't return a URL.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout.");
    } finally {
      setSubmitting(false);
    }
  };

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

  const inquiryOnlyItems = items.filter(
    (i) => i.product.type !== "purchasable" || i.product.availability !== "available" || !i.product.price
  );
  const allInquiry = inquiryOnlyItems.length === items.length;

  return (
    <section className="pt-36 pb-section bg-midnight min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <AnimateIn>
          <h1 className="text-3xl lg:text-4xl font-serif text-ivory mb-12">Checkout</h1>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-7">
            <AnimateIn>
              {STRIPE_CONFIGURED && !allInquiry ? (
                /* Stripe-ready: minimal form, redirect to Checkout */
                <div className="space-y-8">
                  <div>
                    <h2 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-3">
                      Contact for Receipt
                    </h2>
                    <p className="text-[12px] text-warm-gray/70 font-sans mb-6">
                      Your email is used for the payment receipt and shipping updates.
                      You&apos;ll add your full shipping address on the next page (Stripe Checkout).
                    </p>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-warm-gray/70 font-sans mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-base focus:border-brass outline-none transition-colors font-sans"
                      placeholder="you@example.com"
                    />
                  </div>

                  {inquiryOnlyItems.length > 0 && (
                    <div className="border border-amber-500/20 bg-amber-500/[0.04] p-4 text-[12px] text-amber-200/80 font-sans leading-relaxed">
                      <strong className="text-amber-200">Heads up:</strong>{" "}
                      {inquiryOnlyItems.length === 1
                        ? "One piece in your cart is by inquiry only"
                        : `${inquiryOnlyItems.length} pieces in your cart are by inquiry only`}
                      {" "}and won&apos;t be included in this payment. We&apos;ll contact you separately about{" "}
                      {inquiryOnlyItems.map((i) => i.product.title).join("; ")}.
                    </div>
                  )}

                  <p className="text-[11px] text-warm-gray/80 font-sans leading-relaxed">
                    White-glove delivery and specialist fine-art shipping are included.
                    A member of the family will contact you within 24 hours of payment to
                    arrange shipping, customs documentation, and delivery.
                  </p>

                  {error && (
                    <div className="border border-red-400/30 bg-red-500/[0.05] px-4 py-3 text-[12px] text-red-300/90 font-sans">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={goToStripe}
                    disabled={submitting}
                    className="group relative flex items-center justify-center w-full bg-brass text-midnight py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500 disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {submitting ? "Connecting to Stripe…" : `Proceed to Payment — $${totalPrice.toLocaleString()}`}
                    </span>
                    <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </button>

                  <p className="text-[10px] text-warm-gray/50 font-sans text-center">
                    Payments are processed securely by Stripe. We never see or store your card details.
                  </p>
                </div>
              ) : (
                /* Stripe NOT configured, or every item is by inquiry — use the
                   contact-for-purchase flow that pushes to the inquiry form. */
                <div className="space-y-6">
                  <div className="border border-brass/20 bg-brass/[0.04] p-6">
                    <h2 className="text-[10px] tracking-[0.4em] uppercase text-brass/70 font-sans mb-3">
                      By Inquiry
                    </h2>
                    <p className="text-[13px] text-ivory/85 font-sans leading-relaxed mb-2">
                      {allInquiry
                        ? "Every piece in your cart is offered by private inquiry."
                        : "Online card payment is not yet enabled. Every piece is currently arranged by private inquiry."}
                    </p>
                    <p className="text-[13px] text-warm-gray/70 font-sans leading-relaxed">
                      Tell us a little about yourself and we&apos;ll arrange payment,
                      shipping, and a private viewing if you wish.
                    </p>
                  </div>

                  <Link
                    href={{
                      pathname: "/contact",
                      query: { piece: items.map((i) => i.product.title).join(", ") },
                    }}
                    className="group relative flex items-center justify-center w-full bg-brass text-midnight py-5 text-[11px] tracking-[0.3em] uppercase font-sans overflow-hidden hover:shadow-[0_0_40px_rgba(184,151,47,0.15)] transition-all duration-500"
                  >
                    <span className="relative z-10">
                      Continue to Private Inquiry
                    </span>
                    <div className="absolute inset-0 bg-brass-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </Link>
                </div>
              )}
            </AnimateIn>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-5">
            <AnimateIn delay={200}>
              <div className="border border-white/[0.06] p-6 sm:p-8 lg:sticky lg:top-28">
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-brass/50 font-sans mb-6">Your Order</h3>
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
