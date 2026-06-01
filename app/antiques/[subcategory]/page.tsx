import type { Metadata } from "next";
import { getCategory } from "@/lib/data";
import { buildProductMetadata } from "@/lib/product-meta";
import SubcategoryView from "./SubcategoryView";

interface Props {
  params: { subcategory: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory(params.subcategory);
  // Unknown segment → treat as a product slug, delegate.
  if (!category) return buildProductMetadata(params.subcategory);

  const url = `https://theorientgates.com/antiques/${category.slug}`;
  const title = `${category.title} · Antiques`;
  const description = category.description;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.title} · The Orient Gates`,
      description,
      url,
      type: "website",
    },
  };
}

export default function Page() {
  return <SubcategoryView />;
}
