"use client";

import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export default function CarpetsProductPage() {
  const params = useParams();
  return <ProductDetail slug={params.slug as string} categorySlug="carpets-textiles" />;
}
