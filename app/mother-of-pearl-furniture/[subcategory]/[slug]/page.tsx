import ProductDetail from "@/components/ProductDetail";
import { buildProductMetadata } from "@/lib/product-meta";
import type { Metadata } from "next";

interface Props {
  params: { subcategory: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildProductMetadata(params.slug);
}

export default function MopProductPage({ params }: Props) {
  return (
    <ProductDetail
      slug={params.slug}
      categorySlug={params.subcategory || "mother-of-pearl-furniture"}
    />
  );
}
