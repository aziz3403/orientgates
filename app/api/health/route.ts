import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public diagnostics endpoint: GET /api/health
//
// Reports which env vars are PRESENT (never their values), which Supabase
// project the deployment points at, and live connectivity for both the
// anon (public reads) and service-role (admin writes) clients. Use it to
// tell apart in seconds: paused project vs missing env var vs RLS policy
// vs empty table.

interface CheckResult {
  ok: boolean;
  error?: string;
  count?: number | null;
  newestRow?: string | null;
  oldestRow?: string | null;
  sampleFiles?: string[];
}

function host(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return "(invalid URL)";
  }
}

export async function GET() {
  const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const env = {
    NEXT_PUBLIC_SUPABASE_URL: !!URL_,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!ANON,
    SUPABASE_SERVICE_ROLE_KEY: !!SERVICE,
    ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
  };

  const supabaseHost = host(URL_);

  const anonRead: CheckResult = { ok: false };
  if (URL_ && ANON) {
    try {
      const sb = createClient(URL_, ANON, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { count, error } = await sb
        .from("products")
        .select("*", { count: "exact", head: true });
      if (error) {
        anonRead.error = error.message;
      } else {
        anonRead.ok = true;
        anonRead.count = count;
        // Row timestamps show WHEN the current data was inserted.
        const { data: newest } = await sb
          .from("products")
          .select("created_at")
          .order("created_at", { ascending: false })
          .limit(1);
        const { data: oldest } = await sb
          .from("products")
          .select("created_at")
          .order("created_at", { ascending: true })
          .limit(1);
        anonRead.newestRow = newest?.[0]?.created_at ?? null;
        anonRead.oldestRow = oldest?.[0]?.created_at ?? null;
      }
    } catch (e) {
      anonRead.error = e instanceof Error ? e.message : "anon client failed";
    }
  } else {
    anonRead.error = "URL or anon key env var missing";
  }

  const serviceRead: CheckResult = { ok: false };
  const storage: CheckResult = { ok: false };
  if (URL_ && SERVICE) {
    try {
      const sb = createClient(URL_, SERVICE, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { count, error } = await sb
        .from("products")
        .select("*", { count: "exact", head: true });
      if (error) serviceRead.error = error.message;
      else {
        serviceRead.ok = true;
        serviceRead.count = count;
      }
      // Peek at the photo bucket — original uploads live here and are
      // never deleted by any app flow.
      const { data: files, error: stErr } = await sb.storage
        .from("product-images")
        .list("products", { limit: 5, sortBy: { column: "created_at", order: "desc" } });
      if (stErr) storage.error = stErr.message;
      else {
        storage.ok = true;
        storage.count = files?.length ?? 0;
        storage.sampleFiles = (files ?? []).map((f) => f.name);
      }
    } catch (e) {
      serviceRead.error = e instanceof Error ? e.message : "service client failed";
    }
  } else {
    serviceRead.error = "URL or service role key env var missing";
    storage.error = "service role key required to list storage";
  }

  return NextResponse.json({
    ok: anonRead.ok && serviceRead.ok,
    time: new Date().toISOString(),
    supabaseHost,
    env,
    anonRead,
    serviceRead,
    storage,
  });
}
