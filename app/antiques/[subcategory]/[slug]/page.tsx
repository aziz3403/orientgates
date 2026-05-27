"use client";

import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export default function AntiquesProductPage() {
  const params = useParams();
  return (
    <ProductDetail
      slug={params.slug as string}
      categorySlug={(params.subcategory as string) || "antiques"}
    />
  );
}
