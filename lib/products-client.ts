"use client";

// Client-side product data layer. Wraps Supabase reads behind a React hook
// with a process-wide cache so multiple components sharing the page don't
// each refetch.

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { fromSupabase, type SupabaseProduct } from "@/lib/supabase-format";
import type { Product } from "@/lib/data";

let cache: { products: Product[]; at: number } | null = null;
let inflight: Promise<Product[]> | null = null;
const TTL_MS = 60_000;
const subscribers = new Set<() => void>();

async function fetchAll(): Promise<Product[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.products;
  if (inflight) return inflight;
  inflight = (async () => {
    const sb = getSupabaseBrowser();
    const { data, error } = await sb
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[products-client] fetch failed:", error.message);
      inflight = null;
      return cache?.products ?? [];
    }
    const products = (data as SupabaseProduct[]).map(fromSupabase);
    cache = { products, at: Date.now() };
    inflight = null;
    for (const fn of subscribers) fn();
    return products;
  })();
  return inflight;
}

export function invalidateProductsCache() {
  cache = null;
  for (const fn of subscribers) fn();
}

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(filter?: (p: Product) => boolean): UseProductsResult {
  const [products, setProducts] = useState<Product[]>(
    cache ? (filter ? cache.products.filter(filter) : cache.products) : []
  );
  const [loading, setLoading] = useState<boolean>(cache === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const sync = async () => {
      try {
        const all = await fetchAll();
        if (!alive) return;
        setProducts(filter ? all.filter(filter) : all);
        setLoading(false);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load products");
        setLoading(false);
      }
    };
    sync();
    const onChange = () => sync();
    subscribers.add(onChange);
    return () => {
      alive = false;
      subscribers.delete(onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, loading, error };
}

// Convenience filters — mirror old lib/data.ts helpers but as hook inputs.
export const productMatchers = {
  byCategoryOrSubcategory:
    (slug: string) =>
    (p: Product): boolean =>
      p.category === slug || p.subcategory === slug,
  newArrival: (p: Product): boolean => !!p.newArrival,
  featured: (p: Product): boolean => !!p.featured,
};

export function sortNewest(products: Product[]): Product[] {
  return [...products].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}
