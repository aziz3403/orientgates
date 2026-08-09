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
  quantity: 1,
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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

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
    // Auto-link quantity ↔ availability:
    //   qty 0 + currently available → mark sold
    //   qty > 0 + currently sold    → mark available
    if ("quantity" in fields) {
      if (fields.quantity === 0 && original.availability === "available") {
        fields = { ...fields, availability: "sold" };
      } else if ((fields.quantity ?? 0) > 0 && original.availability === "sold") {
        fields = { ...fields, availability: "available" };
      }
    }
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

  const [showMergeModal, setShowMergeModal] = useState(false);
  const selectedProducts = products.filter((p) => selectedIds.has(p.id));

  const handleMerge = async (keepId: string) => {
    const mergeIds = Array.from(selectedIds).filter((id) => id !== keepId);
    if (mergeIds.length === 0) return;
    setBulkBusy(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/admin/products/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keepId, mergeIds }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Merge failed");
      // Replace the keeper, drop the deleted ones.
      setProducts((prev) =>
        prev
          .filter((p) => !mergeIds.includes(p.id))
          .map((p) => (p.id === keepId ? (data.keeper as Product) : p))
      );
      invalidatePublicCache();
      showStatus(
        `Merged ${mergeIds.length + 1} product${mergeIds.length === 0 ? "" : "s"} → ${data.combinedImageCount} photos combined ✓`
      );
      setSelectedIds(new Set());
      setShowMergeModal(false);
    } catch (e) {
      showError(e instanceof Error ? e.message : "Merge failed");
    } finally {
      setBulkBusy(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (filtered.every((p) => prev.has(p.id))) {
        // deselect the currently filtered set
        const next = new Set(prev);
        filtered.forEach((p) => next.delete(p.id));
        return next;
      }
      const next = new Set(prev);
      filtered.forEach((p) => next.add(p.id));
      return next;
    });
  };

  const applyBulk = async (fields: Partial<Product>) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setBulkBusy(true);
    setErrorMessage(null);
    // optimistic
    const snapshot = products;
    setProducts((prev) => prev.map((p) => (selectedIds.has(p.id) ? { ...p, ...fields } : p)));
    try {
      const res = await fetch("/api/admin/products/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, fields }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Bulk update failed");
      invalidatePublicCache();
      showStatus(`Updated ${data.updated} product${data.updated === 1 ? "" : "s"} ✓`);
      setSelectedIds(new Set());
    } catch (e) {
      setProducts(snapshot);
      showError(e instanceof Error ? e.message : "Bulk update failed");
    } finally {
      setBulkBusy(false);
    }
  };

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
            <a
              href="/admin/bulk-import"
              className="border border-brass/30 text-brass px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-brass/[0.06] inline-flex items-center gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 13h10M8 3v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Bulk Import
            </a>
            <a
              href="/admin/inquiries"
              className="border border-white/15 text-ivory/80 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-brass/30 inline-flex items-center gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4z M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1" />
              </svg>
              Inquiries
            </a>
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
        {/* Merge Modal */}
        {showMergeModal && selectedProducts.length >= 2 && (
          <div
            className="fixed inset-0 z-50 bg-midnight/90 backdrop-blur-xl overflow-y-auto py-10 px-6"
            onClick={() => !bulkBusy && setShowMergeModal(false)}
          >
            <div
              className="max-w-2xl mx-auto bg-charcoal border border-white/10 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-serif text-ivory">Merge products</h2>
                <button
                  onClick={() => setShowMergeModal(false)}
                  disabled={bulkBusy}
                  className="text-warm-gray/70 hover:text-ivory text-lg"
                >
                  &times;
                </button>
              </div>
              <p className="text-[12px] text-warm-gray/70 font-sans mb-6 leading-relaxed">
                Pick the product to <span className="text-brass">keep</span>. All photos,
                materials, and tags from the others will be combined into it, and the
                others will be removed. Title, price, period, dimensions, description,
                etc. of the kept product stay as-is.
              </p>

              <div className="space-y-2">
                {selectedProducts.map((p) => (
                  <button
                    key={p.id}
                    disabled={bulkBusy}
                    onClick={() => handleMerge(p.id)}
                    className="w-full text-left flex items-center gap-4 p-3 border border-white/10 hover:border-brass/40 hover:bg-white/[0.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {p.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-14 h-14 object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-14 h-14 border border-dashed border-white/10" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ivory font-sans truncate">{p.title}</p>
                      <p className="text-[10px] text-warm-gray/60 font-mono mt-0.5">
                        {p.sku || "—"} · {p.images?.length || 0} photo{(p.images?.length || 0) === 1 ? "" : "s"} · {p.subcategory || p.category}
                      </p>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-brass/70 font-sans whitespace-nowrap">
                      Keep this →
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowMergeModal(false)}
                  disabled={bulkBusy}
                  className="text-[10px] tracking-[0.2em] uppercase text-warm-gray/70 hover:text-ivory px-4 py-2 font-sans"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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

                {/* Price + Quantity */}
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">
                      Quantity in stock
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.quantity ?? 1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: e.target.value === "" ? undefined : Math.max(0, Math.floor(Number(e.target.value))),
                        })
                      }
                      className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    />
                  </div>
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

        {/* Bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="sticky top-4 z-30 mb-4 bg-charcoal border border-brass/30 px-5 py-4 flex flex-wrap items-center gap-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-brass font-sans">
              {selectedIds.size} selected
            </span>
            <div className="h-4 w-px bg-white/10" />

            {/* Availability */}
            <label className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/60 font-sans">Status</span>
              <select
                defaultValue=""
                disabled={bulkBusy}
                onChange={(e) => { if (e.target.value) { applyBulk({ availability: e.target.value as Product["availability"] }); e.target.value = ""; } }}
                className="bg-midnight border border-white/15 text-ivory text-[11px] px-2 py-1 font-sans outline-none focus:border-brass"
              >
                <option value="">Set…</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </label>

            {/* Category */}
            <label className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/60 font-sans">Category</span>
              <select
                defaultValue=""
                disabled={bulkBusy}
                onChange={(e) => { if (e.target.value) { applyBulk({ category: e.target.value }); e.target.value = ""; } }}
                className="bg-midnight border border-white/15 text-ivory text-[11px] px-2 py-1 font-sans outline-none focus:border-brass"
              >
                <option value="">Set…</option>
                <option value="mother-of-pearl-furniture">Mother of Pearl</option>
                <option value="antiques">Antiques</option>
                <option value="carpets-textiles">Carpets & Textiles</option>
              </select>
            </label>

            {/* Subcategory */}
            <label className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/60 font-sans">Subcat</span>
              <select
                defaultValue=""
                disabled={bulkBusy}
                onChange={(e) => { if (e.target.value) { applyBulk({ subcategory: e.target.value === "__none" ? "" : e.target.value }); e.target.value = ""; } }}
                className="bg-midnight border border-white/15 text-ivory text-[11px] px-2 py-1 font-sans outline-none focus:border-brass"
              >
                <option value="">Set…</option>
                <option value="__none">None (clear)</option>
                <option value="islamic-antiques">Islamic Antiques</option>
                <option value="european-antiques">European Antiques</option>
                <option value="asian-antiques">Asian Antiques</option>
                <option value="mop-mirrors">MoP · Mirrors</option>
                <option value="mop-tables">MoP · Tables</option>
                <option value="mop-seating">MoP · Seating</option>
                <option value="mop-suites">MoP · Suites</option>
                <option value="mop-consoles-cabinets">MoP · Consoles</option>
                <option value="mop-chest-of-drawers">MoP · Chests</option>
                <option value="mop-accessories">MoP · Accessories</option>
                <option value="mop-game-tables">MoP · Game Tables</option>
              </select>
            </label>

            {/* Featured */}
            <div className="flex items-center gap-1">
              <button
                disabled={bulkBusy}
                onClick={() => applyBulk({ featured: true })}
                className="text-[10px] tracking-[0.15em] uppercase text-brass/80 border border-brass/30 px-3 py-1 font-sans hover:bg-brass/[0.06] disabled:opacity-40"
              >
                Feature
              </button>
              <button
                disabled={bulkBusy}
                onClick={() => applyBulk({ featured: false })}
                className="text-[10px] tracking-[0.15em] uppercase text-warm-gray/70 border border-white/15 px-3 py-1 font-sans hover:border-white/30 disabled:opacity-40"
              >
                Unfeature
              </button>
            </div>

            {/* Merge — combine 2+ products into one (photos + materials + tags) */}
            {selectedIds.size >= 2 && (
              <button
                disabled={bulkBusy}
                onClick={() => setShowMergeModal(true)}
                className="text-[10px] tracking-[0.15em] uppercase text-emerald-300/80 border border-emerald-400/30 px-3 py-1 font-sans hover:bg-emerald-400/[0.06] disabled:opacity-40"
                title="Combine the selected products into one"
              >
                Merge →
              </button>
            )}

            <button
              onClick={() => setSelectedIds(new Set())}
              className="ml-auto text-[10px] tracking-[0.2em] uppercase text-warm-gray/60 hover:text-ivory font-sans"
            >
              Clear selection
            </button>
          </div>
        )}

        {/* Product table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 px-3">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={toggleSelectAll}
                    className="accent-brass"
                    aria-label="Select all"
                  />
                </th>
                {["Photo", "SKU", "Title", "Category", "Price", "Qty", "Status", "Type", "Featured", "Actions"].map(
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
                  <td colSpan={11} className="py-12 text-center text-warm-gray/50 text-sm font-sans">
                    Loading from Supabase…
                  </td>
                </tr>
              )}
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b border-white/[0.04] transition-colors ${
                    selectedIds.has(p.id) ? "bg-brass/[0.05]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <td className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="accent-brass"
                      aria-label={`Select ${p.title}`}
                    />
                  </td>
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
                  <td className="py-3 px-3">
                    <input
                      key={`price-${p.id}-${p.price ?? ""}`}
                      type="number"
                      defaultValue={p.price ?? ""}
                      placeholder="—"
                      onBlur={(e) => {
                        const raw = e.target.value.trim();
                        const newPrice = raw === "" ? null : Math.max(0, Number(raw));
                        const newDisplay = newPrice ? `$${newPrice.toLocaleString()}` : "Price on Request";
                        if (newPrice !== (p.price ?? null)) {
                          handleInlineUpdate(p.id, { price: newPrice, priceDisplay: newDisplay });
                        }
                      }}
                      className="w-24 bg-transparent border border-white/10 focus:border-brass px-2 py-1 text-[12px] text-ivory/80 font-sans outline-none"
                      title={p.priceDisplay}
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      key={`qty-${p.id}-${p.quantity ?? 1}`}
                      type="number"
                      min={0}
                      defaultValue={p.quantity ?? 1}
                      onBlur={(e) => {
                        const raw = e.target.value.trim();
                        const q = raw === "" ? 1 : Math.max(0, Math.floor(Number(raw)));
                        if (q !== (p.quantity ?? 1)) handleInlineUpdate(p.id, { quantity: q });
                      }}
                      className={`w-14 bg-transparent border px-2 py-1 text-[12px] font-sans outline-none focus:border-brass ${
                        (p.quantity ?? 1) === 0 ? "border-red-400/30 text-red-400/70" : "border-white/10 text-ivory/80"
                      }`}
                    />
                  </td>
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
