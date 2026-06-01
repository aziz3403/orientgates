"use client";

import { getCategory, getChildCategories } from "@/lib/data";
import { useProducts, productMatchers } from "@/lib/products-client";
import CollectionPage from "@/components/CollectionPage";

export default function AntiquesPage() {
  const category = getCategory("antiques")!;
  const subcategories = getChildCategories("antiques");
  const { products, loading } = useProducts(productMatchers.byCategoryOrSubcategory("antiques"));

  return (
    <CollectionPage
      category={category}
      products={products}
      loading={loading}
      subcategories={subcategories}
      breadcrumbs={[]}
      productBasePath="/collection/antiques"
    />
  );
}
