"use client";

import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export default function MopProductPage() {
  const params = useParams();
  return (
    <ProductDetail
      slug={params.slug as string}
      categorySlug={(params.subcategory as string) || "mother-of-pearl-furniture"}
    />
  );
}
