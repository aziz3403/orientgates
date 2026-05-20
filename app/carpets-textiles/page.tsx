"use client";

import { getCategory } from "@/lib/data";
import { useProducts, productMatchers } from "@/lib/products-client";
import CollectionPage from "@/components/CollectionPage";

export default function CarpetsTextilesPage() {
  const category = getCategory("carpets-textiles")!;
  const { products, loading } = useProducts(productMatchers.byCategoryOrSubcategory("carpets-textiles"));

  return (
    <CollectionPage
      category={category}
      products={products}
      loading={loading}
      breadcrumbs={[]}
      productBasePath="/collection/carpets-textiles"
    />
  );
}
