// Server-side data layer. All async — pages must await.
// Replaces the static `products` array that used to live in lib/data.ts.

import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import { createSupabaseAnon } from "@/lib/supabase/server";
import { fromSupabase, type SupabaseProduct } from "@/lib/supabase-format";
import type { Product } from "@/lib/data";

const TAG_ALL = "products:all";

// Cached fetch of every product. Tagged so admin writes can invalidate it.
const fetchAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const sb = createSupabaseAnon();
    const { data, error } = await sb
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[products-server] getAllProducts failed:", error.message);
      return [];
    }
    return (data as SupabaseProduct[]).map(fromSupabase);
  },
  ["products:all"],
  { tags: [TAG_ALL], revalidate: 60 }
);

export async function getAllProducts(): Promise<Product[]> {
  return fetchAllProducts();
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id);
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter(
    (p) => p.category === categorySlug || p.subcategory === categorySlug
  );
}

export async function getNewArrivals(): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.newArrival)
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured);
}

// Look up multiple products by id (used by wishlist).
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const set = new Set(ids);
  const all = await getAllProducts();
  return all.filter((p) => set.has(p.id));
}

// Invalidate the cache — called from admin write endpoints.
export function invalidateProductsCache() {
  try {
    revalidateTag(TAG_ALL);
  } catch {
    // revalidateTag throws in some runtimes (eg static gen); ignore.
  }
}

export function revalidatePublicProductPages() {
  // Best-effort cache busts for the public consumers.
  const paths = [
    "/",
    "/new-arrivals",
    "/mother-of-pearl",
    "/mother-of-pearl-furniture",
    "/antiques",
    "/carpets-textiles",
  ];
  for (const p of paths) {
    try {
      revalidatePath(p, "page");
    } catch {
      /* ignore */
    }
  }
  // Detail pages — wildcard via layout revalidation.
  try {
    revalidatePath("/collection/[category]/[slug]", "page");
    revalidatePath("/mother-of-pearl-furniture/[subcategory]", "page");
    revalidatePath("/antiques/[subcategory]", "page");
    revalidatePath("/collection/[category]", "page");
  } catch {
    /* ignore */
  }
}
