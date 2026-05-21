import { NextResponse, type NextRequest } from "next/server";
import { getStripe, stripeConfig } from "@/lib/stripe";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import type Stripe from "stripe";

// Stripe webhook signature verification requires the raw body. Next 14 lets
// us read it via req.text(). Keep this route Node runtime — no Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ ok: false }, { status: 503 });

  const signature = req.headers.get("stripe-signature");
  if (!signature || !stripeConfig.webhookSecret) {
    return NextResponse.json({ ok: false, error: "Missing signature or secret" }, { status: 400 });
  }
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, stripeConfig.webhookSecret);
  } catch (e) {
    console.error("[stripe webhook] signature verification failed:", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sb = createSupabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const s = event.data.object as Stripe.Checkout.Session;
      await sb
        .from("orders")
        .update({
          status: "paid",
          stripe_payment_intent_id: typeof s.payment_intent === "string" ? s.payment_intent : null,
          customer_email: s.customer_details?.email || null,
          customer_name: s.customer_details?.name || null,
          shipping: s.shipping_details ? JSON.parse(JSON.stringify(s.shipping_details)) : null,
          metadata: s.metadata ? JSON.parse(JSON.stringify(s.metadata)) : null,
        })
        .eq("stripe_session_id", s.id);
      // TODO: send the family a notification email here once Resend is wired.
      break;
    }
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed": {
      const s = event.data.object as Stripe.Checkout.Session;
      await sb
        .from("orders")
        .update({ status: event.type === "checkout.session.expired" ? "expired" : "failed" })
        .eq("stripe_session_id", s.id);
      break;
    }
    default:
      // ignore other events for now
      break;
  }

  return NextResponse.json({ received: true });
}
