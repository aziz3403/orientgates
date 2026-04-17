"use client";

export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategory, getProductsByCategory } from "@/lib/data";
import CollectionPage from "@/components/CollectionPage";

export default function AntiquesSubcategoryPage() {
  const params = useParams();
  const slug = params.subcategory as string;
  const category = getCategory(slug);

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

  const products = getProductsByCategory(slug);

  return (
    <CollectionPage
      category={category}
      products={products}
      breadcrumbs={[{ label: "Antiques", href: "/antiques" }]}
      productBasePath="/collection/antiques"
    />
  );
}
