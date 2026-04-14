"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Category, Product } from "@/lib/data";
import AnimateIn from "@/components/ui/AnimateIn";
import LuxuryImage from "@/components/ui/LuxuryImage";
import ProductCard from "@/components/ProductCard";
import { useMousePosition } from "@/lib/hooks";

type SortOption = "newest" | "price-asc" | "price-desc" | "period";
type AvailFilter = "all" | "available" | "sold";

function CollectionGrid({ products, productBasePath }: { products: Product[]; productBasePath?: string }) {
  const [sort, setSort] = useState<SortOption>("newest");
  const [availFilter, setAvailFilter] = useState<AvailFilter>("all");
  const [originFilter, setOriginFilter] = useState("");

  // Get unique origins for filter
  const origins = useMemo(() => Array.from(new Set(products.map((p) => p.origin))).sort(), [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Availability filter
    if (availFilter !== "all") {
      result = result.filter((p) => p.availability === availFilter);
    }

    // Origin filter
    if (originFilter) {
      result = result.filter((p) => p.origin === originFilter);
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => (a.price || 999999) - (b.price || 999999));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "period":
        result.sort((a, b) => a.period.localeCompare(b.period));
        break;
      default:
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return result;
  }, [products, sort, availFilter, originFilter]);

  const hasActiveFilters = availFilter !== "all" || originFilter !== "";

  return (
    <section className="py-section bg-charcoal">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-12">
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-[12px] text-warm-gray/40 font-sans">
              {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
            </p>

            {/* Availability */}
            <div className="flex gap-1">
              {(["all", "available", "sold"] as AvailFilter[]).map((f) => (
                <button key={f} onClick={() => setAvailFilter(f)}
                  className={`px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase font-sans border transition-all ${
                    availFilter === f ? "border-brass/30 text-brass bg-brass/[0.05]" : "border-white/[0.06] text-warm-gray/40 hover:text-ivory"
                  }`}>{f}</button>
              ))}
            </div>

            {/* Origin dropdown */}
            {origins.length > 1 && (
              <select value={originFilter} onChange={(e) => setOriginFilter(e.target.value)}
                className="bg-transparent border border-white/[0.08] px-3 py-1.5 text-[9px] tracking-[0.15em] uppercase text-warm-gray/50 font-sans outline-none focus:border-brass/30 appearance-none"
              >
                <option value="" className="bg-midnight">All Origins</option>
                {origins.map((o) => <option key={o} value={o} className="bg-midnight">{o}</option>)}
              </select>
            )}

            {/* Clear filters */}
            {hasActiveFilters && (
              <button onClick={() => { setAvailFilter("all"); setOriginFilter(""); }}
                className="text-[9px] tracking-[0.2em] uppercase text-red-400/50 hover:text-red-400 font-sans transition-colors">
                Clear Filters
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/50 font-sans">Sort:</span>
            {([
              { key: "newest", label: "Newest" },
              { key: "price-asc", label: "Price ↑" },
              { key: "price-desc", label: "Price ↓" },
            ] as { key: SortOption; label: string }[]).map((s) => (
              <button key={s.key} onClick={() => setSort(s.key)}
                className={`text-[9px] tracking-[0.15em] uppercase font-sans transition-colors ${
                  sort === s.key ? "text-brass/70" : "text-warm-gray/50 hover:text-ivory"
                }`}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} basePath={productBasePath} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-warm-gray/40 font-sans mb-8 text-sm">No pieces match your current filters.</p>
            <button onClick={() => { setAvailFilter("all"); setOriginFilter(""); setSort("newest"); }}
              className="inline-flex items-center gap-3 border border-ivory/15 text-ivory/70 px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:border-brass/30 transition-all"
            >Clear All Filters</button>
          </div>
        )}
      </div>
    </section>
  );
}

interface CollectionPageProps {
  category: Category;
  products: Product[];
  subcategories?: Category[];
  breadcrumbs: { label: string; href: string }[];
  productBasePath?: string;
}

export default function CollectionPage({
  category,
  products,
  subcategories,
  breadcrumbs,
  productBasePath,
}: CollectionPageProps) {
  const { ref, position } = useMousePosition();

  return (
    <>
      {/* Hero */}
      <section
        ref={ref}
        className="relative h-[65vh] min-h-[450px] max-h-[700px] flex items-end overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{
            transform: `scale(1.05) translate(${(position.x - 0.5) * -8}px, ${(position.y - 0.5) * -8}px)`,
          }}
        >
          <LuxuryImage
            src={category.image}
            alt={category.title}
            width={1920}
            height={1080}
            className="w-full h-full"
            label={category.title}
            priority
          />
        </div>

        <div className={`absolute inset-0 bg-gradient-to-t ${category.accent} opacity-40`} />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-midnight/20" />

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-16 pb-14 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-5 text-[9px] tracking-[0.25em] uppercase text-warm-gray/40 font-sans flex-wrap">
            <Link href="/" className="hover:text-brass transition-colors">Home</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <span className="text-white/10">/</span>
                <Link href={crumb.href} className="hover:text-brass transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
            <span className="text-white/10">/</span>
            <span className="text-brass/60">{category.title}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-brass/40" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans">
              {category.subtitle}
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif text-ivory leading-[1.05]">
            {category.title}
          </h1>

          <p className="text-[14px] text-pearl/50 max-w-2xl mt-6 leading-[1.8] font-sans">
            {category.heroDescription}
          </p>
        </div>
      </section>

      {/* Subcategory navigation (if any) */}
      {subcategories && subcategories.length > 0 && (
        <section className="py-16 bg-midnight border-b border-white/[0.04]">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <AnimateIn>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-10 h-px bg-brass/30" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-brass/50 font-sans">
                  Browse by Category
                </span>
              </div>
            </AnimateIn>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${category.slug}`}
                className="px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans border border-brass/30 text-brass bg-brass/[0.06] transition-all duration-300"
              >
                All
              </Link>
              {subcategories.map((sub, i) => (
                <AnimateIn key={sub.slug} delay={i * 50}>
                  <Link
                    href={`/${category.slug}/${sub.slug}`}
                    className="px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans border border-white/[0.08] text-warm-gray/60 hover:border-brass/25 hover:text-ivory hover:bg-white/[0.02] transition-all duration-500"
                  >
                    {sub.title}
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Grid with Filters */}
      <CollectionGrid products={products} productBasePath={productBasePath} />
    </>
  );
}
