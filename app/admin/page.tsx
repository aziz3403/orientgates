"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import {
  getAllProductsDB,
  addProduct,
  updateProduct,
  deleteProduct,
  generateId,
  generateSKU,
  exportJSON,
  importJSON,
  resetDB,
} from "@/lib/products-db";

const PIN = "orient2024";

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

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(emptyProduct);
  const [showForm, setShowForm] = useState(false);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setProducts(getAllProductsDB());
    }
  }, [authenticated]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN) setAuthenticated(true);
  };

  const refreshProducts = () => setProducts(getAllProductsDB());

  const handleSave = () => {
    if (!formData.title || !formData.slug) return;

    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      const id = generateId();
      const sku = generateSKU(formData.category || "", formData.subcategory);
      addProduct({
        ...emptyProduct,
        ...formData,
        id,
        sku,
      } as Product);
    }
    refreshProducts();
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyProduct);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      deleteProduct(id);
      refreshProducts();
    }
  };

  const handleToggle = (id: string, field: keyof Product, value: any) => {
    updateProduct(id, { [field]: value });
    refreshProducts();
  };

  const handleExport = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orient-gates-products-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const handleImport = () => {
    if (importJSON(importText)) {
      refreshProducts();
      setShowImport(false);
      setImportText("");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || "").toLowerCase().includes(search.toLowerCase())
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
        <form onSubmit={handleAuth} className="w-full max-w-sm">
          <h1 className="text-2xl font-serif text-ivory mb-2 text-center">Admin Panel</h1>
          <p className="text-[12px] text-warm-gray/40 font-sans text-center mb-8">The Orient Gates Product Management</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full bg-transparent border border-white/15 px-4 py-3 text-ivory text-center text-sm font-sans focus:border-brass outline-none mb-4"
          />
          <button type="submit" className="w-full bg-brass text-midnight py-3 text-[11px] tracking-[0.2em] uppercase font-sans">
            Access
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-serif text-ivory">Product Management</h1>
            <p className="text-[12px] text-warm-gray/40 font-sans mt-1">{products.length} products in database</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyProduct); }}
              className="bg-brass text-midnight px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans"
            >
              + Add Product
            </button>
            <button onClick={handleExport} className="border border-white/15 text-ivory/60 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-brass/30">
              Export JSON
            </button>
            <button onClick={() => setShowImport(!showImport)} className="border border-white/15 text-ivory/60 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-brass/30">
              Import JSON
            </button>
            <button onClick={() => { resetDB(); refreshProducts(); }} className="border border-red-500/30 text-red-400/60 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-red-500/60">
              Reset DB
            </button>
          </div>
        </div>

        {/* Import area */}
        {showImport && (
          <div className="mb-8 p-6 border border-white/10">
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste JSON array of products here..."
              className="w-full bg-transparent border border-white/10 p-4 text-ivory text-xs font-mono h-40 resize-none focus:border-brass outline-none mb-4"
            />
            <button onClick={handleImport} className="bg-brass text-midnight px-6 py-2 text-[10px] tracking-[0.2em] uppercase font-sans">
              Import
            </button>
          </div>
        )}

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
                <button onClick={() => setShowForm(false)} className="text-warm-gray/40 hover:text-ivory text-lg">&times;</button>
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
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      value={(formData as any)[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    />
                  </div>
                ))}

                {/* Price (number) */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Price (number, 0 for inquiry)</label>
                  <input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : null })}
                    className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                  />
                </div>

                {/* Selects */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Category</label>
                    <select
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="mother-of-pearl-furniture">Mother of Pearl Furniture</option>
                      <option value="antiques">Antiques</option>
                      <option value="carpets-textiles">Carpets & Textiles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Subcategory</label>
                    <select
                      value={formData.subcategory || ""}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="">None</option>
                      <option value="islamic-antiques">Islamic Antiques</option>
                      <option value="european-antiques">European Antiques</option>
                      <option value="asian-antiques">Asian Antiques</option>
                      <option value="mop-mirrors">Mirrors & Wall Decor</option>
                      <option value="mop-tables">Tables</option>
                      <option value="mop-seating">Seating</option>
                      <option value="mop-consoles-cabinets">Consoles & Cabinets</option>
                      <option value="mop-chest-of-drawers">Chest of Drawers</option>
                      <option value="mop-accessories">Accessories</option>
                      <option value="mop-game-tables">Game Tables</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Type</label>
                    <select
                      value={formData.type || "inquiry"}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="purchasable">Purchasable</option>
                      <option value="inquiry">Inquiry Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Availability</label>
                    <select
                      value={formData.availability || "available"}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                      className="w-full bg-charcoal border border-white/15 px-3 py-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </div>
                </div>

                {/* Textareas */}
                {[
                  { key: "description", label: "Description" },
                  { key: "craftsmanship", label: "Craftsmanship" },
                  { key: "condition", label: "Condition" },
                  { key: "provenance", label: "Provenance" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">{field.label}</label>
                    <textarea
                      value={(formData as any)[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      rows={3}
                      className="w-full bg-transparent border border-white/10 p-3 text-ivory text-sm font-sans focus:border-brass outline-none resize-none"
                    />
                  </div>
                ))}

                {/* Materials (comma-separated) */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Materials (comma-separated)</label>
                  <input
                    type="text"
                    value={(formData.materials || []).join(", ")}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                    className="w-full bg-transparent border-b border-white/15 pb-2 text-ivory text-sm font-sans focus:border-brass outline-none"
                  />
                </div>

                {/* Images (comma-separated URLs) */}
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans mb-2">Image URLs (comma-separated)</label>
                  <input
                    type="text"
                    value={(formData.images || []).join(", ")}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
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
                        onChange={(e) => setFormData({ ...formData, [toggle.key]: e.target.checked })}
                        className="accent-brass"
                      />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-warm-gray/60 font-sans">{toggle.label}</span>
                    </label>
                  ))}
                </div>

                {/* Save */}
                <div className="flex gap-3 pt-6">
                  <button onClick={handleSave} className="bg-brass text-midnight px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans">
                    {editingId ? "Update Product" : "Add Product"}
                  </button>
                  <button onClick={() => setShowForm(false)} className="border border-white/15 text-ivory/60 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-sans">
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
                {["SKU", "Title", "Category", "Price", "Status", "Type", "Featured", "Actions"].map((h) => (
                  <th key={h} className="pb-3 text-[9px] tracking-[0.3em] uppercase text-brass/50 font-sans font-normal whitespace-nowrap px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 text-[11px] text-warm-gray/50 font-mono">{p.sku || "—"}</td>
                  <td className="py-3 px-3 text-sm text-ivory font-sans truncate max-w-[250px]">{p.title}</td>
                  <td className="py-3 px-3 text-[11px] text-warm-gray/50 font-sans">{p.subcategory || p.category}</td>
                  <td className="py-3 px-3 text-sm text-ivory/70 font-sans">{p.priceDisplay}</td>
                  <td className="py-3 px-3">
                    <select
                      value={p.availability}
                      onChange={(e) => handleToggle(p.id, "availability", e.target.value)}
                      className={`bg-transparent text-[10px] tracking-[0.15em] uppercase font-sans px-2 py-1 border outline-none ${
                        p.availability === "available" ? "text-emerald-400/70 border-emerald-400/20" :
                        p.availability === "sold" ? "text-red-400/70 border-red-400/20" :
                        "text-amber-400/70 border-amber-400/20"
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
                      onChange={(e) => handleToggle(p.id, "type", e.target.value)}
                      className="bg-transparent text-[10px] text-ivory/50 font-sans border border-white/10 px-2 py-1 outline-none"
                    >
                      <option value="purchasable">Purchase</option>
                      <option value="inquiry">Inquiry</option>
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={p.featured || false}
                      onChange={(e) => handleToggle(p.id, "featured", e.target.checked)}
                      className="accent-brass"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(p)} className="text-[10px] text-brass/60 hover:text-brass transition-colors font-sans">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-[10px] text-red-400/40 hover:text-red-400 transition-colors font-sans">Delete</button>
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
