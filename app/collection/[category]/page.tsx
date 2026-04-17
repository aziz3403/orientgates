"use client";

import { useParams } from "next/navigation";
import { getCategory, getProductsByCategory, getChildCategories } from "@/lib/data";
import CollectionPage from "@/components/CollectionPage";

export default function LegacyCategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-ivory mb-4">Collection Not Found</h1>
          <a href="/" className="text-brass text-sm font-sans hover:underline">Return Home</a>
        </div>
      </div>
    );
  }

  const products = getProductsByCategory(slug);
  const subcategories = getChildCategories(slug);

  return (
    <CollectionPage
      category={category}
      products={products}
      subcategories={subcategories}
      breadcrumbs={category.parent ? [{ label: getCategory(category.parent)?.title || "", href: `/${category.parent}` }] : []}
      productBasePath={`/collection/${slug}`}
    />
  );
}
