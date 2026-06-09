import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { fromSupabase, type SupabaseProduct } from "@/lib/supabase-format";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CartLine {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  // Each call creates a Stripe session + a pending order row — keep bots out.
  if (!rateLimit(`checkout:${clientIp(req)}`, 10, 60 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many checkout attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Stripe is not yet configured on the server." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const lines = body?.items as CartLine[] | undefined;
  const customerEmail = (body?.customerEmail as string | undefined) || undefined;
  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ ok: false, error: "Cart is empty." }, { status: 400 });
  }

  // Look up products by id (trust the server, not the client, for prices)
  const ids = lines.map((l) => l.productId);
  const sb = createSupabaseAdmin();
  const { data, error } = await sb.from("products").select("*").in("id", ids);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  const products = (data as SupabaseProduct[]).map(fromSupabase);
  const lookup = new Map(products.map((p) => [p.id, p]));

  // Build line items — refuse anything that isn't purchasable / lacks a price
  const lineItems: { price_data: any; quantity: number }[] = [];
  const summary: { id: string; title: string; quantity: number; amount_cents: number }[] = [];
  for (const l of lines) {
    const p = lookup.get(l.productId);
    if (!p) {
      return NextResponse.json({ ok: false, error: `Unknown product: ${l.productId}` }, { status: 400 });
    }
    if (p.type !== "purchasable" || p.availability !== "available" || !p.price) {
      return NextResponse.json(
        { ok: false, error: `${p.title} is by inquiry only — please contact us.` },
        { status: 400 }
      );
    }
    const qty = Math.max(1, Math.min(10, Math.floor(l.quantity || 1)));
    const amount_cents = Math.round(p.price * 100);
    lineItems.push({
      price_data: {
        currency: "usd",
        unit_amount: amount_cents,
        product_data: {
          name: p.title,
          description: p.subtitle || undefined,
          images: p.images?.slice(0, 1) || undefined,
          metadata: { product_id: p.id, sku: p.sku || "" },
        },
      },
      quantity: qty,
    });
    summary.push({ id: p.id, title: p.title, quantity: qty, amount_cents });
  }

  const origin = req.headers.get("origin") || "https://theorientgates.com";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    billing_address_collection: "required",
    shipping_address_collection: {
      // Worldwide white-glove shipping — accept everywhere Stripe supports
      allowed_countries: [
        "US","CA","GB","FR","IT","DE","ES","NL","BE","CH","AT","DK","SE","NO","FI","IE","PT","GR",
        "AU","NZ","JP","SG","HK","AE","SA","QA","KW","BH","OM","JO","LB","IL","TR","EG",
      ],
    },
    metadata: { source: "theorientgates.com" },
  });

  // Pre-create a pending order row keyed by session id so the webhook can
  // upgrade it to "paid" cleanly.
  await sb.from("orders").insert({
    stripe_session_id: session.id,
    customer_email: customerEmail || null,
    total_cents: summary.reduce((s, l) => s + l.amount_cents * l.quantity, 0),
    line_items: summary,
    status: "pending",
  });

  return NextResponse.json({ ok: true, url: session.url, id: session.id });
}
