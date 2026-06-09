import { NextResponse, type NextRequest } from "next/server";
import { getStripe, stripeConfig } from "@/lib/stripe";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { contact } from "@/lib/locations";
import type Stripe from "stripe";

// Stripe webhook signature verification requires the raw body. Next 14 lets
// us read it via req.text(). Keep this route Node runtime — no Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface OrderLine {
  title?: string;
  quantity?: number;
  amount_cents?: number;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Best-effort "you made a sale" email to the family via Resend. Failures are
// logged, never thrown — the order row is already saved.
async function notifyOrderPaid(s: Stripe.Checkout.Session, lines: OrderLine[]) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[stripe webhook] RESEND_API_KEY not set — order email skipped");
    return;
  }
  const fromAddress = process.env.RESEND_FROM_ADDRESS || "no-reply@theorientgates.com";
  const total = typeof s.amount_total === "number" ? `$${(s.amount_total / 100).toLocaleString()}` : "—";
  const items = lines
    .map(
      (l) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(l.title || "Item")}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">×${l.quantity || 1}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">$${(((l.amount_cents || 0) * (l.quantity || 1)) / 100).toLocaleString()}</td></tr>`
    )
    .join("");
  const html = `<!doctype html><html><body style="font-family:Georgia,serif;background:#f7f5f0;padding:24px;margin:0">
  <div style="max-width:640px;margin:0 auto;background:#fff;padding:32px;border:1px solid #ddd">
    <h1 style="color:#0a0a0a;font-size:22px;margin:0 0 4px">Order paid on theorientgates.com</h1>
    <p style="color:#888;font-size:12px;margin:0 0 24px">Stripe session: ${escapeHtml(s.id)}</p>
    <p style="font-size:14px;color:#222;margin:0 0 16px">
      <strong>${escapeHtml(s.customer_details?.name || "Customer")}</strong>
      &lt;${escapeHtml(s.customer_details?.email || "no email")}&gt; — total <strong>${total}</strong>
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">${items}</table>
    <p style="color:#aaa;font-size:11px;margin:32px 0 0">Shipping details are saved on the order in Supabase and in the Stripe dashboard.</p>
  </div>
</body></html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `The Orient Gates <${fromAddress}>`,
        to: [contact.email],
        subject: `Order paid — ${total} (${s.customer_details?.name || s.customer_details?.email || "customer"})`,
        html,
      }),
    });
    if (!res.ok) {
      console.warn("[stripe webhook] order email failed:", res.status, (await res.text()).slice(0, 200));
    }
  } catch (e) {
    console.warn("[stripe webhook] order email error:", e instanceof Error ? e.message : e);
  }
}

// Newer Stripe API versions moved shipping off the session root onto
// collected_information; older sessions still carry shipping_details. Read both.
function shippingFrom(s: Stripe.Checkout.Session): unknown {
  return (
    s.collected_information?.shipping_details ??
    (s as unknown as { shipping_details?: unknown }).shipping_details ??
    null
  );
}

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
      // "completed" fires even when an async payment method is still pending;
      // in that case wait for async_payment_succeeded before marking paid.
      if (event.type === "checkout.session.completed" && s.payment_status === "unpaid") break;
      const shipping = shippingFrom(s);
      const { data: order } = await sb
        .from("orders")
        .update({
          status: "paid",
          stripe_payment_intent_id: typeof s.payment_intent === "string" ? s.payment_intent : null,
          customer_email: s.customer_details?.email || null,
          customer_name: s.customer_details?.name || null,
          shipping: shipping ? JSON.parse(JSON.stringify(shipping)) : null,
          metadata: s.metadata ? JSON.parse(JSON.stringify(s.metadata)) : null,
        })
        .eq("stripe_session_id", s.id)
        .select("line_items")
        .single();
      await notifyOrderPaid(s, (order?.line_items as OrderLine[]) || []);
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
