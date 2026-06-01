// Per-product OG / Twitter metadata. Server-only — pulls the product from
// Supabase and shapes it for Next's <Metadata> contract. Used by the
// generateMetadata() in each hierarchical product route so links shared
// to WhatsApp / iMessage / Twitter / etc. render the right photo + title.

import type { Metadata } from "next";
import { getProduct } from "@/lib/products-server";
import { productUrl } from "@/lib/data";

const SITE = "https://theorientgates.com";

function summarise(p: Awaited<ReturnType<typeof getProduct>>): string {
  if (!p) return "";
  if (p.description) return p.description.slice(0, 200);
  const bits = [p.origin, p.period, p.materials.join(", ")].filter(Boolean);
  return bits.join(" · ").slice(0, 200);
}

export async function buildProductMetadata(slug: string): Promise<Metadata> {
  const product = await getProduct(slug);
  if (!product) {
    return {
      title: "Piece Not Found",
      description: "This piece is no longer in the collection.",
    };
  }

  const title = product.title;
  const description = summarise(product) || `${product.title} — The Orient Gates`;
  const image = product.images[0];
  const url = `${SITE}${productUrl(product)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "The Orient Gates",
      type: "website",
      locale: "en_US",
      images: image
        ? [{ url: image, width: 1200, height: 900, alt: product.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
