// Server-only Stripe client. Returns null if STRIPE_SECRET_KEY isn't
// configured — callers should treat that as "Stripe not connected yet" and
// fall back to inquiry-style checkout.
import Stripe from "stripe";

let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    cached = null;
    return null;
  }
  // No apiVersion override — use the version the installed SDK is pinned to,
  // so types and runtime payloads always agree.
  cached = new Stripe(key);
  return cached;
}

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
};

export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY && !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}
