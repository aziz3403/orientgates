import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Subscribers for the monthly Curator's Letter.
//
// Expected Supabase table (create once in the SQL editor):
//
//   create table public.subscribers (
//     id uuid primary key default gen_random_uuid(),
//     email text not null unique,
//     source text default 'website',
//     created_at timestamptz not null default now()
//   );
//   alter table public.subscribers enable row level security;
//   -- No public policies: only the service role writes/reads.

export async function POST(req: NextRequest) {
  if (!rateLimit(`subscribe:${clientIp(req)}`, 5, 60 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  let sb;
  try {
    sb = createSupabaseAdmin();
  } catch (e) {
    console.error("[curators-letter] supabase not configured:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { ok: false, error: "Subscriptions are not available right now." },
      { status: 500 }
    );
  }

  const { error } = await sb
    .from("subscribers")
    .insert({ email, source: "curators-letter" });

  if (error) {
    // Unique-violation → already subscribed. Idempotent UX.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error("[curators-letter] insert failed:", error.message);
    return NextResponse.json(
      { ok: false, error: "Could not subscribe. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
