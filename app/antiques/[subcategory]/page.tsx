"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategory } from "@/lib/data";
import { useProducts, productMatchers } from "@/lib/products-client";
import CollectionPage from "@/components/CollectionPage";

export default function AntiquesSubcategoryPage() {
  const params = useParams();
  const slug = params.subcategory as string;
  const category = getCategory(slug);
  const { products, loading } = useProducts(productMatchers.byCategoryOrSubcategory(slug));

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-ivory mb-4">Collection Not Found</h1>
          <Link href="/antiques" className="text-brass text-sm font-sans hover:underline">
            Back to Antiques
          </Link>
        </div>
      </div>
    );
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
