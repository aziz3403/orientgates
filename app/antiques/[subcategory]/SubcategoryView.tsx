"use client";

import { useParams } from "next/navigation";
import { getCategory } from "@/lib/data";
import { useProducts, productMatchers } from "@/lib/products-client";
import CollectionPage from "@/components/CollectionPage";
import ProductDetail from "@/components/ProductDetail";

export default function AntiquesSubcategoryPage() {
  const params = useParams();
  const slug = params.subcategory as string;
  const category = getCategory(slug);
  const { products, loading } = useProducts(productMatchers.byCategoryOrSubcategory(slug));

  // Not a known subcategory → treat the segment as a product slug
  // (covers antiques pieces saved without a subcategory: /antiques/<slug>).
  if (!category) {
    return <ProductDetail slug={slug} categorySlug="antiques" />;
  }

  return (
    <CollectionPage
      category={category}
      products={products}
      loading={loading}
      breadcrumbs={[{ label: "Antiques", href: "/antiques" }]}
      productBasePath="/collection/antiques"
    />
  );
}
