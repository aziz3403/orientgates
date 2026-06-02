import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { fromSupabase, type SupabaseProduct } from "@/lib/supabase-format";
import {
  invalidateProductsCache,
  revalidatePublicProductPages,
} from "@/lib/products-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Merge a set of products into one "keeper". Combines images/materials/tags
// (deduped, keeper's order preserved first) and deletes the other rows. All
// other fields on the keeper are left untouched — the operator can still
// edit them after.
//
// Body: { keepId: string, mergeIds: string[] }

function dedupe<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const out: T[] = [];
  for (const x of arr) {
    if (x == null) continue;
    if (typeof x === "string" && !x.trim()) continue;
    if (seen.has(x)) continue;
    seen.add(x);
    out.push(x);
  }
  return out;
}

export async function POST(req: NextRequest) {
  let body: { keepId?: unknown; mergeIds?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const keepId = typeof body.keepId === "string" ? body.keepId : "";
  const mergeIds = Array.isArray(body.mergeIds)
    ? body.mergeIds.filter((x): x is string => typeof x === "string" && x !== keepId)
    : [];

  if (!keepId) {
    return NextResponse.json({ ok: false, error: "Missing keepId" }, { status: 400 });
  }
  if (mergeIds.length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to merge" }, { status: 400 });
  }
  if (mergeIds.length > 50) {
    return NextResponse.json({ ok: false, error: "Too many products to merge at once (max 50)" }, { status: 400 });
  }

  const sb = createSupabaseAdmin();

  // Load the keeper and all the merge sources in one query.
  const allIds = [keepId, ...mergeIds];
  const { data: rows, error: fetchErr } = await sb
    .from("products")
    .select("*")
    .in("id", allIds);
  if (fetchErr) {
    return NextResponse.json({ ok: false, error: `Lookup failed: ${fetchErr.message}` }, { status: 500 });
  }
  const list = (rows ?? []) as SupabaseProduct[];
  const keeper = list.find((p) => p.id === keepId);
  if (!keeper) {
    return NextResponse.json({ ok: false, error: "Keeper product not found" }, { status: 404 });
  }
  const sources = list.filter((p) => p.id !== keepId);
  if (sources.length === 0) {
    return NextResponse.json({ ok: false, error: "None of the merge ids matched real products" }, { status: 404 });
  }

  // Combine images / materials / tags — keeper first, then each source in turn.
  const combinedImages = dedupe([
    ...(keeper.images ?? []),
    ...sources.flatMap((s) => s.images ?? []),
  ]);
  const combinedMaterials = dedupe([
    ...(keeper.materials ?? []),
    ...sources.flatMap((s) => s.materials ?? []),
  ]);
  const combinedTags = dedupe([
    ...(keeper.tags ?? []),
    ...sources.flatMap((s) => s.tags ?? []),
  ]);

  // Sum quantities across all merged rows (if any track quantity).
  const totalQty = list.reduce((sum, p) => sum + (typeof p.quantity === "number" ? p.quantity : 0), 0);

  const { data: updated, error: updateErr } = await sb
    .from("products")
    .update({
      images: combinedImages,
      materials: combinedMaterials,
      tags: combinedTags,
      quantity: totalQty > 0 ? totalQty : (keeper.quantity ?? null),
    })
    .eq("id", keepId)
    .select()
    .single();
  if (updateErr) {
    return NextResponse.json({ ok: false, error: `Update failed: ${updateErr.message}` }, { status: 500 });
  }

  // Delete the merged sources.
  const { error: deleteErr } = await sb
    .from("products")
    .delete()
    .in("id", sources.map((s) => s.id));
  if (deleteErr) {
    return NextResponse.json({
      ok: false,
      error: `Keeper updated but cleanup failed: ${deleteErr.message}. You may need to delete the source products manually.`,
    }, { status: 500 });
  }

  invalidateProductsCache();
  revalidatePublicProductPages();

  return NextResponse.json({
    ok: true,
    keeper: fromSupabase(updated as SupabaseProduct),
    deletedIds: sources.map((s) => s.id),
    combinedImageCount: combinedImages.length,
  });
}
