"use client";

export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategory, getProductsByCategory } from "@/lib/data";
import CollectionPage from "@/components/CollectionPage";

export default function MoPSubcategoryPage() {
  const params = useParams();
  const slug = params.subcategory as string;
  const category = getCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-ivory mb-4">Collection Not Found</h1>
          <Link href="/mother-of-pearl-furniture" className="text-brass text-sm font-sans hover:underline">
            Back to Mother of Pearl Furniture
          </Link>
        </div>
      </div>
    );
  }

  const products = getProductsByCategory(slug);

  return (
    <CollectionPage
      category={category}
      products={products}
      breadcrumbs={[{ label: "Mother of Pearl Furniture", href: "/mother-of-pearl-furniture" }]}
      productBasePath="/collection/mother-of-pearl-furniture"
    />
  );
}
