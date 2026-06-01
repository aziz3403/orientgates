"use client";

import { useParams } from "next/navigation";
import { getCategory } from "@/lib/data";
import { useProducts, productMatchers } from "@/lib/products-client";
import CollectionPage from "@/components/CollectionPage";
import ProductDetail from "@/components/ProductDetail";

export default function MoPSubcategoryPage() {
  const params = useParams();
  const slug = params.subcategory as string;
  const category = getCategory(slug);
  const { products, loading } = useProducts(productMatchers.byCategoryOrSubcategory(slug));

  // Not a known subcategory → treat the segment as a product slug
  // (covers MoP pieces saved without a subcategory: /mother-of-pearl-furniture/<slug>).
  if (!category) {
    return <ProductDetail slug={slug} categorySlug="mother-of-pearl-furniture" />;
  }

  return (
    <CollectionPage
      category={category}
      products={products}
      loading={loading}
      breadcrumbs={[{ label: "Mother of Pearl Furniture", href: "/mother-of-pearl-furniture" }]}
      productBasePath="/collection/mother-of-pearl-furniture"
    />
  );
}
