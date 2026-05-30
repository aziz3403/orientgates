// ══════════════════════════════════════════════
// Supabase column ↔ local Product field conversions.
//
// Local code uses camelCase (Product type in lib/data.ts).
// Supabase columns are snake_case. Use these to round-trip
// the JSON export/import without losing data.
// ══════════════════════════════════════════════

import type { Product } from "./data";

// snake_case shape that mirrors public.products columns exactly.
export interface SupabaseProduct {
  id: string;
  sku: string | null;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  subcategory: string | null;
  type: string;
  price: number | null;
  price_display: string;
  availability: string;
  quantity: number;
  period: string;
  origin: string;
  materials: string[];
  dimensions: string;
  weight: string | null;
  description: string;
  craftsmanship: string;
  condition: string;
  provenance: string;
  shipping: string | null;
  insurance: string | null;
  images: string[];
  featured: boolean;
  new_arrival: boolean;
  date_added: string;
  certificate_of_authenticity: boolean;
  expert_appraisal: string | null;
  auction_history: unknown | null;
  tags: string[] | null;
  related_ids: string[] | null;
  restoration_history: string | null;
  exhibition_history: string | null;
  literature_references: string | null;
  comparable_sales: string | null;
  insurance_valuation: number | null;
  video_url: string | null;
  materials_detail: string | null;
  // created_at / updated_at are managed by Postgres on upsert and
  // intentionally not part of the camelCase Product. They are
  // preserved if present on the incoming row.
  created_at?: string;
  updated_at?: string;
}

export function fromSupabase(row: SupabaseProduct): Product {
  return {
    id: row.id,
    sku: row.sku ?? undefined,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    category: row.category,
    subcategory: row.subcategory ?? undefined,
    type: (row.type as Product["type"]) ?? "inquiry",
    price: row.price,
    priceDisplay: row.price_display,
    availability: (row.availability as Product["availability"]) ?? "available",
    quantity: row.quantity ?? undefined,
    period: row.period ?? "",
    origin: row.origin ?? "",
    materials: row.materials ?? [],
    dimensions: row.dimensions ?? "",
    weight: row.weight ?? undefined,
    description: row.description ?? "",
    craftsmanship: row.craftsmanship ?? "",
    condition: row.condition ?? "",
    provenance: row.provenance ?? "",
    shipping: row.shipping ?? undefined,
    insurance: row.insurance ?? undefined,
    images: row.images ?? [],
    featured: row.featured,
    newArrival: row.new_arrival,
    dateAdded: row.date_added,
    certificateOfAuthenticity: row.certificate_of_authenticity,
    expertAppraisal: row.expert_appraisal ?? undefined,
    auctionHistory: (row.auction_history as Product["auctionHistory"]) ?? undefined,
    tags: row.tags ?? undefined,
    relatedIds: row.related_ids ?? undefined,
    restorationHistory: row.restoration_history ?? undefined,
    exhibitionHistory: row.exhibition_history ?? undefined,
    literatureReferences: row.literature_references ?? undefined,
    comparableSales: row.comparable_sales ?? undefined,
    insuranceValuation: row.insurance_valuation ?? undefined,
    videoUrl: row.video_url ?? undefined,
    materialsDetail: row.materials_detail ?? undefined,
  };
}

export function toSupabase(p: Product): SupabaseProduct {
  return {
    id: p.id,
    sku: p.sku ?? null,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle ?? null,
    category: p.category,
    subcategory: p.subcategory ?? null,
    type: p.type,
    price: p.price,
    price_display: p.priceDisplay,
    availability: p.availability,
    quantity: p.quantity ?? 1,
    period: p.period ?? "",
    origin: p.origin ?? "",
    materials: p.materials ?? [],
    dimensions: p.dimensions ?? "",
    weight: p.weight ?? null,
    description: p.description ?? "",
    craftsmanship: p.craftsmanship ?? "",
    condition: p.condition ?? "",
    provenance: p.provenance ?? "",
    shipping: p.shipping ?? null,
    insurance: p.insurance ?? null,
    images: p.images ?? [],
    featured: !!p.featured,
    new_arrival: !!p.newArrival,
    date_added: p.dateAdded,
    certificate_of_authenticity: !!p.certificateOfAuthenticity,
    expert_appraisal: p.expertAppraisal ?? null,
    auction_history: p.auctionHistory ?? null,
    tags: p.tags ?? null,
    related_ids: p.relatedIds ?? null,
    restoration_history: p.restorationHistory ?? null,
    exhibition_history: p.exhibitionHistory ?? null,
    literature_references: p.literatureReferences ?? null,
    comparable_sales: p.comparableSales ?? null,
    insurance_valuation: p.insuranceValuation ?? null,
    video_url: p.videoUrl ?? null,
    materials_detail: p.materialsDetail ?? null,
  };
}
