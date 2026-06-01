// Legacy product URL. Products now live at the canonical hierarchical path
// (/<category>/<subcategory>/<slug>). Issue a real HTTP redirect so crawlers
// (WhatsApp, Twitter, etc.) follow it and pick up the canonical page's
// per-product OG metadata, not just JS-only client navigation.

import { redirect } from "next/navigation";
import { getProduct } from "@/lib/products-server";
import { productUrl } from "@/lib/data";

interface Props {
  params: { category: string; slug: string };
}

export default async function LegacyProductRedirect({ params }: Props) {
  const product = await getProduct(params.slug);
  redirect(product ? productUrl(product) : "/");
}
