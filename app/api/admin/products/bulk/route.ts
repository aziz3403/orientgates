import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { toSupabase, fromSupabase, type SupabaseProduct } from "@/lib/supabase-format";
import {
  invalidateProductsCache,
  revalidatePublicProductPages,
} from "@/lib/products-server";
import type { Product } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_CATEGORIES = new Set([
  "mother-of-pearl-furniture",
  "antiques",
  "carpets-textiles",
]);

const VALID_SUBCATEGORIES = new Set([
  "mop-mirrors",
  "mop-tables",
  "mop-seating",
  "mop-consoles-cabinets",
  "mop-chest-of-drawers",
  "mop-accessories",
  "mop-game-tables",
  "islamic-antiques",
  "european-antiques",
  "asian-antiques",
]);

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function generateId(seed: number): string {
  // Unique within a batch even if multiple inserts hit the same ms.
  return `prod-${Date.now()}-${seed.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function generateSku(category: string, subcategory: string | undefined, seed: number): string {
  const prefix =
    category === "mother-of-pearl-furniture"
      ? "MOP"
      : subcategory === "islamic-antiques"
        ? "ISL"
        : subcategory === "european-antiques"
          ? "EUR"
          : subcategory === "asian-antiques"
            ? "ASN"
            : category === "carpets-textiles"
              ? "TXT"
              : "GEN";
  const num = ((seed % 900) + 100).toString();
  return `TOG-${prefix}-${num}`;
}

interface RawRow {
  // Anything the user pastes — validated below.
  [k: string]: unknown;
}

interface NormalizedResult {
  ok: true;
  product: Product;
}
interface NormalizedError {
  ok: false;
  error: string;
}

function asString(v: unknown): string | undefined {
  if (typeof v === "string" && v.trim()) return v.trim();
  return undefined;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string" && x.trim().length > 0).map((x) => x.trim());
}

function asNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v.replace(/[, $]/g, ""));
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function normalize(row: RawRow, idx: number): NormalizedResult | NormalizedError {
  const title = asString(row.title);
  if (!title) return { ok: false, error: "Missing title" };

  const category = asString(row.category);
  if (!category || !VALID_CATEGORIES.has(category)) {
    return {
      ok: false,
      error: `Invalid category "${category ?? ""}". Must be one of: ${Array.from(VALID_CATEGORIES).join(", ")}`,
    };
  }

  const subcategory = asString(row.subcategory);
  if (subcategory && !VALID_SUBCATEGORIES.has(subcategory)) {
    return {
      ok: false,
      error: `Invalid subcategory "${subcategory}".`,
    };
  }

  const images = asStringArray(row.images);
  if (images.length === 0) {
    return { ok: false, error: "Missing images (need at least one URL)" };
  }

  const price = asNumber(row.price);
  const priceDisplay =
    asString(row.priceDisplay) ?? (price ? `$${price.toLocaleString()}` : "Price on Request");

  const slug = asString(row.slug) ?? slugify(title);
  if (!slug) return { ok: false, error: "Could not derive a slug from title" };

  const id = asString(row.id) ?? generateId(idx);
  const sku = asString(row.sku) ?? generateSku(category, subcategory, idx);

  const product: Product = {
    id,
    sku,
    slug,
    title,
    subtitle: asString(row.subtitle),
    category,
    subcategory,
    type: (asString(row.type) === "purchasable" ? "purchasable" : "inquiry") as Product["type"],
    price,
    priceDisplay,
    availability: (asString(row.availability) ?? "available") as Product["availability"],
    period: asString(row.period) ?? "",
    origin: asString(row.origin) ?? "",
    materials: asStringArray(row.materials),
    dimensions: asString(row.dimensions) ?? "",
    weight: asString(row.weight),
    description: asString(row.description) ?? "",
    craftsmanship: asString(row.craftsmanship) ?? "",
    condition: asString(row.condition) ?? "",
    provenance: asString(row.provenance) ?? "",
    shipping: asString(row.shipping) ?? "White-glove delivery available worldwide.",
    insurance: asString(row.insurance) ?? "Full transit insurance included.",
    images,
    featured: row.featured === true,
    newArrival: row.newArrival === false ? false : true,
    dateAdded: asString(row.dateAdded) ?? new Date().toISOString().split("T")[0],
    certificateOfAuthenticity: row.certificateOfAuthenticity === true,
    tags: asStringArray(row.tags),
  };

  return { ok: true, product };
}

interface BulkReport {
  inserted: number;
  failed: { index: number; title: string; error: string }[];
  insertedTitles: string[];
}

export async function POST(req: NextRequest) {
  let body: { products?: unknown; dryRun?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.products)) {
    return NextResponse.json(
      { ok: false, error: 'Expected { products: [...] } in body' },
      { status: 400 }
    );
  }
  if (body.products.length === 0) {
    return NextResponse.json({ ok: false, error: "Empty products array" }, { status: 400 });
  }
  if (body.products.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Too many rows in one batch (max 200)" },
      { status: 400 }
    );
  }

  const valid: { product: Product; index: number }[] = [];
  const failed: BulkReport["failed"] = [];

  body.products.forEach((raw, i) => {
    if (raw == null || typeof raw !== "object") {
      failed.push({ index: i, title: "", error: "Row is not an object" });
      return;
    }
    const result = normalize(raw as RawRow, i);
    if (result.ok) valid.push({ product: result.product, index: i });
    else
      failed.push({
        index: i,
        title: typeof (raw as RawRow).title === "string" ? ((raw as RawRow).title as string) : "",
        error: result.error,
      });
  });

  // Dry-run = validation report only.
  if (body.dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      validCount: valid.length,
      failed,
      preview: valid.slice(0, 3).map((v) => v.product),
    });
  }

  if (valid.length === 0) {
    return NextResponse.json({ ok: false, error: "No valid rows to insert", failed }, { status: 400 });
  }

  const rows = valid.map((v) => toSupabase(v.product));
  const sb = createSupabaseAdmin();
  const { data, error } = await sb.from("products").insert(rows).select();

  if (error) {
    return NextResponse.json(
      { ok: false, error: `Bulk insert failed: ${error.message}`, failed },
      { status: 500 }
    );
  }

  invalidateProductsCache();
  revalidatePublicProductPages();

  const report: BulkReport = {
    inserted: data?.length ?? 0,
    failed,
    insertedTitles: (data ?? []).map((r) => (r as SupabaseProduct).title),
  };
  return NextResponse.json({ ok: true, ...report, products: (data ?? []).map((r) => fromSupabase(r as SupabaseProduct)) });
}
