"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Product, getProductSKU } from "@/lib/data";
import { invalidateProductsCache as invalidatePublicCache } from "@/lib/products-client";
import ImageManager from "@/components/admin/ImageManager";

const emptyProduct: Partial<Product> = {
  title: "",
  slug: "",
  category: "mother-of-pearl-furniture",
  subcategory: "",
  type: "inquiry",
  price: null,
  priceDisplay: "Price on Request",
  availability: "available",
  period: "",
  origin: "",
  materials: [],
  dimensions: "",
  description: "",
  craftsmanship: "",
  condition: "",
  provenance: "",
  shipping: "White-glove delivery available worldwide.",
  insurance: "Full transit insurance included.",
  images: [],
  featured: false,
  newArrival: false,
  dateAdded: new Date().toISOString().split("T")[0],
  certificateOfAuthenticity: false,
  tags: [],
};

function generateId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function generateSKU(category: string, subcategory?: string): string {
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
  const num = Math.floor(Math.random() * 900 + 100);
  return `TOG-${prefix}-${num}`;
}

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(emptyProduct);
  const [showForm, setShowForm] = useState(false);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage((m) => (m === msg ? null : m)), 3000);
  };
  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage((m) => (m === msg ? null : m)), 6000);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load");
      setProducts(data.products as Product[]);
    } catch (e) {
      showError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  const handleSave = async () => {
    const title = (formData.title || "").trim();
    if (!title) {
      showError("Title is required");
      return;
    }
    // Auto-derive slug from title when blank. Append a short random tail so
    // two products with the same title don't collide on the URL.
    let slug = (formData.slug || "").trim();
    if (!slug) {
      const base = slugify(title);
      const tail = Math.random().toString(36).slice(2, 6);
      slug = base ? `${base}-${tail}` : `item-${tail}`;
    }
    const normalized: Partial<Product> = { ...formData, title, slug };

    setSaving(true);
    setErrorMessage(null);
    try {
      if (editingId) {
        const full = { ...normalized, id: editingId } as Product;
        const res = await fetch("/api/admin/products", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: full }),
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || "Update failed");
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? (data.product as Product) : p))
        );
        showStatus("Updated ✓");
      } else {
        const id = generateId();
        const baseSku = generateSKU(normalized.category || "", normalized.subcategory);
        const candidate = {
          ...emptyProduct,
          ...normalized,
          id,
          sku: normalized.sku || baseSku,
        } as Product;
        candidate.sku = candidate.sku || getProductSKU(candidate);
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: candidate }),
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || "Create failed");
        setProducts((prev) => [...prev, data.product as Product]);
        showStatus("Created ✓");
      }
      invalidatePublicCache();
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyProduct);
    } catch (e) {
      showError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This removes it from the live Supabase DB.")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Delete failed");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      invalidatePublicCache();
      showStatus("Deleted ✓");
    } catch (e) {
      showError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  };

  const handleInlineUpdate = async (id: string, fields: Partial<Product>) => {
    const original = products.find((p) => p.id === id);
    if (!original) return;
    const updated = { ...original, ...fields };
    // optimistic
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: updated }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Save failed");
      invalidatePublicCache();
    } catch (e) {
      // revert
      setProducts((prev) => prev.map((p) => (p.id === id ? original : p)));
      showError(e instanceof Error ? e.message : "Save failed");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Status / error toasts */}
        {statusMessage && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 px-5 py-3 text-[11px] tracking-[0.2em] uppercase font-sans">
            {statusMessage}
          </div>
        )}
        {errorMessage && (
          <div className="fixed top-6 right-6 z-50 bg-red-500/10 border border-red-500/40 text-red-300 px-5 py-3 text-[11px] tracking-[0.15em] uppercase font-sans max-w-md">
            {errorMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-serif text-ivory">Product Management</h1>
            <p className="text-[12px] text-warm-gray/70 font-sans mt-1">
              {loading
                ? "Loading from Supabase…"
                : `${products.length} products live in Supabase`}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setFormData(emptyProduct);
              }}
              disabled={loading || saving}
              className="bg-brass text-midnight px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans disabled:opacity-30"
            >
              + Add Product
            </button>
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="border border-white/15 text-ivory/60 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-brass/30 disabled:opacity-30"
            >
              {loading ? "Loading…" : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="border border-white/15 text-ivory/40 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-white/30"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, ID, or SKU..."
          className="w-full bg-transparent border-b border-white/15 pb-3 text-ivory text-sm font-sans focus:border-brass outline-none mb-8"
        />

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-midnight/90 backdrop-blur-xl overflow-y-auto py-10 px-6">
            <div className="max-w-2xl mx-auto bg-charcoal border border-white/10 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-serif text-ivory">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-warm-gray/70 hover:text-ivory text-lg"
                  disabled={saving}
                >
                  &times;
                </button>
              </div>

              <div className="space-y-5">
                {/* Core fields */}
                {[
                  { key: "title", label: "Title", type: "text" },
                  { key: "slug", label: "URL Slug", type: "text" },
                  { key: "subtitle", label: "Subtitle", type: "text" },
                  { key: "period", label: "Period / Circa", type: "text" },
                  { key: "origin", label: "Country of Origin", type: "text" },
                  { key: "dimensions", label: "Dimensions", type: "text" },
                  { key: "weight", label: "Weight", type: "text" },
                  { key: "priceDisplay", label: "Price Display", type: "text" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={(formData as any)[field.key] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    />
                  </div>
                ))}

                {/* Price (number) */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                    Price (number, blank for inquiry)
                  </label>
                  <input
                    type="number"
                    value={formData.price ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                  />
                </div>

                {/* Selects */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="mother-of-pearl-furniture">
                        Mother of Pearl Furniture
                      </option>
                      <option value="antiques">Antiques</option>
                      <option value="carpets-textiles">Carpets & Textiles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      Subcategory
                    </label>
                    <select
                      value={formData.subcategory || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, subcategory: e.target.value })
                      }
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="">None</option>
                      <option value="islamic-antiques">Islamic Antiques</option>
                      <option value="european-antiques">European Antiques</option>
                      <option value="asian-antiques">Asian Antiques</option>
                      <option value="mop-mirrors">Mirrors & Wall Decor</option>
                      <option value="mop-tables">Tables</option>
                      <option value="mop-seating">Seating</option>
                      <option value="mop-suites">Suites</option>
                      <option value="mop-consoles-cabinets">Consoles & Cabinets</option>
                      <option value="mop-chest-of-drawers">Chest of Drawers</option>
                      <option value="mop-accessories">Accessories</option>
                      <option value="mop-game-tables">Game Tables</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type || "inquiry"}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as any })
                      }
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="purchasable">Purchasable</option>
                      <option value="inquiry">Inquiry Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      Availability
                    </label>
                    <select
                      value={formData.availability || "available"}
                      onChange={(e) =>
                        setFormData({ ...formData, availability: e.target.value as any })
                      }
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </div>
                </div>

                {/* Textareas — long form */}
                {[
                  { key: "description", label: "Description" },
                  { key: "craftsmanship", label: "Craftsmanship" },
                  { key: "condition", label: "Condition" },
                  { key: "provenance", label: "Provenance" },
                  { key: "materialsDetail", label: "Materials Detail (long form)" },
                  { key: "restorationHistory", label: "Restoration History" },
                  { key: "exhibitionHistory", label: "Exhibition History" },
                  { key: "literatureReferences", label: "Literature References" },
                  { key: "comparableSales", label: "Comparable Sales" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      {field.label}
                    </label>
                    <textarea
                      value={(formData as any)[field.key] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-transparent border border-white/10 p-3 text-ivory text-sm font-sans focus:border-brass outline-none resize-none"
                    />
                  </div>
                ))}

                {/* Comma-separated text array fields (non-image) */}
                {[
                  { key: "materials", label: "Materials (comma-separated)" },
                  { key: "tags", label: "Tags (comma-separated)" },
                  { key: "relatedIds", label: "Related Product IDs (comma-separated)" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={((formData as any)[field.key] || []).join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    />
                  </div>
                ))}

                {/* Product images — visual gallery */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-3">
                    Product Photos
                    <span className="text-warm-gray/40 normal-case tracking-normal ml-2">
                      ({(formData.images || []).length})
                    </span>
                  </label>
                  <ImageManager
                    images={formData.images || []}
                    onChange={(images) => setFormData({ ...formData, images })}
                  />
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={formData.videoUrl || ""}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                  />
                </div>

                {/* Expert Appraisal */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                    Expert Appraisal
                  </label>
                  <textarea
                    value={formData.expertAppraisal || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, expertAppraisal: e.target.value })
                    }
                    rows={2}
                    className="w-full bg-transparent border border-white/10 p-3 text-ivory text-sm font-sans focus:border-brass outline-none resize-none"
                    placeholder="Expert authentication quote or assessment..."
                  />
                </div>

                {/* Auction History */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                    Auction History (JSON array of records)
                  </label>
                  <textarea
                    value={JSON.stringify(formData.auctionHistory || [], null, 2)}
                    onChange={(e) => {
                      try {
                        setFormData({ ...formData, auctionHistory: JSON.parse(e.target.value) });
                      } catch {
                        /* keep typing */
                      }
                    }}
                    rows={4}
                    className="w-full bg-transparent border border-white/10 p-3 text-ivory text-xs font-mono focus:border-brass outline-none resize-none"
                    placeholder={'[{"house": "Sothebys", "date": "2020", "lot": "Lot 42"}]'}
                  />
                </div>

                {/* Insurance Valuation */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                    Insurance Valuation ($)
                  </label>
                  <input
                    type="number"
                    value={formData.insuranceValuation ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insuranceValuation: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                  />
                </div>

                {/* Toggles */}
                <div className="flex gap-6 pt-4">
                  {[
                    { key: "featured", label: "Featured" },
                    { key: "newArrival", label: "New Arrival" },
                    { key: "certificateOfAuthenticity", label: "COA" },
                  ].map((toggle) => (
                    <label key={toggle.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData as any)[toggle.key] || false}
                        onChange={(e) =>
                          setFormData({ ...formData, [toggle.key]: e.target.checked })
                        }
                        className="accent-brass"
                      />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-warm-gray/80 font-sans">
                        {toggle.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Save */}
                <div className="flex gap-3 pt-6">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-brass text-midnight px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans disabled:opacity-30"
                  >
                    {saving ? "Saving…" : editingId ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    disabled={saving}
                    className="border border-white/15 text-ivory/60 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-sans"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                {["Photo", "SKU", "Title", "Category", "Price", "Status", "Type", "Featured", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="pb-3 text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans font-normal whitespace-nowrap px-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {loading && products.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-warm-gray/50 text-sm font-sans">
                    Loading from Supabase…
                  </td>
                </tr>
              )}
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 px-3">
                    {p.images && p.images.length > 0 ? (
                      <div className="relative w-12 h-12 bg-charcoal border border-white/10 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.opacity = "0.15";
                          }}
                        />
                        {p.images.length > 1 && (
                          <span className="absolute bottom-0 right-0 bg-midnight/85 text-ivory/90 text-[8px] font-mono px-1 leading-tight">
                            +{p.images.length - 1}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="w-12 h-12 border border-dashed border-white/10 flex items-center justify-center">
                        <span className="text-warm-gray/30 text-[9px] font-sans">none</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 text-[11px] text-warm-gray/80 font-mono">
                    {p.sku || "—"}
                  </td>
                  <td className="py-3 px-3 text-sm text-ivory font-sans truncate max-w-[250px]">
                    {p.title}
                  </td>
                  <td className="py-3 px-3 text-[11px] text-warm-gray/80 font-sans">
                    {p.subcategory || p.category}
                  </td>
                  <td className="py-3 px-3 text-sm text-ivory/70 font-sans">{p.priceDisplay}</td>
                  <td className="py-3 px-3">
                    <select
                      value={p.availability}
                      onChange={(e) => handleInlineUpdate(p.id, { availability: e.target.value as any })}
                      className={`bg-transparent text-[10px] tracking-[0.15em] uppercase font-sans px-2 py-1 border outline-none ${
                        p.availability === "available"
                          ? "text-emerald-400/70 border-emerald-400/20"
                          : p.availability === "sold"
                            ? "text-red-400/70 border-red-400/20"
                            : "text-amber-400/70 border-amber-400/20"
                      }`}
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={p.type}
                      onChange={(e) => handleInlineUpdate(p.id, { type: e.target.value as any })}
                      className="bg-transparent text-[10px] text-ivory/75 font-sans border border-white/10 px-2 py-1 outline-none"
                    >
                      <option value="purchasable">Purchase</option>
                      <option value="inquiry">Inquiry</option>
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={p.featured || false}
                      onChange={(e) => handleInlineUpdate(p.id, { featured: e.target.checked })}
                      className="accent-brass"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-[10px] text-brass/60 hover:text-brass transition-colors font-sans"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-[10px] text-red-400/40 hover:text-red-400 transition-colors font-sans"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
