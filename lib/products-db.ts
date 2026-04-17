"use client";

import { Product, products as seedProducts, getProductSKU } from "./data";

const DB_KEY = "orient-gates-products-db";
const DB_INITIALIZED_KEY = "orient-gates-db-initialized";

// Initialize the DB with seed data if not already done
export function initializeDB(): Product[] {
  if (typeof window === "undefined") return seedProducts;

  const initialized = localStorage.getItem(DB_INITIALIZED_KEY);
  if (!initialized) {
    // Enrich seed products with auto-generated SKUs
    const enriched = seedProducts.map((p) => ({
      ...p,
      sku: p.sku || getProductSKU(p),
    }));
    localStorage.setItem(DB_KEY, JSON.stringify(enriched));
    localStorage.setItem(DB_INITIALIZED_KEY, "true");
    return enriched;
  }

  try {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : seedProducts;
  } catch {
    return seedProducts;
  }
}

function saveDB(products: Product[]) {
  localStorage.setItem(DB_KEY, JSON.stringify(products));
}

export function getAllProductsDB(): Product[] {
  return initializeDB();
}

export function getProductDB(id: string): Product | undefined {
  return initializeDB().find((p) => p.id === id);
}

export function addProduct(product: Product): Product {
  const all = initializeDB();
  const enriched = { ...product, sku: product.sku || getProductSKU(product) };
  all.push(enriched);
  saveDB(all);
  return enriched;
}

export function updateProduct(id: string, fields: Partial<Product>): Product | undefined {
  const all = initializeDB();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  all[index] = { ...all[index], ...fields };
  saveDB(all);
  return all[index];
}

export function deleteProduct(id: string): boolean {
  const all = initializeDB();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  saveDB(filtered);
  return true;
}

export function generateId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

export function generateSKU(category: string, subcategory?: string): string {
  const prefix = category === "mother-of-pearl-furniture" ? "MOP"
    : subcategory === "islamic-antiques" ? "ISL"
    : subcategory === "european-antiques" ? "EUR"
    : subcategory === "asian-antiques" ? "ASN"
    : category === "carpets-textiles" ? "TXT"
    : "GEN";
  const num = Math.floor(Math.random() * 900 + 100);
  return `TOG-${prefix}-${num}`;
}

export function exportJSON(): string {
  return JSON.stringify(initializeDB(), null, 2);
}

export function importJSON(json: string): boolean {
  try {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) return false;
    saveDB(data);
    return true;
  } catch {
    return false;
  }
}

export function resetDB(): void {
  localStorage.removeItem(DB_KEY);
  localStorage.removeItem(DB_INITIALIZED_KEY);
}
