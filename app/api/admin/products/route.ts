import { guarded } from "@/lib/api-guard";
import { NextResponse, type NextRequest } from "next/server";
import {
  createSupabaseAdmin,
  createSupabaseAnon,
  supabaseConfigMismatch,
} from "@/lib/supabase/server";
import {
  fromSupabase,
  toSupabase,
  type SupabaseProduct,
} from "@/lib/supabase-format";
import {
  invalidateProductsCache,
  revalidatePublicProductPages,
} from "@/lib/products-server";
import type { Product } from "@/lib/data";

// Auth middleware already gates /api/admin/*. This route trusts the cookie check.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bustCaches() {
  invalidateProductsCache();
  revalidatePublicProductPages();
}

async function handleGET() {
  // Products are publicly readable, so the list uses the anon client — the
  // dashboard keeps working even when the service-role key is misconfigured.
  const sb = createSupabaseAnon();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  const products: Product[] = (data as SupabaseProduct[]).map(fromSupabase);
  return NextResponse.json({ ok: true, products });
}

async function handlePOST(req: NextRequest) {
  const mismatch = supabaseConfigMismatch();
  if (mismatch) {
    return NextResponse.json({ ok: false, error: mismatch }, { status: 500 });
  }
  const body = await req.json().catch(() => ({}));
  const product = body?.product as Product | undefined;
  if (!product || !product.id || !product.slug || !product.title) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields (id, slug, title)" },
      { status: 400 }
    );
  }
  const row = toSupabase(product);
  const sb = createSupabaseAdmin();
  const { data, error } = await sb
    .from("products")
    .insert(row)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  bustCaches();
  return NextResponse.json({
    ok: true,
    product: fromSupabase(data as SupabaseProduct),
  });
}

async function handlePATCH(req: NextRequest) {
  const mismatch = supabaseConfigMismatch();
  if (mismatch) {
    return NextResponse.json({ ok: false, error: mismatch }, { status: 500 });
  }
  const body = await req.json().catch(() => ({}));
  const product = body?.product as Product | undefined;
  if (!product || !product.id) {
    return NextResponse.json(
      { ok: false, error: "Missing product.id" },
      { status: 400 }
    );
  }
  const row = toSupabase(product);
  const sb = createSupabaseAdmin();
  const { data, error } = await sb
    .from("products")
    .update(row)
    .eq("id", product.id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  bustCaches();
  return NextResponse.json({
    ok: true,
    product: fromSupabase(data as SupabaseProduct),
  });
}

async function handleDELETE(req: NextRequest) {
  const mismatch = supabaseConfigMismatch();
  if (mismatch) {
    return NextResponse.json({ ok: false, error: mismatch }, { status: 500 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Missing id query parameter" },
      { status: 400 }
    );
  }
  const sb = createSupabaseAdmin();
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  bustCaches();
  return NextResponse.json({ ok: true });
}

export const GET = guarded(handleGET);
export const POST = guarded(handlePOST);
export const PATCH = guarded(handlePATCH);
export const DELETE = guarded(handleDELETE);
