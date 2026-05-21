"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart now that payment has succeeded — the order is already
    // persisted on the server via the Stripe webhook.
    clearCart();
  }, [clearCart]);

  return (
    <section className="pt-36 pb-section bg-midnight min-h-screen">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimateIn>
          <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-brass/40 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8972f" strokeWidth="1.2">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif text-ivory mb-4">
            Thank You
          </h1>
          <p className="text-[14px] text-warm-gray/80 leading-[1.8] font-sans max-w-md mx-auto mb-8">
            Your payment has been received. A member of our family will contact
            you within 24 hours to arrange white-glove shipping, insurance, and
            customs documentation for your piece.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 border border-ivory/15 text-ivory/80 px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-brass/30 transition-all"
          >
            Continue Browsing
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
