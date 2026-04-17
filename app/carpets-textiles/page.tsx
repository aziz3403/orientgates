"use client";

export const dynamic = "force-dynamic";

import { getCategory, getProductsByCategory } from "@/lib/data";
import CollectionPage from "@/components/CollectionPage";

export default function CarpetsTextilesPage() {
  const category = getCategory("carpets-textiles")!;
  const products = getProductsByCategory("carpets-textiles");

  return (
    <CollectionPage
      category={category}
      products={products}
      breadcrumbs={[]}
      productBasePath="/collection/carpets-textiles"
    />
  );
}
