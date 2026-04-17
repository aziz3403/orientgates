"use client";

export const dynamic = "force-dynamic";

import { getCategory, getChildCategories, getProductsByCategory } from "@/lib/data";
import CollectionPage from "@/components/CollectionPage";

export default function AntiquesPage() {
  const category = getCategory("antiques")!;
  const subcategories = getChildCategories("antiques");
  const products = getProductsByCategory("antiques");

  return (
    <CollectionPage
      category={category}
      products={products}
      subcategories={subcategories}
      breadcrumbs={[]}
      productBasePath="/collection/antiques"
    />
  );
}
