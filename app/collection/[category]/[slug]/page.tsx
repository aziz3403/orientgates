"use client";

// Legacy product URL. Products now live at the canonical hierarchical path
// (/<category>/<subcategory>/<slug>). Redirect old /collection/<cat>/<slug>
// links — and anything indexed by search engines — to the new URL.

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProducts } from "@/lib/products-client";
import { productUrl } from "@/lib/data";

export default function LegacyProductRedirect() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { products, loading } = useProducts();

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (product) router.replace(productUrl(product));
    else if (!loading && products.length > 0) router.replace("/");
  }, [product, loading, products.length, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight pt-32">
      <p className="text-warm-gray/60 font-sans text-sm">Redirecting…</p>
    </div>
  );
}
